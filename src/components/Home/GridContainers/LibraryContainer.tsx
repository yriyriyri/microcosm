"use client";

import React, { useMemo } from "react";

export default function LibraryContainer(props: {
  worldId: string;
  name: string;
  size?: "small" | "big";
  isBusy?: boolean;
  isRenaming?: boolean;
  draftName: string;
  onOpen?: () => void;
  onDelete?: () => void;
  onRenameChange: (value: string) => void;
  onRenameFocus?: () => void;
  onRenameBlur?: () => void;
  onRenameKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  const {
    size = "small",
    isBusy = false,
    isRenaming = false,
    draftName,
    onOpen,
    onDelete,
    onRenameChange,
    onRenameFocus,
    onRenameBlur,
    onRenameKeyDown,
  } = props;

  const bg = useMemo(() => {
    const palette = [
      "#7dd3fc",
      "#86efac",
      "#fca5a5",
      "#fdba74",
      "#c4b5fd",
      "#f9a8d4",
      "#93c5fd",
      "#67e8f9",
    ];
    return palette[Math.floor(Math.random() * palette.length)];
  }, []);

  return (
    <div
      className={size === "big" ? "pix-icon-large" : "pix-icon"}
      onClick={isBusy ? undefined : onOpen}
      style={{
        width: "100%",
        height: "100%",
        background: bg,
        borderRadius: 8,
        cursor: isBusy ? "default" : onOpen ? "pointer" : "default",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "rgba(255,255,255,0.95)",
        userSelect: "none",
        overflow: "visible",
        padding: 12,
        gap: 10,
        opacity: isBusy ? 0.8 : 1,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <input
          value={draftName}
          disabled={isBusy}
          onChange={(e) => onRenameChange(e.target.value)}
          onFocus={(e) => {
            e.stopPropagation();
            onRenameFocus?.();
          }}
          onBlur={() => {
            onRenameBlur?.();
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
          onKeyDown={(e) => {
            onRenameKeyDown?.(e);
            e.stopPropagation();
          }}
          spellCheck={false}
          style={{
            width: "100%",
            color: "white",
            fontSize: size === "big" ? 22 : 16,
            lineHeight: 1.1,
            background: isRenaming ? "rgba(255,255,255,0.08)" : "transparent",
            border: isRenaming
              ? "1px solid rgba(255,255,255,0.25)"
              : "1px solid transparent",
            borderRadius: 4,
            outline: "none",
            padding: "4px 6px",
            pointerEvents: "auto",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          justifyContent: "space-between",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          disabled={isBusy}
          onClick={onOpen}
          style={{
            appearance: "none",
            border: "none",
            background: "rgba(255,255,255,0.12)",
            color: "white",
            borderRadius: 4,
            padding: "6px 10px",
            cursor: isBusy ? "default" : "pointer",
          }}
        >
          Open
        </button>

        <button
          disabled={isBusy}
          onClick={onDelete}
          style={{
            appearance: "none",
            border: "none",
            background: "rgba(0,0,0,0.18)",
            color: "white",
            borderRadius: 4,
            padding: "6px 10px",
            cursor: isBusy ? "default" : "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}