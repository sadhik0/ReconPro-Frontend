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
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
      >
        📗 Excel
      </button>

      <button
        onClick={exportCSV}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
      >
        📄 CSV
      </button>

      <button
        onClick={exportPDF}
        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
      >
        📕 PDF
      </button>

    </div>

  );

}

export default ExportButtons;