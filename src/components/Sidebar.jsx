import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useGuestData } from "../context/GuestDataContext";

function Sidebar()
{
const navigate = useNavigate();
const { logout } = useAuth();
const { clearGuestData } = useGuestData();

const handleLogout = () => {
  logout();
  clearGuestData();
  navigate("/");
};

  const menus = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },

    {
      name: "Upload",
      path: "/upload",
      icon: (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      ),
    },

    {
      name: "History",
      path: "/history",
      icon: (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },

  ];

  return (

    <div className="w-64 h-screen bg-[#0f0e0e] text-white fixed left-0 top-0 border-r border-white/10 z-10">

      {/* Logo */}
      <div className="py-8 border-b border-white/10">

        <h1 className="text-3xl font-bold text-center tracking-wide">
          ReconPro
        </h1>

        <p className="text-xs text-white/40 text-center mt-2">
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
                  ? "bg-[#fe2e4b] shadow-[0_8px_20px_-6px_rgba(254,46,75,0.55)]"
                  : "hover:bg-white/5"
              }`
            }
          >

            <span className="flex items-center">
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
          className="w-full flex items-center justify-center gap-2 bg-[#fe2e4b] hover:bg-[#e0233e] py-3 rounded-lg font-semibold transition"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </button>

      </div>

    </div>

  );

}

export default Sidebar;