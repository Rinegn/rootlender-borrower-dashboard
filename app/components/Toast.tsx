"use client";

import { useEffect } from "react";

export function Toast({
  message,
  type,
  onClose
}: {
  message: string;
  type: "success" | "error";
  onClose?: () => void;
}) {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

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
        padding: "14px 20px",
        borderRadius: "8px",
        backgroundColor: colors[type].bg,
        color: colors[type].color,
        fontWeight: 600,
        boxShadow: "0 6px 16px rgba(0,0,0,0.15)"
      }}
    >
      {message}
      <button
        onClick={onClose}
        style={{
          marginLeft: "12px",
          background: "transparent",
          border: "none",
          fontWeight: 700,
          cursor: "pointer"
        }}
      >
        ✕
      </button>
    </div>
  );
}
