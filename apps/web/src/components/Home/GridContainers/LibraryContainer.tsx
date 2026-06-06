"use client";

import React, { useMemo } from "react";

function backgroundImageFromWorldId(worldId: string): string {
  const backgrounds = [
    "/library/1.png",
    "/library/2.png",
    "/library/3.png",
    "/library/4.png",
  ];

  let hash = 0;
  for (let i = 0; i < worldId.length; i++) {
    hash = (hash * 31 + worldId.charCodeAt(i)) >>> 0;
  }

  return backgrounds[hash % backgrounds.length];
}

function floaterVarsFromWorldId(worldId: string): React.CSSProperties {
  let hash = 0;
  for (let i = 0; i < worldId.length; i++) {
    hash = (hash * 31 + worldId.charCodeAt(i)) >>> 0;
  }

  const ax = 6 + (hash % 5);               // 6..10
  const ay = 5 + ((hash >> 3) % 5);        // 5..9
  const dur = 5900 + ((hash >> 6) % 2500); // 5900..8399
  const delay = -((hash >> 10) % 1800);    // -0..-1799

  return {
    ["--floater-ax" as any]: `${ax}px`,
    ["--floater-ay" as any]: `${ay}px`,
    ["--floater-dur" as any]: `${dur}ms`,
    ["--floater-delay" as any]: `${delay}ms`,
  };
}

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
    worldId,
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

  const bgImage = useMemo(() => backgroundImageFromWorldId(worldId), [worldId]);
  const floaterVars = useMemo(() => floaterVarsFromWorldId(worldId), [worldId]);

  const cellClassName = size === "big" ? "pix-icon-large" : "pix-icon";

  const nameBoxHeight = size === "big" ? 36 : 30;
  const deleteBoxSize = nameBoxHeight;
  const rowGap = 6;
  const fontSize = size === "big" ? 17 : 14;
  const borderRadius = 4;
  const nameWidth = "90%";
  const deleteGap = 14;
  const deleteVisualScale = 1.6;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "visible",
        userSelect: "none",
        opacity: isBusy ? 0.8 : 1,
      }}
    >
      <div
        className={cellClassName}
        onClick={isBusy ? undefined : onOpen}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          cursor: isBusy ? "default" : onOpen ? "pointer" : "default",
          overflow: "hidden",
        }}
      >
        <div
          className="floater"
          style={floaterVars}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              imageRendering: "pixelated",
            }}
          />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "100%",
          marginTop: rowGap,
          height: nameBoxHeight,
          pointerEvents: "auto",
          overflow: "visible",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            position: "relative",
            width: nameWidth,
            height: "100%",
            overflow: "visible",
          }}
        >
          <div
            className="pix-icon"
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              background: "var(--homepage-dark)",
              borderRadius,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2px 8px",
              boxSizing: "border-box",
              overflow: "visible",
            }}
          >
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
                color: "var(--homepage-light)",
                fontSize,
                lineHeight: 1.05,
                textAlign: "center",
                background: isRenaming ? "rgba(255,255,255,0.08)" : "transparent",
                border: isRenaming
                  ? "1px solid rgba(234,243,254,0.35)"
                  : "1px solid transparent",
                borderRadius: 3,
                outline: "none",
                padding: "4px 6px",
                pointerEvents: "auto",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            className="pix-icon-small"
            disabled={isBusy}
            onClick={onDelete}
            style={{
              appearance: "none",
              border: "none",
              background: "transparent",
              position: "absolute",
              left: "100%",
              top: 0,
              marginLeft: deleteGap,
              width: deleteBoxSize,
              height: deleteBoxSize,
              padding: 0,
              cursor: isBusy ? "default" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "visible",
            }}
          >
            <img
              src="/library/delete.png"
              alt="Delete"
              style={{
                width: `${deleteVisualScale * 100}%`,
                height: `${deleteVisualScale * 100}%`,
                objectFit: "contain",
                imageRendering: "pixelated",
                display: "block",
                pointerEvents: "none",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}