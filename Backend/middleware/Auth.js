import { verifyAccessToken } from "../utils/jwt.js";
import User from "../models/User.js";

// ─────────────────────────────────────────────────────────────
// protect — guards any route that requires authentication
//
// Usage in routes:
//   router.get("/me", protect, getMe);
//   router.post("/logout", protect, logout);
//
// The frontend sends: Authorization: Bearer <accessToken>
// ─────────────────────────────────────────────────────────────
export async function protect(req, res, next) {
  try {
    // ── 1. Extract token from Authorization header ──
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authenticated. Please log in.",
      });
    }

    const token = authHeader.split(" ")[1];

    // ── 2. Verify token signature + expiry ──
    const decoded = verifyAccessToken(token);
    if (!decoded) {
      return res.status(401).json({
        message: "Token is invalid or has expired. Please log in again.",
      });
    }

    // ── 3. Check user still exists in DB ──
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        message: "The user belonging to this token no longer exists.",
      });
    }

    // ── 4. Attach user to request for downstream handlers ──
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}