import * as XLSX from "xlsx";

export function readExcel(file, callback) {
  const reader = new FileReader();

  reader.onload = (e) => {
    const workbook = XLSX.read(e.target.result, { type: "binary" });

    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    // Read entire sheet as 2D array
    const rows = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
      defval: "",
    });

    // Detect header row
    let headerRow = 0;

    for (let i = 0; i < rows.length; i++) {
      const filled = rows[i].filter((cell) => cell !== "").length;

      if (filled >= 5) {
        headerRow = i;
        break;
      }
    }

    // Convert using detected header
    const json = XLSX.utils.sheet_to_json(sheet, {
      range: headerRow,
      defval: "",
    });

    callback(json);
  };

  reader.readAsBinaryString(file);
}