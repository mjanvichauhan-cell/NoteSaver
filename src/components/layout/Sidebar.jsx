import { FileText, Settings, CalendarDays, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NoteList from "../Notes/NoteList";
import SearchBar from "../search/SearchBar";
import FilterSelect from "../search/FilterSelect";
import Pagination from "../common/Pagination";

function Sidebar({
  notes,
  selectedNote,
  onSelectNote,
  onAddNote,
  onDeleteNote,
  onTogglePin,
  searchTerm,
  onSearch,
  filter,
  onFilterChange,
  currentPage,
  totalPages,
  onPageChange,
}) {
  const navigate = useNavigate();
  return (
    <aside className="flex h-full w-75 shrink-0 flex-col border-r border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex h-18.5 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-800">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          NoteSaver
        </h1>

        <button type="button" onClick={onAddNote} className="flex h-11 w-11 items-center justify-center rounded-lg bg-black text-xl text-white hover:bg-gray-800 dark:bg-white dark:text-black" title="Create new note" >
          +
        </button>
      </div>

      <SearchBar
        value={searchTerm}
        onChange={onSearch}
      />

      <FilterSelect
        value={filter}
        onChange={onFilterChange}
      />

      <div className="flex items-center justify-between px-3 pt-3">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          My Notes
        </p>

        <span className="text-xs text-gray-400">
          {notes.length}
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FileText size={32} className="mb-3 text-gray-300 dark:text-gray-700" />

            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {searchTerm ? "No matching notes" : "No notes yet"}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              {searchTerm
                ? `Nothing found for "${searchTerm}".`
                : "Create your first note."}
            </p>
          </div>
        ) : (
          <NoteList
            notes={notes}
            selectedNote={selectedNote}
            onSelectNote={onSelectNote}
            onDeleteNote={onDeleteNote}
            onTogglePin={onTogglePin}
          />
        )}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="grid grid-cols-3 gap-1 p-2">
          <button type="button" onClick={() => navigate("/calendar")} className="flex flex-col items-center gap-1 rounded-lg p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white" title="Calendar">
            <CalendarDays size={17} />
            <span className="text-[10px]">Calendar</span>
          </button>

          <button type="button" onClick={() => navigate("/trash")} className="flex flex-col items-center gap-1 rounded-lg p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white" title="Recently Deleted" >
            <Trash2 size={17} />
            <span className="text-[10px]">Trash</span>
          </button>

          <button type="button"  onClick={() => navigate("/settings")} className="flex flex-col items-center gap-1 rounded-lg p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white" title="Settings" >
            <Settings size={17} />
            <span className="text-[10px]">Settings</span>
          </button>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </aside>
  );
}

export default Sidebar;