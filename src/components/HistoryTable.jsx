import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { deleteHistory } from "../services/historyService";

function HistoryTable({ history }) {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const filtered = history.filter((item) =>
    item.filename.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this reconciliation?")) return;

    try {

      await deleteHistory(id);

      window.location.reload();

    } catch (err) {

      console.error(err);

    }

  };

  return (

    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between items-center mb-6">

        <input
          type="text"
          placeholder="Search reconciliation..."
          className="border rounded-lg px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={() => navigate("/upload")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + New Reconciliation
        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-center">Filename</th>

              <th className="p-3 text-center">Upload Date</th>

              <th className="p-3 text-center">Transactions</th>

              <th className="p-3 text-center">Matched</th>

              <th className="p-3 text-center">Unmatched</th>

              <th className="p-3 text-center">Time</th>

              <th className="p-3 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filtered.length > 0 ? (

              filtered.map((item) => (

                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4 text-center">
                  {item.filename}
                </td>

                <td className="text-center">
                  {new Date(item.uploadDate).toLocaleString()}
                </td>

                <td className="text-center">
                  {item.totalTransactions}
                </td>

                <td className="text-center text-green-600 font-semibold">
                  {item.matched}
                </td>

                <td className="text-center text-red-600 font-semibold">
                  {item.unmatched}
                </td>

                <td className="text-center">
                  {item.processingTime}s
                </td>
                  <td>

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() =>
                          handleDelete(item._id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="7"
                  className="text-center py-10 text-gray-500"
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