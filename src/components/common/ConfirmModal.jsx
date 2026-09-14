import Modal from "react-modal";
import { AlertTriangle } from "lucide-react";
Modal.setAppElement("#root");

function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  onConfirm,
  onCancel,
}) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onCancel} contentLabel={title} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl outline-none dark:bg-gray-900" overlayClassName="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500 dark:bg-red-950">
          <AlertTriangle size={20} />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
      </div>
      <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400">
        {message}
      </p>

      <div className="mt-6 flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800" >
         Cancel
        </button>

        <button type="button" onClick={onConfirm} className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600" >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
}

export default ConfirmModal;