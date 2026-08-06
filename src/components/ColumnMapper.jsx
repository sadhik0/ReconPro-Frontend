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
    <div className="bg-white shadow rounded-xl p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Select Comparison Fields
      </h2>

      <p className="text-gray-500 mb-6">
        Choose only the fields required for reconciliation.
      </p>

      {pairs.map((pair, index) => (

        <div
          key={index}
          className="grid grid-cols-12 gap-4 items-center mb-4"
        >

          <div className="col-span-5">

            <label className="text-sm font-semibold">
              Company Column
            </label>

            <select
              className="w-full border rounded-lg p-2 mt-1"
              value={pair.company}
              onChange={(e) =>
                updatePair(
                  index,
                  "company",
                  e.target.value
                )
              }
            >
              <option value="">
                Select Company Column
              </option>

              {companyColumns.map((column) => (
                <option
                  key={column}
                  value={column}
                >
                  {column}
                </option>
              ))}

            </select>

          </div>

          <div className="col-span-5">

            <label className="text-sm font-semibold">
              GST Column
            </label>

            <select
              className="w-full border rounded-lg p-2 mt-1"
              value={pair.bank}
              onChange={(e) =>
                updatePair(
                  index,
                  "bank",
                  e.target.value
                )
              }
            >
              <option value="">
                Select GST Column
              </option>

              {bankColumns.map((column) => (
                <option
                  key={column}
                  value={column}
                >
                  {column}
                </option>
              ))}

            </select>

          </div>

          <div className="col-span-2 pt-6">

            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg w-full"
              onClick={() => removePair(index)}
            >
              Remove
            </button>

          </div>

        </div>

      ))}

      <div className="flex gap-4 mt-6">

        <button
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
          onClick={addPair}
        >
          + Add Field
        </button>

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          onClick={handleAnalyze}
        >
          Analyze
        </button>

      </div>

    </div>
  );
}

export default ColumnMapper;