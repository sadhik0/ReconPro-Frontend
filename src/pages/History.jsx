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

    <div className="bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="ml-64">

        <Navbar />

        <div className="p-8">

          <h1 className="text-3xl font-bold">

            Reconciliation History

          </h1>

          <p className="text-gray-500 mb-8">

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