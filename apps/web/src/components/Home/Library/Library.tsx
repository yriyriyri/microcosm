"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
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

export default function Library() {
  const router = useRouter();
  const { click } = useSound();

  const [worlds, setWorlds] = useState<WorldMetaRecord[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [draftNames, setDraftNames] = useState<Record<string, string>>({});

  const [isCreateHovered, setIsCreateHovered] = useState(false);
  const createTooltipRef = useRef<HTMLDivElement | null>(null);

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

  const gridItems: PackedGridItem[] = useMemo(() => {
    return worlds.map((world) => ({
      id: world.id,
      size: "small" as const,
      content: (
        <LibraryContainer
          worldId={world.id}
          name={world.name}
          size="small"
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
    }));
  }, [worlds, busyId, renamingId, draftNames, click]);

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
      <div
        ref={createTooltipRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          background: "var(--homepage-dark)",
          color: "var(--homepage-light)",
          borderRadius: 4,
          padding: "8px 10px",
          fontSize: 14,
          lineHeight: 1,
          pointerEvents: "none",
          zIndex: 999,
          whiteSpace: "nowrap",
          opacity: isCreateHovered ? 1 : 0,
          transform: isCreateHovered
            ? "translate3d(0, 0, 0) scale(1)"
            : "translate3d(0, 0, 0) scale(0.86)",
          transformOrigin: "top left",
          transition: "opacity 140ms ease, transform 140ms ease",
          willChange: "transform, opacity",
        }}
      >
        new world!
      </div>

      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          gap: 60,
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            flex: "0 0 20%",
            minWidth: 0,
            height: "100%",
          }}
        >
          <div
            style={{
              width: "100%",
              aspectRatio: "1 / 1",
            }}
            onMouseEnter={() => setIsCreateHovered(true)}
            onMouseLeave={() => setIsCreateHovered(false)}
            onMouseMove={(e) => {
              const el = createTooltipRef.current;
              if (!el) return;
              el.style.left = `${e.clientX + 16}px`;
              el.style.top = `${e.clientY + 16}px`;
            }}
          >
            <CreateNewContainer
              label={busyId === "__create_new__" ? "Creating..." : "Create New"}
              size="big"
              disabled={busyId !== null}
              onClick={() => {
                click();
                void handleCreateNew();
              }}
            />
          </div>
        </div>

        <div
          style={{
            flex: "1 1 80%",
            minWidth: 0,
            height: "100%",
          }}
        >
          <PackedGrid items={gridItems} gap={70} columns={5} />
        </div>
      </div>
    </div>
  );
}