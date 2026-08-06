import { useState } from "react";

import UploadCard from "../components/UploadCard";
import ColumnMapper from "../components/ColumnMapper";
import KPICards from "../components/KPICards";
import ResultTable from "../components/ResultTable";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import ExportButtons from "../components/ExportButtons";

import { readExcel } from "../services/excelReader";
import { getColumns } from "../utils/columnMapper";
import { analyze } from "../services/analysisEngine";
import { saveHistory } from "../services/historyService";

function Upload() {
  // Uploaded data
  const [companyData, setCompanyData] = useState([]);
  const [bankData, setBankData] = useState([]);

  // Column names
  const [companyColumns, setCompanyColumns] = useState([]);
  const [bankColumns, setBankColumns] = useState([]);

  // User selected comparison fields
  const [selectedFields, setSelectedFields] = useState([]);

  // Analysis Result
  const [analysis, setAnalysis] = useState([]);

  // Search
  const [search, setSearch] = useState("");

  // Filter
  const [filter, setFilter] = useState("All");

  // -----------------------------
  // Upload Company Ledger
  // -----------------------------
  const handleCompanyFile = (file) => {
    readExcel(file, (data) => {
      setCompanyData(data);

      const cols = getColumns(data);
      setCompanyColumns(cols);

      console.log("Company Columns:", cols);
      console.log("Company Rows:", data.length);
    });
  };

  // -----------------------------
  // Upload GST / Bank
  // -----------------------------
  const handleBankFile = (file) => {
    readExcel(file, (data) => {
      setBankData(data);

      const cols = getColumns(data);
      setBankColumns(cols);

      console.log("GST Columns:", cols);
      console.log("GST Rows:", data.length);
    });
  };

  // -----------------------------
  // Analyze
  // -----------------------------
  const handleAnalyze = (fields) => {
    console.table(fields);

    setSelectedFields(fields);

    const result = analyze(
      companyData,
      bankData,
      fields
    );

    setAnalysis(result);
    saveHistory({
  id: Date.now(),

  file:
    "Reconciliation " +
    new Date().toLocaleString(),

  module: "GST Reconciliation",

  date: new Date().toLocaleDateString(),

  records: result.length,

  match:
    (
      result.reduce(
        (sum, item) => sum + item.score,
        0
      ) / result.length
    ).toFixed(1) + "%",

  status: "Completed",

  analysis: result,
});
  };

  // -----------------------------
  // Search + Filter
  // -----------------------------
  const filteredAnalysis = analysis.filter((row) => {

    // Status Filter
    if (filter !== "All" && row.status !== filter) {
      return false;
    }

    // Search
    if (search.trim() === "") return true;

    const keyword = search.toLowerCase();

    return selectedFields.some((field) => {

      const value = String(
        row.company[field.company] ?? ""
      ).toLowerCase();

      return value.includes(keyword);

    });

  });

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-8">
        ReconPro
      </h1>

      {/* Upload */}

      <div className="grid grid-cols-2 gap-6">

        <UploadCard
          title="Company Ledger"
          onFileSelect={handleCompanyFile}
        />

        <UploadCard
          title="GST / Bank Statement"
          onFileSelect={handleBankFile}
        />

      </div>

      {/* Mapper */}

      {companyColumns.length > 0 &&
        bankColumns.length > 0 && (

          <ColumnMapper
            companyColumns={companyColumns}
            bankColumns={bankColumns}
            onSave={handleAnalyze}
          />

      )}

      {/* KPI */}

      {analysis.length > 0 && (

        <KPICards analysis={filteredAnalysis} />

      )}

      {/* Professional Toolbar */}

{analysis.length > 0 && (

<div className="bg-white rounded-xl shadow-md px-6 py-4 mt-8 mb-6">

<div className="flex flex-wrap items-center justify-between gap-4">

{/* Left Side */}

<div className="flex flex-wrap items-center gap-4 flex-1">

<div className="w-80">

<SearchBar
search={search}
setSearch={setSearch}
/>

</div>

<div className="w-52">

<FilterBar
filter={filter}
setFilter={setFilter}
/>

</div>

</div>

{/* Right Side */}

<ExportButtons
analysis={filteredAnalysis}
selectedFields={selectedFields}
/>

</div>

</div>

)}

  
      {/* Result Table */}

      {analysis.length > 0 && (

        <ResultTable
          analysis={filteredAnalysis}
          selectedFields={selectedFields}
        />

      )}

    </div>
  );
}

export default Upload;