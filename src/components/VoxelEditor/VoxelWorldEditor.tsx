"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader, RGBELoader } from "three/examples/jsm/Addons.js";

import { useAuthState } from "@/components/Auth/state";
import { useSound } from "@/components/VoxelEditor/audio/SoundProvider";
import { publishWorld } from "@/services/publishedWorlds";

import { applyHeightMistToStandardMaterial } from "@/materials/heightMist";

import { VoxelWorld } from "./VoxelWorld";
import type { GroupState } from "./VoxelWorld";
import type { VoxelCoord } from "./Types";
import { assetRepository, worldRepository } from "./repositories";
import { parseVox } from "./vox/voxImport";

import LibraryPanel from "./ui/LibraryPanel";
import AdminAssetsPanel from "./ui/AdminAssetsPanel";
import AssetsPanel from "./ui/AssetsPanel";
import GlyphsPanel, { type GlyphRecord } from "./ui/GlyphsPanel";
import MarketplacePanel from "./ui/MarketplacePanel";
import WorldToolPalette, { type WorldToolId } from "./ui/WorldToolPalette";

type PendingImport = {
  fileName: string;
  groups: {
    groupId: string;
    position: VoxelCoord;
    voxels: { x: number; y: number; z: number; color: string }[];
  }[];
};

type PendingPlacement = {
  metaId: string;
  metaName: string;
  metaKind: "draft" | "marketplace";
  group: GroupState;
};

//helpers

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

function getPrimaryWorldId(): string | null {
  try { return localStorage.getItem(PRIMARY_WORLD_ID_KEY); } catch { return null; }
}

function setPrimaryWorldId(id: string) {
  try { localStorage.setItem(PRIMARY_WORLD_ID_KEY, id); } catch {}
}

//file scope consts

const PRIMARY_WORLD_ID_KEY = "voxbox:primaryWorldId";
const ADMIN = false;

