import jwt from "jsonwebtoken";

// ─────────────────────────────────────────────────────────────
// Generate a short-lived ACCESS token (default 7 days)
// This is what the frontend sends as: Authorization: Bearer <token>
// ─────────────────────────────────────────────────────────────
export function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

// ─────────────────────────────────────────────────────────────
// Generate a long-lived REFRESH token (default 30 days)
// Stored in MongoDB and rotated on each use
// ─────────────────────────────────────────────────────────────
export function generateRefreshToken(payload) {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "30d",
  });
}

// ─────────────────────────────────────────────────────────────
// Verify an access token — returns decoded payload or null
// ─────────────────────────────────────────────────────────────
export function verifyAccessToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}
// ─────────────────────────────────────────────────────────────
// Verify a refresh token — returns decoded payload or null
// ─────────────────────────────────────────────────────────────
export function verifyRefreshToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────
// Build the payload embedded inside both tokens
// Keep it minimal — only what the API needs to identify the user
// ─────────────────────────────────────────────────────────────
export function buildTokenPayload(user) {
  return {
    id:           user._id.toString(),
    email:        user.email,
    firstName:    user.firstName,
    authProvider: user.authProvider,
  };
}