"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import ColorPalette from "./ColorPalette";
import ToolPalette, { type ToolId } from "./ToolPalette";
import { VoxelWorld } from "./voxelWorld";
import type { VoxelCoord } from "./types";
import { add } from "./types";
import { parseVox } from "./voxImport";

import LibraryPanel from "./LibraryPanel";
import { loadIsland, saveIsland } from "./libraryDb";

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

type PendingImport = {
  fileName: string;
  voxels: { x: number; y: number; z: number; color: string }[];
};

export default function VoxelEditor() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  const [color, setColor] = useState("#34c759");
  const [tool, setTool] = useState<ToolId>("pencil");
  const colorRef = useRef(color);
  useEffect(() => void (colorRef.current = color), [color]);
  const toolRef = useRef<ToolId>(tool);
  useEffect(() => void (toolRef.current = tool), [tool]);

  const marqueeStartRef = useRef<VoxelCoord | null>(null);
  const marqueePreviewRef = useRef<THREE.Mesh | null>(null);
  const lastPlacementCoordRef = useRef<VoxelCoord | null>(null);

  useEffect(() => {
    if (tool !== "marquee") {
      marqueeStartRef.current = null;
      if (marqueePreviewRef.current) marqueePreviewRef.current.visible = false;
    }
  }, [tool]);

  const [libraryOpen, setLibraryOpen] = useState(false);
  const [islandName, setIslandName] = useState("My Voxbox");

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const mouseNDC = useMemo(() => new THREE.Vector2(), []);

  const worldRef = useRef<VoxelWorld | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const currentIslandIdRef = useRef<string | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

  const hoverPlaneRef = useRef<THREE.Mesh | null>(null);
  const pendingHoverRaycastRef = useRef(false);

  const [importModal, setImportModal] = useState<PendingImport | null>(null);

  function onNew() {
    const w = worldRef.current;
  
    setLibraryOpen(false);
    setImportModal(null);
  
    setIslandName("My Voxbox");
    currentIslandIdRef.current = null;
  
    setTool("pencil");
    toolRef.current = "pencil";
  
    setColor("#34c759");
    colorRef.current = "#34c759";
  
    marqueeStartRef.current = null;
    if (marqueePreviewRef.current) marqueePreviewRef.current.visible = false;
  
    lastPlacementCoordRef.current = null;
    if (hoverPlaneRef.current) hoverPlaneRef.current.visible = false;
  
    w?.clear();

    if (w) {
      w.clear();
      w.addVoxel({ x: 0, y: 0, z: 0 }, "#ff9500");
      w.addVoxel({ x: 1, y: 0, z: 0 }, "#ff9500");
      w.addVoxel({ x: 0, y: 0, z: 1 }, "#ff9500");
      w.addVoxel({ x: 0, y: -1, z: 0 }, "#ff9500");
    }
  
    if (controlsRef.current && cameraRef.current) {
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
      cameraRef.current.position.set(40, 40, 40);
      cameraRef.current.lookAt(0, 0, 0);
    }
  
    pendingHoverRaycastRef.current = true;
  }

  function applyImport(opts: { asBlueprint: boolean }) {
    const world = worldRef.current;
    const pending = importModal;
    if (!world || !pending) return;

    world.clear();
    currentIslandIdRef.current = null;

    const imported = pending.voxels;
    for (const v of imported) {
      world.addVoxel(
        { x: v.x, y: v.y, z: v.z },
        v.color,
        { isBlueprint: opts.asBlueprint }
      );
    }

    pendingHoverRaycastRef.current = true;

    if (imported.length) {
      let minX = Infinity, minY = Infinity, minZ = Infinity;
      let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

      for (const v of imported) {
        minX = Math.min(minX, v.x); maxX = Math.max(maxX, v.x);
        minY = Math.min(minY, v.y); maxY = Math.max(maxY, v.y);
        minZ = Math.min(minZ, v.z); maxZ = Math.max(maxZ, v.z);
      }

      recenterCameraOnBounds({
        minX, minY, minZ, maxX, maxY, maxZ,
        controls: controlsRef.current,
        camera: cameraRef.current,
      });
    }

    setImportModal(null);
  }

  async function onImportVoxFile(file: File) {
    try {
      const buffer = await file.arrayBuffer();
      const imported = parseVox(buffer);

      setImportModal({
        fileName: file.name,
        voxels: imported,
      });
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Failed to import .vox");
    }
  }

  async function onSaveToLibrary() {
    const world = worldRef.current;
    if (!world) return;

    const name = islandName.trim() || "My Voxbox";
    const packed = world.exportPacked();

    const thumb = await captureSquareThumbnailFromCurrentCamera();

    const id = await saveIsland({
      name,
      packed,
      thumb,
      id: currentIslandIdRef.current ?? undefined,
    });

    currentIslandIdRef.current = id;
    setLibraryOpen(true);
  }

  async function onOpenFromLibrary(id: string) {
    const world = worldRef.current;
    if (!world) return;

    const loaded = await loadIsland(id);
    if (!loaded) return;

    currentIslandIdRef.current = loaded.meta.id;
    setIslandName(loaded.meta.name);

    world.importPacked(loaded.packed);
    pendingHoverRaycastRef.current = true;

    const pos = loaded.packed.positions;
    const n = Math.floor(pos.length / 3);
    if (n > 0) {
      let minX = Infinity, minY = Infinity, minZ = Infinity;
      let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

      for (let i = 0; i < n; i++) {
        const x = pos[i * 3 + 0];
        const y = pos[i * 3 + 1];
        const z = pos[i * 3 + 2];
        minX = Math.min(minX, x); maxX = Math.max(maxX, x);
        minY = Math.min(minY, y); maxY = Math.max(maxY, y);
        minZ = Math.min(minZ, z); maxZ = Math.max(maxZ, z);
      }

      recenterCameraOnBounds({
        minX, minY, minZ, maxX, maxY, maxZ,
        controls: controlsRef.current,
        camera: cameraRef.current,
      });
    }

    setLibraryOpen(false);
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

    const blob = await new Promise<Blob | null>((resolve) =>
      out.toBlob((b) => resolve(b), "image/png")
    );

    return blob;
  }

  function getToolHints(tool: ToolId): { left: string; right: string; shortcut: string } {
    switch (tool) {
      case "pencil":
        return { left: "Left click: place", right: "Right click: delete", shortcut: "Q: pencil shortcut" };
      case "eyedropper":
        return { left: "Left click: pick color", right: "Right click: (none)", shortcut: "E: eyedropper shortcut" };
      case "marquee":
        return { left: "Left click: set start / confirm fill", right: "Right click: cancel", shortcut: "W: marquee shortcut" };
      default:
        return { left: "Left click: Confirm", right: "Right click: Delete", shortcut: "Q , W , E" };
    }
  }

  //main

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color("#ffffff");

    const camera = new THREE.PerspectiveCamera(
      40,
      mount.clientWidth / mount.clientHeight,
      0.1,
      2000
    );
    camera.position.set(40, 40, 40);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current = renderer;
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);

    const preventContextMenu = (e: Event) => e.preventDefault();
    renderer.domElement.addEventListener("contextmenu", preventContextMenu);

    scene.add(new THREE.AmbientLight(0xffffff, 2.0));
    const dir = new THREE.DirectionalLight(0xffffff, 1.5);
    dir.position.set(10, 18, 8);
    dir.castShadow = true;
    dir.shadow.mapSize.set(2048, 2048);
    scene.add(dir);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 0, 0);
    controls.update();
    controlsRef.current = controls;

    const world = new VoxelWorld(scene);
    worldRef.current = world;

    world.addVoxel({ x: 0, y: 0, z: 0 }, "#ff9500");
    world.addVoxel({ x: 1, y: 0, z: 0 }, "#ff9500");
    world.addVoxel({ x: 0, y: 0, z: 1 }, "#ff9500");
    world.addVoxel({ x: 0, y: -1, z: 0 }, "#ff9500");

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

    function hideHover() {
      const hp = hoverPlaneRef.current;
      if (hp) hp.visible = false;
    }

    function updateHoverFace() {
      const hp = hoverPlaneRef.current;
      const w = worldRef.current;
      if (!hp || !w) return;
    
      const hit = raycastVoxelGrid(w, raycaster.ray, 2000, 4096);
    
      // no hit or we're "inside" a voxel with normal 0,0,0 -> hide hover and hide marquee preview
      if (!hit || (hit.normal.x === 0 && hit.normal.y === 0 && hit.normal.z === 0)) {
        hideHover();
        lastPlacementCoordRef.current = null;
    
        if (toolRef.current === "marquee") {
          hideMarqueePreview();
        }
        return;
      }
    
      const n = new THREE.Vector3(hit.normal.x, hit.normal.y, hit.normal.z).normalize();
      hp.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), n);
    
      hp.position.set(hit.coord.x + 0.5, hit.coord.y + 0.5, hit.coord.z + 0.5);
      hp.position.addScaledVector(n, 0.501);
    
      hp.visible = true;
    
      // placement cell  == where a voxel would be placed for this hover
      const placement = getPlacementCoord(hit, w);
      lastPlacementCoordRef.current = placement;
    
      if (toolRef.current === "marquee") {
        if (marqueeStartRef.current && placement) {
          showMarqueePreview(marqueeStartRef.current, placement);
        } else if (!marqueeStartRef.current) {
          hideMarqueePreview();
        }
      }
    }

    function getPlacementCoord(hit: { coord: VoxelCoord; normal: VoxelCoord }, w: VoxelWorld): VoxelCoord | null {
      const rec = w.get(hit.coord);
    
      if (rec?.isBlueprint) return hit.coord;
    
      const n = hit.normal;
      if (n.x === 0 && n.y === 0 && n.z === 0) return null;
    
      return add(hit.coord, n);
    }

    function hideMarqueePreview() {
      const m = marqueePreviewRef.current;
      if (m) m.visible = false;
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
              w.addVoxel(c, color);
            }
          }
        }
      }
    }

    function onPointerMove(e: PointerEvent) {
      updateRayFromMouse(e);
      pendingHoverRaycastRef.current = true;
    }

    function onPointerLeave() {
      hideHover();
    }
    function onPointerDown(e: PointerEvent) {
      updateRayFromMouse(e);
    
      const w = worldRef.current;
      if (!w) return;
    
      const hit = raycastVoxelGrid(w, raycaster.ray, 2000, 4096);
      const activeTool = toolRef.current;
    
      if (activeTool === "eyedropper") {
        if (e.button !== 0) return;
    
        if (hit) {
          const rec = w.get(hit.coord);
          if (rec) {
            setColor(rec.color);
            colorRef.current = rec.color; // immediate sync for sameframe use
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
            pendingHoverRaycastRef.current = true;
          }
          return;
        }
      
        // left click only
        if (e.button !== 0) return;
      
        if (!hit) return;
      
        const placeAt = getPlacementCoord(hit, w);
        if (!placeAt) return;
      
        // first click -> set start  NO placement
        if (!marqueeStartRef.current) {
          marqueeStartRef.current = placeAt;
      
          // show initial preview 1x1x1
          showMarqueePreview(placeAt, placeAt);
          pendingHoverRaycastRef.current = true;
          return;
        }
      
        // Second click -> fill cuboid and clear state
        fillBox(marqueeStartRef.current, placeAt, w, colorRef.current);
        marqueeStartRef.current = null;
        hideMarqueePreview();
      
        pendingHoverRaycastRef.current = true;
        return;
      }
    
      // pencil  default
    
      if (e.button === 2) {
        if (hit) w.removeVoxel(hit.coord);
        pendingHoverRaycastRef.current = true;
        return;
      }
    
      if (e.button === 0) {
        if (hit) {
          const rec = w.get(hit.coord);
    
          if (rec?.isBlueprint) {
            w.setColor(hit.coord, colorRef.current);
            w.setIsBlueprint(hit.coord, false);
          } else {
            const n = hit.normal;
            if (n.x !== 0 || n.y !== 0 || n.z !== 0) {
              const placeAt = add(hit.coord, n);
    
              const target = w.get(placeAt);
              if (target?.isBlueprint) {
                w.setColor(placeAt, colorRef.current);
                w.setIsBlueprint(placeAt, false);
              } else if (!target) {
                w.addVoxel(placeAt, colorRef.current);
              }
            }
          }
        }
    
        pendingHoverRaycastRef.current = true;
      }
    }

    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerleave", onPointerLeave);
    renderer.domElement.addEventListener("pointerdown", onPointerDown);

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      pendingHoverRaycastRef.current = true;
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      controls.update();

      if (pendingHoverRaycastRef.current) {
        pendingHoverRaycastRef.current = false;
        updateHoverFace();
      }

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
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

      world.dispose();
      worldRef.current = null;

      controls.dispose();
      controlsRef.current = null;

      cameraRef.current = null;
      rendererRef.current = null;
      sceneRef.current = null;

      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [mouseNDC, raycaster]);

  //tool shortcuts

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
  
      const el = e.target as HTMLElement | null;
      const tag = el?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || el?.isContentEditable) return;
  
      if (importModal) return;
  
      const k = e.key.toLowerCase();
  
      let next: ToolId | null = null;
      if (k === "q") next = "pencil";
      if (k === "e") next = "eyedropper";
      if (k === "w") next = "marquee";
      if (!next) return;
  
      if (toolRef.current === "marquee" && next !== "marquee") {
        marqueeStartRef.current = null;
        if (marqueePreviewRef.current) marqueePreviewRef.current.visible = false;
      }
  
      setTool(next);
      toolRef.current = next; // keep in sync for your pointer handlers
  
      e.preventDefault();
    };
  
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [importModal]);

  //import popup

  useEffect(() => {
    if (!importModal) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setImportModal(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [importModal]);

  return (
    <div
      ref={mountRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
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
            <div style={{ fontSize: 20, marginBottom: 20, padding: "0px 0px"}}>{"Import .vox"}</div>
            <div style={{ fontSize: 15, marginBottom: 14, padding: "0px 0px" }}>
              <div style={{ marginBottom: 4 }}> {importModal.fileName} </div>
              <div>{importModal.voxels.length.toLocaleString()} voxels</div>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <label
                onClick={() => applyImport({ asBlueprint: false })}
                style={{
                  padding: "10px 0px",
                  cursor: "pointer",
                  fontSize: 15
                }}
              >
                Import normally
              </label>

              <label
                onClick={() => applyImport({ asBlueprint: true })}
                style={{
                  padding: "10px 12px",
                  cursor: "pointer",
                  fontSize: 15
                }}
              >
                Import as blueprint
              </label>

              <label
                onClick={() => setImportModal(null)}
                style={{
                  padding: "10px 12px",
                  cursor: "pointer",
                  fontSize: 15
                }}
              >
                Cancel
              </label>
            </div>

          </div>
        </div>
      )}

      <input
        value={islandName}
        onChange={(e) => setIslandName(e.target.value)}
        spellCheck={false}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          gap: 10,
          padding: "15px 15px",
          color: "black",
          fontSize: 20,
          width: 240,
          pointerEvents: "auto",
          fontFamily: "inherit",
          fontSizeAdjust: "none",
          background: "transparent",
          border: "none",
          outline: "none",
        }}
      />

      <div style={{ position: "absolute", top: 30, left: 0 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <ColorPalette value={color} onChange={setColor} />
          <ToolPalette value={tool} onChange={setTool} />
        </div>
      </div>

      <LibraryPanel
        open={libraryOpen}
        onClose={() => setLibraryOpen(false)}
        onOpenIsland={onOpenFromLibrary}
      />

      <div style={{ position: "absolute", top: 0, right: 0, display: "flex", gap: 10, pointerEvents: "auto" }}>
        <label
          onClick={onNew}
          style={{ padding: "15px 15px", color: "black", fontSize: 20, cursor: "pointer" }}
        >
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
          Library
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

      {(() => {
        const hints = getToolHints(tool);
        return (
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
            }}
          >
            <div>{hints.shortcut}</div>
            <div>{hints.left}</div>
            <div>{hints.right}</div>
          </div>
        );
      })()}
    </div>
  );
}