import { NavLink } from "react-router-dom";

function Sidebar() {

  const menus = [

    {
      name: "Dashboard",
      icon: "📊",
      path: "/dashboard",
    },

    {
      name: "Reconciliation",
      icon: "📁",
      path: "/upload",
    },

    {
      name: "History",
      icon: "📜",
      path: "/history",
    },

    {
      name: "Reports",
      icon: "📈",
      path: "/reports",
    },

    {
      name: "Profile",
      icon: "👤",
      path: "/profile",
    },

    {
      name: "Settings",
      icon: "⚙",
      path: "/settings",
    },

  ];

  return (

    <div className="w-64 h-screen bg-slate-900 text-white fixed left-0 top-0 shadow-lg">

      <div className="text-3xl font-bold text-center py-8 border-b border-slate-700">

        ReconPro

      </div>

      <nav className="mt-6">

        {menus.map((menu) => (

          <NavLink
            key={menu.name}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-8 py-4 transition
              ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >

            <span className="text-xl">

              {menu.icon}

            </span>

            <span>

              {menu.name}

            </span>

          </NavLink>

        ))}

      </nav>

      <div className="absolute bottom-8 left-0 w-full px-6">

        <button
          className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold transition"
        >
          Logout
        </button>

      </div>

    </div>

  );

}

export default Sidebar;