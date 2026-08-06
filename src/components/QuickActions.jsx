import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "New Reconciliation",
      icon: "📁",
      description: "Upload and compare new files",
      color: "bg-blue-600",
      action: () => navigate("/upload"),
    },
    {
      title: "History",
      icon: "📜",
      description: "View previous reconciliations",
      color: "bg-green-600",
      action: () => navigate("/history"),
    },
    {
      title: "Reports",
      icon: "📊",
      description: "Generate reconciliation reports",
      color: "bg-purple-600",
      action: () => navigate("/reports"),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-3 gap-6">

        {actions.map((item) => (

          <div
            key={item.title}
            onClick={item.action}
            className="cursor-pointer rounded-xl border hover:shadow-lg transition duration-300 p-6"
          >

            <div
              className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center text-3xl text-white`}
            >
              {item.icon}
            </div>

            <h3 className="text-xl font-semibold mt-5">
              {item.title}
            </h3>

            <p className="text-gray-500 mt-2">
              {item.description}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default QuickActions;