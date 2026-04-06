"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/Addons.js";

import { useSound } from "@/components/VoxelEditor/audio/SoundProvider";

import { VoxelWorld } from "./VoxelWorld";
import type { VoxelCoord } from "./Types";
import { add } from "./Types";
import { assetRepository } from "./repositories";
import type { AssetMetaRecord } from "./domain/assetTypes";

import ColorPalette from "./ui/ColorPalette";
import ToolPalette, { type ToolId } from "./ui/ToolPalette";

// file scope types

type LoopCtx = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
};

// file scope consts

const FOCUS_GROUP_ID = "__focus__";
const SNAPSHOT_SIZE = 1024;

// helpers

function computeLocalBounds(voxels: { local: VoxelCoord }[]) {
  if (!voxels.length) return null;

  let minX = Infinity, minY = Infinity, minZ = Infinity;
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

  for (const v of voxels) {
    const { x, y, z } = v.local;
    minX = Math.min(minX, x); maxX = Math.max(maxX, x);
    minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    minZ = Math.min(minZ, z); maxZ = Math.max(maxZ, z);
  }

  return { minX, minY, minZ, maxX, maxY, maxZ };
}

function recenterCameraOnBounds(params: {
  minX: number;
  minY: number;
  minZ: number;
  maxX: number;
  maxY: number;
  maxZ: number;
  controls: OrbitControls | null;
  camera: THREE.PerspectiveCamera | null;
}) {
  const { minX, minY, minZ, maxX, maxY, maxZ, controls, camera } = params;
  if (!controls || !camera) return;

  const cx = (minX + maxX + 1) / 2;
  const cy = (minY + maxY + 1) / 2;
  const cz = (minZ + maxZ + 1) / 2;

  controls.target.set(cx + 0.5, cy + 0.5, cz + 0.5);
  controls.update();
  camera.lookAt(controls.target);
}

function raycastVoxelGrid(
  world: VoxelWorld,
  ray: THREE.Ray,
  maxDist = 2000,
  maxSteps = 4096
): { coord: VoxelCoord; normal: VoxelCoord; t: number } | null {
  const o = ray.origin;
  const d = ray.direction;

  let x = Math.floor(o.x);
  let y = Math.floor(o.y);
  let z = Math.floor(o.z);

  const stepX = d.x > 0 ? 1 : d.x < 0 ? -1 : 0;
  const stepY = d.y > 0 ? 1 : d.y < 0 ? -1 : 0;
  const stepZ = d.z > 0 ? 1 : d.z < 0 ? -1 : 0;

  const tDeltaX = stepX !== 0 ? Math.abs(1 / d.x) : Infinity;
  const tDeltaY = stepY !== 0 ? Math.abs(1 / d.y) : Infinity;
  const tDeltaZ = stepZ !== 0 ? Math.abs(1 / d.z) : Infinity;

  const nextBoundaryX = stepX > 0 ? x + 1 : x;
  const nextBoundaryY = stepY > 0 ? y + 1 : y;
  const nextBoundaryZ = stepZ > 0 ? z + 1 : z;

  let tMaxX = stepX !== 0 ? (nextBoundaryX - o.x) / d.x : Infinity;
  let tMaxY = stepY !== 0 ? (nextBoundaryY - o.y) / d.y : Infinity;
  let tMaxZ = stepZ !== 0 ? (nextBoundaryZ - o.z) / d.z : Infinity;

  let normal: VoxelCoord = { x: 0, y: 0, z: 0 };
  let t = 0;

  for (let i = 0; i < maxSteps && t <= maxDist; i++) {
    if (world.has({ x, y, z })) return { coord: { x, y, z }, normal, t };

    if (tMaxX < tMaxY) {
      if (tMaxX < tMaxZ) {
        x += stepX;
        t = tMaxX;
        tMaxX += tDeltaX;
        normal = { x: -stepX, y: 0, z: 0 };
      } else {
        z += stepZ;
        t = tMaxZ;
        tMaxZ += tDeltaZ;
        normal = { x: 0, y: 0, z: -stepZ };
      }
    } else {
      if (tMaxY < tMaxZ) {
        y += stepY;
        t = tMaxY;
        tMaxY += tDeltaY;
        normal = { x: 0, y: -stepY, z: 0 };
      } else {
        z += stepZ;
        t = tMaxZ;
        tMaxZ += tDeltaZ;
        normal = { x: 0, y: 0, z: -stepZ };
      }
    }
  }

  return null;
}

