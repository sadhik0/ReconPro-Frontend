import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function ExportButtons({ analysis, selectedFields }) {

  if (!analysis.length) return null;

  // ----------------------------
  // Prepare Export Data
  // ----------------------------

  const exportData = analysis.map((row) => {

    const obj = {};

    selectedFields.forEach((field) => {
      obj[field.company] = row.company[field.company];
    });

    obj["Match %"] = row.score;
    obj["Status"] = row.status;

    return obj;

  });

  // ----------------------------
  // Excel Export
  // ----------------------------

  const exportExcel = () => {

    const worksheet =
      XLSX.utils.json_to_sheet(exportData);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "ReconPro"
    );

    const excelBuffer =
      XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

    const blob = new Blob(
      [excelBuffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      }
    );

    saveAs(blob, "ReconPro_Result.xlsx");

  };

  // ----------------------------
  // CSV Export
  // ----------------------------

  const exportCSV = () => {

    const worksheet =
      XLSX.utils.json_to_sheet(exportData);

    const csv =
      XLSX.utils.sheet_to_csv(worksheet);

    const blob = new Blob(
      [csv],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    saveAs(blob, "ReconPro_Result.csv");

  };

  // ----------------------------
  // PDF Export
  // ----------------------------

  const exportPDF = () => {

    const doc = new jsPDF();

    const head = [[
      ...selectedFields.map(
        (f) => f.company
      ),
      "Match %",
      "Status",
    ]];

    const body = analysis.map((row) => [

      ...selectedFields.map(
        (f) =>
          row.company[f.company]
      ),

      row.score + "%",

      row.status,

    ]);

    doc.setFontSize(18);

    doc.text(
      "ReconPro Reconciliation Report",
      14,
      20
    );

    autoTable(doc, {

      head,

      body,

      startY: 30,

    });

    doc.save(
      "ReconPro_Report.pdf"
    );

  };

  return (

    <div className="flex gap-3">

      <button
        onClick={exportExcel}
        className="flex items-center gap-2 bg-[#4ADE80]/20 hover:bg-[#4ADE80]/30 text-[#4ADE80] border border-[#4ADE80]/40 px-5 py-2 rounded-lg transition"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="3" y1="15" x2="21" y2="15" />
          <line x1="9" y1="3" x2="9" y2="21" />
          <line x1="15" y1="3" x2="15" y2="21" />
        </svg>
        Excel
      </button>

      <button
        onClick={exportCSV}
        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2 rounded-lg transition"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
        CSV
      </button>

      <button
        onClick={exportPDF}
        className="flex items-center gap-2 bg-[#fe2e4b] hover:bg-[#e0233e] text-white px-5 py-2 rounded-lg transition"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        PDF
      </button>

    </div>

  );

}

export default ExportButtons;