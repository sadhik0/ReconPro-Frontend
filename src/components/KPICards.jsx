function KPICards({ analysis }) {
  if (!analysis.length) return null;

  const total = analysis.length;

  const exact = analysis.filter(
    (r) => r.status === "Exact Match"
  ).length;

  const partial = analysis.filter(
    (r) => r.status === "Partial Match"
  ).length;

  const noMatch = analysis.filter(
    (r) => r.status === "No Match"
  ).length;

  const average = (
    analysis.reduce((sum, r) => sum + r.score, 0) /
    total
  ).toFixed(1);

  const Card = ({ title, value, color }) => (
    <div className="bg-white rounded-xl shadow p-6">
      <p className="text-gray-500">{title}</p>

      <h2 className={`text-3xl font-bold mt-2 ${color}`}>
        {value}
      </h2>
    </div>
  );

  return (
    <div className="grid grid-cols-5 gap-5 mt-8">

      <Card
        title="Records"
        value={total}
        color="text-blue-600"
      />

      <Card
        title="Match %"
        value={average + "%"}
        color="text-green-600"
      />

      <Card
        title="Exact"
        value={exact}
        color="text-green-600"
      />

      <Card
        title="Partial"
        value={partial}
        color="text-yellow-500"
      />

      <Card
        title="No Match"
        value={noMatch}
        color="text-red-600"
      />

    </div>
  );
}

export default KPICards;