export default function VoxelPartEditor(props: {
  open: boolean;
  groupId: string | null;
  sourceAssetId: string | null;
  sourceAssetKind: "draft" | "marketplace" | null;
  overrideAssetId: string | null;
  world: VoxelWorld | null;
  onExit: () => void;
}) {
  const {
    open,
    groupId,
    sourceAssetId,
    sourceAssetKind,
    overrideAssetId,
    world,
    onExit,
  } = props;

  // sound

  const { play, startLoop, stopLoop, click } = useSound();

  // editor ui state

  const [color, setColor] = useState("#34c759");
  const [tool, setTool] = useState<ToolId>("pencil");

  const [sourceAssetMeta, setSourceAssetMeta] = useState<AssetMetaRecord | null>(null);
  const [effectiveAssetMeta, setEffectiveAssetMeta] = useState<AssetMetaRecord | null>(null);

  const [isSavingAsset, setIsSavingAsset] = useState(false);
  const [isSnapshotting, setIsSnapshotting] = useState(false);

  const [hasStructuralChanges, setHasStructuralChanges] = useState(false);

  // derived editor refs

  const colorRef = useRef(color);
  const toolRef = useRef<ToolId>(tool);
  const openRef = useRef(open);

  // three refs

  const mountRef = useRef<HTMLDivElement | null>(null);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const mouseNDC = useMemo(() => new THREE.Vector2(), []);

  const pendingHoverRaycastRef = useRef(false);

  const rafRef = useRef<number | null>(null);

  // focus editing refs

  const focusWorldRef = useRef<VoxelWorld | null>(null);

  const hoverPlaneRef = useRef<THREE.Mesh | null>(null);

  const marqueePreviewRef = useRef<THREE.Mesh | null>(null);
  const marqueeStartRef = useRef<VoxelCoord | null>(null);
  const initialCoordSetRef = useRef<Set<string>>(new Set());

  // media refs

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const warmedRef = useRef(false);

  // dev refs

  const solidifyFocusRef = useRef<(() => void) | null>(null);

  // helpers

  // ref sync helpers

  useEffect(() => void (colorRef.current = color), [color]);
  useEffect(() => void (toolRef.current = tool), [tool]);
  useEffect(() => void (openRef.current = open), [open]);

  // view helpers

  function hideHover() {
    if (hoverPlaneRef.current) hoverPlaneRef.current.visible = false;
  }

  function hideMarqueePreview() {
    if (marqueePreviewRef.current) marqueePreviewRef.current.visible = false;
  }

  function showMarqueePreview(a: VoxelCoord, b: VoxelCoord) {
    const m = marqueePreviewRef.current;
    if (!m) return;

    const minX = Math.min(a.x, b.x);
    const minY = Math.min(a.y, b.y);
    const minZ = Math.min(a.z, b.z);
    const maxX = Math.max(a.x, b.x);
    const maxY = Math.max(a.y, b.y);
    const maxZ = Math.max(a.z, b.z);

    const sx = maxX - minX + 1;
    const sy = maxY - minY + 1;
    const sz = maxZ - minZ + 1;

    m.scale.set(sx, sy, sz);
    m.position.set(minX + sx / 2, minY + sy / 2, minZ + sz / 2);
    m.visible = true;
  }

  // voxel edit helpers

  function getPlacementCoord(hit: { coord: VoxelCoord; normal: VoxelCoord }, w: VoxelWorld): VoxelCoord | null {
    const rec = w.get(hit.coord);

    if (rec?.isBlueprint) return hit.coord;

    const n = hit.normal;
    if (n.x === 0 && n.y === 0 && n.z === 0) return null;

    return add(hit.coord, n);
  }

  function keyOfCoord(c: VoxelCoord): string {
    return `${c.x},${c.y},${c.z}`;
  }

  function rebuildStructuralChangeState() {
    const fw = focusWorldRef.current;
    if (!fw) {
      setHasStructuralChanges(false);
      return;
    }

    const snap = fw.getGroupSnapshot(FOCUS_GROUP_ID);
    const current = new Set<string>();

    for (const v of snap?.voxels ?? []) {
      current.add(keyOfCoord(v.local));
    }

    const initial = initialCoordSetRef.current;

    if (current.size !== initial.size) {
      setHasStructuralChanges(true);
      return;
    }

    for (const k of current) {
      if (!initial.has(k)) {
        setHasStructuralChanges(true);
        return;
      }
    }

    setHasStructuralChanges(false);
  }

  function getFocusedSnapshot() {
    return focusWorldRef.current?.getGroupSnapshot(FOCUS_GROUP_ID) ?? null;
  }

  function commitSnapshotToWorldInstance(snapshot: ReturnType<typeof getFocusedSnapshot>) {
    if (!world || !groupId) return;
    world.setGroupVoxelsLocal(groupId, snapshot?.voxels ?? [], { keepPosition: true });
  }

  // render loop helpers

  function getLoopCtx(): LoopCtx | null {
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    if (!renderer || !scene || !camera || !controls) return null;

    return { renderer, scene, camera, controls };
  }

  function start() {
    stop();

    const ctx = getLoopCtx();
    if (!ctx) return;

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);

      ctx.controls.update();

      if (pendingHoverRaycastRef.current) {
        pendingHoverRaycastRef.current = false;
        updateHoverFace();
      }

      ctx.renderer.render(ctx.scene, ctx.camera);
    };

    tick();
  }

  function stop() {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }

  // raycast helpers

  function updateHoverFace() {
    const hp = hoverPlaneRef.current;
    const w = focusWorldRef.current;
    if (!hp || !w) return;

    const hit = raycastVoxelGrid(w, raycaster.ray, 2000, 4096);

    if (!hit || (hit.normal.x === 0 && hit.normal.y === 0 && hit.normal.z === 0)) {
      hideHover();
      if (toolRef.current === "marquee") hideMarqueePreview();
      return;
    }

    const n = new THREE.Vector3(hit.normal.x, hit.normal.y, hit.normal.z).normalize();
    hp.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), n);

    hp.position.set(hit.coord.x + 0.5, hit.coord.y + 0.5, hit.coord.z + 0.5);
    hp.position.addScaledVector(n, 0.501);
    hp.visible = true;

    if (toolRef.current === "marquee") {
      const placeAt = getPlacementCoord(hit, w);
      if (marqueeStartRef.current && placeAt) showMarqueePreview(marqueeStartRef.current, placeAt);
      else if (!marqueeStartRef.current) hideMarqueePreview();
    }
  }

  // thumbnail snapshot helpers

  async function captureCurrentViewSquarePng(size: number): Promise<Blob> {
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const controls = controlsRef.current;
  
    if (!renderer || !scene || !camera || !controls) {
      throw new Error("Snapshot renderer state unavailable");
    }
  
    controls.update();
  
    const aspect = camera.aspect || 1;
  
    const renderWidth =
      aspect >= 1 ? Math.ceil(size * aspect) : size;
  
    const renderHeight =
      aspect >= 1 ? size : Math.ceil(size / aspect);
  
    const prevSize = new THREE.Vector2();
    renderer.getSize(prevSize);
    const prevPixelRatio = renderer.getPixelRatio();
    const prevViewport = renderer.getViewport(new THREE.Vector4());
    const prevScissor = renderer.getScissor(new THREE.Vector4());
    const prevScissorTest = renderer.getScissorTest();
  
    const target = new THREE.WebGLRenderTarget(renderWidth, renderHeight, {
      depthBuffer: true,
      stencilBuffer: false,
      colorSpace: THREE.SRGBColorSpace,
    });
  
    try {
      renderer.setRenderTarget(target);
      renderer.setViewport(0, 0, renderWidth, renderHeight);
      renderer.setScissor(0, 0, renderWidth, renderHeight);
      renderer.setScissorTest(false);
      renderer.render(scene, camera);
      renderer.setRenderTarget(null);
  
      const pixels = new Uint8Array(renderWidth * renderHeight * 4);
      renderer.readRenderTargetPixels(
        target,
        0,
        0,
        renderWidth,
        renderHeight,
        pixels
      );
  
      const sourceCanvas = document.createElement("canvas");
      sourceCanvas.width = renderWidth;
      sourceCanvas.height = renderHeight;
  
      const sourceCtx = sourceCanvas.getContext("2d");
      if (!sourceCtx) {
        throw new Error("Failed to create snapshot source canvas context");
      }
  
      const imageData = sourceCtx.createImageData(renderWidth, renderHeight);
  
      for (let y = 0; y < renderHeight; y += 1) {
        const srcRow = renderHeight - 1 - y;
        const dstOffset = y * renderWidth * 4;
        const srcOffset = srcRow * renderWidth * 4;
        imageData.data.set(
          pixels.subarray(srcOffset, srcOffset + renderWidth * 4),
          dstOffset
        );
      }
  
      sourceCtx.putImageData(imageData, 0, 0);
  
      const cropSize = Math.min(renderWidth, renderHeight);
      const cropX = Math.floor((renderWidth - cropSize) / 2);
      const cropY = Math.floor((renderHeight - cropSize) / 2);
  
      const outputCanvas = document.createElement("canvas");
      outputCanvas.width = size;
      outputCanvas.height = size;
  
      const outputCtx = outputCanvas.getContext("2d");
      if (!outputCtx) {
        throw new Error("Failed to create snapshot output canvas context");
      }
  
      outputCtx.imageSmoothingEnabled = false;
      outputCtx.drawImage(
        sourceCanvas,
        cropX,
        cropY,
        cropSize,
        cropSize,
        0,
        0,
        size,
        size
      );
  
      const blob = await new Promise<Blob | null>((resolve) =>
        outputCanvas.toBlob(resolve, "image/png")
      );
  
      if (!blob) throw new Error("Failed to encode snapshot PNG");
      return blob;
    } finally {
      target.dispose();
      renderer.setRenderTarget(null);
      renderer.setPixelRatio(prevPixelRatio);
      renderer.setSize(prevSize.x, prevSize.y, false);
      renderer.setViewport(prevViewport);
      renderer.setScissor(prevScissor);
      renderer.setScissorTest(prevScissorTest);
    }
  }
  
  async function handleSnapshot() {
    const fw = focusWorldRef.current;
    const effectiveAssetIdNow = effectiveAssetId;
  
    if (!fw || !effectiveAssetIdNow) return;
  
    const snapshotBefore = fw.getGroupSnapshot(FOCUS_GROUP_ID);
    const voxels = snapshotBefore?.voxels ?? [];
    if (!voxels.length) return;
  
    try {
      setIsSnapshotting(true);
  
      for (const v of voxels) {
        fw.setIsBlueprint(v.local, false);
      }
  
      pendingHoverRaycastRef.current = true;
  
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  
      const thumb = await captureCurrentViewSquarePng(SNAPSHOT_SIZE);
  
      await assetRepository.updateAssetThumbnail({
        assetId: effectiveAssetIdNow,
        thumb,
      });
  
      const nextMeta = await assetRepository.getAssetMeta(effectiveAssetIdNow);
      if (nextMeta) {
        setEffectiveAssetMeta(nextMeta);
        if (sourceAssetMeta?.id === effectiveAssetIdNow) {
          setSourceAssetMeta(nextMeta);
        }
      }
  
      play("placeVoxel");
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Snapshot failed");
    } finally {
      const restoreSnap = fw.getGroupSnapshot(FOCUS_GROUP_ID);
      const restoreVoxels = restoreSnap?.voxels ?? [];
      for (const v of restoreVoxels) {
        fw.setIsBlueprint(v.local, true);
      }
      pendingHoverRaycastRef.current = true;
      setIsSnapshotting(false);
    }
  }

  // asset / save flows

  async function saveInstanceOnlyStructuralOverride(
    snapshot: NonNullable<ReturnType<typeof getFocusedSnapshot>>
  ) {
    if (!world || !groupId) return;

    const existingOverrideId = currentOverrideAssetId;

    let nextOverrideId: string;

    if (existingOverrideId) {
      nextOverrideId = await assetRepository.overwritePrivateAssetContent({
        assetId: existingOverrideId,
        group: snapshot,
      });
    } else {
      nextOverrideId = await assetRepository.saveAsset({
        name: effectiveAssetMeta?.name
          ? `${effectiveAssetMeta.name} Instance Override`
          : sourceAssetMeta?.name
            ? `${sourceAssetMeta.name} Instance Override`
            : "Instance Override",
        group: snapshot,
        thumb: null,
        visibility: "private",
        inLibrary: false,
        isImmutable: false,
        sourceAssetId: sourceAssetMeta?.id ?? sourceAssetId ?? null,
        linkedMarketplaceAssetId: null,
        lineageAssetIds: effectiveAssetMeta?.lineageAssetIds
          ?? sourceAssetMeta?.lineageAssetIds
          ?? [],
        forceNewId: true,
      });
    }

    world.setGroupSource(groupId, {
      overrideAssetId: nextOverrideId,
    });
  }

  async function handleOverwriteAsset() {
    const snapshot = getFocusedSnapshot();
    if (!snapshot || !world || !groupId || !sourceAssetMeta) return;
    if (!sourceAssetIsStructurallyOverwritable) return;

    const overrideIdToDelete = currentOverrideAssetId;
    const originalSourceAssetId = sourceAssetMeta.id;

    try {
      setIsSavingAsset(true);

      const nextId = await assetRepository.overwritePrivateAssetContent({
        assetId: originalSourceAssetId,
        group: snapshot,
      });

      world.setGroupSource(groupId, {
        assetId: nextId,
        assetKind: "draft",
        overrideAssetId: null,
      });

      await world.refreshInstancesFromSourceAsset({
        sourceAssetId: originalSourceAssetId,
        nextAssetId: nextId,
        nextAssetKind: "draft",
        includeOverridden: false,
      });

      if (overrideIdToDelete) {
        await assetRepository.deleteAsset(overrideIdToDelete);
      }

      onExit();
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Overwrite failed");
    } finally {
      setIsSavingAsset(false);
    }
  }

  async function handleRemixAsset() {
    const snapshot = getFocusedSnapshot();
    if (!snapshot || !world || !groupId) return;

    const remixBaseMeta = canonicalRemixBaseMeta;
    const baseName = remixBaseMeta?.name ?? "Remixed Asset";

    const lineageAssetIds = [
      ...(remixBaseMeta?.lineageAssetIds ?? []),
      ...(remixBaseMeta?.id ? [remixBaseMeta.id] : []),
    ].filter((v, i, arr) => !!v && arr.indexOf(v) === i);

    try {
      setIsSavingAsset(true);

      const nextId = await assetRepository.remixAssetFromSource({
        sourceAssetId: remixBaseMeta?.id ?? null,
        lineageAssetIds,
        name: `${baseName} Remix`,
        group: snapshot,
      });

      commitSnapshotToWorldInstance(snapshot);

      world.setGroupSource(groupId, {
        assetId: nextId,
        assetKind: "draft",
        overrideAssetId: null,
      });

      onExit();
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Remix failed");
    } finally {
      setIsSavingAsset(false);
    }
  }

  async function commitAndExit() {
    play("whoosh");

    const snapshot = getFocusedSnapshot();
    commitSnapshotToWorldInstance(snapshot);

    if (!snapshot) {
      onExit();
      return;
    }

    const liveWorld = world;
    if (!liveWorld) {
      onExit();
      return;
    }

    try {
      setIsSavingAsset(true);

      if (isEditingOverride) {
        if (effectiveAssetMeta && effectiveAssetIsMutablePrivate) {
          await assetRepository.overwritePrivateAssetContent({
            assetId: effectiveAssetMeta.id,
            group: snapshot,
          });
        }
      } else {
        if (!hasStructuralChanges) {
          if (sourceAssetMeta && sourceAssetIsMutablePrivate) {
            const sourceId = sourceAssetMeta.id;

            await assetRepository.saveNonStructuralAssetProgress({
              assetId: sourceId,
              group: snapshot,
            });

            await liveWorld.refreshInstancesFromSourceAsset({
              sourceAssetId: sourceId,
              nextAssetId: sourceId,
              nextAssetKind: "draft",
              includeOverridden: false,
            });
          }
        } else {
          await saveInstanceOnlyStructuralOverride(snapshot);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingAsset(false);
    }

    onExit();
  }

  // derived booleans

  const currentGroupSource =
    world && groupId ? world.getGroupSource(groupId) : null;

  const currentOverrideAssetId =
    currentGroupSource?.overrideAssetId ?? overrideAssetId ?? null;

  const isEditingOverride =
    !!currentOverrideAssetId;

  const effectiveAssetId =
    currentOverrideAssetId ?? sourceAssetId ?? null;

  const sourceAssetIsMutablePrivate =
    !!sourceAssetMeta &&
    sourceAssetMeta.visibility === "private" &&
    !sourceAssetMeta.isImmutable;

  const sourceAssetIsStructurallyOverwritable =
    !!sourceAssetMeta &&
    sourceAssetMeta.visibility === "private" &&
    !sourceAssetMeta.linkedMarketplaceAssetId &&
    !sourceAssetMeta.isImmutable;

  const effectiveAssetIsMutablePrivate =
    !!effectiveAssetMeta &&
    effectiveAssetMeta.visibility === "private" &&
    !effectiveAssetMeta.isImmutable;

  const showRemixButton =
    hasStructuralChanges && !!effectiveAssetMeta;

  const showOverwriteButton =
    hasStructuralChanges && sourceAssetIsStructurallyOverwritable;

  const canonicalRemixBaseMeta =
    sourceAssetMeta ?? effectiveAssetMeta ?? null;

  const displayAssetName =
    effectiveAssetMeta?.name ??
    sourceAssetMeta?.name ??
    (effectiveAssetId ? "Unknown Asset" : "Untitled Asset");

  // keyboard interaction guards 

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const el = e.target as HTMLElement | null;
      const tag = el?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || el?.isContentEditable) return;

      const k = e.key.toLowerCase();
      let next: ToolId | null = null;
      if (k === "q") next = "pencil";
      if (k === "e") next = "eyedropper";
      if (k === "w") next = "marquee";
      if (!next) return;

      if (toolRef.current === "marquee" && next !== "marquee") {
        const hadSelection = marqueeStartRef.current != null;
        marqueeStartRef.current = null;
        if (marqueePreviewRef.current) marqueePreviewRef.current.visible = false;
        if (hadSelection) {
          stopLoop("VoxelPartEditor:extrude", 80);
          play("extrudeEnd");
        }
      }

      click();
      setTool(next);
      toolRef.current = next;
      e.preventDefault();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        commitAndExit();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, groupId, world]);

  // main three js boot

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // scene boot

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, mount.clientWidth / mount.clientHeight, 0.1, 2000);
    camera.position.set(40, 40, 40);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const preventContextMenu = (e: Event) => e.preventDefault();
    renderer.domElement.addEventListener("contextmenu", preventContextMenu);

    // lighting

    scene.add(new THREE.AmbientLight(0xffffff, 2.2));
    const dir = new THREE.DirectionalLight(0xffffff, 3.5);
    dir.castShadow = true;
    dir.shadow.bias = -0.0005;
    dir.shadow.mapSize.set(512, 512);
    dir.position.setFromSphericalCoords(
      150,
      THREE.MathUtils.degToRad(80),
      THREE.MathUtils.degToRad(-29)
    );
    dir.target.position.set(0, 0, 80);
    scene.add(dir.target);
    scene.add(dir);

    const hdriLoader = new RGBELoader();
    hdriLoader.load(
      "/world/DayInTheClouds1K.hdr",
      (texture) => {
        const pmrem = new THREE.PMREMGenerator(renderer);
        const rt = pmrem.fromEquirectangular(texture);
        texture.dispose();
        pmrem.dispose();

        scene.environment = rt.texture;
        (scene.environment as any).colorSpace = THREE.SRGBColorSpace;
      },
      undefined,
      (err) => console.error("Failed to load HDRI", err)
    );

    // controls 

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 0, 0);
    controls.update();
    controlsRef.current = controls;

    // focused world boot

    const fw = new VoxelWorld(scene);
    focusWorldRef.current = fw;

    fw.addGroup(FOCUS_GROUP_ID, { x: 0, y: 0, z: 0 });

    // dev helpers 

    solidifyFocusRef.current = () => {
      const fw2 = focusWorldRef.current;
      if (!fw2) return;

      const snap = fw2.getGroupSnapshot(FOCUS_GROUP_ID);
      const voxels = snap?.voxels ?? [];

      for (const v of voxels) fw2.setIsBlueprint(v.local, false);

      console.log(`[dev] solidified focus voxels: ${voxels.length}`);
      pendingHoverRaycastRef.current = true;
    };

    (window as any).voxSolidFocus = () => solidifyFocusRef.current?.();
    console.log("[dev] window.voxSolidFocus() ready");

    // hover + marquee preview meshes

    const hoverMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#7dd3fc"),
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    });
    hoverMat.polygonOffset = true;
    hoverMat.polygonOffsetFactor = -1;
    hoverMat.polygonOffsetUnits = -1;

    const hoverPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), hoverMat);
    hoverPlane.visible = false;
    hoverPlane.renderOrder = 999;
    scene.add(hoverPlane);
    hoverPlaneRef.current = hoverPlane;

    const previewGeom = new THREE.BoxGeometry(1, 1, 1);
    const previewMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#60a5fa"),
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
    });
    previewMat.polygonOffset = true;
    previewMat.polygonOffsetFactor = -1;
    previewMat.polygonOffsetUnits = -1;

    const previewMesh = new THREE.Mesh(previewGeom, previewMat);
    previewMesh.visible = false;
    previewMesh.renderOrder = 998;

    const previewEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(previewGeom),
      new THREE.LineBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.35 })
    );
    previewMesh.add(previewEdges);

    scene.add(previewMesh);
    marqueePreviewRef.current = previewMesh;

    // pointer math helpers

    function setMouseFromEvent(e: PointerEvent) {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseNDC.set(x, y);
    }

    function updateRayFromMouse(e: PointerEvent) {
      setMouseFromEvent(e);
      raycaster.setFromCamera(mouseNDC, camera);
    }

    // edit helpers

    function fillBox(a: VoxelCoord, b: VoxelCoord, w: VoxelWorld, color: string) {
      const minX = Math.min(a.x, b.x);
      const minY = Math.min(a.y, b.y);
      const minZ = Math.min(a.z, b.z);
      const maxX = Math.max(a.x, b.x);
      const maxY = Math.max(a.y, b.y);
      const maxZ = Math.max(a.z, b.z);

      for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
          for (let z = minZ; z <= maxZ; z++) {
            const c: VoxelCoord = { x, y, z };
            const rec = w.get(c);

            if (rec?.isBlueprint) {
              w.setColor(c, color);
              w.setIsBlueprint(c, false);
            } else if (!rec) {
              w.addVoxel(c, color, { groupId: FOCUS_GROUP_ID });
            }
          }
        }
      }
    }

    // pointer handlers

    function onPointerMove(e: PointerEvent) {
      if (!openRef.current) return;
      updateRayFromMouse(e);
      pendingHoverRaycastRef.current = true;
    }

    function onPointerLeave() {
      hideHover();
    }

    // pointer tool handlers

    function onPointerDown(e: PointerEvent) {
      if (!openRef.current) return;

      updateRayFromMouse(e);

      const w = focusWorldRef.current;
      if (!w) return;

      const hit = raycastVoxelGrid(w, raycaster.ray, 2000, 4096);
      const activeTool = toolRef.current;

      if (activeTool === "eyedropper") {
        if (e.button !== 0) return;

        if (hit) {
          const rec = w.get(hit.coord);
          if (rec) {
            setColor(rec.color);
            colorRef.current = rec.color;
            play("colorPick");
          }
        }

        pendingHoverRaycastRef.current = true;
        return;
      }

      if (activeTool === "marquee") {
        if (e.button === 2) {
          if (marqueeStartRef.current) {
            marqueeStartRef.current = null;
            hideMarqueePreview();
            stopLoop("VoxelPartEditor:extrude", 80);
            play("extrudeEnd");
            pendingHoverRaycastRef.current = true;
          }
          return;
        }

        if (e.button !== 0) return;
        if (!hit) return;

        const placeAt = getPlacementCoord(hit, w);
        if (!placeAt) return;

        if (!marqueeStartRef.current) {
          marqueeStartRef.current = placeAt;
          showMarqueePreview(placeAt, placeAt);
          play("extrudeStart");
          startLoop("VoxelPartEditor:extrude", "extrudeLoop");
          pendingHoverRaycastRef.current = true;
          return;
        }

        fillBox(marqueeStartRef.current, placeAt, w, colorRef.current);
        rebuildStructuralChangeState();
        marqueeStartRef.current = null;
        hideMarqueePreview();
        stopLoop("VoxelPartEditor:extrude", 80);
        play("extrudeEnd");
        pendingHoverRaycastRef.current = true;
        return;
      }

      if (e.button === 2) {
        if (hit) {
          w.removeVoxel(hit.coord);
          rebuildStructuralChangeState();
          play("deleteVoxel", { detune: Math.random() * 80 - 40 });
        }
        pendingHoverRaycastRef.current = true;
        return;
      }

      if (e.button === 0) {
        if (!hit) return;

        const rec = w.get(hit.coord);

        if (rec?.isBlueprint) {
          w.setColor(hit.coord, colorRef.current);
          w.setIsBlueprint(hit.coord, false);
          rebuildStructuralChangeState();
          play("placeVoxel");
        } else {
          const n = hit.normal;
          if (n.x !== 0 || n.y !== 0 || n.z !== 0) {
            const placeAt = add(hit.coord, n);

            const target = w.get(placeAt);
            if (target?.isBlueprint) {
              w.setColor(placeAt, colorRef.current);
              w.setIsBlueprint(placeAt, false);
              rebuildStructuralChangeState();
            } else if (!target) {
              w.addVoxel(placeAt, colorRef.current, { groupId: FOCUS_GROUP_ID });
              rebuildStructuralChangeState();
              play("placeVoxel");
            }
          }
        }

        pendingHoverRaycastRef.current = true;
      }
    }

    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerleave", onPointerLeave);
    renderer.domElement.addEventListener("pointerdown", onPointerDown);

    // resize handler

    const onResize = () => {
      const m = mountRef.current;
      const cam = cameraRef.current;
      const r = rendererRef.current;
      if (!m || !cam || !r) return;

      const w = m.clientWidth;
      const h = m.clientHeight;
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
      r.setSize(w, h);
      r.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      pendingHoverRaycastRef.current = true;
    };
    window.addEventListener("resize", onResize);

    // cleanup

    return () => {
      window.removeEventListener("resize", onResize);

      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerleave", onPointerLeave);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("contextmenu", preventContextMenu);

      if (hoverPlaneRef.current) {
        scene.remove(hoverPlaneRef.current);
        (hoverPlaneRef.current.geometry as THREE.BufferGeometry).dispose();
        (hoverPlaneRef.current.material as THREE.Material).dispose();
        hoverPlaneRef.current = null;
      }

      if (marqueePreviewRef.current) {
        scene.remove(marqueePreviewRef.current);
        (marqueePreviewRef.current.geometry as THREE.BufferGeometry).dispose();
        (marqueePreviewRef.current.material as THREE.Material).dispose();
        marqueePreviewRef.current = null;
      }

      focusWorldRef.current?.dispose();
      focusWorldRef.current = null;

      controls.dispose();
      controlsRef.current = null;

      cameraRef.current = null;
      rendererRef.current = null;
      sceneRef.current = null;

      try {
        delete (window as any).voxSolidFocus;
      } catch {}

      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // focus group session sync

  useEffect(() => {
    if (!open) return;
    if (!groupId) return;
    if (!world) return;

    const fw = focusWorldRef.current;
    const controls = controlsRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;
    const mount = mountRef.current;
    if (!fw || !controls || !camera || !renderer || !mount) return;

    marqueeStartRef.current = null;
    hideMarqueePreview();
    hideHover();

    const w = mount.clientWidth;
    const h = mount.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const snapshot = world.getGroupSnapshot(groupId);
    const localVoxels = snapshot?.voxels ?? [];

    fw.setGroupVoxelsLocal(FOCUS_GROUP_ID, localVoxels, { keepPosition: false });

    const initial = new Set<string>();
    for (const v of localVoxels) {
      initial.add(keyOfCoord(v.local));
    }
    initialCoordSetRef.current = initial;
    setHasStructuralChanges(false);

    const b = computeLocalBounds(localVoxels);
    if (b) {
      recenterCameraOnBounds({
        minX: b.minX,
        minY: b.minY,
        minZ: b.minZ,
        maxX: b.maxX,
        maxY: b.maxY,
        maxZ: b.maxZ,
        controls,
        camera,
      });

      const span = Math.max(b.maxX - b.minX + 1, b.maxY - b.minY + 1, b.maxZ - b.minZ + 1);
      camera.position.set(
        controls.target.x + span * 1.6,
        controls.target.y + span * 1.15,
        controls.target.z + span * 1.35
      );
      camera.lookAt(controls.target);
    } else {
      controls.target.set(0, 0, 0);
      controls.update();
      camera.position.set(20, 20, 20);
      camera.lookAt(0, 0, 0);
    }

    pendingHoverRaycastRef.current = true;
  }, [open, groupId, world]);

  // asset metadata sync

  useEffect(() => {
    let cancelled = false;

    if (!open) {
      setSourceAssetMeta(null);
      setEffectiveAssetMeta(null);
      return;
    }

    (async () => {
      try {
        const [sourceMeta, effectiveMeta] = await Promise.all([
          sourceAssetId ? assetRepository.getAssetMeta(sourceAssetId) : Promise.resolve(null),
          effectiveAssetId ? assetRepository.getAssetMeta(effectiveAssetId) : Promise.resolve(null),
        ]);

        if (cancelled) return;

        setSourceAssetMeta(sourceMeta);
        setEffectiveAssetMeta(effectiveMeta);
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setSourceAssetMeta(null);
          setEffectiveAssetMeta(null);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [open, sourceAssetId, effectiveAssetId]);

  // loop lifecycle 

  useEffect(() => {
    if (!open) {
      stop();
      return;
    }
    start();
    return () => stop();
  }, [open]);

  // video lifecycle

  useEffect(() => {
    const v = videoRef.current;
    if (!v || warmedRef.current) return;

    warmedRef.current = true;

    v.preload = "auto";
    v.load();

    const p = v.play();
    if (p && typeof (p as any).catch === "function") {
      (p as any).catch(() => {});
    }

    v.pause();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (open) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [open]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10,
        pointerEvents: open ? "auto" : "none",
        opacity: open ? 1 : 0,
        transition: "opacity 120ms linear",
        background: "transparent",
      }}
      aria-hidden={!open}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: open ? 0.8 : 0,
          transition: "opacity 120ms linear",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <source src="/focus/screen.mp4" type="video/mp4" />
      </video>

      <div
        ref={mountRef}
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          userSelect: "none",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "15vh",
          left: 0,
          padding: 12,
          pointerEvents: "auto",
          zIndex: 2,
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <ColorPalette value={color} onChange={setColor} />

            <div style={{ height: "5vh" }} />

            <ToolPalette value={tool} onChange={setTool} />
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 40,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          width: "min(900px, 92vw)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            color: "#00324c",
            fontSize: 30,
            lineHeight: 1,
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            userSelect: "none",
            maxWidth: "80vw",
          }}
          title={displayAssetName}
        >
          {`> ${displayAssetName} <`}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            flexWrap: "wrap",
            pointerEvents: "auto",
          }}
        >
          <div
            className="pix-icon"
            onClick={isSnapshotting || !effectiveAssetId ? undefined : handleSnapshot}
            style={{
              padding: "5px 8px",
              borderRadius: 5,
              background: "rgba(0, 50, 110, 0.5)",
              color: "white",
              fontSize: 19,
              userSelect: "none",
              cursor: isSnapshotting || !effectiveAssetId ? "default" : "pointer",
              opacity: isSnapshotting || !effectiveAssetId ? 0.6 : 1,
              whiteSpace: "nowrap",
            }}
          >
            snapshot
          </div>

          {(showOverwriteButton || showRemixButton) && (
            <>
              {showOverwriteButton && (
                <div
                  className="pix-icon"
                  onClick={isSavingAsset ? undefined : handleOverwriteAsset}
                  style={{
                    padding: "5px 5px",
                    borderRadius: 5,
                    background: "rgba(0, 50, 110, 0.5)",
                    color: "white",
                    fontSize: 19,
                    userSelect: "none",
                    cursor: isSavingAsset ? "default" : "pointer",
                    opacity: isSavingAsset ? 0.6 : 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  overwrite
                </div>
              )}

              {showRemixButton && (
                <div
                  className="pix-icon"
                  onClick={isSavingAsset ? undefined : handleRemixAsset}
                  style={{
                    padding: "5px 8px",
                    borderRadius: 5,
                    background: "rgba(0, 50, 110, 0.5)",
                    color: "white",
                    fontSize: 19,
                    userSelect: "none",
                    cursor: isSavingAsset ? "default" : "pointer",
                    opacity: isSavingAsset ? 0.6 : 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  remix
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 50,
          transform: "translateX(-50%)",
          zIndex: 2,
          pointerEvents: "auto",
        }}
      >
        <div
          className="pix-icon"
          onClick={commitAndExit}
          style={{
            padding: "10px 14px",
            borderRadius: 5,
            background: "rgba(0, 50, 110, 0.5)",
            color: "white",
            fontSize: 20,
            userSelect: "none",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          world mode
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          padding: "15px 15px",
          color: "black",
          fontSize: 16,
          lineHeight: 1.4,
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
      </div>
    </div>
  );
}