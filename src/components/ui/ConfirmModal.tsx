import { CARD_RADIUS } from "@/constants/theme";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "primary" | "secondary";
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "primary",
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-md bg-black/50 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onCancel}
    >
      <div
        className={cn(
          "w-full max-w-sm bg-surface-container-lowest border border-outline-variant shadow-xl",
          CARD_RADIUS,
          "p-xl flex flex-col items-center text-center gap-md"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center",
            tone === "primary" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
          )}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.008v.008H12v-.008ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>

        <div>
          <h3 className="font-headline-md text-body-lg text-on-surface">{title}</h3>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">{description}</p>
        </div>

        <div className="flex gap-sm w-full mt-sm">
          <Button variant="ghost" fullWidth onClick={onCancel} disabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button
            variant={tone === "primary" ? "primary" : "secondary"}
            fullWidth
            isLoading={isLoading}
            loadingText="Updating..."
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}