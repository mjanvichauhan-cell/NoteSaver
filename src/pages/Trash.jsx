import { useState } from "react";
import {  ArrowLeft, RotateCcw, Trash2,} from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/common/ConfirmModal";
import { useNotesContext } from "../context/NotesContext";
import useSettings from "../hooks/useSettings";

function Trash() {
  const navigate = useNavigate();
  const { notes, restoreNote, permanentlyDeleteNote, } = useNotesContext();
  const { settings } = useSettings();
  const [restoreTarget, setRestoreTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const deletedNotes = notes.filter(
    (note) => note.deleted
  );

  const restore = (note) => {
    if (settings.confirmRestore) {
      setRestoreTarget(note);
      return;
    }
    restoreNote(note.id);
    toast.success("Note restored successfully");
  };

  const confirmRestore = () => {
    if (!restoreTarget) return;
    restoreNote(restoreTarget.id);
    setRestoreTarget(null);
    toast.success("Note restored successfully");
  };

  const requestPermanentDelete = (note) => {
    setDeleteTarget(note);
  };

  const confirmPermanentDelete = () => {
    if (!deleteTarget) return;
    permanentlyDeleteNote(deleteTarget.id);
    setDeleteTarget(null);
    toast.success("Note permanently deleted");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <Trash2 size={22} />
          <div>
            <h1 className="text-xl font-bold">
              Recently Deleted
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {deletedNotes.length}{" "}
              {deletedNotes.length === 1
                ? "note"
                : "notes"}
            </p>
          </div>
        </div>

        <button type="button" onClick={() => navigate("/")}  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800" >
          <ArrowLeft size={18} />
          <span className="hidden sm:inline">
            Back to Notes
          </span>
        </button>
      </header>

      <main className="mx-auto w-full max-w-5xl p-6">
        {deletedNotes.length === 0 ? (
          <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <Trash2  size={48}  className="mb-4 text-gray-300 dark:text-gray-700"/>
            <h2 className="text-lg font-semibold">
              Trash is empty
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Deleted notes will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {deletedNotes.map((note) => (
              <div key={note.id}  className="rounded-xl border border-gray-200 p-4 dark:border-gray-800 dark:bg-gray-900"  >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold">
                      {note.title || "Untitled Note"}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                      {note.content || "Empty note"}
                    </p>

                    {note.deletedAt && (
                      <p className="mt-2 text-xs text-gray-400">
                        Deleted{" "}
                        {new Date(
                          note.deletedAt
                        ).toLocaleString()}
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2">
                    <button  type="button"  onClick={() => restore(note)}  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800" >
                      <RotateCcw size={16} />
                      Restore
                    </button>

                    <button type="button" onClick={() =>   requestPermanentDelete(note) }  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950">
                      <Trash2 size={16} />
                      Delete Permanently
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <ConfirmModal
        isOpen={Boolean(restoreTarget)}
        title="Restore note?"
        message={
          restoreTarget
            ? `"${restoreTarget.title || "Untitled Note"}" will be restored to My Notes.`
            : ""
        }
        confirmText="Restore"
        onConfirm={confirmRestore}
        onCancel={() => setRestoreTarget(null)}
      />

      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete permanently?"
        message={
          deleteTarget
            ? `"${deleteTarget.title || "Untitled Note"}" will be permanently deleted. This action cannot be undone.`
            : ""
        }
        confirmText="Delete Permanently"
        onConfirm={confirmPermanentDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

export default Trash;