import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const generatedOTP = "123456";

  const sendOTP = () => {
    if (!email) {
      alert("Enter Email");
      return;
    }
    alert("OTP Sent Successfully!\n\nDemo OTP : 123456");
    setOtpSent(true);
  };

  const resetPassword = () => {
    if (otp !== generatedOTP) {
      alert("Invalid OTP");
      return;
    }
    if (newPassword.length < 6) {
      alert("Password should contain at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Password Reset Successfully");
    navigate("/");
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

            <button className="rp-btn" onClick={sendOTP}>
              Send OTP
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

            <button className="rp-btn" onClick={resetPassword}>
              Reset password
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