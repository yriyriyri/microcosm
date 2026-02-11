"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import VoxelWorldEditor from "./VoxelWorldEditor";
import VoxelPartEditor from "./VoxelPartEditor";
import type { VoxelWorld } from "./VoxelWorld";
import { ensurePresetAssetsInstalled } from "./database/AssetPresets";

const FADE_MS = 120;

export default function VoxelEditor() {
  const [focusOpen, setFocusOpen] = useState(false);
  const [focusedGroupId, setFocusedGroupId] = useState<string | null>(null);

  const requestAutosaveRef = useRef<((opts?: { immediate?: boolean; reason?: string }) => void) | null>(null);
  const worldRef = useRef<VoxelWorld | null>(null);
  const presetsInitRef = useRef(false);

  const exitTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (presetsInitRef.current) return;
    presetsInitRef.current = true;

    (async () => {
      try {
        await ensurePresetAssetsInstalled();
      } catch (e) {
        console.error("Preset install failed", e);
      }
    })();
  }, []);

  useEffect(() => {
    return () => {
      if (exitTimeoutRef.current != null) {
        window.clearTimeout(exitTimeoutRef.current);
        exitTimeoutRef.current = null;
      }
    };
  }, []);

  const onFocusGroup = useCallback((groupId: string) => {
    if (exitTimeoutRef.current != null) {
      window.clearTimeout(exitTimeoutRef.current);
      exitTimeoutRef.current = null;
    }

    setFocusedGroupId(groupId);
    setFocusOpen(true);
  }, []);

  const onExitFocus = useCallback(() => {
    setFocusOpen(false);

    if (exitTimeoutRef.current != null) {
      window.clearTimeout(exitTimeoutRef.current);
    }

    exitTimeoutRef.current = window.setTimeout(() => {
      setFocusedGroupId(null);
      requestAutosaveRef.current?.({ immediate: true, reason: "focus-exit" });
      exitTimeoutRef.current = null;
    }, FADE_MS);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <VoxelWorldEditor
        onFocusGroup={onFocusGroup}
        focusOpen={focusOpen}
        onWorldReady={(w) => (worldRef.current = w)}
        onRequestAutosaveRef={(fn) => {
          requestAutosaveRef.current = fn;
        }}
      />

      <VoxelPartEditor
        open={focusOpen}
        groupId={focusedGroupId}
        world={worldRef.current}
        onExit={onExitFocus}
      />
    </div>
  );
}