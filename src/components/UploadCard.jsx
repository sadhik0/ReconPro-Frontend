function UploadCard({ title, onFileSelect }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

      <h2 className="text-xl font-semibold mb-4 text-white">
        {title}
      </h2>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={(e) => onFileSelect(e.target.files[0])}
        className="block w-full border border-white/10 rounded-lg p-3 text-white/70 bg-white/5 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#fe2e4b] file:text-white file:font-medium file:cursor-pointer hover:file:bg-[#e0233e] cursor-pointer"
      />

    </div>
  );
}

export default UploadCard;