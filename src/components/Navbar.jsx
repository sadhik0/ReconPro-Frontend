import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {

    logout();

    navigate("/");

  };

  return (

    <div className="h-20 bg-white shadow flex items-center justify-between px-10">

      <h2 className="text-2xl font-bold">

        Dashboard

      </h2>

      <div className="flex items-center gap-6">

        <div className="font-semibold">

          👤 {user?.name}

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

    </div>

  );

}

export default Navbar;