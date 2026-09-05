import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getRecentActivity } from "../services/dashboardService";
import { useAuth } from "../context/AuthContext";
import { useGuestData } from "../context/GuestDataContext";

function RecentActivity() {

  const navigate = useNavigate();

  const { isGuest } = useAuth();
  const { guestHistory } = useGuestData();

  const [history, setHistory] = useState([]);

  useEffect(() => {

    if (isGuest) {
      setHistory(guestHistory);
    } else {
      loadActivity();
    }

  }, [isGuest, guestHistory]);

  const loadActivity = async () => {

    try {

      const data = await getRecentActivity();

      setHistory(data);

    } catch (err) {

      console.error("Recent Activity Error:", err);

    }

  };

  return (

    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-xl font-bold text-white">

          Recent Reconciliations

        </h2>

        <button
          onClick={() => navigate("/history")}
          className="text-[#fe2e4b] font-semibold hover:underline"
        >
          View All →
        </button>

      </div>

      {history.length > 0 ? (

        history.map((item) => (

          <div
            key={item._id}
            className="border border-white/10 rounded-lg p-4 mb-4 hover:bg-white/5 transition"
          >

            <div className="flex justify-between items-center">

              <div>

                <h3 className="font-semibold text-lg text-white">

                  {item.filename}

                </h3>

                <p className="text-white/50">

                  {item.totalTransactions} Transactions

                </p>

              </div>

              <div className="text-right">

                <p className="font-bold text-[#4ADE80]">

                  {item.matched} Matched

                </p>

                <p className="text-sm text-[#fe2e4b]">

                  {item.unmatched} Unmatched

                </p>

                <p className="text-xs text-white/40 mt-1">

                  {new Date(item.uploadDate).toLocaleDateString()}

                </p>

              </div>

            </div>

          </div>

        ))

      ) : (

        <div className="text-center py-12 text-white/50">

          No recent reconciliation history found.

        </div>

      )}

    </div>

  );

}

export default RecentActivity;