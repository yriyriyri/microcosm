"use client";

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { sound, type SfxId, type PlayOptions } from "./SoundManager";

type SoundAPI = {
  play: (id: SfxId, opts?: PlayOptions) => void;
  unlock: () => Promise<void>;
  startLoop: (key: string, id: SfxId, opts?: PlayOptions) => void;
  stopLoop: (key: string, fadeMs?: number) => void;
  startLoopAt: (key: string, id: SfxId, opts: PlayOptions | undefined, startAtTime: number) => void;
  setLoopVolume: (key: string, target: number, fadeMs?: number) => void;
  getTime: () => number;
  click: () => void;
};

type SoundLoadingState = {
  ready: boolean;
  progress: number;
  text: string;
};

const Ctx = createContext<SoundAPI | null>(null);
const LoadCtx = createContext<SoundLoadingState | null>(null);

const SOUNDS = {
  click: {
    kind: "oneshot" as const,
    url: "/audio/S_Clicks/EquipBodyMinusWoosh.wav",
    defaultVolume: 0.8,
    maxConcurrent: 6,
  },
  placeVoxel: {
    kind: "variants" as const,
    urls: [
      "/audio/S_PlaceVoxel/S_PlaceVoxel_Gen5_1.wav",
      "/audio/S_PlaceVoxel/S_PlaceVoxel_Gen5_2.wav",
      "/audio/S_PlaceVoxel/S_PlaceVoxel_Gen5_3.wav",
      "/audio/S_PlaceVoxel/S_PlaceVoxel_Gen5_4.wav",
    ],
    defaultVolume: 0.9,
    maxConcurrent: 10,
    noImmediateRepeat: true,
  },
  deleteVoxel: {
    kind: "oneshot" as const,
    url: "/audio/S_DeleteVoxel/S_DeleteVoxel.wav",
    defaultVolume: 0.75,
    maxConcurrent: 10,
  },
  colorPick: {
    kind: "oneshot" as const,
    url: "/audio/S_ColourPicker/S_ColourPicker_Gen2.wav",
    defaultVolume: 0.9,
    maxConcurrent: 12,
  },
  extrudeStart: {
    kind: "oneshot" as const,
    url: "/audio/S_ExtrudeVoxel/S_ExtrudeStart.wav",
    defaultVolume: 0.9,
    maxConcurrent: 6,
  },
  extrudeLoop: {
    kind: "oneshot" as const,
    url: "/audio/S_ExtrudeVoxel/S_GlitchLoop2.wav",
    defaultVolume: 0.55,
    maxConcurrent: 1,
  },
  extrudeEnd: {
    kind: "oneshot" as const,
    url: "/audio/S_ExtrudeVoxel/S_ExtrudeEnd5_2.wav",
    defaultVolume: 0.9,
    maxConcurrent: 6,
  },
  placePart: {
    kind: "oneshot" as const,
    url: "/audio/S_PlacePart/S_WristUI_Finish.wav",
    defaultVolume: 0.9,
    maxConcurrent: 6,
  },
  deletePart: {
    kind: "oneshot" as const,
    url: "/audio/S_DeletePart/S_WristUI_Finish_Gen2.wav",
    defaultVolume: 0.9,
    maxConcurrent: 6,
  },
  whoosh: {
    kind: "oneshot" as const,
    url: "/audio/S_Whoosh/S_FreeManipulation.wav",
    defaultVolume: 0.5,
    maxConcurrent: 3,
  },
  ambientWorld: {
    kind: "oneshot" as const,
    url: "/audio/S_Ambiance/S_AmbientWorld.wav",
    defaultVolume: 0.3,
    maxConcurrent: 1,
  },
  ambientFocus: {
    kind: "oneshot" as const,
    url: "/audio/S_Ambiance/S_AmbientFocus.wav",
    defaultVolume: 0.3,
    maxConcurrent: 1,
  },
  ambientGrass: {
    kind: "oneshot" as const,
    url: "/audio/S_Ambiance/S_Grass.wav",
    defaultVolume: 1.0,
    maxConcurrent: 1,
  },
  ambientWindIdle: {
    kind: "oneshot" as const,
    url: "/audio/S_Ambiance/S_WindIdle.wav",
    defaultVolume: 1.0,
    maxConcurrent: 1,
  },
  introNewWorld: {
    kind: "oneshot" as const,
    url: "/audio/S_Intro/S_NewWorldUnlocked3.wav",
    defaultVolume: 0.2,
    maxConcurrent: 1,
  },
};

const PRELOAD_IDS: SfxId[] = [
  "introNewWorld",
  "ambientWorld",
  "ambientFocus",
  "ambientGrass",
  "ambientWindIdle",
  "click",
  "whoosh",
  "placeVoxel",
  "deleteVoxel",
  "placePart",
  "deletePart",
  "colorPick",
  "extrudeStart",
  "extrudeLoop",
  "extrudeEnd",
];

export function SoundProvider(props: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<SoundLoadingState>({
    ready: false,
    progress: 0,
    text: "loading audio…",
  });

  const preloadOnceRef = useRef(false);

  const api = useMemo<SoundAPI>(() => {
    return {
      play: (id, opts) => sound.play(id, opts),
      unlock: () => sound.unlock(),
      startLoop: (key, id, opts) => sound.startLoop(key, id, opts),
      stopLoop: (key, fadeMs) => sound.stopLoop(key, fadeMs),
      startLoopAt: (key, id, opts, startAtTime) => sound.startLoopAt(key, id, opts ?? {}, startAtTime),
      setLoopVolume: (key, target, fadeMs) => sound.setLoopVolume(key, target, fadeMs),
      getTime: () => sound.getTime(),
      click: () => sound.play("click", { detune: (Math.random() - 0.5) * 60 }),
    };
  }, []);

  useEffect(() => {
    sound.configure(SOUNDS);

    if (preloadOnceRef.current) return;
    preloadOnceRef.current = true;

    let cancelled = false;

    (async () => {
      const total = PRELOAD_IDS.length;
      let done = 0;

      setLoading({ ready: false, progress: 0, text: `loading audio… (0/${total})` });

      for (const id of PRELOAD_IDS) {
        if (cancelled) return;

        setLoading((s) => ({
          ...s,
          ready: false,
          text: `loading audio: ${id} (${done}/${total})`,
        }));

        try {
          await sound.preload(id);
        } catch (e) {
          console.warn("[audio] preload failed:", id, e);
        }

        done++;
        const p = total ? done / total : 1;

        setLoading((s) => ({
          ...s,
          ready: p >= 1,
          progress: p,
          text: p >= 1 ? "audio ready" : `loading audio… (${done}/${total})`,
        }));
      }

      setLoading({ ready: true, progress: 1, text: "audio ready" });
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const onFirst = () => void sound.unlock();
    window.addEventListener("pointerdown", onFirst, { once: true, capture: true });
    window.addEventListener("keydown", onFirst, { once: true, capture: true });
    return () => {
      window.removeEventListener("pointerdown", onFirst, { capture: true } as any);
      window.removeEventListener("keydown", onFirst, { capture: true } as any);
    };
  }, []);

  return (
    <Ctx.Provider value={api}>
      <LoadCtx.Provider value={loading}>{props.children}</LoadCtx.Provider>
    </Ctx.Provider>
  );
}

export function useSound() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useSound must be used within <SoundProvider>");
  return v;
}

export function useSoundLoading() {
  const v = useContext(LoadCtx);
  if (!v) throw new Error("useSoundLoading must be used within <SoundProvider>");
  return v;
}