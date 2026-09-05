import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import HistoryTable from "../components/HistoryTable";

import { getHistory } from "../services/historyService";
import { useAuth } from "../context/AuthContext";
import { useGuestData } from "../context/GuestDataContext";

function History() {

  const { isGuest } = useAuth();
  const { guestHistory, removeGuestRecord } = useGuestData();

  const [history, setHistory] = useState([]);

  useEffect(() => {

    if (isGuest) {
      setHistory(guestHistory);
    } else {
      loadHistory();
    }

  }, [isGuest, guestHistory]);

  const loadHistory = async () => {

    try {

      const data = await getHistory();

      setHistory(data);

    } catch (err) {

      console.error(err);

    }

  };

  return (

    <div className="min-h-screen bg-[linear-gradient(135deg,#0f0e0e_0%,#4a0d14_45%,#0f0e0e_100%)] text-white">

      <Sidebar />

      <div className="ml-64">

        <Navbar />

        <div className="p-8">

          {isGuest && (
            <div className="bg-[#fe2e4b]/10 border border-[#fe2e4b]/30 text-[#fe2e4b] text-sm rounded-xl px-4 py-3 mb-6">
              You're browsing as a Guest — nothing is saved. Data disappears on refresh or logout.{" "}
              <Link to="/register" className="underline font-semibold">Create an account</Link> to keep it.
            </div>
          )}

          <h1 className="text-3xl font-bold">

            Reconciliation History

          </h1>

          <p className="text-white/60 mb-8">

            View previous reconciliations

          </p>

          <HistoryTable
          history={history}
          setHistory={setHistory}
          isGuest={isGuest}
          removeGuestRecord={removeGuestRecord} />

        </div>

      </div>

    </div>

  );

}

export default History;