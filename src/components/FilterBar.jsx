function FilterBar({ filter, setFilter }) {
  return (
    <div className="mb-5">

      <label className="block text-sm font-semibold mb-2 text-white/70">
        Filter Results
      </label>

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-64 border border-white/10 bg-white/5 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#fe2e4b]"
      >
        <option value="All" className="bg-[#161316] text-white">
          All Records
        </option>

        <option value="Exact Match" className="bg-[#161316] text-white">
          Exact Match
        </option>

        <option value="Partial Match" className="bg-[#161316] text-white">
          Partial Match
        </option>

        <option value="No Match" className="bg-[#161316] text-white">
          No Match
        </option>

      </select>

    </div>
  );
}

export default FilterBar;