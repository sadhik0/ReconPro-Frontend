function SearchBar({ search, setSearch }) {
  return (
    <div className="mt-8 mb-5">
      <input
        type="text"
        placeholder="🔍 Search Invoice, Vendor, GST, Amount..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default SearchBar;