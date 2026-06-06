"use client";

import React from "react";
import { useSound } from "@/components/VoxelEditor/audio/SoundProvider";

export type WorldToolId =
  | "rotateright"
  | "rotateleft"
  | "planemovement"
  | "upmovement";

const TOOLS: { id: WorldToolId; title: string; src: string }[] = [
  { id: "rotateright", title: "Rotate Right", src: "/icons/rotateright.png" },
  { id: "rotateleft", title: "Rotate Left", src: "/icons/rotateleft.png" },
  { id: "planemovement", title: "Plane Movement", src: "/icons/planemovement.png" },
  { id: "upmovement", title: "Up Movement", src: "/icons/upmovement.png" },
];

type Props = {
  value: WorldToolId;
  onSelect: (tool: WorldToolId) => void;
};

export default function WorldToolPalette({ value, onSelect }: Props) {
  const { click } = useSound();

  const isToggle = (id: WorldToolId) => id === "planemovement" || id === "upmovement";

  const rotateTools = TOOLS.slice(0, 2);
  const moveTools = TOOLS.slice(2);

  const hints =
    value === "upmovement"
      ? { movement: "movement axis: y", rotation: "rotation axis: x" }
      : { movement: "movement axis: x/z", rotation: "rotation axis: y" };

  const renderIcon = (t: (typeof TOOLS)[number]) => {
    const selected = isToggle(t.id) && t.id === value;

    return (
      <div
        key={t.id}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "7vh",
          height: "7vh",
          overflow: "visible",
        }}
      >
        <img
          className="pix-icon"
          src={t.src}
          alt={t.title}
          title={t.title}
          draggable={false}
          style={{
            height: "7vh",
            width: "auto",
            objectFit: "contain",
            imageRendering: "pixelated",
            cursor: "pointer",
            pointerEvents: "auto",
            opacity: selected ? 1 : 0.7,
            transition: "opacity 120ms ease-out",
          }}
          onClick={() => {
            click();
            onSelect(t.id);
          }}
        />
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        alignItems: "center",
        padding: 0,
        pointerEvents: "auto",
        overflow: "visible",
        width: "7vh",
        minWidth: "7vh",
        maxWidth: "7vh",
      }}
    >
      {rotateTools.map(renderIcon)}
  
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "2vh",
          width: "100%",
          overflow: "visible",
        }}
      >
        <div
          style={{
            width: 25,
            height: 2,
            background: "rgba(199, 236, 255, 0.7)",
          }}
        />
      </div>
  
      {moveTools.map(renderIcon)}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "2vh",
          width: "100%",
          overflow: "visible",
        }}
      >
        <div
          style={{
            width: 25,
            height: 2,
            background: "rgba(199, 236, 255, 0.7)",
          }}
        />
      </div>
  
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 0,
          overflow: "visible",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 15,
            top: 10,
            whiteSpace: "nowrap",
            fontSize: 12,
            lineHeight: 1.2,
            letterSpacing: 0.2,
            color: "rgba(199, 236, 255, 0.7)",
            opacity: 0.85,
            userSelect: "none",
          }}
        >
          <div>{hints.movement}</div>
          <div>{hints.rotation}</div>
        </div>
      </div>
    </div>
  );
}