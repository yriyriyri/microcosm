"use client";
import { useSound } from "@/components/VoxelEditor/audio/SoundProvider";

type Props = {
  value: string;
  onChange: (hex: string) => void;
};

const SWATCHES = [
  "#ffffff",
  "#111111",
  "#ff3b30",
  "#ff9500",
  "#ffcc00",
  "#34c759",
  "#00c7be",
  "#007aff",
  "#af52de",
];

export default function ColorPalette({ value, onChange }: Props) {
  const { click } = useSound();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: "15px 15px 8px 15px",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 26px)",
          gridAutoRows: "26px",
          gap: 8,
        }}
      >
        {SWATCHES.map((c) => (
          <button
            key={c}
            className="pix-icon"
            onClick={() => {
              click();
              onChange(c);
            }}
            title={c}
            type="button"
            style={{
              width: 26,
              height: 26,
              border: c === value ? "2px solid rgba(0,0,0,0.5)" : "2px solid rgba(0,0,0,0.35)",
              background: c,
              cursor: "pointer",
              padding: 0,
              appearance: "none",
              WebkitAppearance: "none",
              outline: "none",
              display: "block",
              imageRendering: "pixelated",
            }}
          />
        ))}
      </div>

      <div style={{ width: 22, height: 1, background: "rgba(0, 50, 110, 0.5)"}} />

      <label style={{ display: "flex", gap: 8, alignItems: "center", color: "black" }}>
      <span
        style={{
          width: 26,
          height: 26,
          border: "2px solid rgba(0,0,0,0.5)",
          background: value,
          display: "inline-block",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
        }}
        title={value}
      >
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{
              position: "absolute",
              inset: -6,
              width: "calc(100% + 12px)",
              height: "calc(100% + 12px)",
              border: "none",
              padding: 0,
              margin: 0,
              background: "transparent",
              cursor: "pointer",
            }}
          />
        </span>
      </label>
    </div>
  );
}