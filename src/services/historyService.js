export function saveHistory(record) {
  const history =
    JSON.parse(localStorage.getItem("recon_history")) || [];

  history.unshift(record);

  localStorage.setItem(
    "recon_history",
    JSON.stringify(history)
  );
}

export function getHistory() {
  return (
    JSON.parse(localStorage.getItem("recon_history")) || []
  );
}

export function deleteHistory(id) {
  const history =
    JSON.parse(localStorage.getItem("recon_history")) || [];

  const updated = history.filter((item) => item.id !== id);

  localStorage.setItem(
    "recon_history",
    JSON.stringify(updated)
  );
}