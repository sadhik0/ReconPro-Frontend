import { useAuth } from "../context/AuthContext";

function Navbar() {

  const { user } = useAuth();

  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (

    <div className="h-20 bg-white shadow-sm flex items-center justify-between px-10 border-b">

      <div>

        <h2 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          {today}
        </p>

      </div>

      <div className="text-right">

        <p className="text-sm text-slate-500">
          Welcome
        </p>

        <h3 className="font-semibold text-slate-800">
          👋 {user?.name}
        </h3>

      </div>

    </div>

  );

}

export default Navbar;