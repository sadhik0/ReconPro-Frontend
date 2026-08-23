function SearchBar({ search, setSearch }) {
  return (
    <div className="mt-8 mb-5">
      <input
        type="text"
        placeholder="🔍 Search Invoice, Vendor, GST, Amount..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-white/10 bg-white/5 text-white placeholder-white/40 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#fe2e4b]"
      />
    </div>
  );
}

export default SearchBar;