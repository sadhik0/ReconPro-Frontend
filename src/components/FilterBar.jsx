function FilterBar({ filter, setFilter }) {
  return (
    <div className="mb-5">

      <label className="block text-sm font-semibold mb-2">
        Filter Results
      </label>

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-64 border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="All">
          All Records
        </option>

        <option value="Exact Match">
          Exact Match
        </option>

        <option value="Partial Match">
          Partial Match
        </option>

        <option value="No Match">
          No Match
        </option>

      </select>

    </div>
  );
}

export default FilterBar;