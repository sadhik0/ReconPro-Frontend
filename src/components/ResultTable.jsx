function ResultTable({ analysis, selectedFields }) {
  if (!analysis.length) return null;

  return (
    <div className="mt-8 bg-white rounded-xl shadow p-6 overflow-auto">

      <h2 className="text-2xl font-bold mb-5">
        Reconciliation Result
      </h2>

      <table className="w-full border border-gray-300">

        <thead className="bg-gray-100">

          <tr>

            {selectedFields.map((field) => (
              <>
                <th
                  key={field.company + "-company"}
                  className="border p-3 bg-blue-50"
                >
                  Company
                  <br />
                  <span className="font-normal text-xs">
                    {field.company}
                  </span>
                </th>

                <th
                  key={field.company + "-bank"}
                  className="border p-3 bg-green-50"
                >
                  GST
                  <br />
                  <span className="font-normal text-xs">
                    {field.bank}
                  </span>
                </th>
              </>
            ))}

            <th className="border p-3">
              Match %
            </th>

            <th className="border p-3">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {analysis.map((row, index) => (

            <tr
              key={index}
              className="hover:bg-gray-50"
            >

              {selectedFields.map((field) => {

                const companyValue =
                  row.company?.[field.company];

                const bankValue =
                  row.bank?.[field.bank];

                const matched =
                  String(companyValue ?? "").trim().toLowerCase() ===
                  String(bankValue ?? "").trim().toLowerCase();

                return (
                  <>
                    <td
                      className={`border p-3 ${
                        matched
                          ? "bg-green-50"
                          : "bg-red-50"
                      }`}
                    >
                      {companyValue}
                    </td>

                    <td
                      className={`border p-3 ${
                        matched
                          ? "bg-green-50"
                          : "bg-red-50"
                      }`}
                    >
                      {bankValue}
                    </td>
                  </>
                );
              })}

              <td className="border p-3 font-bold text-center">
                {row.score}%
              </td>

              <td
                className={`border p-3 font-semibold text-center
                ${
                  row.status === "Exact Match"
                    ? "text-green-600"
                    : row.status === "Partial Match"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {row.status}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ResultTable;