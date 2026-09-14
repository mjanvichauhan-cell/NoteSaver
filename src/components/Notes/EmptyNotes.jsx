import { FileText } from "lucide-react";

function EmptyNotes() {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-900">
          <FileText size={26} className="text-gray-400" />
        </div>

        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
          No note selected
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Select a note or create a new one.
        </p>
      </div>
    </div>
  );
}

export default EmptyNotes;