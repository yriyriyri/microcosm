"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import VoxelWorldEditor from "./VoxelWorldEditor";
import VoxelPartEditor from "./VoxelPartEditor";
import type { VoxelWorld, AssetKind } from "./VoxelWorld";
import { useSound, useSoundLoading } from "@/components/VoxelEditor/audio/SoundProvider";
import LoadingOverlay from "./ui/LoadingOverlay";

const FADE_MS = 120;

const AMBIENCE_WORLD_VOL = 0.7;
const AMBIENCE_FOCUS_VOL = 0.4;
const AMBIENCE_GRASS_VOL = 0.5;
const AMBIENCE_WIND_VOL = 1;
const AMBIENCE_FADE_MS = 220;

type FocusedSourceContext = {
  assetId: string | null;
  assetKind: AssetKind | null;
  overrideAssetId: string | null;
};

const EMPTY_FOCUSED_SOURCE: FocusedSourceContext = {
  assetId: null,
  assetKind: null,
  overrideAssetId: null,
};

export default function VoxelEditor(props: {
  initialWorldId?: string | null;
}) {
  const { initialWorldId = null } = props;

  const { unlock, play, startLoopAt, setLoopVolume, getTime, startLoop } = useSound();

  const [focusOpen, setFocusOpen] = useState(false);
  const [focusedGroupId, setFocusedGroupId] = useState<string | null>(null);

  const requestAutosaveRef = useRef<
    ((opts?: { immediate?: boolean; reason?: string }) => void) | null
  >(null);
  const worldRef = useRef<VoxelWorld | null>(null);

  const exitTimeoutRef = useRef<number | null>(null);

  const [worldReady, setWorldReady] = useState(false);
  const audio = useSoundLoading();
  const [audioReady, audioProgress] = [audio.ready, audio.progress];
  const fullyReady = worldReady && audioReady;

  const progress =
    (worldReady ? 0.5 : 0) +
    (audioReady ? 0.5 : 0.5 * Math.max(0, Math.min(1, audioProgress)));

  const [focusedSource, setFocusedSource] =
    useState<FocusedSourceContext>(EMPTY_FOCUSED_SOURCE);

  const introPlayedRef = useRef(false);
  useEffect(() => {
    if (introPlayedRef.current) return;
    if (!audioReady) return;

    const run = async () => {
      await unlock();
      if (introPlayedRef.current) return;

      introPlayedRef.current = true;
      play("introNewWorld");
    };

    void run();
  }, [audioReady, play, unlock]);

  const ambienceStartedRef = useRef(false);
  useEffect(() => {
    if (ambienceStartedRef.current) return;
    if (!audioReady) return;

    const startAmbience = async () => {
      await unlock();
      if (ambienceStartedRef.current) return;

      const t0 = getTime() + 0.06;

      startLoopAt("amb:world", "ambientWorld", { volume: AMBIENCE_WORLD_VOL }, t0);
      startLoopAt("amb:focus", "ambientFocus", { volume: 0.0 }, t0);
      startLoop("amb:grass", "ambientGrass", { volume: AMBIENCE_GRASS_VOL });
      startLoop("amb:wind", "ambientWindIdle", { volume: AMBIENCE_WIND_VOL });

      ambienceStartedRef.current = true;
    };

    void startAmbience();
  }, [audioReady, unlock, startLoopAt, getTime, startLoop]);

  useEffect(() => {
    if (!audioReady) return;
    setLoopVolume("amb:focus", focusOpen ? AMBIENCE_FOCUS_VOL : 0.0, AMBIENCE_FADE_MS);
  }, [audioReady, focusOpen, setLoopVolume]);

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

    const src = worldRef.current?.getGroupSource(groupId) ?? null;

    setFocusedGroupId(groupId);
    setFocusedSource({
      assetId: src?.assetId ?? null,
      assetKind: src?.assetKind ?? null,
      overrideAssetId: src?.overrideAssetId ?? null,
    });
    setFocusOpen(true);
  }, []);

  const onExitFocus = useCallback(() => {
    setFocusOpen(false);

    if (exitTimeoutRef.current != null) {
      window.clearTimeout(exitTimeoutRef.current);
    }

    exitTimeoutRef.current = window.setTimeout(() => {
      setFocusedGroupId(null);
      setFocusedSource(EMPTY_FOCUSED_SOURCE);
      requestAutosaveRef.current?.({ immediate: true, reason: "focus-exit" });
      exitTimeoutRef.current = null;
    }, FADE_MS);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", backgroundColor: "#368fe4" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: fullyReady ? 1 : 0,
          transition: `opacity ${FADE_MS}ms linear`,
        }}
      >
        <VoxelWorldEditor
          initialWorldId={initialWorldId}
          onFocusGroup={onFocusGroup}
          focusOpen={focusOpen}
          onWorldReady={(w) => {
            worldRef.current = w;
            setWorldReady(true);
          }}
          onRequestAutosaveRef={(fn) => {
            requestAutosaveRef.current = fn;
          }}
        />

        <VoxelPartEditor
          open={focusOpen}
          groupId={focusedGroupId}
          sourceAssetId={focusedSource.assetId}
          sourceAssetKind={focusedSource.assetKind}
          overrideAssetId={focusedSource.overrideAssetId}
          world={worldRef.current}
          onExit={onExitFocus}
        />
      </div>

      <LoadingOverlay
        show={!fullyReady}
        progress={progress}
        text={worldReady ? "loading audio…" : "loading world…"}
        fadeMs={FADE_MS}
      />
    </div>
  );
}