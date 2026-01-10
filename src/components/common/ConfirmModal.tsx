import { useCallback, useEffect, useRef } from "react";
import { useConfirmStore } from "@/app/stores/confirm.store";

export default function ConfirmModal() {
  const { open, options, loading, resolve, close, setLoading } =
    useConfirmStore();

  const confirmBtnRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleConfirm = useCallback(async () => {
    setLoading(true);
    await Promise.resolve();
    resolve(true);
  }, [resolve, setLoading]);

  const handleCancel = () => {
    resolve(false);
  };

  useEffect(() => {
    if (!open) return;

    confirmBtnRef.current?.focus();

    const focusable = modalRef.current?.querySelectorAll<HTMLButtonElement>(
      "button:not([disabled])"
    );

    if (!focusable || focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) close();
      if (e.key === "Enter") handleConfirm();
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [close, handleConfirm, loading, open]);

  if (!open || !options) return null;

  return (
    <div
      className="fixed inset-0 z-999 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      aria-describedby="confirm-desc"
    >
      <div
        ref={modalRef}
        className="w-full max-w-sm rounded-lg bg-white shadow-lg"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b">
          <h2
            id="confirm-title"
            className="text-lg font-semibold text-gray-900"
          >
            {options.title || "Konfirmasi"}
          </h2>
        </div>
        {/* Body */}
        <div id="confirm-desc" className="px-5 py-4 text-sm text-gray-600">
          {options.message}
        </div>
        {/* Footer */}
        <div className="flex justify-end gap-2 px-5 py-4 border-t">
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="px-4 py-2 text-sm rounded-md border bg-gray-400 hover:bg-gray-600 disabled:opacity-50 cursor-pointer disabled:cursor-wait disabled:hover:bg-gray-400"
          >
            {options.cancelText}
          </button>
          <button
            ref={confirmBtnRef}
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            className={`px-4 py-2 text-sm rounded-md text-white flex items-center gap-2 cursor-pointer
              ${
                options.variant === "danger"
                  ? "bg-red-600 hover:bg-red-700 disabled:hover:bg-red-600"
                  : "bg-blue-600 hover:bg-blue-700 disabled:hover:bg-blue-600"
              }
              disabled:opacity-70 disabled:cursor-wait
            `}
          >
            {loading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {options.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
