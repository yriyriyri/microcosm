"use client";

import React, { useCallback, useRef, useState } from "react";
import VoxelWorldEditor from "./VoxelWorldEditor";
import VoxelPartEditor from "./VoxelPartEditor";
import type { VoxelWorld } from "./VoxelWorld";

export default function VoxelEditor() {
  const [focusedGroupId, setFocusedGroupId] = useState<string | null>(null);
  const worldRef = useRef<VoxelWorld | null>(null);

  //show / hide focus mode part editor, pass live current world to part editor
  const onFocusGroup = useCallback((groupId: string) => setFocusedGroupId(groupId), []);
  const onExitFocus = useCallback(() => setFocusedGroupId(null), []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <VoxelWorldEditor
        onFocusGroup={onFocusGroup}
        focusOpen={!!focusedGroupId}
        onWorldReady={(w) => (worldRef.current = w)}
      />

      {focusedGroupId && (
        <VoxelPartEditor
          open={true}
          groupId={focusedGroupId}
          world={worldRef.current}
          onExit={onExitFocus}
        />
      )}
    </div>
  );
}