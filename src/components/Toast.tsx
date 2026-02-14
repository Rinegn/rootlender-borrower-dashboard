"use client";

import { useEffect } from "react";

export function Toast({
  message,
  type,
  onClose,
  ms = 2200,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
  ms?: number;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, ms);
    return () => clearTimeout(t);
  }, [onClose, ms]);

  const colors = {
    success: { bg: "#d4edda", color: "#155724" },
    error: { bg: "#f8d7da", color: "#721c24" }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "12px 18px",
        borderRadius: "8px",
        backgroundColor: colors[type].bg,
        color: colors[type].color,
        fontWeight: 700,
        boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
        zIndex: 9999,
      }}
    >
      {message}
    </div>
  );
}
