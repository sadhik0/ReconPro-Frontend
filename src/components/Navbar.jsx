import { useAuth } from "../context/AuthContext";

function Navbar() {

  const { user } = useAuth();

  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (

    <div className="h-20 bg-white/5 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-10">

      <div>

        <h2 className="text-2xl font-bold text-white">
          Dashboard
        </h2>

        <p className="text-sm text-white/50 mt-1">
          {today}
        </p>

      </div>

      <div className="text-right">

        <p className="text-sm text-white/50">
          Welcome
        </p>

        <h3 className="font-semibold text-white">
          👋 {user?.name}
        </h3>

      </div>

    </div>

  );

}

export default Navbar;