function getStatus(score) {
  if (score === 100) return "Exact Match";
  if (score >= 50) return "Partial Match";
  return "No Match";
}

export function analyze(companyData, bankData, selectedFields) {
  if (!selectedFields.length) {
    return [];
  }

  const results = [];
  const usedBankRows = new Set();

  // Match every company row against the best available bank row.
  companyData.forEach((companyRow, companyIndex) => {
    let bestMatch = null;
    let bestScore = 0;
    let bestBankIndex = -1;

    bankData.forEach((bankRow, bankIndex) => {
      if (usedBankRows.has(bankIndex)) {
        return;
      }

      let matchedFields = 0;

      selectedFields.forEach((field) => {
        const companyValue = String(
          companyRow[field.company] ?? ""
        ).trim().toLowerCase();

        const bankValue = String(
          bankRow[field.bank] ?? ""
        ).trim().toLowerCase();

        if (
          companyValue !== "" &&
          bankValue !== "" &&
          companyValue === bankValue
        ) {
          matchedFields += 1;
        }
      });

      const score = Math.round(
        (matchedFields / selectedFields.length) * 100
      );

      if (score > bestScore) {
        bestScore = score;
        bestMatch = bankRow;
        bestBankIndex = bankIndex;
      }
    });

    if (bestBankIndex !== -1) {
      usedBankRows.add(bestBankIndex);
    }

    results.push({
      id: `company-${companyIndex}`,
      source: "company",
      company: companyRow,
      bank: bestMatch,
      score: bestScore,
      status: bestMatch
        ? getStatus(bestScore)
        : "Company-only",
    });
  });

  // Add every bank row that was not matched.
  bankData.forEach((bankRow, bankIndex) => {
    if (!usedBankRows.has(bankIndex)) {
      results.push({
        id: `bank-${bankIndex}`,
        source: "bank",
        company: null,
        bank: bankRow,
        score: 0,
        status: "Bank-only",
      });
    }
  });

  return results;
}
