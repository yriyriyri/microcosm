"use client";

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
  "#ff2d55",
];

export default function ColorPalette({ value, onChange }: Props) {
    return (
      <div
        style={{
          top: 0,
          left: 0,
          display: "flex",
          flexDirection: "column", 
          gap: 8,
          padding: "15px 15px 8px 15px",
          alignItems: "center",
        }}
      >
        {SWATCHES.map((c) => (
          <button
            key={c}
            onClick={() => onChange(c)}
            title={c}
            style={{
              width: 26,
              height: 26,
              border: c === value ? "2px solid black" : "2px solid rgba(0,0,0,0.35)",
              background: c,
              cursor: "pointer",
            }}
          />
        ))}
  
        <div style={{ width: 22, height: 1, background: "rgba(0,0,0,0.25)" }} />
  
        <label style={{ display: "flex", gap: 8, alignItems: "center", color: "black" }}>
          <span
            style={{
              width: 26,
              height: 26,
              border: "2px solid rgba(0,0,0,0.35)",
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