import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import HistoryTable from "../components/HistoryTable";

import { getHistory } from "../services/historyService";

function History() {

  const [history, setHistory] = useState([]);

  useEffect(() => {

    loadHistory();

  }, []);

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

          <h1 className="text-3xl font-bold">

            Reconciliation History

          </h1>

          <p className="text-white/60 mb-8">

            View previous reconciliations

          </p>

          <HistoryTable
          history={history}
          setHistory={setHistory} />

        </div>

      </div>

    </div>

  );

}

export default History;