function ResultTable({ analysis, selectedFields }) {
  if (!analysis.length) return null;

  return (
    <div className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-auto">

      <h2 className="text-2xl font-bold mb-5 text-white">
        Reconciliation Result
      </h2>

      <table className="w-full border border-white/10">

        <thead className="bg-white/5">

          <tr>

            {selectedFields.map((field) => (
              <>
                <th
                  key={field.company + "-company"}
                  className="border border-white/10 p-3 bg-white/5 text-white"
                >
                  Company
                  <br />
                  <span className="font-normal text-xs text-white/50">
                    {field.company}
                  </span>
                </th>

                <th
                  key={field.company + "-bank"}
                  className="border border-white/10 p-3 bg-white/10 text-white"
                >
                  GST
                  <br />
                  <span className="font-normal text-xs text-white/50">
                    {field.bank}
                  </span>
                </th>
              </>
            ))}

            <th className="border border-white/10 p-3 text-white">
              Match %
            </th>

            <th className="border border-white/10 p-3 text-white">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {analysis.map((row, index) => (

            <tr
              key={index}
              className="hover:bg-white/5"
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
                      className={`border border-white/10 p-3 text-white/80 ${
                        matched
                          ? "bg-[#4ADE80]/10"
                          : "bg-[#fe2e4b]/10"
                      }`}
                    >
                      {companyValue}
                    </td>

                    <td
                      className={`border border-white/10 p-3 text-white/80 ${
                        matched
                          ? "bg-[#4ADE80]/10"
                          : "bg-[#fe2e4b]/10"
                      }`}
                    >
                      {bankValue}
                    </td>
                  </>
                );
              })}

              <td className="border border-white/10 p-3 font-bold text-center text-white">
                {row.score}%
              </td>

              <td
                className={`border border-white/10 p-3 font-semibold text-center
                ${
                  row.status === "Exact Match"
                    ? "text-[#4ADE80]"
                    : row.status === "Partial Match"
                    ? "text-[#FBBF24]"
                    : "text-[#fe2e4b]"
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