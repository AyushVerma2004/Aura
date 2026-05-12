import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";

/* Password strength */
function scorePassword(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return Math.min(4, score);
}

const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_CLASSES = ["", "weak", "fair", "good", "strong"];

export default function Signup() {
  const navigate = useNavigate();
  const { register, googleLogin } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [showPw, setShowPw] = useState(false);
  const [showCon, setShowCon] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const strength = useMemo(() => scorePassword(form.password), [form.password]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const validate = () => {
    const { firstName, lastName, email, password, confirm } = form;
    if (!firstName || !lastName || !email || !password || !confirm)
      return "Please fill in all fields.";
    if (password.length < 8)
      return "Password must be at least 8 characters.";
    if (password !== confirm)
      return "Passwords do not match.";
    if (!agreed)
      return "You must agree to the Terms.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);

    setLoading(true);
    setError("");

    try {
     const response= await register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });
      if (response?.user) {

  setSuccess(true);

  setTimeout(() => {
    navigate("/dashboard", {
      replace: true,
    });
  }, 800);
}
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async (res) => {

  try {

    setLoading(true);
    setError("");

    const response = await googleLogin(
      res.credential
    );

    if (response?.user) {
      navigate("/dashboard", {
        replace: true,
      });
    }

  } catch (err) {

    setError(
      err.response?.data?.message ||
      "Google signup failed"
    );

  } finally {
    setLoading(false);
  }
};

  return (
    <>
      {/* STYLE BLOCK */}
      <style>{`
        .auth-layout { min-height:100vh; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,#0f172a,#1e293b); }
        .auth-card { width:420px; background:#0b1220; padding:32px; border-radius:16px; color:#fff; }
        .auth-heading { text-align:center; margin-bottom:5px; }
        .auth-sub { text-align:center; color:#94a3b8; margin-bottom:20px; }
        .auth-input { width:100%; padding:10px; border-radius:8px; background:#1e293b; color:#fff; border:none; }
        .field { margin-bottom:14px; }
        .field-row { display:flex; gap:10px; }
        .pw-wrap { position:relative; }
        .pw-toggle { position:absolute; right:10px; top:50%; transform:translateY(-50%); background:none; border:none; color:#94a3b8; cursor:pointer; }
        .btn-submit { width:100%; padding:12px; border-radius:8px; background:#7c3aed; color:#fff; border:none; cursor:pointer; }
        .auth-alert { padding:10px; border-radius:8px; margin-bottom:10px; }
        .error { background:#7f1d1d; }
        .success { background:#14532d; }
      `}</style>

      <div className="auth-layout">
        <div className="auth-card">

          <h1 className="auth-heading">Create account</h1>
          <p className="auth-sub">Join AURA</p>

          {error && <div className="auth-alert error">{error}</div>}
          {success && <div className="auth-alert success">Account created!</div>}

          <GoogleLogin onSuccess={handleGoogle} onError={() => setError("Google failed")} />

          <form onSubmit={handleSubmit}>

            <div className="field-row">
              <input className="auth-input" name="firstName" 
              value ={form.firstName}placeholder="First name" onChange={handleChange}/>
              <input className="auth-input" name="lastName"
              value = {form.lastName} placeholder="Last name" onChange={handleChange}/>
            </div>

            <div className="field">
            <input
              type = "email"
              className="auth-input"
              name="email"
              value={form.email} placeholder="Email" onChange={handleChange}/>
            </div>

            <div className="field pw-wrap">
              <input className="auth-input" type={showPw ? "text":"password"} name="password" value = {form.password} placeholder="Password" onChange={handleChange}/>
              <button type="button" className="pw-toggle" onClick={()=>setShowPw(!showPw)}>
                {showPw ? <EyeOff size={15}/> : <Eye size={15}/>}
              </button>
            </div>

            <div className="field pw-wrap">
              <input className="auth-input" type={showCon ? "text":"password"} name="confirm" value ={form.confirm}placeholder="Confirm Password" onChange={handleChange}/>
              <button type="button" className="pw-toggle" onClick={()=>setShowCon(!showCon)}>
                {showCon ? <EyeOff size={15}/> : <Eye size={15}/>}
              </button>
            </div>

            <div style={{marginBottom:"10px"}}>
              <input type="checkbox" onChange={(e)=>setAgreed(e.target.checked)}/> Agree terms
            </div>

            <button className="btn-submit" disabled={loading}>
              {loading ? "Creating..." : "Create account"}
            </button>
          </form>

          <p style={{textAlign:"center", marginTop:"10px"}}>
            Already have account? <Link to="/login">Login</Link>
          </p>

        </div>
      </div>
    </>
  );
}