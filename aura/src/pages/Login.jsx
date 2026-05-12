import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  const { login, googleLogin } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ─────────────────────────────────────
  // Handle Input Change
  // ─────────────────────────────────────

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (error) {
      setError("");
    }
  };

  // ─────────────────────────────────────
  // Login Submit
  // ─────────────────────────────────────

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await login(form);

      if (response?.user) {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  // ─────────────────────────────────────
  // Google Login
  // ─────────────────────────────────────

  const handleGoogle = async (credentialResponse) => {
    try {
      setLoading(true);
      setError("");

      const response = await googleLogin(
        credentialResponse.credential
      );

      if (response?.user) {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Google sign-in failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // ─────────────────────────────────────
  // UI
  // ─────────────────────────────────────

  return (
    <div
      style={{
        background: "#050508",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.25), transparent 70%)",
          top: "-200px",
          left: "-100px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Card */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "430px",
          background: "#0a0a0f",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "28px",
          padding: "3rem",
          boxShadow: "0 20px 80px rgba(0,0,0,0.55)",
        }}
      >
        {/* Logo */}
        <div
          style={{
            marginBottom: "2rem",
          }}
        >
          <h1
            style={{
              color: "#fff",
              fontSize: "2rem",
              fontWeight: 800,
              margin: 0,
              letterSpacing: "-1px",
            }}
          >
            AURA
            <span
              style={{
                color: "#8b5cf6",
              }}
            >
              .
            </span>
          </h1>
        </div>

        {/* Heading */}
        <h2
          style={{
            color: "#fff",
            fontSize: "2rem",
            marginBottom: "0.5rem",
            fontWeight: 700,
          }}
        >
          Welcome back
        </h2>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "2rem",
            lineHeight: 1.6,
          }}
        >
          Sign in to continue to your dashboard.
        </p>

        {/* Error */}
        {error && (
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              background: "rgba(239,68,68,0.15)",
              border: "1px solid rgba(239,68,68,0.25)",
              color: "#fca5a5",
              padding: "1rem",
              borderRadius: "12px",
              marginBottom: "1.5rem",
            }}
          >
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Google Login */}
        <div
          style={{
            marginBottom: "1.8rem",
          }}
        >
          <GoogleLogin
            onSuccess={handleGoogle}
            onError={() =>
              setError("Google sign-in failed.")
            }
          />
        </div>

        {/* Divider */}
        <div
          style={{
            position: "relative",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              width: "100%",
              height: "1px",
              background: "rgba(255,255,255,0.08)",
            }}
          />

          <span
            style={{
              position: "relative",
              background: "#0a0a0f",
              color: "#64748b",
              padding: "0 1rem",
              fontSize: "0.9rem",
            }}
          >
            or
          </span>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            position: "relative",
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {/* Email */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#94a3b8",
                fontSize: "0.9rem",
              }}
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              required
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "1rem 1.25rem",
                borderRadius: "14px",
                border:
                  "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.03)",
                color: "#fff",
                fontSize: "1rem",
                outline: "none",
              }}
            />
          </div>

          {/* Password */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#94a3b8",
                fontSize: "0.9rem",
              }}
            >
              Password
            </label>

            <div
              style={{
                position: "relative",
              }}
            >
              <input
                type={showPw ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "1rem 3.5rem 1rem 1.25rem",
                  borderRadius: "14px",
                  border:
                    "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.03)",
                  color: "#fff",
                  fontSize: "1rem",
                  outline: "none",
                }}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPw((prev) => !prev)
                }
                style={{
                  position: "absolute",
                  right: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "none",
                  background: "transparent",
                  color: "#94a3b8",
                  cursor: "pointer",
                }}
              >
                {showPw ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              background: "#7c3aed",
              color: "#fff",
              border: "none",
              borderRadius: "14px",
              padding: "1rem",
              fontSize: "1rem",
              fontWeight: 700,
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <p
          style={{
            marginTop: "2rem",
            textAlign: "center",
            color: "#64748b",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{
              color: "#a78bfa",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}