import { useEffect } from "react";
import { Trash2 } from "lucide-react";
import { formatPersianNumber } from "../utils/format";

interface DeleteConfirmModalProps {
  count: number;
  description?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmModal({
  count,
  description,
  onCancel,
  onConfirm,
}: DeleteConfirmModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onCancel();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  const isBulk = count > 1;

  return (
    <div
      className="modal-backdrop delete-confirm-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <section
        className="delete-confirm-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-confirm-title"
        aria-describedby="delete-confirm-description"
      >
        <div className="delete-confirm-icon" aria-hidden="true">
          <Trash2 size={22} />
        </div>
        <h2 id="delete-confirm-title">
          {isBulk ? "حذف درخواست‌های انتخاب‌شده؟" : "حذف درخواست؟"}
        </h2>
        <p id="delete-confirm-description">
          {description
            ? `درخواست ${description} حذف شود؟`
            : `${formatPersianNumber(count)} درخواست برای همیشه حذف می‌شود. این عملیات قابل بازگشت نیست.`}
        </p>
        <div className="delete-confirm-actions">
          <button className="secondary-button" onClick={onCancel} autoFocus>
            انصراف
          </button>
          <button className="delete-confirm-button" onClick={onConfirm}>
            <Trash2 size={15} />
            حذف
          </button>
        </div>
      </section>
    </div>
  );
}
