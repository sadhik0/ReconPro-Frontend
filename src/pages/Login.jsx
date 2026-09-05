import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import SplashCursor from "../components/SplashCursor";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login, loginAsGuest } = useAuth();

  const [email, setEmail] = useState(
    () => localStorage.getItem("rp-remember-email") || ""
  );
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [enableSplash, setEnableSplash] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(
    () => !!localStorage.getItem("rp-remember-email")
  );

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

      if (rememberMe) {
        localStorage.setItem("rp-remember-email", email);
      } else {
        localStorage.removeItem("rp-remember-email");
      }

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    navigate("/dashboard");
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

          <div className="rp-field rp-field-password">
            <label htmlFor="password">Password</label>
            <div className="rp-password-wrap">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="rp-eye-toggle"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="rp-row">
            <label className="rp-remember">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
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

        <button
          type="button"
          onClick={handleGuestLogin}
          className="rp-link"
          style={{
            display: "block",
            width: "100%",
            textAlign: "center",
            marginTop: "10px",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          Continue as Guest →
        </button>
      </div>
    </div>
  );
}

export default Login;