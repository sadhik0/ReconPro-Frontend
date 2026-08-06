import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HistoryTable({ history }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = history.filter((item) =>
    item.file.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm("Delete this reconciliation?")) {
      // Temporary delete logic
      alert(`Record ${id} deleted`);

      // We'll replace this with MongoDB API later
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

              <th className="p-3 text-left">File</th>

              <th className="p-3 text-left">Module</th>

              <th className="p-3 text-left">Date</th>

              <th className="p-3 text-left">Records</th>

              <th className="p-3 text-left">Match %</th>

              <th className="p-3 text-left">Status</th>

              <th className="p-3 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filtered.length > 0 ? (

              filtered.map((item) => (

                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4">{item.file}</td>

                  <td>{item.module}</td>

                  <td>{item.date}</td>

                  <td>{item.records}</td>

                  <td className="font-bold text-green-600">
                    {item.match}
                  </td>

                  <td>

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                      {item.status}

                    </span>

                  </td>

                  <td>

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => navigate(`/history/${item.id}`)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
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