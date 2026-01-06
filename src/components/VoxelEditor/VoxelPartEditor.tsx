"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import ColorPalette from "./ui/ColorPalette";
import ToolPalette, { type ToolId } from "./ui/ToolPalette";

import { VoxelWorld } from "./VoxelWorld";
import type { VoxelCoord } from "./Types";
import { add } from "./Types";

const FOCUS_GROUP_ID = "__focus__";

type LoopCtx = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
};

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

function getToolHints(tool: ToolId): { left: string; right: string; shortcut: string } {
  switch (tool) {
    case "pencil":
      return { left: "Left click: place", right: "Right click: delete", shortcut: "Q: pencil" };
    case "eyedropper":
      return { left: "Left click: pick color", right: "Right click: (none)", shortcut: "E: eyedropper" };
    case "marquee":
      return { left: "Left click: set start / confirm fill", right: "Right click: cancel", shortcut: "W: marquee" };
    default:
      return { left: "Left click: confirm", right: "Right click: delete", shortcut: "Q / W / E" };
  }
}

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

export default function VoxelPartEditor(props: {
  open: boolean;
  groupId: string | null;

  // pass live world from VoxelWorldEditor
  world: VoxelWorld | null;

  onExit: () => void;
}) {
  const { open, groupId, world, onExit } = props;

  const mountRef = useRef<HTMLDivElement | null>(null);

  const [color, setColor] = useState("#34c759");
  const [tool, setTool] = useState<ToolId>("pencil");

  const colorRef = useRef(color);
  useEffect(() => void (colorRef.current = color), [color]);
  const toolRef = useRef<ToolId>(tool);
  useEffect(() => void (toolRef.current = tool), [tool]);

  const marqueeStartRef = useRef<VoxelCoord | null>(null);
  const marqueePreviewRef = useRef<THREE.Mesh | null>(null);
  const hoverPlaneRef = useRef<THREE.Mesh | null>(null);

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const mouseNDC = useMemo(() => new THREE.Vector2(), []);
  const pendingHoverRaycastRef = useRef(false);

  const focusWorldRef = useRef<VoxelWorld | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

  const openRef = useRef(open);
  useEffect(() => void (openRef.current = open), [open]);

  const rafRef = useRef<number | null>(null);

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

  function getPlacementCoord(hit: { coord: VoxelCoord; normal: VoxelCoord }, w: VoxelWorld): VoxelCoord | null {
    const rec = w.get(hit.coord);

    if (rec?.isBlueprint) return hit.coord;

    const n = hit.normal;
    if (n.x === 0 && n.y === 0 && n.z === 0) return null;

    return add(hit.coord, n);
  }

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

  //ctx start stop loop
    
  function stop() {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }
  
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
  
      // WebGLRenderer.render(scene: Object3D, camera: Camera)
      ctx.renderer.render(ctx.scene, ctx.camera);
    };
  
    tick();
  }

  // commit changes back to live world passed 
  function commitAndExit() {
    if (!world || !groupId) return onExit();

    const fw = focusWorldRef.current;
    const snap = fw?.getGroupSnapshot(FOCUS_GROUP_ID);

    world.setGroupVoxelsLocal(groupId, snap?.voxels ?? [], { keepPosition: true });
    onExit();
  }

  // esc to commit
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

  // tool shortcuts q e w 
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
        marqueeStartRef.current = null;
        if (marqueePreviewRef.current) marqueePreviewRef.current.visible = false;
      }

      setTool(next);
      toolRef.current = next;
      e.preventDefault();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // init once
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color("#ffffff");

    const camera = new THREE.PerspectiveCamera(40, mount.clientWidth / mount.clientHeight, 0.1, 2000);
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

    // focus world lives forever
    const fw = new VoxelWorld(scene);
    focusWorldRef.current = fw;

    fw.addGroup(FOCUS_GROUP_ID, { x: 0, y: 0, z: 0 });

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

    // marquee preview
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

    function onPointerMove(e: PointerEvent) {
      if (!openRef.current) return;
      updateRayFromMouse(e);
      pendingHoverRaycastRef.current = true;
    }

    function onPointerLeave() {
      hideHover();
    }

    function onPointerDown(e: PointerEvent) {
      if (!openRef.current) return;

      updateRayFromMouse(e);

      const w = focusWorldRef.current;
      if (!w) return;

      const hit = raycastVoxelGrid(w, raycaster.ray, 2000, 4096);
      const activeTool = toolRef.current;

      // eyedropper
      if (activeTool === "eyedropper") {
        if (e.button !== 0) return;

        if (hit) {
          const rec = w.get(hit.coord);
          if (rec) {
            setColor(rec.color);
            colorRef.current = rec.color;
          }
        }

        pendingHoverRaycastRef.current = true;
        return;
      }

      // marquee
      if (activeTool === "marquee") {
        if (e.button === 2) {
          if (marqueeStartRef.current) {
            marqueeStartRef.current = null;
            hideMarqueePreview();
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
          pendingHoverRaycastRef.current = true;
          return;
        }

        fillBox(marqueeStartRef.current, placeAt, w, colorRef.current);
        marqueeStartRef.current = null;
        hideMarqueePreview();
        pendingHoverRaycastRef.current = true;
        return;
      }

      // pencil
      if (e.button === 2) {
        if (hit) w.removeVoxel(hit.coord);
        pendingHoverRaycastRef.current = true;
        return;
      }

      if (e.button === 0) {
        if (!hit) return;

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
              w.addVoxel(placeAt, colorRef.current, { groupId: FOCUS_GROUP_ID });
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

      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []); 

  // content swap ,, when opening / changing groupId replace voxels to avoid scene rebuild
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

    // reset editor transient state
    marqueeStartRef.current = null;
    hideMarqueePreview();
    hideHover();

    // size canvas
    const w = mount.clientWidth;
    const h = mount.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const snapshot = world.getGroupSnapshot(groupId);
    const localVoxels = snapshot?.voxels ?? [];

    // overwrite focus voxels in LOCAL coords
    fw.setGroupVoxelsLocal(FOCUS_GROUP_ID, localVoxels, { keepPosition: false });

    // recenter camera
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
        controls.target.x + span * 2.2,
        controls.target.y + span * 1.8,
        controls.target.z + span * 2.2
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

  // render loop ,, start/stop RAF on open
  useEffect(() => {
    if (!open) {
      stop();
      return;
    }
    start();
    return () => stop();
  }, [open]);

  const hints = getToolHints(tool);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100000,
        pointerEvents: open ? "auto" : "none",
        opacity: open ? 1 : 0,
        transition: "opacity 120ms linear",
        background: "#fff",
      }}
      aria-hidden={!open}
    >
      <div
        ref={mountRef}
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          userSelect: "none",
        }}
      />

      <div style={{ position: "absolute", top: 0, left: 0, padding: 12, pointerEvents: "auto" }}>
        <div style={{ fontSize: 18, marginBottom: 8 }}>
          Focus Mode — Group: <b>{groupId ?? "(none)"}</b>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <ColorPalette value={color} onChange={setColor} />
            <ToolPalette value={tool} onChange={setTool} />
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", top: 0, right: 0, display: "flex", gap: 10, pointerEvents: "auto" }}>
        <label
          onClick={commitAndExit}
          style={{ padding: "15px 15px", color: "black", fontSize: 18, cursor: "pointer", textDecoration: "underline" }}
        >
          Done
        </label>
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
        }}
      >
        <div>{hints.shortcut}</div>
        <div>{hints.left}</div>
        <div>{hints.right}</div>
        <div style={{ opacity: 0.7 }}>Esc: done + exit</div>
      </div>
    </div>
  );
}