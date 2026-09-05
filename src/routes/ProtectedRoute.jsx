import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {

  const { user, isGuest } = useAuth();

  const token = localStorage.getItem("token");

  if (!user || (!token && !isGuest)) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute