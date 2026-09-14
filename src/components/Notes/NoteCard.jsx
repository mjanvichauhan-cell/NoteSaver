import { Pin, Trash2 } from "lucide-react";

function NoteCard({
  note,
  selected,
  onSelect,
  onDelete,
  onTogglePin,
}) {
  const lastEdited = note.updatedAt
    ? new Date(note.updatedAt).toLocaleString([], {
        dateStyle: "short",
        timeStyle: "short",
      })
    : "Not edited yet";

  return (
    <div
      onClick={() => onSelect(note)}
      className={`group cursor-pointer rounded-lg p-3 transition ${
        selected
          ? "bg-gray-200 dark:bg-gray-800"
          : "hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
    >
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-white">
              {note.title || "Untitled Note"}
            </h3>

            {note.pinned && (
              <Pin
                size={13}
                fill="currentColor"
                className="shrink-0 text-gray-700 dark:text-gray-300"
              />
            )}
          </div>

          <p className="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">
            {note.content || "Empty note"}
          </p>

          <p className="mt-2 text-[11px] text-gray-400 dark:text-gray-500">
            {lastEdited}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onTogglePin(note.id);
            }}
            className="rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
            title={note.pinned ? "Unpin note" : "Pin note"}
          >
            <Pin
              size={15}
              fill={note.pinned ? "currentColor" : "none"}
            />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onDelete(note);
            }}
            className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950"
            title="Delete note"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;