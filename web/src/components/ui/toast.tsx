import { Loader2, TriangleAlert } from "lucide-react";
import { toast } from "sonner";

export function showLoadingToast(message: string) {
  return toast(
    <div className="flex items-center gap-2">
      <Loader2 className="animate-spin w-5 h-5 text-gray-700" />
      <span>{message}</span>
    </div>,
    {
      duration: Infinity,
      style: {
        background: "#f0f0f0",
        color: "#333",
      },
    }
  );
}

export function showSuccessToast(message: string) {
  toast.success(message, {
    style: {
      background: "#4ade80",
      color: "#fff",
    },
  });
}

export function showErrorToast(message: string) {
  toast.error(message, {
    style: {
      background: "#f87171",
      color: "#fff",
    },
  });
}

export function showWarningToast(message: string) {
  return toast(
    <div className="flex items-center gap-2">
      <TriangleAlert />
      <span>{message}</span>
    </div>,
    {
      style: {
        background: "#ffc100",
        color: "#333",
      },
    }
  );
}
