import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

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

      await registerUser({
        name,
        email,
        password,
      });

      alert("Registration Successful");

      navigate("/");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white shadow-xl rounded-2xl w-[470px] p-8">

        <h1 className="text-4xl font-bold text-blue-600 text-center">
          ReconPro
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Create Your Account
        </p>

        <form onSubmit={handleRegister}>

          <label>Name</label>

          <input
            type="text"
            className="border w-full rounded-lg p-3 mt-2 mb-5"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>

          <input
            type="email"
            className="border w-full rounded-lg p-3 mt-2 mb-5"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            className="border w-full rounded-lg p-3 mt-2 mb-5"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Confirm Password</label>

          <input
            type="password"
            className="border w-full rounded-lg p-3 mt-2"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="mt-6 flex items-center">

            <input
              type="checkbox"
              checked={robotChecked}
              onChange={(e) => setRobotChecked(e.target.checked)}
            />

            <span className="ml-3">
              I'm not a robot
            </span>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 mt-8 disabled:bg-gray-400"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        <div className="text-center mt-8">

          Already have an account?

          <Link
            to="/"
            className="text-blue-600 font-semibold ml-2"
          >
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Register;