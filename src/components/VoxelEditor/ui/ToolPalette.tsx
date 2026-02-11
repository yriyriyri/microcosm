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
              filter: selected ? "none" : "none",
            }}
          />
        );
      })}
    </div>
  );
}