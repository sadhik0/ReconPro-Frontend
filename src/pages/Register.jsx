import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import "./Login.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [robotChecked, setRobotChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!robotChecked) {
      alert("Please verify you are not a robot");
      return;
    }

    try {
      setLoading(true);

      await registerUser({ name, email, password });

      alert("Registration Successful");

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rp-login-screen">
      <div className="rp-card" style={{ width: 420 }}>
        <div className="rp-brand">
          ReconPro
        </div>
        <p className="rp-subtitle">Create your account.</p>

        <form onSubmit={handleRegister}>
          <div className="rp-field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="rp-field">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="rp-row" style={{ justifyContent: "flex-start" }}>
            <label className="rp-remember">
              <input
                type="checkbox"
                checked={robotChecked}
                onChange={(e) => setRobotChecked(e.target.checked)}
              />
              I'm not a robot
            </label>
          </div>

          <button type="submit" className="rp-btn" disabled={loading}>
            {loading ? "Creating account…" : "Register"}
          </button>
        </form>

        <p className="rp-foot-note">
          Already have an account?{" "}
          <Link to="/" className="rp-link rp-link-strong">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;