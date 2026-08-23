import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { deleteHistory } from "../services/historyService";

function HistoryTable({ history, setHistory }) {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const filtered = history.filter((item) =>
    item.filename.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this reconciliation?")) {
      return;
    }

    try {

      await deleteHistory(id);

      setHistory((prev) =>
        prev.filter((item) => item._id !== id)
      );

    } catch (err) {

      console.error("Delete Error:", err);

      alert("Failed to delete history.");

    }

  };

  return (

    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

      <div className="flex justify-between items-center mb-6">

        <input
          type="text"
          placeholder="Search reconciliation..."
          className="border border-white/10 bg-white/5 text-white placeholder-white/40 rounded-lg px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-[#fe2e4b]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={() => navigate("/upload")}
          className="bg-[#fe2e4b] hover:bg-[#e0233e] text-white px-5 py-2 rounded-lg transition"
        >
          + New Reconciliation
        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-white/5">

            <tr>

              <th className="p-3 text-center text-white/70">Filename</th>

              <th className="p-3 text-center text-white/70">Upload Date</th>

              <th className="p-3 text-center text-white/70">Transactions</th>

              <th className="p-3 text-center text-white/70">Matched</th>

              <th className="p-3 text-center text-white/70">Unmatched</th>

              <th className="p-3 text-center text-white/70">Time</th>

              <th className="p-3 text-center text-white/70">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filtered.length > 0 ? (

              filtered.map((item) => (

                <tr
                  key={item._id}
                  className="border-b border-white/10 hover:bg-white/5"
                >

                  <td className="p-4 text-center text-white">
                    {item.filename}
                  </td>

                  <td className="text-center text-white/70">
                    {new Date(item.uploadDate).toLocaleString()}
                  </td>

                  <td className="text-center text-white/70">
                    {item.totalTransactions}
                  </td>

                  <td className="text-center text-[#4ADE80] font-semibold">
                    {item.matched}
                  </td>

                  <td className="text-center text-[#fe2e4b] font-semibold">
                    {item.unmatched}
                  </td>

                  <td className="text-center text-white/70">
                    {item.processingTime}s
                  </td>

                  <td className="text-center">

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-[#fe2e4b]/20 hover:bg-[#fe2e4b]/30 text-[#fe2e4b] border border-[#fe2e4b]/40 px-4 py-1 rounded transition"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="7"
                  className="text-center py-10 text-white/50"
                >
                  No reconciliation history found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default HistoryTable;