"use client";
import { useSound } from "@/components/VoxelEditor/audio/SoundProvider";

export type ToolId = "pencil" | "marquee" | "eyedropper";

type Props = {
  value: ToolId;
  onChange: (tool: ToolId) => void;
};

const TOOLS: { id: ToolId; title: string; src: string }[] = [
  { id: "pencil", title: "Pencil", src: "/icons/pencil.png" },
  { id: "marquee", title: "Marquee", src: "/icons/marquee.png" },
  { id: "eyedropper", title: "Eyedropper", src: "/icons/eyedropper.png" },
];

export default function ToolPalette({ value, onChange }: Props) {
  const { click } = useSound();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        alignItems: "center",
        padding: 0,
        overflow: "visible",
      }}
    >
      {TOOLS.map((t) => {
        const selected = t.id === value;

        return (
          <img
            key={t.id}
            className="pix-icon"
            src={t.src}
            alt={t.title}
            title={t.title}
            onClick={() => {
              click();
              onChange(t.id);
            }}
            style={{
              height: "7vh",
              width: "auto",
              objectFit: "contain",
              imageRendering: "pixelated",
              cursor: "pointer",
              pointerEvents: "auto",
              opacity: selected ? 1 : 0.85,
              transition: "opacity 120ms ease-out",
            }}
          />
        );
      })}

      <div
        style={{
          marginTop: "5vh",
          textAlign: "center",
          fontSize: 14,
          lineHeight: 1.2,
          color: "#00324C",
          opacity: 0.85,
          userSelect: "none",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        {value === "pencil" && (
          <>
            <div>Q: pencil</div>
            <div>LMB: draw</div>
            <div>RMB: erase</div>
          </>
        )}

        {value === "marquee" && (
          <>
            <div>W: fill box</div>
            <div>LMB ×2: fill</div>
            <div>RMB: cancel</div>
          </>
        )}

        {value === "eyedropper" && (
          <>
            <div>E: eyedropper</div>
            <div>LMB: pick color</div>
            <div>RMB: nothing</div>
          </>
        )}
      </div>
    </div>
  );
}