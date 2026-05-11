"use client";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function Modal({
  open,
  onClose,
  title,
  children,
  maxWidth = "max-w-lg"
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 animate-in fade-in">
      <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-white rounded-2xl shadow-card-hover w-full ${maxWidth} max-h-[90vh] overflow-y-auto`}>
        {title && (
          <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-navy-50 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <h2 className="font-bold text-navy-900 text-lg">{title}</h2>
            <button onClick={onClose} className="p-1 hover:bg-navy-50 rounded-lg">
              <X className="w-5 h-5 text-navy-700" />
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
