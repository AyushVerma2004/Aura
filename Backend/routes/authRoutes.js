import { Router }    from "express";
import rateLimit     from "express-rate-limit";
import {
  register,
  login,
  googleAuth,
  refreshTokens,
  logout,
  getMe,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
const router = Router();
router.post("/register", register);
router.post("/login",    login);
router.post("/google",   googleAuth);
router.post("/refresh",  refreshTokens);

// ── Protected routes ──────────────────────────────────────────
router.post("/logout", protect, logout);
router.get("/me",      protect, getMe);

export default router;