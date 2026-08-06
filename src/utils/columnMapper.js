export function getColumns(data) {
  if (!data || data.length === 0) return [];
  return Object.keys(data[0]);
}