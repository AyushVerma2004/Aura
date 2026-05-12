import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import {
  generateAccessToken,
  generateRefreshToken,
  buildTokenPayload,
  verifyRefreshToken,
} from "../utils/jwt.js";
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || "127598352106-adpa2rmdnsg2ngda3va7b6gn31iabpsi.apps.googleusercontent.com");

async function issueTokens(user) {
  const payload     = buildTokenPayload(user);
  const accessToken  = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  user.refreshTokens.push({ token: refreshToken, expiresAt });
  if (user.refreshTokens.length > 5) {
    user.refreshTokens = user.refreshTokens.slice(-5);
  }
  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
}

// ── POST /api/auth/register ───────────────────────────────────
export async function register(req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters." });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const user = await User.create({
      firstName: firstName.trim(),
      lastName:  lastName.trim(),
      email:     email.toLowerCase().trim(),
      password,
      authProvider: "local",
    });

    const { accessToken, refreshToken } = await issueTokens(user);

    return res.status(201).json({
      message: "Account created successfully.",
      accessToken,
      refreshToken,
      user,
    });
  } catch (err) {
    console.error("Register error:", err.message);
    return res.status(500).json({ message: err.message || "Registration failed." });
  }
}

// ── POST /api/auth/login ──────────────────────────────────────
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User
      .findOne({ email: email.toLowerCase().trim() })
      .select("+password");

    if (!user || !user.password) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const { accessToken, refreshToken } = await issueTokens(user);

    return res.status(200).json({
      message: "Logged in successfully.",
      accessToken,
      refreshToken,
      user,
    });
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({ message: err.message || "Login failed." });
  }
}
// ── POST /api/auth/google ─────────────────────────────────────

export async function googleAuth(req, res) {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ message: "Google credential is required." });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken:  credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const {
      sub:         googleId,
      email,
      given_name:  firstName,
      family_name: lastName,
      picture:     avatar,
    } = payload;

    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (!user) {
      user = await User.create({
        firstName,
        lastName:        lastName || "",
        email,
        googleId,
        avatar,
        authProvider:    "google",
        isEmailVerified: true,
      });
    } else if (!user.googleId) {
      user.googleId        = googleId;
      user.avatar          = user.avatar || avatar;
      user.authProvider    = "google";
      user.isEmailVerified = true;
      await user.save({ validateBeforeSave: false });
    }

    const { accessToken, refreshToken } = await issueTokens(user);

    return res.status(200).json({
      message: "Google authentication successful.",
      accessToken,
      refreshToken,
      user,
    });
  } catch (err) {
    console.error("Google auth error:", err.message);
    return res.status(500).json({ message: err.message || "Google authentication failed." });
  }
}

// ── POST /api/auth/refresh ────────────────────────────────────
export async function refreshTokens(req, res) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required." });
    }

    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      return res.status(401).json({ message: "Refresh token is invalid or expired." });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    const tokenEntry = user.refreshTokens.find((t) => t.token === refreshToken);
    if (!tokenEntry) {
      return res.status(401).json({ message: "Refresh token has been revoked." });
    }

    user.refreshTokens = user.refreshTokens.filter((t) => t.token !== refreshToken);
    const tokens = await issueTokens(user);

    return res.status(200).json({
      message: "Tokens refreshed.",
      ...tokens,
    });
  } catch (err) {
    console.error("Refresh error:", err.message);
    return res.status(500).json({ message: err.message || "Token refresh failed." });
  }
}

// ── POST /api/auth/logout ─────────────────────────────────────
export async function logout(req, res) {
  try {
    const { refreshToken } = req.body;

    if (refreshToken) {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { refreshTokens: { token: refreshToken } },
      });
    }

    return res.status(200).json({ message: "Logged out successfully." });
  } catch (err) {
    console.error("Logout error:", err.message);
    return res.status(500).json({ message: err.message || "Logout failed." });
  }
}
// ── GET /api/auth/me ──────────────────────────────────────────
export async function getMe(req, res) {
  return res.status(200).json({ user: req.user });
}