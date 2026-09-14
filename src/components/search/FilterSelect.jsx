import { ListFilter } from "lucide-react";

function FilterSelect({ value, onChange }) {
  return (
    <div className="flex items-center gap-2 px-3 pb-3">
      <ListFilter size={16} className="text-gray-400" />
      <select  value={value}  onChange={(e) => onChange(e.target.value)}  className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300" >
        <option value="all">All Notes</option>
        <option value="pinned">Pinned</option>
        <option value="recent">Recently Edited</option>
      </select>
    </div>
  );
}

export default FilterSelect;