export default function VoxelWorldEditor(props: {
  initialWorldId?: string | null;
  onFocusGroup: (groupId: string) => void;
  focusOpen: boolean;
  onWorldReady?: (world: VoxelWorld | null) => void;
  onRequestAutosaveRef?: (fn: (opts?: { immediate?: boolean; reason?: string }) => void) => void;
}) {

  const { initialWorldId = null, onFocusGroup, focusOpen } = props;

  // app / auth / sound
  
  const { unlock, play, startLoopAt, setLoopVolume, getTime, startLoop, click } = useSound();
  const { me } = useAuthState();
  const [publishing, setPublishing] = useState(false);
  
  // three / rendering
  
  const mountRef = useRef<HTMLDivElement | null>(null);
  
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const mouseNDC = useMemo(() => new THREE.Vector2(), []);
  
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  
  const islandRootRef = useRef<THREE.Object3D | null>(null);
  const envMapRef = useRef<THREE.Texture | null>(null);
  const envRTRef = useRef<THREE.WebGLRenderTarget | null>(null);
  
  // world / session
  
  const worldRef = useRef<VoxelWorld | null>(null);
  const currentIslandIdRef = useRef<string | null>(null);
  
  const [islandName, setIslandName] = useState("My Voxbox");
  const [importModal, setImportModal] = useState<PendingImport | null>(null);
  
  // panel ui
  
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [assetsOpen, setAssetsOpen] = useState(false);
  const [glyphsOpen, setGlyphsOpen] = useState(false);
  const [marketplaceOpen, setMarketplaceOpen] = useState(false);

  // derived ui refs

  const glyphsOpenRef = useRef(glyphsOpen);
  
  // placement
  
  const [placingLabel, setPlacingLabel] = useState<string | null>(null);
  const placingAssetRef = useRef<PendingPlacement | null>(null);
  const placingGlyphRef = useRef<GlyphRecord | null>(null);

  const placementPreviewObjectUrlRef = useRef<string | null>(null);
  const [placementPreview, setPlacementPreview] = useState<{ thumbUrl: string | null; x: number; y: number; kind: "asset" | "glyph"; } | null>(null);
  
  // selection / hover helpers
  
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [hoveredGroupId, setHoveredGroupId] = useState<string | null>(null);

  const selectedGroupIdLiveRef = useRef<string | null>(null);
  const hoveredGroupIdLiveRef = useRef<string | null>(null);

  const [selectedGlyphGroupId, setSelectedGlyphGroupId] = useState<string | null>(null);
  const [hoveredGlyphGroupId, setHoveredGlyphGroupId] = useState<string | null>(null);

  const selectedGlyphGroupIdLiveRef = useRef<string | null>(null);
  const hoveredGlyphGroupIdLiveRef = useRef<string | null>(null);
  
  const selectedBoxRef = useRef<THREE.Box3Helper | null>(null);
  const hoverBoxRef = useRef<THREE.Box3Helper | null>(null);
  const pendingGroupBoxesSyncRef = useRef(false);

  const selectedGlyphOutlineRef = useRef<THREE.LineLoop | null>(null);
  const hoverGlyphOutlineRef = useRef<THREE.LineLoop | null>(null);
  const pendingGlyphOutlineSyncRef = useRef(false);

  // glyph visualization

  const glyphTextureCacheRef = useRef<Map<string, THREE.Texture>>(new Map());
  const glyphSpriteMapRef = useRef<Map<string, THREE.Sprite>>(new Map());
  const pendingGlyphSpritesSyncRef = useRef(false);
  
  // autosave
  
  const AUTOSAVE_DEBOUNCE_MS = 1800;
  const AUTOSAVE_MAX_INTERVAL_MS = 25000;
  
  const dirtyRef = useRef(false);
  const autosaveTimerRef = useRef<number | null>(null);
  const lastSaveAtRef = useRef<number>(0);
  const autosaveInFlightRef = useRef(false);
  const autosaveQueuedRef = useRef(false);
  
  // editor tools / interaction
  
  const [worldTool, setWorldTool] = useState<WorldToolId>("planemovement");
  const worldToolRef = useRef<WorldToolId>("planemovement");
  
  // drag state
  
  const dragRef = useRef<{
    active: boolean;
    pointerId: number;
    groupId: string | null;
    mode: "plane" | "up";
    startGroupPos: VoxelCoord;
    startHitPoint?: THREE.Vector3;
    plane?: THREE.Plane;
    startClientY?: number;
    unitsPerPixelY?: number;
  } | null>(null);
  
  // derived ui flags
  
  const showUI = !focusOpen;
  const focusCtaVisible = showUI && !!selectedGroupId && !selectedGlyphGroupId;
  const focusOpenRef = useRef(focusOpen);

  // ref sync effects

  // hover / select effects

  useEffect(() => {
    selectedGroupIdLiveRef.current = selectedGroupId;
  }, [selectedGroupId]);

  useEffect(() => {
    hoveredGroupIdLiveRef.current = hoveredGroupId;
  }, [hoveredGroupId]);

  useEffect(() => {
    selectedGlyphGroupIdLiveRef.current = selectedGlyphGroupId;
  }, [selectedGlyphGroupId]);
  
  useEffect(() => {
    hoveredGlyphGroupIdLiveRef.current = hoveredGlyphGroupId;
  }, [hoveredGlyphGroupId]);

  // ui effects

  useEffect(() => {
    focusOpenRef.current = focusOpen;
  }, [focusOpen]);

  useEffect(() => {
    worldToolRef.current = worldTool;
  }, [worldTool]);

  useEffect(() => {
    glyphsOpenRef.current = glyphsOpen;
  }, [glyphsOpen]);

  // editor control helpers

  function setOrbitalControlsEnabled(enabled: boolean) {
    const c = controlsRef.current;
    if (c) c.enabled = enabled;
  }

  // select / hover utilities

  function clearHelper(ref: React.MutableRefObject<THREE.Box3Helper | null>) {
    const scene = sceneRef.current;
    const h = ref.current;
    if (!scene || !h) return;
    scene.remove(h);
    (h.material as THREE.Material).dispose();
    ref.current = null;
  }

  function upsertHelper(ref: React.MutableRefObject<THREE.Box3Helper | null>, box: THREE.Box3, color: number) {
    const scene = sceneRef.current;
    if (!scene) return;

    clearHelper(ref);

    const helper = new THREE.Box3Helper(box, color);
    helper.renderOrder = 1000;
    scene.add(helper);
    ref.current = helper;
  }

  function syncGroupBoxes() {
    const w = worldRef.current;
    if (!w) return;

    const selected = selectedGroupIdLiveRef.current;
    const hovered = hoveredGroupIdLiveRef.current;

    if (selected) {
      const b = w.getGroupBounds(selected);
      if (b) {
        const box = new THREE.Box3(
          new THREE.Vector3(b.min.x, b.min.y, b.min.z),
          new THREE.Vector3(b.max.x + 1, b.max.y + 1, b.max.z + 1)
        );
        upsertHelper(selectedBoxRef, box, 0xC7ECFF);
      } else {
        clearHelper(selectedBoxRef);
      }
    } else {
      clearHelper(selectedBoxRef);
    }

    if (hovered && hovered !== selected) {
      const b = w.getGroupBounds(hovered);
      if (b) {
        const box = new THREE.Box3(
          new THREE.Vector3(b.min.x, b.min.y, b.min.z),
          new THREE.Vector3(b.max.x + 1, b.max.y + 1, b.max.z + 1)
        );
        upsertHelper(hoverBoxRef, box, 0x2563eb);
      } else {
        clearHelper(hoverBoxRef);
      }
    } else {
      clearHelper(hoverBoxRef);
    }
  }

  function ensureGlyphOutline(
    ref: React.MutableRefObject<THREE.LineLoop | null>,
    color: number
  ) {
    const scene = sceneRef.current;
    if (!scene) return null;
    if (ref.current) return ref.current;
  
    const geom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-0.5, -0.5, 0),
      new THREE.Vector3(0.5, -0.5, 0),
      new THREE.Vector3(0.5, 0.5, 0),
      new THREE.Vector3(-0.5, 0.5, 0),
    ]);
  
    const mat = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 1,
      depthWrite: false,
    });
  
    const line = new THREE.LineLoop(geom, mat);
    line.renderOrder = 1300;
    scene.add(line);
    ref.current = line;
    return line;
  }
  
  function clearGlyphOutline(ref: React.MutableRefObject<THREE.LineLoop | null>) {
    const scene = sceneRef.current;
    const line = ref.current;
    if (!scene || !line) return;
    scene.remove(line);
    line.geometry.dispose();
    (line.material as THREE.Material).dispose();
    ref.current = null;
  }

  function syncGlyphOutlineFromSprite(
    ref: React.MutableRefObject<THREE.LineLoop | null>,
    sprite: THREE.Sprite | null,
    color: number
  ) {
    const camera = cameraRef.current;
    if (!sprite || !camera || !sprite.visible) {
      clearGlyphOutline(ref);
      return;
    }
  
    const line = ensureGlyphOutline(ref, color);
    if (!line) return;
  
    line.position.copy(sprite.position);
    line.quaternion.copy(camera.quaternion);
    const baseGlyphSize =
      typeof sprite.userData?.baseGlyphSize === "number"
        ? sprite.userData.baseGlyphSize
        : sprite.scale.x;
    
    line.scale.set(baseGlyphSize, baseGlyphSize , 1);
    line.visible = true;
  }

  function syncGlyphOutlines() {
    const selectedGlyphId = selectedGlyphGroupIdLiveRef.current;
    const hoveredGlyphId = hoveredGlyphGroupIdLiveRef.current;
  
    const selectedSprite = selectedGlyphId
      ? glyphSpriteMapRef.current.get(selectedGlyphId) ?? null
      : null;
  
    const hoveredSprite =
      hoveredGlyphId && hoveredGlyphId !== selectedGlyphId
        ? glyphSpriteMapRef.current.get(hoveredGlyphId) ?? null
        : null;
  
    syncGlyphOutlineFromSprite(selectedGlyphOutlineRef, selectedSprite, 0xffffff);
    syncGlyphOutlineFromSprite(hoverGlyphOutlineRef, hoveredSprite, 0x2563eb);
  }

  // pointer helpers

  function setMouseFromEvent(e: PointerEvent) {
    const renderer = rendererRef.current;
    if (!renderer) return;
    const rect = renderer.domElement.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    mouseNDC.set(x, y);
  }

  function updateRayFromMouse(e: PointerEvent) {
    const camera = cameraRef.current;
    if (!camera) return;
    setMouseFromEvent(e);
    raycaster.setFromCamera(mouseNDC, camera);
  }

  function pickGroupUnderMouse(): string | null {
    const w = worldRef.current;
    if (!w) return null;

    const meshes = w.listMeshes();
    const hits = raycaster.intersectObjects(meshes, false);
    if (!hits.length) return null;

    const obj = hits[0].object as THREE.Mesh;
    const gid = (obj.userData?.groupId as string | undefined) ?? null;
    return gid;
  }

  function pickVisibleGlyphUnderMouse(): string | null {
    const sprites = Array.from(glyphSpriteMapRef.current.values()).filter((s) => s.visible);
    if (!sprites.length) return null;
  
    const hits = raycaster.intersectObjects(sprites, false);
    if (!hits.length) return null;
  
    const obj = hits[0].object as THREE.Sprite;
    return (obj.userData?.groupId as string | undefined) ?? null;
  }

  function rayPlaneIntersection(plane: THREE.Plane): THREE.Vector3 | null {
    const out = new THREE.Vector3();
    const ok = raycaster.ray.intersectPlane(plane, out);
    return ok ? out : null;
  }

  function unitsPerScreenPixelAtWorldPointY(params: {
    worldPoint: THREE.Vector3;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
  }) {
    const { worldPoint, camera, renderer } = params;
  
    const rect = renderer.domElement.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    if (w <= 0 || h <= 0) return 0.02;
  
    const ndc = worldPoint.clone().project(camera);
  
    const ndc2 = new THREE.Vector3(ndc.x, ndc.y - 2 / h, ndc.z);
  
    const p1 = ndc.clone().unproject(camera);
    const p2 = ndc2.unproject(camera);
  
    const d = p2.distanceTo(p1);
    return Number.isFinite(d) && d > 0 ? d : 0.02;
  }

  // camera helpers

  function normalizeGroupToOrigin(g: GroupState): GroupState {
    if (!g.voxels.length) return { ...g, position: { x: 0, y: 0, z: 0 } };

    let minX = Infinity,
      minY = Infinity,
      minZ = Infinity;
    for (const v of g.voxels) {
      minX = Math.min(minX, v.local.x);
      minY = Math.min(minY, v.local.y);
      minZ = Math.min(minZ, v.local.z);
    }

    const voxels = g.voxels.map((v) => ({
      ...v,
      local: { x: v.local.x - minX, y: v.local.y - minY, z: v.local.z - minZ },
    }));

    return { groupId: g.groupId, position: { x: 0, y: 0, z: 0 }, voxels };
  }

  async function captureSquareThumbnailFromCurrentCamera(): Promise<Blob | null> {
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    if (!renderer || !scene || !camera) return null;

    controls?.update();
    camera.updateMatrixWorld(true);
    renderer.render(scene, camera);

    const srcCanvas = renderer.domElement as HTMLCanvasElement;
    const srcW = srcCanvas.width;
    const srcH = srcCanvas.height;
    const side = Math.min(srcW, srcH);
    const sx = Math.floor((srcW - side) / 2);
    const sy = Math.floor((srcH - side) / 2);

    const THUMB = 256;
    const out = document.createElement("canvas");
    out.width = THUMB;
    out.height = THUMB;

    const ctx = out.getContext("2d");
    if (!ctx) return null;

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(srcCanvas, sx, sy, side, side, 0, 0, THUMB, THUMB);

    const blob = await new Promise<Blob | null>((resolve) => out.toBlob((b) => resolve(b), "image/png"));
    return blob;
  }

  // world level actions

  async function onNew() {
    const w = worldRef.current;
    if (!w) return;
  
    setLibraryOpen(false);
    setImportModal(null);
  
    setIslandName("My Voxbox");
    currentIslandIdRef.current = null;
  
    setSelectedGroupId(null);
    setHoveredGroupId(null);
    hoveredGroupIdLiveRef.current = null;
  
    w.clear();
  
    if (controlsRef.current && cameraRef.current) {
      cameraRef.current.position.set(172.557, 77.391, 184.354);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
      cameraRef.current.lookAt(controlsRef.current.target);
    }
  
    const id = await worldRepository.saveWorld({
      name: "Primary World",
      data: w.exportWorldData(),
      thumb: null,
    });
  
    currentIslandIdRef.current = id;
    setPrimaryWorldId(id);
  
    pendingGroupBoxesSyncRef.current = true;
    pendingGlyphSpritesSyncRef.current = true;
    pendingGlyphOutlineSyncRef.current = true;
  }

  async function onOpenFromLibrary(id: string) {
    const world = worldRef.current;
    if (!world) return;
  
    const loaded = await worldRepository.loadWorld(id);
    if (!loaded) return;
  
    currentIslandIdRef.current = loaded.meta.id;
    setIslandName(loaded.meta.name);
  
    await world.importWorldData(loaded.data);
  
    setSelectedGroupId(null);
    setHoveredGroupId(null);
    hoveredGroupIdLiveRef.current = null;
    pendingGroupBoxesSyncRef.current = true;
    pendingGlyphSpritesSyncRef.current = true;
    pendingGlyphOutlineSyncRef.current = true;

    const bounds = world.getAllGroupBounds();
    if (bounds.size > 0) {
      let minX = Infinity, minY = Infinity, minZ = Infinity;
      let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
  
      for (const b of bounds.values()) {
        minX = Math.min(minX, b.min.x);
        minY = Math.min(minY, b.min.y);
        minZ = Math.min(minZ, b.min.z);
        maxX = Math.max(maxX, b.max.x);
        maxY = Math.max(maxY, b.max.y);
        maxZ = Math.max(maxZ, b.max.z);
      }
  
      recenterCameraOnBounds({
        minX,
        minY,
        minZ,
        maxX,
        maxY,
        maxZ,
        controls: controlsRef.current,
        camera: cameraRef.current,
      });
    }
  
    setLibraryOpen(false);
  }

  async function onSaveToLibrary() {
    await autosave({ withThumb: true });
  }

  async function onPublishWorld() {
    const world = worldRef.current;
    if (!world) return;
    if (!me?.user_id) {
      alert("You must be logged in to publish.");
      return;
    }

    const snapshot = await world.getPublishedWorldSnapshot();
    if (!snapshot.groups.length) {
      alert("World is empty.");
      return;
    }

    try {
      setPublishing(true);

      await publishWorld({
        publisherUserId: me.user_id,
        worldName: islandName.trim() || "Untitled World",
        voxelCount: snapshot.voxelCount,
        latestMarketplaceAssetIds: snapshot.latestMarketplaceAssetIds,
        groups: snapshot.groups,
      });

      alert("World published.");
    } catch (err) {
      console.error("Publish failed", err);
      alert("Failed to publish world.");
    } finally {
      setPublishing(false);
    }
  }

  // asset level actions

  async function saveLiveGroupAsPrivateAsset(params: {
    groupId: string;
    preferredName?: string;
    withThumb?: boolean;
  }): Promise<string | null> {
    const w = worldRef.current;
    if (!w) return null;
  
    const snap = w.getGroupSnapshot(params.groupId);
    if (!snap) return null;
  
    const normalized = normalizeGroupToOrigin(snap);
    const thumb = params.withThumb ? await captureSquareThumbnailFromCurrentCamera() : null;
  
    const assetId = await assetRepository.createPrivateAsset({
      name: (params.preferredName?.trim() || snap.groupId || "Asset").trim(),
      group: normalized,
      thumb,
    });
  
    w.setGroupSource(params.groupId, {
      assetId,
      assetKind: "draft",
    });
  
    return assetId;
  }

  async function onSaveSelectedAsAsset(name: string) {
    const w = worldRef.current;
    const gid = selectedGroupIdLiveRef.current ?? selectedGroupId;
    if (!w || !gid) return;
  
    const assetId = await saveLiveGroupAsPrivateAsset({
      groupId: gid,
      preferredName: name,
      withThumb: true,
    });
  
    if (!assetId) return;
  
    requestAutosave({ immediate: true, reason: "save-selected-as-asset" });
    setAssetsOpen(true);
  }

  async function beginPlaceAsset(
    assetId: string,
    client?: { x: number; y: number }
  ) {
    const loaded = await assetRepository.loadAsset(assetId);
    if (!loaded) return;
  
    placingAssetRef.current = {
      metaId: loaded.meta.id,
      metaName: loaded.meta.name,
      metaKind: loaded.meta.visibility === "marketplace" ? "marketplace" : "draft",
      group: loaded.group,
    };
  
    setPlacingLabel(loaded.meta.name);
    setAssetsOpen(false);
  
    clearPlacementPreviewObjectUrl();
  
    const thumbUrl = loaded.meta.thumb
      ? URL.createObjectURL(loaded.meta.thumb)
      : null;
  
    placementPreviewObjectUrlRef.current = thumbUrl;
  
    setPlacementPreview({
      thumbUrl,
      x: client?.x ?? 0,
      y: client?.y ?? 0,
      kind: "asset",
    });
  }

  function beginApplyGlyph(
    glyph: GlyphRecord,
    client?: { x: number; y: number }
  ) {
    placingGlyphRef.current = glyph;
    setPlacingLabel(glyph.name || glyph.logicTag);
    setGlyphsOpen(false);
  
    setPlacementPreview({
      thumbUrl: glyph.thumbUrl,
      x: client?.x ?? 0,
      y: client?.y ?? 0,
      kind: "glyph",
    });
  
    pendingGlyphSpritesSyncRef.current = true;
    pendingGlyphOutlineSyncRef.current = true;
  }

  function cancelPlacementModes() {
    placingAssetRef.current = null;
    placingGlyphRef.current = null;
    setPlacingLabel(null);
  
    setPlacementPreview(null);
    clearPlacementPreviewObjectUrl();
  
    pendingGlyphSpritesSyncRef.current = true;
    pendingGlyphOutlineSyncRef.current = true;
  }

  function clearPlacementPreviewObjectUrl() {
    const url = placementPreviewObjectUrlRef.current;
    if (!url) return;
    URL.revokeObjectURL(url);
    placementPreviewObjectUrlRef.current = null;
  }

  // glyph visualization

  function getGlyphTexture(logicTag: string): THREE.Texture {
    const cache = glyphTextureCacheRef.current;
    const existing = cache.get(logicTag);
    if (existing) return existing;
  
    const tex = new THREE.TextureLoader().load(`/glyphs/${logicTag}.png`);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.generateMipmaps = false;
  
    cache.set(logicTag, tex);
    return tex;
  }

  function removeGlyphSprite(groupId: string) {
    const scene = sceneRef.current;
    const sprite = glyphSpriteMapRef.current.get(groupId);
    if (!scene || !sprite) return;
  
    scene.remove(sprite);
    (sprite.material as THREE.SpriteMaterial).dispose();
    glyphSpriteMapRef.current.delete(groupId);
  }

  function syncGlyphSprites() {
    const scene = sceneRef.current;
    const w = worldRef.current;
    if (!scene || !w) return;
  
    const nextVisibleGroups = new Set<string>();
  
    for (const groupId of w.listGroupIds()) {
      const logicTag = w.getGroupLogicTag?.(groupId);
      if (!logicTag) {
        removeGlyphSprite(groupId);
        continue;
      }
  
      const bounds = w.getGroupBounds(groupId);
      if (!bounds) {
        removeGlyphSprite(groupId);
        continue;
      }
  
      nextVisibleGroups.add(groupId);
  
      let sprite = glyphSpriteMapRef.current.get(groupId);
      if (!sprite) {
        const tex = getGlyphTexture(logicTag);
        const material = new THREE.SpriteMaterial({
          map: tex,
          transparent: true,
          depthWrite: false,
          depthTest: true,
        });
  
        sprite = new THREE.Sprite(material);
        sprite.renderOrder = 1200;
        scene.add(sprite);
        glyphSpriteMapRef.current.set(groupId, sprite);
      } else {
        const material = sprite.material as THREE.SpriteMaterial;
        const wanted = getGlyphTexture(logicTag);
        if (material.map !== wanted) {
          material.map = wanted;
          material.needsUpdate = true;
        }
      }

      sprite.userData.groupId = groupId;
  
      const boxWidth = bounds.max.x - bounds.min.x + 1;
      const boxHeight = bounds.max.y - bounds.min.y + 1;
      const boxDepth = bounds.max.z - bounds.min.z + 1;
      const maxSpan = Math.max(boxWidth, boxHeight, boxDepth);
      
      const baseSize = Math.max(1.25, Math.min(2.5, maxSpan * 0.22));
      const normalGlyphSize = baseSize * 3;
      
      const isAssetSelected = selectedGroupIdLiveRef.current === groupId;
      const isGlyphSelected = selectedGlyphGroupIdLiveRef.current === groupId;
      const isHighlightedGlyph = isGlyphSelected;
      const isPlacingGlyph = placingGlyphRef.current !== null;

      sprite.visible = glyphsOpenRef.current || isPlacingGlyph || isAssetSelected || isGlyphSelected;
            
      const glyphSize = isHighlightedGlyph ? normalGlyphSize * 1.1 : normalGlyphSize;
      sprite.scale.set(glyphSize, glyphSize, 1);
      
      const material = sprite.material as THREE.SpriteMaterial;
      material.opacity = isHighlightedGlyph ? 0.75 : 0.5;
      
      sprite.position.set(
        bounds.max.x + 3,
        bounds.max.y + 3,
        bounds.min.z - 3
      );
            
      sprite.userData.baseGlyphSize = normalGlyphSize;
    }
  
    for (const existingGroupId of Array.from(glyphSpriteMapRef.current.keys())) {
      if (!nextVisibleGroups.has(existingGroupId)) {
        removeGlyphSprite(existingGroupId);
      }
    }
  }

  // import vox file flow

  async function onImportVoxFile(file: File) {
    try {
      const buffer = await file.arrayBuffer();
      const groups = parseVox(buffer);
      setImportModal({ fileName: file.name, groups });
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Failed to import .vox");
    }
  }

  async function applyImport(opts: { asBlueprint: boolean }) {
    const world = worldRef.current;
    const pending = importModal;
    if (!world || !pending) return;
  
    world.clear();
    currentIslandIdRef.current = null;
    setSelectedGroupId(null);
    setHoveredGroupId(null);
    hoveredGroupIdLiveRef.current = null;
  
    for (const g of pending.groups) {
      const rawState: GroupState = {
        groupId: g.groupId,
        position: { x: 0, y: 0, z: 0 },
        voxels: g.voxels.map((v) => ({
          local: { x: v.x, y: v.y, z: v.z },
          color: v.color,
          isBlueprint: opts.asBlueprint,
        })),
      };
  
      const normalized = normalizeGroupToOrigin(rawState);
  
      const assetId = await assetRepository.createPrivateAsset({
        name: g.groupId || "Imported Asset",
        group: normalized,
        thumb: null,
      });
  
      world.instantiateGroupState(normalized, {
        at: g.position,
        baseId: g.groupId,
        sourceAssetId: assetId,
        sourceAssetKind: "draft",
      });
    }
  
    pendingGroupBoxesSyncRef.current = true;
    pendingGlyphSpritesSyncRef.current = true;
    pendingGlyphOutlineSyncRef.current = true;
    setImportModal(null);
    requestAutosave({ immediate: true, reason: "import-vox" });
  }

  // autosave pipeline

  async function autosave(opts?: { withThumb?: boolean }) {
    const world = worldRef.current;
    if (!world) return;
    if (!currentIslandIdRef.current) return; 
  
    const data = world.exportWorldData();
    const thumb = opts?.withThumb
      ? await captureSquareThumbnailFromCurrentCamera()
      : undefined;
  
    const id = await worldRepository.saveWorld({
      name: "Primary World",
      data,
      thumb,
      id: currentIslandIdRef.current,
    });
  
    lastSaveAtRef.current = performance.now();
    currentIslandIdRef.current = id;
    setPrimaryWorldId(id);
  }

  function requestAutosave(opts?: { immediate?: boolean; reason?: string }) {
    dirtyRef.current = true;
  
    const doSchedule = () => {
      if (autosaveTimerRef.current) window.clearTimeout(autosaveTimerRef.current);
      autosaveTimerRef.current = window.setTimeout(() => {
        flushAutosave();
      }, AUTOSAVE_DEBOUNCE_MS);
    };
  
    if (opts?.immediate) {
      flushAutosave();
      return;
    }
  
    const now = performance.now();
    if (dirtyRef.current && now - lastSaveAtRef.current > AUTOSAVE_MAX_INTERVAL_MS) {
      flushAutosave();
      return;
    }
  
    doSchedule();
  }

  async function flushAutosave() {
    if (!dirtyRef.current) return;
  
    if (autosaveInFlightRef.current) {
      autosaveQueuedRef.current = true;
      return;
    }
  
    autosaveInFlightRef.current = true;
  
    try {
      await autosave({ withThumb: false });
      dirtyRef.current = false;
      lastSaveAtRef.current = performance.now();
    } catch (e) {
      console.error("Autosave failed", e);
    } finally {
      autosaveInFlightRef.current = false;
  
      if (autosaveQueuedRef.current) {
        autosaveQueuedRef.current = false;
        flushAutosave();
      }
    }
  }

  // ui toggles

  function toggleAssets() {
    click();
    setAssetsOpen((v) => !v);
  }

  function toggleGlyphs() {
    click();
    setGlyphsOpen((v) => !v);
  }

  function toggleMarketplace() {
    click();
    setMarketplaceOpen((v) => !v);
  }

  // ui selection

  useEffect(() => {
    pendingGroupBoxesSyncRef.current = true;
    pendingGlyphSpritesSyncRef.current = true;
    pendingGlyphOutlineSyncRef.current = true;
  }, [selectedGroupId, hoveredGroupId, selectedGlyphGroupId, hoveredGlyphGroupId, focusOpen, glyphsOpen]);

  // transient keyboard interaction guards 

  useEffect(() => {
    if (!placingLabel) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") cancelPlacementModes();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [placingLabel]);

  useEffect(() => {
    const onKeyDown = async (e: KeyboardEvent) => {
      if (e.key !== "Backspace" && e.key !== "Delete") return;
      if (focusOpenRef.current) return;
      if (importModal) return;
      if (placingLabel) return;
  
      const el = document.activeElement as HTMLElement | null;
      const tag = el?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || (el as any)?.isContentEditable) return;
  
      const w = worldRef.current;
      if (!w) return;
  
      const selectedGlyphId = selectedGlyphGroupIdLiveRef.current;
      if (selectedGlyphId) {
        const ok = w.setGroupLogicTag?.(selectedGlyphId, null);
        if (!ok) return;
  
        play("deletePart");
  
        selectedGlyphGroupIdLiveRef.current = null;
        setSelectedGlyphGroupId(null);
  
        if (hoveredGlyphGroupIdLiveRef.current === selectedGlyphId) {
          hoveredGlyphGroupIdLiveRef.current = null;
          setHoveredGlyphGroupId(null);
        }
  
        pendingGlyphSpritesSyncRef.current = true;
        pendingGlyphOutlineSyncRef.current = true;
        requestAutosave({ immediate: true, reason: "delete-glyph" });
        e.preventDefault();
        return;
      }
  
      const gid = selectedGroupIdLiveRef.current;
      if (!gid) return;
  
      const src = w.getGroupSource?.(gid) ?? null;
      const overrideIdToDelete = src?.overrideAssetId ?? null;
  
      const ok = w.removeGroup?.(gid);
      if (!ok) return;
  
      play("deletePart");
  
      try {
        if (overrideIdToDelete) {
          await assetRepository.deleteAsset(overrideIdToDelete);
        }
      } catch (err) {
        console.error("failed to delete override asset for removed group", err);
      }
  
      selectedGroupIdLiveRef.current = null;
      setSelectedGroupId(null);
  
      if (hoveredGroupIdLiveRef.current === gid) {
        hoveredGroupIdLiveRef.current = null;
        setHoveredGroupId(null);
      }
  
      pendingGroupBoxesSyncRef.current = true;
      pendingGlyphSpritesSyncRef.current = true;
      pendingGlyphOutlineSyncRef.current = true;
  
      requestAutosave({ immediate: true, reason: "delete-group" });
      e.preventDefault();
    };
  
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [importModal, placingLabel]);

  useEffect(() => {
    if (!importModal) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setImportModal(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [importModal]);

  // autosave lifecycle

  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === "hidden") flushAutosave();
    };
  
    const onPageHide = () => {
      flushAutosave();
    };
  
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pagehide", onPageHide);
  
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, []);

  useEffect(() => {
    props.onRequestAutosaveRef?.(requestAutosave);
    return () => props.onRequestAutosaveRef?.(() => {});
  }, []);

  // main three js boot

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // scene boot

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    scene.background = null;

    const camera = new THREE.PerspectiveCamera(40, mount.clientWidth / mount.clientHeight, 0.1, 5000);
    camera.position.set(40, 40, 40);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      depth: true,
      stencil: false,
    });
    rendererRef.current = renderer;

    const DPR = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(DPR);
    renderer.setSize(mount.clientWidth, mount.clientHeight);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    mount.appendChild(renderer.domElement);

    const preventContextMenu = (e: Event) => e.preventDefault();
    renderer.domElement.addEventListener("contextmenu", preventContextMenu);

    scene.add(new THREE.AmbientLight(0xffffff, 2.4));
    const hemi = new THREE.HemisphereLight(0xdff4ff, 0x6fa0c8, 1.3);
    scene.add(hemi);

    const dir = new THREE.DirectionalLight(0xffffff, 1.7);
    dir.castShadow = true;
    dir.shadow.bias = -0.0005;
    dir.shadow.mapSize.set(512, 512);

    dir.position.setFromSphericalCoords(
      250,
      THREE.MathUtils.degToRad(60),
      THREE.MathUtils.degToRad(30)
    );
    dir.target.position.set(0, 0, 50);
    scene.add(dir.target);
    scene.add(dir);

    camera.position.set(172.557, 77.391, 184.354);
    cameraRef.current = camera;
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0.0, 0.0, 0.0);
    controls.update();
    
    camera.lookAt(controls.target);

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

        envMapRef.current = rt.texture;
        envRTRef.current = rt;
      },
      undefined,
      (err) => console.error("Failed to load HDRI /world/DayInTheClouds1K.hdr", err)
    );

    // island load

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    dracoLoader.preload();

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    gltfLoader.load(
      "/baked/island.glb",
      (gltf) => {
        if (islandRootRef.current) {
          scene.remove(islandRootRef.current);
          islandRootRef.current = null;
        }

        const root = gltf.scene;
        root.name = "baked:island";

        root.position.set(0, 0, 0);
        root.rotation.set(0, 0, 0);
        root.scale.set(1, 1, 1);

        root.traverse((obj) => {
          const mesh = obj as THREE.Mesh;
          if (!(mesh as any).isMesh) return;

          mesh.castShadow = true;
          mesh.receiveShadow = true;

          const applyTo = (mat: THREE.Material) => {
            const m = mat as THREE.MeshStandardMaterial;
            if (!("roughness" in m)) return;

            m.roughness = 1;
            m.metalness = 0;

            if (scene.environment) (m as any).envMap = scene.environment;

            applyHeightMistToStandardMaterial(m, {
              yBottom: -12,
              yTop: 1,
              maxOpacity: 0.3,
              color: 0xffffff,
            });

            m.needsUpdate = true;
          };

          if (Array.isArray(mesh.material)) mesh.material.forEach(applyTo);
          else applyTo(mesh.material);
        });

        scene.add(root);
        islandRootRef.current = root;
      },
      undefined,
      (err) => {
        console.error("Failed to load /baked/island.glb", err);
      }
    );

    // world boot

    const world = new VoxelWorld(scene, { blueprintOpacity: 0.4 });
    worldRef.current = world;
    props.onWorldReady?.(world);

    let cancelled = false;

    (async () => {
      const explicitWorldId = initialWorldId?.trim() || null;
      let id = explicitWorldId;

      if (!id) {
        id = getPrimaryWorldId();
      }

      if (id) {
        const loaded = await worldRepository.loadWorld(id);
        if (cancelled) return;

        if (loaded) {
          currentIslandIdRef.current = loaded.meta.id;
          setIslandName(loaded.meta.name);

          if (!explicitWorldId) {
            setPrimaryWorldId(loaded.meta.id);
          }

          await world.importWorldData(loaded.data);
          if (cancelled) return;

          setSelectedGroupId(null);
          setHoveredGroupId(null);
          hoveredGroupIdLiveRef.current = null;
          pendingGroupBoxesSyncRef.current = true;
          pendingGlyphSpritesSyncRef.current = true;
          pendingGlyphOutlineSyncRef.current = true;

          return;
        }

        if (explicitWorldId) {
          console.warn("Requested world not found:", explicitWorldId);
        }

        id = null;
      }

      const data = world.exportWorldData();
      const thumb = await captureSquareThumbnailFromCurrentCamera();
      if (cancelled) return;

      const newId = await worldRepository.saveWorld({
        name: "Primary World",
        data,
        thumb,
      });
      if (cancelled) return;

      currentIslandIdRef.current = newId;
      setIslandName("My Voxbox");
      setPrimaryWorldId(newId);
    })();

    // pointer handlers

    pendingGroupBoxesSyncRef.current = true;
    pendingGlyphSpritesSyncRef.current = true;
    pendingGlyphOutlineSyncRef.current = true;

    function onPointerDown(e: PointerEvent) {
      if (focusOpenRef.current) return;

      if (placingAssetRef.current || placingGlyphRef.current) {
        setPlacementPreview((prev) =>
          prev
            ? {
                ...prev,
                x: e.clientX,
                y: e.clientY,
              }
            : prev
        );
      }    
      
      updateRayFromMouse(e);

      const glyphGroupId = pickVisibleGlyphUnderMouse();
      if (glyphGroupId) {
        selectedGlyphGroupIdLiveRef.current = glyphGroupId;
        setSelectedGlyphGroupId(glyphGroupId);
        pendingGlyphSpritesSyncRef.current = true;
        pendingGlyphOutlineSyncRef.current = true;
    
        if (selectedGroupIdLiveRef.current !== null) {
          selectedGroupIdLiveRef.current = null;
          setSelectedGroupId(null);
          pendingGroupBoxesSyncRef.current = true;
        }
    
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation?.();
        return;
      }
    
      if (selectedGlyphGroupIdLiveRef.current !== null) {
        selectedGlyphGroupIdLiveRef.current = null;
        setSelectedGlyphGroupId(null);
        pendingGlyphSpritesSyncRef.current = true;
        pendingGlyphOutlineSyncRef.current = true;
      }

      const placingGlyph = placingGlyphRef.current;
      if (placingGlyph && e.button === 0) {
        const w = worldRef.current;
        if (!w) return;

        const gid = pickGroupUnderMouse();
        if (!gid) return;

        const ok = w.setGroupLogicTag?.(gid, placingGlyph.logicTag);
        if (!ok) return;

        selectedGroupIdLiveRef.current = null;
        setSelectedGroupId(null);

        selectedGlyphGroupIdLiveRef.current = gid;
        setSelectedGlyphGroupId(gid);

        pendingGroupBoxesSyncRef.current = true;
        pendingGlyphSpritesSyncRef.current = true;
        pendingGlyphOutlineSyncRef.current = true;

        play("placeVoxel");
        requestAutosave({ immediate: true, reason: `set-logic-tag:${placingGlyph.logicTag}` });

        cancelPlacementModes();

        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation?.();
        return;
      }
    
      if (placingAssetRef.current && e.button === 0) {
        const w = worldRef.current;
        if (!w) return;
    
        let p: THREE.Vector3 | null = null;
    
        const meshes = w.listMeshes();
        const hits = raycaster.intersectObjects(meshes, false);
        if (hits.length) {
          p = hits[0].point.clone();
        } else {
          const ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
          p = rayPlaneIntersection(ground);
        }
    
        if (!p) return;
    
        const pos: VoxelCoord = {
          x: Math.floor(p.x),
          y: Math.floor(p.y),
          z: Math.floor(p.z),
        };
    
        w.instantiateGroupState(placingAssetRef.current.group, {
          at: pos,
          baseId: placingAssetRef.current.metaName,
          sourceAssetId: placingAssetRef.current.metaId,
          sourceAssetKind: placingAssetRef.current.metaKind,
        });
    
        play("placePart");
        requestAutosave({ reason: "place-asset" });
        pendingGroupBoxesSyncRef.current = true;
        pendingGlyphSpritesSyncRef.current = true;
        pendingGlyphOutlineSyncRef.current = true;
    
        cancelPlacementModes();
    
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation?.();
        return;
      }
    
      const gid = pickGroupUnderMouse();
    
      if (!gid) {
        selectedGroupIdLiveRef.current = null;
        setSelectedGroupId(null);
        pendingGroupBoxesSyncRef.current = true;
        pendingGlyphSpritesSyncRef.current = true;
        pendingGlyphOutlineSyncRef.current = true;
        return;
      }
    
      const prev = selectedGroupIdLiveRef.current;
      if (prev !== gid) {
        play("placeVoxel");
      }
    
      selectedGroupIdLiveRef.current = gid;
      setSelectedGroupId(gid);
      pendingGroupBoxesSyncRef.current = true;
      pendingGlyphSpritesSyncRef.current = true;
      pendingGlyphOutlineSyncRef.current = true;
    
      if (e.button !== 0) return;
    
      const w = worldRef.current;
      const renderer = rendererRef.current;
      const cam = cameraRef.current;
      if (!w || !renderer || !cam) return;
    
      const gp = w.getGroupPosition ? w.getGroupPosition(gid) : { x: 0, y: 0, z: 0 };
    
      setOrbitalControlsEnabled(false);
      renderer.domElement.setPointerCapture(e.pointerId);
    
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation?.();
    
      const tool = worldToolRef.current;
    
      if (tool === "upmovement") {
        const worldPoint = new THREE.Vector3(gp.x + 0.5, gp.y + 0.5, gp.z + 0.5);
    
        const upp = unitsPerScreenPixelAtWorldPointY({
          worldPoint,
          camera: cam,
          renderer,
        });
    
        dragRef.current = {
          active: true,
          pointerId: e.pointerId,
          groupId: gid,
    
          mode: "up",
    
          startGroupPos: { ...gp },
          startClientY: e.clientY,
          unitsPerPixelY: upp,
        };
    
        return;
      }
    
      const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -gp.y);
      const hit = rayPlaneIntersection(plane);
      if (!hit) return;
    
      dragRef.current = {
        active: true,
        pointerId: e.pointerId,
        groupId: gid,
    
        mode: "plane",
    
        startGroupPos: { ...gp },
        startHitPoint: hit.clone(),
        plane,
      };
    }

    function onPointerMove(e: PointerEvent) {
      if (focusOpenRef.current) return;

      if (placingAssetRef.current || placingGlyphRef.current) {
        setPlacementPreview((prev) =>
          prev
            ? {
                ...prev,
                x: e.clientX,
                y: e.clientY,
              }
            : prev
        );
      }

      const d = dragRef.current;
      if (d?.active) {
        const w = worldRef.current;
        if (!w?.setGroupPosition) return;
      
        if (d.mode === "up") {
          const startY = d.startGroupPos.y;
          const startClientY = d.startClientY ?? e.clientY;
          const upp = d.unitsPerPixelY ?? 0.02;
      
          const dyPx = e.clientY - startClientY;
          const dyWorld = -dyPx * upp; 
      
          const next = {
            x: d.startGroupPos.x,
            y: Math.round(startY + dyWorld),
            z: d.startGroupPos.z,
          };
      
          w.setGroupPosition(d.groupId!, next);
          pendingGroupBoxesSyncRef.current = true;
          pendingGlyphSpritesSyncRef.current = true;
          pendingGlyphOutlineSyncRef.current = true;
          requestAutosave({ reason: "move-group-up" });
      
          e.preventDefault();
          return;
        }
      
        updateRayFromMouse(e);
      
        const plane = d.plane!;
        const hit = rayPlaneIntersection(plane);
        if (!hit) return;
      
        const delta = new THREE.Vector3().subVectors(hit, d.startHitPoint!);
        const dx = Math.round(delta.x);
        const dz = Math.round(delta.z);
      
        const next = {
          x: d.startGroupPos.x + dx,
          y: d.startGroupPos.y,
          z: d.startGroupPos.z + dz,
        };
      
        w.setGroupPosition(d.groupId!, next);
        pendingGroupBoxesSyncRef.current = true;
        pendingGlyphSpritesSyncRef.current = true;
        pendingGlyphOutlineSyncRef.current = true;
      
        requestAutosave({ reason: "move-group" });
        e.preventDefault();
        return;
      }

      updateRayFromMouse(e);

      const hoveredGlyphId = pickVisibleGlyphUnderMouse();
      if (hoveredGlyphId) {
        if (hoveredGlyphGroupIdLiveRef.current !== hoveredGlyphId) {
          hoveredGlyphGroupIdLiveRef.current = hoveredGlyphId;
          setHoveredGlyphGroupId(hoveredGlyphId);
          pendingGlyphOutlineSyncRef.current = true;
        }
    
        if (hoveredGroupIdLiveRef.current !== null) {
          hoveredGroupIdLiveRef.current = null;
          setHoveredGroupId(null);
          pendingGroupBoxesSyncRef.current = true;
        }
    
        return;
      }
    
      if (hoveredGlyphGroupIdLiveRef.current !== null) {
        hoveredGlyphGroupIdLiveRef.current = null;
        setHoveredGlyphGroupId(null);
        pendingGlyphOutlineSyncRef.current = true;
      }
    
      const gid = pickGroupUnderMouse();
      const prev = hoveredGroupIdLiveRef.current;
      if (prev !== gid) {
        hoveredGroupIdLiveRef.current = gid;
        setHoveredGroupId(gid);
        pendingGroupBoxesSyncRef.current = true;
      }
    }

    function endDrag() {
      const renderer = rendererRef.current;
      const d = dragRef.current;
      if (renderer && d?.active) {
        try {
          renderer.domElement.releasePointerCapture(d.pointerId);
        } catch {}
      }
      dragRef.current = null;
      setOrbitalControlsEnabled(!focusOpenRef.current);
    }

    function onPointerLeave() {
      hoveredGlyphGroupIdLiveRef.current = null;
      setHoveredGlyphGroupId(null);
      pendingGlyphOutlineSyncRef.current = true;
    
      hoveredGroupIdLiveRef.current = null;
      setHoveredGroupId(null);
      pendingGroupBoxesSyncRef.current = true;
    
      endDrag();
    }

    function onPointerUp() {
      endDrag();
    }

    function onPointerCancel() {
      endDrag();
    }

    renderer.domElement.addEventListener("pointerdown", onPointerDown, true);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointercancel", onPointerCancel);
    renderer.domElement.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("pointerup", onPointerUp);

    // resize / raf

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      const dpr = Math.min(window.devicePixelRatio, 2);
      renderer.setPixelRatio(dpr);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
    
      if (focusOpenRef.current) return;
    
      controls.update();
    
      if (pendingGroupBoxesSyncRef.current) {
        pendingGroupBoxesSyncRef.current = false;
        syncGroupBoxes();
      }
      
      if (pendingGlyphSpritesSyncRef.current) {
        pendingGlyphSpritesSyncRef.current = false;
        syncGlyphSprites();
      }

      if (pendingGlyphOutlineSyncRef.current) {
        pendingGlyphOutlineSyncRef.current = false;
        syncGlyphOutlines();
      }
    
      renderer.render(scene, camera);
    };
    tick();

    // cleanup

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);

      renderer.domElement.removeEventListener("pointerdown", onPointerDown, true);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointercancel", onPointerCancel);
      renderer.domElement.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("contextmenu", preventContextMenu);

      props.onWorldReady?.(null);

      cancelled = true;

      world.dispose();
      worldRef.current = null;

      controls.dispose();
      controlsRef.current = null;

      if (islandRootRef.current) {
        scene.remove(islandRootRef.current);
        islandRootRef.current = null;
      }

      scene.environment = null;
      envMapRef.current = null;
      if (envRTRef.current) {
        envRTRef.current.dispose();
        envRTRef.current = null;
      }

      clearHelper(selectedBoxRef);
      clearHelper(hoverBoxRef);
      clearGlyphOutline(selectedGlyphOutlineRef);
      clearGlyphOutline(hoverGlyphOutlineRef);
      clearPlacementPreviewObjectUrl();

      for (const groupId of Array.from(glyphSpriteMapRef.current.keys())) {
        removeGlyphSprite(groupId);
      }
      
      for (const tex of glyphTextureCacheRef.current.values()) {
        tex.dispose();
      }
      glyphTextureCacheRef.current.clear();

      cameraRef.current = null;
      rendererRef.current = null;
      sceneRef.current = null;

      if (autosaveTimerRef.current) window.clearTimeout(autosaveTimerRef.current);

      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [mouseNDC, raycaster, initialWorldId]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        userSelect: "none",
  
        backgroundImage: `url('/world/bg.png')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
    >
      <div className="clouds" aria-hidden>
        <img className="cloud cloudBg" src="/world/bgc.png" alt="" />
        <img className="cloud cloudMg" src="/world/mgc.png" alt="" />
        <img className="cloud cloudFg" src="/world/fgc.png" alt="" />
      </div>
  
      <div
        ref={mountRef}
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zIndex: 10,
          opacity: focusOpen ? 0 : 1,
          transition: "opacity 120ms linear",
          pointerEvents: focusOpen ? "none" : "auto",
        }}
      />

      {ADMIN && (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            display: "flex",
            gap: 10,
            pointerEvents: "auto",
            zIndex: 10,
          }}
        >
          <label
            onClick={() => setAssetsOpen(true)}
            style={{ padding: "15px 15px", color: "black", fontSize: 20, cursor: "pointer" }}
          >
            Assets
          </label>

          <label onClick={onNew} style={{ padding: "15px 15px", color: "black", fontSize: 20, cursor: "pointer" }}>
            New
          </label>

          <label
            onClick={onSaveToLibrary}
            style={{ padding: "15px 15px", color: "black", fontSize: 20, cursor: "pointer" }}
          >
            Save
          </label>

          <label
            onClick={() => setLibraryOpen(true)}
            style={{ padding: "15px 15px", color: "black", fontSize: 20, cursor: "pointer" }}
          >
            Worlds
          </label>

          <label style={{ padding: "15px 15px", color: "black", fontSize: 20, cursor: "pointer" }}>
            Import
            <input
              type="file"
              accept=".vox"
              style={{ display: "none" }}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onImportVoxFile(f);
                e.currentTarget.value = "";
              }}
            />
          </label>
        </div>
      )}
  
      {importModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
          onMouseDown={() => setImportModal(null)}
        >
          <div
            style={{
              width: "min(520px, 100%)",
              background: "rgba(255,255,255,1.0)",
              border: "1px solid rgba(0,0,0,1.0)",
              padding: 16,
            }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: 20, marginBottom: 20 }}>{"Import .vox"}</div>
  
            <div style={{ fontSize: 15, marginBottom: 14 }}>
              <div style={{ marginBottom: 4 }}>{importModal.fileName}</div>
              <div>{importModal.groups.length.toLocaleString()} objects</div>
            </div>
  
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <label
                onClick={() => applyImport({ asBlueprint: false })}
                style={{ padding: "10px 0px", cursor: "pointer", fontSize: 15 }}
              >
                Import normally
              </label>
              <label
                onClick={() => applyImport({ asBlueprint: true })}
                style={{ padding: "10px 12px", cursor: "pointer", fontSize: 15 }}
              >
                Import as blueprint
              </label>
              <label
                onClick={() => setImportModal(null)}
                style={{ padding: "10px 12px", cursor: "pointer", fontSize: 15 }}
              >
                Cancel
              </label>
            </div>
          </div>
        </div>
      )}
  
      {showUI && (
        <div style={{ position: "relative", zIndex: 20, pointerEvents: "auto" }}>
          <LibraryPanel
            open={libraryOpen}
            onClose={() => setLibraryOpen(false)}
            onOpenIsland={onOpenFromLibrary}
          />
        </div>
      )}

      {showUI && (
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 0,
            padding: 12,
            pointerEvents: "auto",
            zIndex: 30,
            overflow: "visible",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            alignItems: "flex-start",
          }}
        >
          <WorldToolPalette
            value={worldTool}
            onSelect={(t) => {
              if (t === "planemovement" || t === "upmovement") {
                setWorldTool(t);
                return;
              }

              if (t === "rotateleft" || t === "rotateright") {
                const w = worldRef.current;
                const gid = selectedGroupIdLiveRef.current;
                if (!w || !gid || dragRef.current?.active) return;

                const dir: 1 | -1 = t === "rotateright" ? 1 : -1;
                const tool = worldToolRef.current;

                let axis: "x" | "y" | "z" = "y";
                if (tool === "upmovement") axis = "x";

                const ok = w.rotateGroup90?.(gid, axis, dir);
                if (!ok) return;

                pendingGroupBoxesSyncRef.current = true;
                pendingGlyphSpritesSyncRef.current = true;
                pendingGlyphOutlineSyncRef.current = true;
                requestAutosave({ reason: `rotate-group-${axis}` });
              }
            }}
          />

          <div
            className="pix-icon"
            onClick={toggleMarketplace}
            style={{
              padding: "10px 12px",
              borderRadius: 6,
              background: "rgba(0, 50, 110, 0.5)",
              color: "white",
              fontSize: 16,
              cursor: "pointer",
              opacity: marketplaceOpen ? 1 : 0.7,
              transition: "opacity 120ms ease-out",
              userSelect: "none",
              textAlign: "center",
              minWidth: 90,
              marginTop: 50,
            }}
          >
            market
          </div>

          <div
            className="pix-icon"
            onClick={publishing ? undefined : onPublishWorld}
            style={{
              padding: "10px 12px",
              borderRadius: 6,
              background: "rgba(0, 50, 110, 0.5)",
              color: "white",
              fontSize: 16,
              cursor: publishing ? "default" : "pointer",
              opacity: publishing ? 1 : 0.7,
              transition: "opacity 120ms ease-out",
              userSelect: "none",
              textAlign: "center",
              minWidth: 90,
            }}
          >
            {publishing ? "publishing..." : "publish"}
          </div>
        </div>
      )}

      {showUI && (
        <div
          style={{
            position: "absolute",
            top: 21,
            right: 10,
            zIndex: 30,
            display: "flex",
            alignItems: "flex-start",
            gap: 20,
            pointerEvents: "auto",
          }}
        >
          {(assetsOpen || glyphsOpen || marketplaceOpen) && (
            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                pointerEvents: "auto",
              }}
            >
              {assetsOpen && (
                <div style={{ pointerEvents: "auto" }}>
                  {ADMIN ? (
                    <AdminAssetsPanel
                      open={true}
                      onClose={() => setAssetsOpen(false)}
                      onRequestPlace={beginPlaceAsset}
                      onRequestSaveSelected={onSaveSelectedAsAsset}
                      selectedGroupId={selectedGroupId}
                      placingLabel={placingLabel}
                    />
                  ) : (
                    <AssetsPanel
                      open={true}
                      onClose={() => setAssetsOpen(false)}
                      onRequestPlace={beginPlaceAsset}
                    />
                  )}
                </div>
              )}

              {glyphsOpen && (
                <div style={{ pointerEvents: "auto" }}>
                  <GlyphsPanel
                    open={true}
                    onClose={() => setGlyphsOpen(false)}
                    onRequestApplyGlyph={beginApplyGlyph}
                  />
                </div>
              )}

              {marketplaceOpen && (
                <div style={{ pointerEvents: "auto" }}>
                  <MarketplacePanel
                    open={true}
                    onClose={() => setMarketplaceOpen(false)}
                  />
                </div>
              )}
            </div>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              alignItems: "center",
            }}
          >
            <img
              className="pix-icon"
              src="/icons/assets.png"
              alt="Assets"
              onClick={toggleAssets}
              style={{
                height: "10vh",
                width: "auto",
                objectFit: "contain",
                imageRendering: "pixelated",
                cursor: "pointer",
                pointerEvents: "auto",
                flex: "0 0 auto",
                opacity: assetsOpen ? 1 : 0.7,
                transition: "opacity 120ms ease-out",
              }}
            />

            <img
              className="pix-icon"
              src="/icons/glyphs.png"
              alt="Glyphs"
              onClick={toggleGlyphs}
              style={{
                height: "8vh",
                width: "auto",
                objectFit: "contain",
                imageRendering: "pixelated",
                cursor: "pointer",
                pointerEvents: "auto",
                flex: "0 0 auto",
                opacity: glyphsOpen ? 1 : 0.7,
                transition: "opacity 120ms ease-out",
              }}
            />        
          </div>
        </div>
      )}
        
      {showUI && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: 50,
            transform: focusCtaVisible
              ? "translate(-50%, 0)"
              : "translate(-50%, 140%)",
            opacity: focusCtaVisible ? 1 : 0,
            transition: "transform 220ms cubic-bezier(.2,.9,.2,1), opacity 180ms ease-out",
            zIndex: 20,
            pointerEvents: focusCtaVisible ? "auto" : "none",
            willChange: "transform, opacity",
          }}
        >
          <div
            className="pix-icon"
            onClick={() => {
              play("whoosh");
              onFocusGroup(selectedGroupId!);
            }}
            style={{
              padding: "10px 14px",
              borderRadius: 5,
              background: "rgba(0, 50, 110, 0.5)",
              color: "white",
              fontSize: 20,
            }}
          >
            focus mode
          </div>
        </div>
      )}

      {placementPreview && placementPreview.thumbUrl && (
        <div
          style={{
            position: "fixed",
            left: placementPreview.x,
            top: placementPreview.y,
            transform: "translate(-50%, -50%)",
            zIndex: 200,
            pointerEvents: "none",
            opacity: 0.3,
          }}
        >
          <img
            src={placementPreview.thumbUrl}
            alt=""
            draggable={false}
            style={{
              width: placementPreview.kind === "glyph" ? 45 : 75,
              height: placementPreview.kind === "glyph" ? 45 : 75,
              objectFit: "contain",
              imageRendering: "pixelated",
              userSelect: "none",
              display: "block",
            }}
          />
        </div>
      )}

      <style jsx>{`
        .clouds {
          position: absolute;
          inset: 0;
          z-index: 5;
          pointer-events: none;
          overflow: hidden;
        }

        .cloud {
          position: absolute;
          left: 50%;
          top: 50%;

          /* smaller overscan */
          width: 200%;
          height: 200%;

          object-fit: cover;

          image-rendering: pixelated;
          image-rendering: crisp-edges;

          transform: translate3d(-50%, -50%, 0);
          will-change: transform;
        }

        .cloudBg {
          animation: cloudSineBg 18s ease-in-out infinite;
        }
        .cloudMg {
          animation: cloudSineMg 14s ease-in-out infinite;
        }
        .cloudFg {
          animation: cloudSineFg 12s ease-in-out infinite;
        }

        @keyframes cloudSineBg {
          0%   { transform: translate3d(calc(-50% - 0.2%), -50%, 0); }
          50%  { transform: translate3d(calc(-50% + 0.2%), -50%, 0); }
          100% { transform: translate3d(calc(-50% - 0.2%), -50%, 0); }
        }

        @keyframes cloudSineMg {
          0%   { transform: translate3d(calc(-50% + 0.3%), calc(-50% + 0.05%), 0); }
          50%  { transform: translate3d(calc(-50% - 0.3%), calc(-50% - 0.05%), 0); }
          100% { transform: translate3d(calc(-50% + 0.3%), calc(-50% + 0.05%), 0); }
        }

        @keyframes cloudSineFg {
          0%   { transform: translate3d(calc(-50% - 0.4%), calc(-50% - 0.075%), 0); }
          50%  { transform: translate3d(calc(-50% + 0.4%), calc(-50% + 0.075%), 0); }
          100% { transform: translate3d(calc(-50% - 0.4%), calc(-50% - 0.075%), 0); }
        }
      `}</style>
    </div>
  );
}