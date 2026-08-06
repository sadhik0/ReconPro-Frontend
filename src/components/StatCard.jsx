function StatCard({ title, value, color }) {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-6 border-l-8 ${color}`}
    >
      <h3 className="text-gray-500 text-lg">
        {title}
      </h3>

      <h1 className="text-4xl font-bold mt-4">
        {value}
      </h1>
    </div>
  );
}

export default StatCard;