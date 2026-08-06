function UploadCard({ title, onFileSelect }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-xl font-semibold mb-4">
        {title}
      </h2>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={(e) => onFileSelect(e.target.files[0])}
        className="block w-full border rounded-lg p-3"
      />

    </div>
  );
}

export default UploadCard;