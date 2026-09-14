import { Search, X } from "lucide-react";

function SearchBar({ value, onChange }) {
  return (
    <div className="relative px-3 py-3">
      <Search  size={17}  className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />

      <input  type="text"  value={value} onChange={(e) => onChange(e.target.value)} placeholder="Search notes..." className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-9 text-sm text-gray-900 outline-none focus:border-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-white"   />
      {value && (
        <button  type="button"  onClick={() => onChange("")}  className="absolute right-5 top-1/2 -translate-y-1/2 rounded p-1 text-gray-400 hover:text-gray-700 dark:hover:text-white"  title="Clear search" >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;