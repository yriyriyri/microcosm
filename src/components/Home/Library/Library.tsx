"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PackedGrid, { type PackedGridItem } from "@/components/Home/PackedGrid/PackedGrid";
import CreateNewContainer from "@/components/Home/GridContainers/CreateNewContainer";
import LibraryContainer from "@/components/Home/GridContainers/LibraryContainer";
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
  const [busyId, setBusyId] = useState<string | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [draftNames, setDraftNames] = useState<Record<string, string>>({});

  async function refresh() {
    const rows = await worldRepository.listWorlds();
    setWorlds(rows);
    setDraftNames((prev) => {
      const next = { ...prev };
      for (const row of rows) {
        if (next[row.id] == null) next[row.id] = row.name;
      }
      return next;
    });
  }

  useEffect(() => {
    refresh().catch(console.error);
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
    if (busyId) return;

    try {
      setBusyId("__create_new__");
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
      setBusyId(null);
    }
  }

  function handleOpenWorld(worldId: string) {
    if (busyId) return;
    setPrimaryWorldId(worldId);
    router.push(`/editor/${encodeURIComponent(worldId)}`);
  }

  async function commitRename(world: WorldMetaRecord) {
    const nextName = (draftNames[world.id] ?? world.name).trim();
    setRenamingId(null);

    if (!nextName || nextName === world.name) {
      setDraftNames((prev) => ({ ...prev, [world.id]: world.name }));
      return;
    }

    try {
      setBusyId(world.id);
      await worldRepository.renameWorld(world.id, nextName);
      await refresh();
    } catch (err) {
      console.error("Failed to rename world", err);
      setDraftNames((prev) => ({ ...prev, [world.id]: world.name }));
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(world: WorldMetaRecord) {
    if (busyId) return;
    if (!confirm(`Delete "${world.name}"?`)) return;

    try {
      setBusyId(world.id);
      await worldRepository.deleteWorld(world.id);
      await refresh();
    } catch (err) {
      console.error("Failed to delete world", err);
    } finally {
      setBusyId(null);
    }
  }

  const gridItems: PackedGridItem[] = items.map((item, index) => {
    const size: "small" | "big" = index === 0 ? "big" : "small";

    if (item.kind === "create") {
      return {
        id: item.id,
        size,
        content: (
          <CreateNewContainer
            label={busyId === item.id ? "Creating..." : item.name}
            size={size}
            disabled={busyId !== null}
            onClick={() => {
              click();
              void handleCreateNew();
            }}
          />
        ),
      };
    }

    const world = item.world;

    return {
      id: item.id,
      size,
      content: (
        <LibraryContainer
          worldId={world.id}
          name={world.name}
          size={size}
          isBusy={busyId === world.id}
          isRenaming={renamingId === world.id}
          draftName={draftNames[world.id] ?? world.name}
          onOpen={() => {
            click();
            handleOpenWorld(world.id);
          }}
          onDelete={() => {
            click();
            void handleDelete(world);
          }}
          onRenameChange={(value) =>
            setDraftNames((prev) => ({
              ...prev,
              [world.id]: value,
            }))
          }
          onRenameFocus={() => setRenamingId(world.id)}
          onRenameBlur={() => {
            void commitRename(world);
          }}
          onRenameKeyDown={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.blur();
            }
            if (e.key === "Escape") {
              setDraftNames((prev) => ({
                ...prev,
                [world.id]: world.name,
              }));
              setRenamingId(null);
              e.currentTarget.blur();
            }
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