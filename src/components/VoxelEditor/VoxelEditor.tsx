"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import VoxelWorldEditor from "./VoxelWorldEditor";
import VoxelPartEditor from "./VoxelPartEditor";
import type { VoxelWorld } from "./VoxelWorld";
import { ensurePresetAssetsInstalled } from "./database/AssetPresets";
import { useSound } from "@/components/VoxelEditor/audio/SoundProvider";

const FADE_MS = 120;

const AMBIENCE_WORLD_VOL = 0.7;
const AMBIENCE_FOCUS_VOL = 0.2;
const AMBIENCE_GRASS_VOL = 0.5;
const AMBIENCE_WIND_VOL = 1;
const AMBIENCE_FADE_MS = 220;

export default function VoxelEditor() {
  const { unlock, play, startLoopAt, setLoopVolume, getTime, startLoop, } = useSound();

  const [focusOpen, setFocusOpen] = useState(false);
  const [focusedGroupId, setFocusedGroupId] = useState<string | null>(null);

  const requestAutosaveRef = useRef<((opts?: { immediate?: boolean; reason?: string }) => void) | null>(null);
  const worldRef = useRef<VoxelWorld | null>(null);
  const presetsInitRef = useRef(false);

  const exitTimeoutRef = useRef<number | null>(null);

  const introPlayedRef = useRef(false);
  const ambienceStartedRef = useRef(false);

  useEffect(() => {
    if (introPlayedRef.current) return;
  
    const run = async () => {
      await unlock(); 
      if (introPlayedRef.current) return;
  
      introPlayedRef.current = true;
      play("introNewWorld");
    };
  
    void run();
  }, [play, unlock]);

  useEffect(() => {
    if (ambienceStartedRef.current) return;

    const startAmbience = async () => {
      await unlock();

      if (ambienceStartedRef.current) return;
      ambienceStartedRef.current = true;

      const t0 = getTime() + 0.06;

      startLoopAt("amb:world", "ambientWorld", { volume: AMBIENCE_WORLD_VOL }, t0);
      startLoopAt("amb:focus", "ambientFocus", { volume: 0.0 }, t0); 
      startLoop("amb:grass", "ambientGrass", { volume: AMBIENCE_GRASS_VOL });
      startLoop("amb:wind", "ambientWindIdle", { volume: AMBIENCE_WIND_VOL });
    };

    void startAmbience();
  }, [unlock, startLoopAt, getTime]);

  useEffect(() => {
    setLoopVolume("amb:focus", focusOpen ? AMBIENCE_FOCUS_VOL : 0.0, AMBIENCE_FADE_MS);
  }, [focusOpen, setLoopVolume]);

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