"use client";

import React, { createContext, useContext, useEffect, useMemo } from "react";
import { sound, type SfxId, type PlayOptions } from "./SoundManager";

type SoundAPI = {
  play: (id: SfxId, opts?: PlayOptions) => void;
  unlock: () => Promise<void>;
  startLoop: (key: string, id: SfxId, opts?: PlayOptions) => void;
  stopLoop: (key: string, fadeMs?: number) => void;
};

const Ctx = createContext<SoundAPI | null>(null);

const SOUNDS = {
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
      defaultVolume: 0.85,
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
  };

export function SoundProvider(props: { children: React.ReactNode }) {
  const api = useMemo<SoundAPI>(() => {
    return {
      play: (id, opts) => sound.play(id, opts),
      unlock: () => sound.unlock(),
      startLoop: (key, id, opts) => sound.startLoop(key, id, opts),
      stopLoop: (key, fadeMs) => sound.stopLoop(key, fadeMs),
    };
  }, []);

  useEffect(() => {
    sound.configure(SOUNDS);
    void sound.preload("placeVoxel");
    void sound.preload("deleteVoxel");
    void sound.preload("colorPick");
    void sound.preload("extrudeStart");
    void sound.preload("extrudeLoop");
    void sound.preload("extrudeEnd");
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

  return <Ctx.Provider value={api}>{props.children}</Ctx.Provider>;
}

export function useSound() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useSound must be used within <SoundProvider>");
  return v;
}