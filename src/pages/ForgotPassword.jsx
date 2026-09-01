import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import {
  forgotPassword,
  resetPassword as resetPasswordAPI,
} from "../services/authService";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const generatedOTP = "123456";

  const sendOTP = async () => {
    if (!email) {
      alert("Enter Email");
      return;
    }

    try {
      setLoading(true);
      const data = await forgotPassword(email);
      alert(data.message || "OTP sent to your email");
      setOtpSent(true);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };
  const resetPassword = async () => {
    if (newPassword.length < 6) {
      alert("Password should contain at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const data = await resetPasswordAPI({ email, otp, newPassword });
      alert(data.message || "Password Reset Successfully");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rp-login-screen">
      <div className="rp-card">
        <div className="rp-brand">
          ReconPro
        </div>
        <p className="rp-subtitle">Forgot password.</p>

        {!otpSent && (
          <>
            <div className="rp-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button className="rp-btn" onClick={sendOTP} disabled={loading}>
              {loading ? "Sending…" : "Send OTP"}
            </button>
          </>
        )}

        {otpSent && (
          <>
            <div className="rp-field">
              <label htmlFor="otp">OTP</label>
              <input
                id="otp"
                type="text"
                style={{ textAlign: "center", letterSpacing: "8px" }}
                placeholder="------"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <div className="rp-field">
              <label htmlFor="newPassword">New password</label>
              <input
                id="newPassword"
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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

            <button className="rp-btn" onClick={resetPassword} disabled={loading}>
              {loading ? "Resetting…" : "Reset password"}
            </button>
          </>
        )}

        <p className="rp-foot-note">
          <Link to="/" className="rp-link">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;