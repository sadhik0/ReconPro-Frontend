import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white shadow-xl rounded-2xl w-[470px] p-8">

        <h1 className="text-4xl font-bold text-blue-600 text-center">

          ReconPro

        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">

          Forgot Password

        </p>

        {!otpSent && (

          <>

            <label>Email</label>

            <input
              type="email"
              className="border w-full rounded-lg p-3 mt-2 mb-6"
              placeholder="Enter Registered Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />

            <button
              onClick={sendOTP}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
            >
              Send OTP
            </button>

          </>

        )}

        {otpSent && (

          <>

            <label>OTP</label>

            <input
              type="text"
              className="border w-full rounded-lg p-3 mt-2 mb-5 text-center tracking-[8px]"
              placeholder="------"
              value={otp}
              onChange={(e)=>setOtp(e.target.value)}
            />

            <label>New Password</label>

            <input
              type="password"
              className="border w-full rounded-lg p-3 mt-2 mb-5"
              placeholder="New Password"
              value={newPassword}
              onChange={(e)=>setNewPassword(e.target.value)}
            />

            <label>Confirm Password</label>

            <input
              type="password"
              className="border w-full rounded-lg p-3 mt-2"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
            />

            <button
              onClick={resetPassword}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg mt-8"
            >
              Reset Password
            </button>

          </>

        )}

        <div className="text-center mt-8">

          <Link
            to="/"
            className="text-blue-600 font-semibold"
          >
            Back to Login
          </Link>

        </div>

      </div>

    </div>

  );

}

export default ForgotPassword;