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

  const [companyData, setCompanyData] = useState([]);
  const [bankData, setBankData] = useState([]);

  const [companyColumns, setCompanyColumns] = useState([]);
  const [bankColumns, setBankColumns] = useState([]);

  const [selectedFields, setSelectedFields] = useState([]);

  const [analysis, setAnalysis] = useState([]);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  // -----------------------------
  // Upload Company Ledger
  // -----------------------------
  const handleCompanyFile = (file) => {

    readExcel(file, (data) => {

      setCompanyData(data);

      setCompanyColumns(getColumns(data));

    });

  };

  // -----------------------------
  // Upload Bank Statement
  // -----------------------------
  const handleBankFile = (file) => {

    readExcel(file, (data) => {

      setBankData(data);

      setBankColumns(getColumns(data));

    });

  };

  // -----------------------------
  // Analyze
  // -----------------------------
  const handleAnalyze = async (fields) => {

    setSelectedFields(fields);

    const result = analyze(
      companyData,
      bankData,
      fields
    );

    setAnalysis(result);

    try {

      await saveHistory({

        filename:
          "Reconciliation " +
          new Date().toLocaleString(),

        totalTransactions: result.length,

        matched: result.filter(
          item => item.status === "Matched"
        ).length,

        unmatched: result.filter(
          item => item.status !== "Matched"
        ).length,

        processingTime: 0,

      });

    } catch (err) {

      console.error("History Save Error", err);

    }

  };

  // -----------------------------
  // Search + Filter
  // -----------------------------
  const filteredAnalysis = analysis.filter((row) => {

    if (
      filter !== "All" &&
      row.status !== filter
    ) {
      return false;
    }

    if (search.trim() === "") {
      return true;
    }

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

      {companyColumns.length > 0 &&
        bankColumns.length > 0 && (

        <ColumnMapper
          companyColumns={companyColumns}
          bankColumns={bankColumns}
          onSave={handleAnalyze}
        />

      )}

      {analysis.length > 0 && (

        <KPICards analysis={filteredAnalysis} />

      )}

      {analysis.length > 0 && (

        <div className="bg-white rounded-xl shadow-md px-6 py-4 mt-8 mb-6">

          <div className="flex flex-wrap items-center justify-between gap-4">

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

            <ExportButtons
              analysis={filteredAnalysis}
              selectedFields={selectedFields}
            />

          </div>

        </div>

      )}

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