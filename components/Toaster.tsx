"use client";
import { useApp } from "@/lib/AppState";
import { CheckCircle2, Info, AlertCircle, X } from "lucide-react";
import clsx from "clsx";

export default function Toaster() {
  const { toasts, dismissToast } = useApp();
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map(t => (
        <div
          key={t.id}
          className={clsx(
            "flex items-start gap-3 px-4 py-3 rounded-xl shadow-card-hover border bg-white animate-in slide-in-from-right-2",
            t.kind === "success" && "border-green-200",
            t.kind === "info" && "border-navy-200",
            t.kind === "error" && "border-red-200"
          )}
        >
          {t.kind === "success" && <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />}
          {t.kind === "info" && <Info className="w-5 h-5 text-navy-700 shrink-0 mt-0.5" />}
          {t.kind === "error" && <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />}
          <p className="text-sm text-navy-900 flex-1">{t.msg}</p>
          <button onClick={() => dismissToast(t.id)} className="text-gray-400 hover:text-navy-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
