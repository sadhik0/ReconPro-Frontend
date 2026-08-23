function DashboardCard({
  title,
  value,
  color,
  icon,
  change,
}) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 p-6">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-white/50 text-sm font-medium">
            {title}
          </p>

          <h2
            className={`text-4xl font-bold mt-3 ${color}`}
          >
            {value}
          </h2>

          {change && (
            <p className={`text-sm mt-2 font-medium ${color} opacity-70`}>
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