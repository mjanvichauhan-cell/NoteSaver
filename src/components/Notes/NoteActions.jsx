import { Check, Save } from "lucide-react";

function NoteActions({ onSave, dirty }) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 dark:border-gray-800">
      <span className="flex items-center gap-1.5 text-xs text-gray-400">
        {dirty ? (
          "Unsaved changes"
        ) : (
          <>
            <Check size={13} className="text-green-500" />
            Saved
          </>
        )}
      </span>

      <button type="button" onClick={onSave} disabled={!dirty} className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-black" >
        <Save size={16} />
        Save
      </button>
    </div>
  );
}

export default NoteActions;