export function analyze(companyData, bankData, selectedFields) {
  const results = [];
  const usedBankRows = new Set();

  companyData.forEach((companyRow) => {
    let bestMatch = null;
    let bestScore = 0;
    let bestIndex = -1;

    bankData.forEach((bankRow, index) => {
      if (usedBankRows.has(index)) return;

      let matched = 0;

      selectedFields.forEach((field) => {
        const companyValue = String(
          companyRow[field.company] ?? ""
        )
          .trim()
          .toLowerCase();

        const bankValue = String(
          bankRow[field.bank] ?? ""
        )
          .trim()
          .toLowerCase();

        if (
          companyValue !== "" &&
          companyValue === bankValue
        ) {
          matched++;
        }
      });

      const score = Math.round(
        (matched / selectedFields.length) * 100
      );

      if (score > bestScore) {
        bestScore = score;
        bestMatch = bankRow;
        bestIndex = index;
      }
    });

    if (bestIndex !== -1) {
      usedBankRows.add(bestIndex);
    }

    results.push({
      company: companyRow,
      bank: bestMatch,
      score: bestScore,
      status:
        bestScore === 100
          ? "Exact Match"
          : bestScore >= 50
          ? "Partial Match"
          : "No Match",
    });
  });

  return results;
}