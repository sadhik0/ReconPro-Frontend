import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() 
{
const navigate = useNavigate();
const { logout } = useAuth();

const handleLogout = () => {
  logout();
  navigate("/");
};

  const menus = [

    {
      name: "Dashboard",
      icon: "📊",
      path: "/dashboard",
    },

    {
      name: "Upload",
      icon: "📤",
      path: "/upload",
    },

    {
      name: "History",
      icon: "📜",
      path: "/history",
    },

  ];

  return (

    <div className="w-64 h-screen bg-slate-900 text-white fixed left-0 top-0 shadow-xl">

      {/* Logo */}
      <div className="py-8 border-b border-slate-700">

        <h1 className="text-3xl font-bold text-center tracking-wide">
          ReconPro
        </h1>

        <p className="text-xs text-slate-400 text-center mt-2">
          Financial Reconciliation System
        </p>

      </div>

      {/* Navigation */}
      <nav className="mt-8">

        {menus.map((menu) => (

          <NavLink
            key={menu.name}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-4 mx-4 px-5 py-3 rounded-lg transition-all duration-200
              ${
                isActive
                  ? "bg-blue-600 shadow-md"
                  : "hover:bg-slate-800"
              }`
            }
          >

            <span className="text-xl">
              {menu.icon}
            </span>

            <span className="font-medium">
              {menu.name}
            </span>

          </NavLink>

        ))}

      </nav>

      {/* Logout */}
      <div className="absolute bottom-8 left-0 w-full px-4">

        <button
  onClick={handleLogout}
  className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold transition"
>
  🚪 Logout
</button>

      </div>

    </div>

  );

}

export default Sidebar;