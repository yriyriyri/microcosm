"use client";

import React from "react";

export type PackedGridItem = {
  id: string;
  size: "small" | "big";
  content: React.ReactNode;
};

export default function PackedGrid(props: {
  items: PackedGridItem[];
  gap?: number;
}) {
  const { items, gap = 12 } = props;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflowY: "auto",
        overflowX: "visible",
        padding: "1vh",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, minmax(0, 1fr))",
          gridAutoRows: "1fr",
          gridAutoFlow: "dense",
          gap,
          alignContent: "start",
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              gridColumn: item.size === "big" ? "span 2" : "span 1",
              gridRow: item.size === "big" ? "span 2" : "span 1",
              aspectRatio: "1 / 1",
              minWidth: 0,
              minHeight: 0,
            }}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}