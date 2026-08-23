import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import SplashCursor from "../components/SplashCursor";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [enableSplash, setEnableSplash] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isSmallScreen = window.innerWidth < 640;
    setEnableSplash(!prefersReducedMotion && !isSmallScreen);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter Email and Password");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser({ email, password });
      login(data);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rp-login-screen">
      {enableSplash && <SplashCursor />}

      <div className="rp-card">
        <div className="rp-brand">
          ReconPro
        </div>
        <p className="rp-subtitle">Sign in to continue reconciling.</p>

        <div className="rp-tabs">
          <span className="rp-tab rp-tab-active">Sign in</span>
          <Link to="/register" className="rp-tab">
            Create account
          </Link>
        </div>

        <form onSubmit={handleLogin}>
          <div className="rp-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="rp-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="rp-row">
            <label className="rp-remember">
              <input type="checkbox" />
              Remember me
            </label>
            <Link to="/forgot-password" className="rp-link">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="rp-btn" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="rp-foot-note">
          Don't have an account?{" "}
          <Link to="/register" className="rp-link rp-link-strong">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;