function DashboardCard({
  title,
  value,
  color,
  icon,
  change,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border hover:shadow-lg transition-all duration-300 p-6">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500 text-sm font-medium">
            {title}
          </p>

          <h2
            className={`text-4xl font-bold mt-3 ${color}`}
          >
            {value}
          </h2>

          {change && (
            <p className="text-green-600 text-sm mt-2 font-medium">
              ↑ {change}
            </p>
          )}

        </div>

        <div className="text-5xl opacity-80">
          {icon}
        </div>

      </div>

    </div>
  );
}

export default DashboardCard;