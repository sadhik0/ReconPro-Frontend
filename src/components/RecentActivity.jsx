import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getRecentActivity } from "../services/dashboardService";

function RecentActivity() {

  const navigate = useNavigate();

  const [history, setHistory] = useState([]);

  useEffect(() => {

    loadActivity();

  }, []);

  const loadActivity = async () => {

    try {

      const data = await getRecentActivity();

      setHistory(data);

    } catch (err) {

      console.error("Recent Activity Error:", err);

    }

  };

  return (

    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-xl font-bold">

          Recent Reconciliations

        </h2>

        <button
          onClick={() => navigate("/history")}
          className="text-blue-600 font-semibold hover:underline"
        >
          View All →
        </button>

      </div>

      {history.length > 0 ? (

        history.map((item) => (

          <div
            key={item._id}
            className="border rounded-lg p-4 mb-4 hover:bg-gray-50 transition"
          >

            <div className="flex justify-between items-center">

              <div>

                <h3 className="font-semibold text-lg">

                  {item.filename}

                </h3>

                <p className="text-gray-500">

                  {item.totalTransactions} Transactions

                </p>

              </div>

              <div className="text-right">

                <p className="font-bold text-green-600">

                  {item.matched} Matched

                </p>

                <p className="text-sm text-red-500">

                  {item.unmatched} Unmatched

                </p>

                <p className="text-xs text-gray-400 mt-1">

                  {new Date(item.uploadDate).toLocaleDateString()}

                </p>

              </div>

            </div>

          </div>

        ))

      ) : (

        <div className="text-center py-12 text-gray-500">

          No recent reconciliation history found.

        </div>

      )}

    </div>

  );

}

export default RecentActivity;