import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import KPICards from "../components/KPICards";
import ResultTable from "../components/ResultTable";
import { getHistory } from "../services/historyService";

function HistoryView() {

  const { id } = useParams();

  const history = getHistory();

  const record = history.find(
    (item) => item.id == id
  );

  if (!record)
    return <h1>Record Not Found</h1>;

  return (

    <div className="bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="ml-64">

        <Navbar />

        <div className="p-8">

          <h1 className="text-3xl font-bold mb-8">

            Previous Reconciliation

          </h1>

          <KPICards analysis={record.analysis} />

          <ResultTable
            analysis={record.analysis}
            selectedFields={[]}
          />

        </div>

      </div>

    </div>

  );

}

export default HistoryView;