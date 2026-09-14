import { useEffect, useState } from "react";
import { Clock, FileText } from "lucide-react";
import EmptyNotes from "./EmptyNotes";
import NoteActions from "./NoteActions";
import NotePreview from "./NotePreview";
import WordCount from "../common/WordCount";
import useSettings from "../../hooks/useSettings";

function NoteEditor({ note, onUpdate, onClose }) {
  const { settings } = useSettings();
  const [draft, setDraft] = useState(note);
  const [dirty, setDirty] = useState(false);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    setDraft(note);
    setDirty(false);
    setPreview(false);
  }, [note?.id]);
  if (!note || !draft) {
    return <EmptyNotes />;
  }

  const changeDraft = (changes) => {
    const updated = {
      ...draft,
      ...changes,
      updatedAt: new Date().toISOString(),
    };
    setDraft(updated);

    if (settings.autoSave) {
      onUpdate(updated);
      setDirty(false);
    } else {
      setDirty(true);
    }
  };

  const handleSave = () => {
    onUpdate(draft);
    setDirty(false);
  };

  const handleClose = () => {
    if (dirty && !settings.autoSave) {
      onUpdate(draft);
    }
    onClose();
  };

  return (
    <div className="flex h-full flex-col bg-white dark:bg-gray-950">
      <div className="flex items-center justify-between gap-4 border-b border-gray-200 px-5 py-4 dark:border-gray-800">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <FileText size={20} className="shrink-0 text-gray-400" />

          <input type="text" value={draft.title}
            onChange={(event) =>
              changeDraft({ title: event.target.value })
            }
            placeholder="Note title" className="min-w-0 flex-1 bg-transparent text-xl font-semibold text-gray-900 outline-none placeholder:text-gray-400 dark:text-white" />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {settings.markdownEditor && (
            <button type="button" onClick={() => setPreview((value) => !value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800" >
              {preview ? "Edit" : "Preview"}
            </button>
          )}

          <button type="button" onClick={handleClose} className="rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"  >
            Close
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {preview && settings.markdownEditor ? (
          <NotePreview  title={draft.title}  content={draft.content} />
        ) : (
          <textarea value={draft.content} 
            onChange={(event) =>
              changeDraft({ content: event.target.value })
            }
            placeholder="Start writing your note..."  className="h-full w-full resize-none bg-transparent p-5 text-base leading-7 text-gray-800 outline-none placeholder:text-gray-400 dark:text-gray-200" />
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 px-5 py-2.5 text-xs text-gray-400 dark:border-gray-800">
         <div className="flex flex-wrap items-center gap-4">
             <WordCount text={draft.content} />
                 {draft.updatedAt && (
              <span className="flex items-center gap-1">
              <Clock size={12} />
                  {new Date(draft.updatedAt).toLocaleString([], {
                   dateStyle: "short",
                   timeStyle: "short",
              })}
              </span>
           )}
       </div>

        <span>
          {settings.autoSave
            ? "Auto-save enabled"
            : dirty
              ? "Unsaved changes"
              : "Saved"}
        </span>
      </div>

      {!settings.autoSave && (
        <NoteActions  onSave={handleSave} dirty={dirty}  />
      )}
    </div>
  );
}

export default NoteEditor;