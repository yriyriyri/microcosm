"use client";

export type ToolId = "pencil" | "marquee" | "eyedropper";

type Props = {
  value: ToolId;
  onChange: (tool: ToolId) => void;
};

const TOOLS: { id: ToolId; title: string; src: string }[] = [
  { id: "pencil", title: "Pencil", src: "/icons/pencil-tool.png" },
  { id: "marquee", title: "Marquee", src: "/icons/marquee-tool.png" },
  { id: "eyedropper", title: "Eyedropper", src: "/icons/eyedropper-tool.png" },
];

export default function ToolPalette({ value, onChange }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        padding: 0,
        alignItems: "center",
      }}
    >
      <div style={{ width: 22, height: 1, background: "rgba(0,0,0,0.25)" }} />
      {TOOLS.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          title={t.title}
          aria-label={t.title}
          style={{
            width: 26,
            height: 26,
            padding: 0,
            border:
              t.id === value ? "2px solid black" : "2px solid rgba(0,0,0,0.35)",
            background: "transparent",
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
          }}
        >
          <img
            src={t.src}
            alt={t.title}
            width={18}
            height={18}
            style={{
              imageRendering: "pixelated",
              display: "block",
              pointerEvents: "none",
              userSelect: "none",
            }}
          />
        </button>
      ))}
    </div>
  );
}