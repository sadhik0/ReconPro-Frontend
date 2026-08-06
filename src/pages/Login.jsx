import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  console.log("LOGIN FUNCTION:", login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter Email and Password");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser({
  email,
  password,
});

console.log("API Response:", data);

console.log("Before login()");

login(data);

console.log("After login()");

console.log(
  "Token after login:",
  localStorage.getItem("token")
);

console.log(
  "User after login:",
  localStorage.getItem("user")
);

navigate("/dashboard");

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white rounded-2xl shadow-xl w-[420px] p-8">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-blue-600">
            ReconPro
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to continue
          </p>

        </div>

        <form onSubmit={handleLogin}>

          <label className="font-medium">
            Email
          </label>

          <input
            type="email"
            className="w-full border rounded-lg p-3 mt-2 mb-5"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="font-medium">
            Password
          </label>

          <input
            type="password"
            className="w-full border rounded-lg p-3 mt-2"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex justify-between items-center mt-5">

            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" />
              Remember Me
            </label>

            <Link
              to="/forgot-password"
              className="text-blue-600 text-sm hover:underline"
            >
              Forgot Password?
            </Link>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 mt-6 font-semibold disabled:bg-gray-400"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        <div className="text-center mt-8">

          <span className="text-gray-500">
            Don't have an account?
          </span>

          <Link
            to="/register"
            className="text-blue-600 font-semibold ml-2 hover:underline"
          >
            Register
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;