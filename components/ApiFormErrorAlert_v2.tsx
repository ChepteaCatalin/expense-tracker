import { AlertCircleIcon, X } from "lucide-react";
import { Alert, AlertAction, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function ApiFormErrorAlert({
  message,
  hide,
  onClose,
  className,
}: {
  message?: string;
  hide?: boolean;
  onClose?: () => void;
  className?: string;
}) {
  if (!message || hide) return null;

  return (
    <Alert variant="destructive" className={className}>
      <AlertCircleIcon />
      <AlertTitle>{message}</AlertTitle>
      {onClose && (
        <AlertAction>
          <Button variant="ghost" size="icon-xs" onClick={onClose}>
            <X />
          </Button>
        </AlertAction>
      )}
    </Alert>
  );
}
