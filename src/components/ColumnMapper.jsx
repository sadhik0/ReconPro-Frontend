import { useState } from "react";

function ColumnMapper({
  companyColumns,
  bankColumns,
  onSave,
}) {
  const [pairs, setPairs] = useState([
    {
      company: "",
      bank: "",
    },
  ]);

  const updatePair = (index, field, value) => {
    const updated = [...pairs];
    updated[index][field] = value;
    setPairs(updated);
  };

  const addPair = () => {
    setPairs([
      ...pairs,
      {
        company: "",
        bank: "",
      },
    ]);
  };

  const removePair = (index) => {
    const updated = pairs.filter((_, i) => i !== index);

    if (updated.length === 0) {
      updated.push({
        company: "",
        bank: "",
      });
    }

    setPairs(updated);
  };

  const handleAnalyze = () => {
    const validPairs = pairs.filter(
      (pair) =>
        pair.company !== "" &&
        pair.bank !== ""
    );

    if (validPairs.length === 0) {
      alert("Select at least one mapping.");
      return;
    }

    onSave(validPairs);
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6 text-white">
        Select Comparison Fields
      </h2>

      <p className="text-white/60 mb-6">
        Choose only the fields required for reconciliation.
      </p>

      {pairs.map((pair, index) => (

        <div
          key={index}
          className="grid grid-cols-12 gap-4 items-center mb-4"
        >

          <div className="col-span-5">

            <label className="text-sm font-semibold text-white/70">
              Company Column
            </label>

            <select
              className="w-full border border-white/10 rounded-lg p-2 mt-1 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#fe2e4b]"
              value={pair.company}
              onChange={(e) =>
                updatePair(
                  index,
                  "company",
                  e.target.value
                )
              }
            >
              <option value="" className="bg-[#161316] text-white">
                Select Company Column
              </option>

              {companyColumns.map((column) => (
                <option
                  key={column}
                  value={column}
                  className="bg-[#161316] text-white"
                >
                  {column}
                </option>
              ))}

            </select>

          </div>

          <div className="col-span-5">

            <label className="text-sm font-semibold text-white/70">
              GST Column
            </label>

            <select
              className="w-full border border-white/10 rounded-lg p-2 mt-1 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#fe2e4b]"
              value={pair.bank}
              onChange={(e) =>
                updatePair(
                  index,
                  "bank",
                  e.target.value
                )
              }
            >
              <option value="" className="bg-[#161316] text-white">
                Select GST Column
              </option>

              {bankColumns.map((column) => (
                <option
                  key={column}
                  value={column}
                  className="bg-[#161316] text-white"
                >
                  {column}
                </option>
              ))}

            </select>

          </div>

          <div className="col-span-2 pt-6">

            <button
              className="bg-[#fe2e4b]/20 text-[#fe2e4b] border border-[#fe2e4b]/40 hover:bg-[#fe2e4b]/30 px-4 py-2 rounded-lg w-full transition"
              onClick={() => removePair(index)}
            >
              Remove
            </button>

          </div>

        </div>

      ))}

      <div className="flex gap-4 mt-6">

        <button
          className="bg-[#4ADE80]/20 text-[#4ADE80] border border-[#4ADE80]/40 hover:bg-[#4ADE80]/30 px-6 py-3 rounded-lg transition"
          onClick={addPair}
        >
          + Add Field
        </button>

        <button
          className="bg-[#fe2e4b] hover:bg-[#e0233e] text-white px-6 py-3 rounded-lg transition"
          onClick={handleAnalyze}
        >
          Analyze
        </button>

      </div>

    </div>
  );
}

export default ColumnMapper;