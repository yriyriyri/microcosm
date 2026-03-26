"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PackedGrid, { type PackedGridItem } from "@/components/Home/PackedGrid/PackedGrid";
import VoxboxContainer from "@/components/Home/VoxboxContainer/VoxboxContainer";
import { worldRepository } from "@/components/VoxelEditor/repositories";
import type { WorldMetaRecord } from "@/components/VoxelEditor/domain/worldTypes";
import { useSound } from "@/components/VoxelEditor/audio/SoundProvider";

const PRIMARY_WORLD_ID_KEY = "voxbox:primaryWorldId";

function setPrimaryWorldId(id: string) {
  try {
    localStorage.setItem(PRIMARY_WORLD_ID_KEY, id);
  } catch {}
}

type LibraryGridItem =
  | {
      kind: "create";
      id: "__create_new__";
      name: string;
    }
  | {
      kind: "world";
      id: string;
      name: string;
      world: WorldMetaRecord;
    };

export default function Library() {
  const router = useRouter();
  const { click } = useSound();

  const [worlds, setWorlds] = useState<WorldMetaRecord[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const rows = await worldRepository.listWorlds();
      if (cancelled) return;
      setWorlds(rows);
    }

    load().catch(console.error);

    return () => {
      cancelled = true;
    };
  }, []);

  const items = useMemo<LibraryGridItem[]>(() => {
    return [
      {
        kind: "create",
        id: "__create_new__",
        name: "Create New",
      },
      ...worlds.map((world) => ({
        kind: "world" as const,
        id: world.id,
        name: world.name,
        world,
      })),
    ];
  }, [worlds]);

  async function handleCreateNew() {
    if (busy) return;

    try {
      setBusy(true);

      const id = await worldRepository.saveWorld({
        name: "My Voxbox",
        data: { instances: [] },
        thumb: null,
      });

      setPrimaryWorldId(id);
      router.push(`/editor/${encodeURIComponent(id)}`);
    } catch (err) {
      console.error("Failed to create world", err);
    } finally {
      setBusy(false);
    }
  }

  function handleOpenWorld(worldId: string) {
    if (busy) return;
    setPrimaryWorldId(worldId);
    router.push(`/editor/${encodeURIComponent(worldId)}`);
  }

  const gridItems: PackedGridItem[] = items.map((item, index) => {
    const size: "small" | "big" = index === 0 ? "big" : "small";

    return {
      id: item.id,
      size,
      content: (
        <VoxboxContainer
          label={item.kind === "create" ? (busy ? "Creating..." : item.name) : item.name}
          size={size}
          onClick={() => {
            click();

            if (item.kind === "create") {
              void handleCreateNew();
              return;
            }

            handleOpenWorld(item.id);
          }}
        />
      ),
    };
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 52,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 20,
        pointerEvents: "auto",
        padding: 16,
        paddingTop: 20,
      }}
    >
      <PackedGrid items={gridItems} />
    </div>
  );
}