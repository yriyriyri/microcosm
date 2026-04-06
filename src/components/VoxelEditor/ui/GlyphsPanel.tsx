"use client";

import React, { useMemo } from "react";
import { useSound } from "@/components/VoxelEditor/audio/SoundProvider";
import PackedGrid, {
  type PackedGridItem,
} from "@/components/Home/PackedGrid/PackedGrid";
import AssetContainer from "@/components/Home/GridContainers/AssetContainer";

export type GlyphRecord = {
  id: string;
  name: string;
  logicTag: string;
  thumbUrl: string;
};

const GLYPHS: GlyphRecord[] = [
  {
    id: "glyph_car",
    name: "Car",
    logicTag: "car",
    thumbUrl: "/glyphs/car.png",
  },
];

export default function GlyphsPanel(props: {
  open: boolean;
  onClose: () => void;
  onRequestApplyGlyph: (glyph: GlyphRecord) => void;
}) {
  const { open, onRequestApplyGlyph } = props;
  const { click } = useSound();

  const items: PackedGridItem[] = useMemo(() => {
    return GLYPHS.map((glyph) => ({
      id: glyph.id,
      size: "small",
      content: (
        <AssetContainer
          thumbUrl={glyph.thumbUrl}
          size="small"
          onClick={() => {
            click();
            onRequestApplyGlyph(glyph);
          }}
        />
      ),
    }));
  }, [click, onRequestApplyGlyph]);

  if (!open) return null;

  return (
    <div
      style={{
        width: "min(460px, 92vw)",
        maxHeight: "min(640px, 88vh)",
        overflow: "hidden",
        background: "rgba(0, 68, 128, 0.30)",
        borderRadius: 10,
        padding: 10,
        pointerEvents: "auto",
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {items.length ? (
        <div style={{ width: "100%", height: "100%" }}>
          <PackedGrid items={items} columns={4} gap={10} />
        </div>
      ) : (
        <div style={{ color: "white", opacity: 0.7, fontSize: 14 }}>
          No glyphs available.
        </div>
      )}
    </div>
  );
}