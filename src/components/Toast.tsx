"use client";

import { useEffect } from "react";

export type ToastType = "success" | "error" | "info";

export function Toast({
  message,
  type,
  onClose,
  durationMs = 2500
}: {
  message: string;
  type: ToastType;
  onClose: () => void;
  durationMs?: number;
}) {
  useEffect(() => {
    const t = setTimeout(() => onClose(), durationMs);
    return () => clearTimeout(t);
  }, [durationMs, onClose]);

  const colors: Record<ToastType, { bg: string; color: string; border: string }> = {
    success: { bg: "#d4edda", color: "#155724", border: "#c3e6cb" },
    error: { bg: "#f8d7da", color: "#721c24", border: "#f5c6cb" },
    info: { bg: "#d1ecf1", color: "#0c5460", border: "#bee5eb" }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 18,
        right: 18,
        padding: "12px 16px",
        borderRadius: 8,
        backgroundColor: colors[type].bg,
        color: colors[type].color,
        fontWeight: 700,
        border: "1px solid " + colors[type].border,
        boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
        zIndex: 9999,
        maxWidth: 360
      }}
    >
      {message}
    </div>
  );
}
