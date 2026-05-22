export default function TooltipTailwind() {
  return (
    <div className="relative inline-block  m-20">
      {/* Elemen Utama */}
      <button className="px-4 py-2 bg-blue-600 text-white rounded"
      title="ini apas">Arahkan Kursor Ke Sini</button>

      {/* Kotak Tooltip */}
      <div
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 
                      hidden group-hover:block bg-gray-800 text-white 
                      text-sm rounded px-2 py-1 whitespace-nowrap shadow-md"
      >
        Ini adalah teks tooltip!
      </div>
    </div>
  );
}
