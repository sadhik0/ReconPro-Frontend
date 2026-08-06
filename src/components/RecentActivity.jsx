import { useNavigate } from "react-router-dom";

function RecentActivity() {

  const navigate = useNavigate();

  const history = [
    {
      file: "GST July",
      records: 1248,
      match: "98%",
      date: "04 Aug",
    },
    {
      file: "Bank August",
      records: 2215,
      match: "95%",
      date: "03 Aug",
    },
    {
      file: "Vendor Ledger",
      records: 918,
      match: "91%",
      date: "01 Aug",
    },
  ];

  return (

    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-xl font-bold">

          Recent Reconciliations

        </h2>

        <button
          onClick={() => navigate("/history")}
          className="text-blue-600 font-semibold"
        >
          View All →
        </button>

      </div>

      {history.map((item, index) => (

        <div
          key={index}
          className="border rounded-lg p-4 mb-4 hover:bg-gray-50 transition"
        >

          <div className="flex justify-between">

            <div>

              <h3 className="font-semibold text-lg">

                {item.file}

              </h3>

              <p className="text-gray-500">

                {item.records} Records

              </p>

            </div>

            <div className="text-right">

              <p className="font-bold text-green-600">

                {item.match}

              </p>

              <p className="text-gray-500">

                {item.date}

              </p>

            </div>

          </div>

        </div>

      ))}

    </div>

  );

}

export default RecentActivity;