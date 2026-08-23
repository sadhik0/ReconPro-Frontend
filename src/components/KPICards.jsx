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
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <p className="text-white/50">{title}</p>

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
        color="text-white"
      />

      <Card
        title="Match %"
        value={average + "%"}
        color="text-[#4ADE80]"
      />

      <Card
        title="Exact"
        value={exact}
        color="text-[#4ADE80]"
      />

      <Card
        title="Partial"
        value={partial}
        color="text-[#FBBF24]"
      />

      <Card
        title="No Match"
        value={noMatch}
        color="text-[#fe2e4b]"
      />

    </div>
  );
}

export default KPICards;