"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/Addons.js";

import { applyHeightMistToStandardMaterial } from "@/materials/heightMist";
import { listPublishedWorlds } from "@/services/publishedWorlds";
import { GetUserProfile } from "@/services/user";
import type { PublishedWorldDocument } from "@/components/VoxelEditor/domain/publishedWorldTypes";

import {
  createFpsMoveState,
  createFpsState,
  enterFpsMode,
  exitFpsMode,
  handleFpsKeyDown,
  handleFpsKeyUp,
  handleFpsPointerMove,
  updateFpsCamera,
} from "./controllers/fpsController";

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

function quarterTurnsToEuler(rotation?: {
  x?: number;
  y?: number;
  z?: number;
}) {
  return new THREE.Euler(
    ((rotation?.x ?? 0) * Math.PI) / 2,
    ((rotation?.y ?? 0) * Math.PI) / 2,
    ((rotation?.z ?? 0) * Math.PI) / 2,
    "XYZ"
  );
}

type Bounds3 = {
  minX: number;
  minY: number;
  minZ: number;
  maxX: number;
  maxY: number;
  maxZ: number;
};

const PLAY_SKY_RADIUS_1 = 1200;
const PLAY_SKY_RADIUS_2 = 1000;
const PLAY_SKY_RADIUS_3 = 850;

const PLAY_SKY_SEGMENTS_W = 48;
const PLAY_SKY_SEGMENTS_H = 32;

const PLAY_SKY_ROT_SPEED_2 = 0.01;
const PLAY_SKY_ROT_SPEED_3 = 0.018;

export default function VoxelViewer(props: {
  publishedWorldId: string | null;
}) {
  const { publishedWorldId } = props;

  const mountRef = useRef<HTMLDivElement | null>(null);

  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  const islandRootRef = useRef<THREE.Object3D | null>(null);
  const envRTRef = useRef<THREE.WebGLRenderTarget | null>(null);
  const publishedWorldRootRef = useRef<THREE.Group | null>(null);
  const playSkyRootRef = useRef<THREE.Group | null>(null);
  const playSkyCloud2Ref = useRef<THREE.Mesh | null>(null);
  const playSkyCloud3Ref = useRef<THREE.Mesh | null>(null);

  const worldBoundsRef = useRef<Bounds3 | null>(null);
  const playModeRef = useRef(false);

  const [loadError, setLoadError] = useState<string | null>(null);
  const [worldName, setWorldName] = useState<string>("");
  const [authorName, setAuthorName] = useState<string>("");

  const [playMode, setPlayMode] = useState(false);

  const moveStateRef = useRef(createFpsMoveState());
  const fpStateRef = useRef(createFpsState());

  useEffect(() => {
    playModeRef.current = playMode;
    if (playSkyRootRef.current) {
      playSkyRootRef.current.visible = playMode;
    }
  }, [playMode]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      40,
      mount.clientWidth / mount.clientHeight,
      0.1,
      2000
    );
    camera.position.set(172.557, 77.391, 184.354);
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

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 0, 0);
    controls.update();
    camera.lookAt(controls.target);
    controlsRef.current = controls;

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
        envRTRef.current = rt;
      },
      undefined,
      (err) => console.error("Failed to load HDRI /world/DayInTheClouds1K.hdr", err)
    );

    const gltfLoader = new GLTFLoader();
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

            if (scene.environment) {
              (m as any).envMap = scene.environment;
            }

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

    const publishedWorldRoot = new THREE.Group();
    publishedWorldRoot.name = "published-world-root";
    scene.add(publishedWorldRoot);
    publishedWorldRootRef.current = publishedWorldRoot;

    const playSkyRoot = new THREE.Group();
    playSkyRoot.name = "play-sky-root";
    playSkyRoot.visible = false;
    scene.add(playSkyRoot);
    playSkyRootRef.current = playSkyRoot;

    const texLoader = new THREE.TextureLoader();

    const setupSkyTexture = (tex: THREE.Texture) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.needsUpdate = true;
    };

    texLoader.load(
      "/player/skybox1.png",
      (texture) => {
        setupSkyTexture(texture);

        const geometry = new THREE.SphereGeometry(
          PLAY_SKY_RADIUS_1,
          PLAY_SKY_SEGMENTS_W,
          PLAY_SKY_SEGMENTS_H
        );

        const material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.BackSide,
          transparent: false,
          depthWrite: false,
          fog: false,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.name = "play-sky-1";
        playSkyRoot.add(mesh);
      },
      undefined,
      (err) => console.error("Failed to load /player/skybox1.png", err)
    );

    texLoader.load(
      "/player/skybox2.png",
      (texture) => {
        setupSkyTexture(texture);

        const geometry = new THREE.SphereGeometry(
          PLAY_SKY_RADIUS_2,
          PLAY_SKY_SEGMENTS_W,
          PLAY_SKY_SEGMENTS_H
        );

        const material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.BackSide,
          transparent: true,
          depthWrite: false,
          fog: false,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.name = "play-sky-2";
        playSkyRoot.add(mesh);
        playSkyCloud2Ref.current = mesh;
      },
      undefined,
      (err) => console.error("Failed to load /player/skybox2.png", err)
    );

    texLoader.load(
      "/player/skybox3.png",
      (texture) => {
        setupSkyTexture(texture);

        const geometry = new THREE.SphereGeometry(
          PLAY_SKY_RADIUS_3,
          PLAY_SKY_SEGMENTS_W,
          PLAY_SKY_SEGMENTS_H
        );

        const material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.BackSide,
          transparent: true,
          depthWrite: false,
          fog: false,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.name = "play-sky-3";
        playSkyRoot.add(mesh);
        playSkyCloud3Ref.current = mesh;
      },
      undefined,
      (err) => console.error("Failed to load /player/skybox3.png", err)
    );

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", onResize);

    const onKeyDown = (e: KeyboardEvent) => {
      handleFpsKeyDown(
        e,
        moveStateRef.current,
        fpStateRef.current,
        fpStateRef.current.active
      );
    };

    const onKeyUp = (e: KeyboardEvent) => {
      handleFpsKeyUp(e, moveStateRef.current);
    };

    const onPointerMove = (e: PointerEvent) => {
      handleFpsPointerMove(e, fpStateRef.current);
    };

    const onPointerLockChange = () => {
      const locked = document.pointerLockElement === renderer.domElement;
      fpStateRef.current.active = locked && playModeRef.current;
    };

    const onMouseDown = () => {
      if (!playModeRef.current) return;
      if (document.pointerLockElement === renderer.domElement) return;
      renderer.domElement.requestPointerLock?.();
    };

    document.addEventListener("pointerlockchange", onPointerLockChange);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("mousedown", onMouseDown);

    let lastMs = performance.now();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);

      const now = performance.now();
      const dt = Math.min(0.05, (now - lastMs) / 1000);
      lastMs = now;

      if (playModeRef.current) {
        if (playSkyCloud2Ref.current) {
          playSkyCloud2Ref.current.rotation.y += PLAY_SKY_ROT_SPEED_2 * dt;
        }
        if (playSkyCloud3Ref.current) {
          playSkyCloud3Ref.current.rotation.y += PLAY_SKY_ROT_SPEED_3 * dt;
        }
      }

      if (fpStateRef.current.active) {
        const activeCamera = cameraRef.current;
        if (activeCamera) {
          updateFpsCamera({
            dt,
            camera: activeCamera,
            fpsState: fpStateRef.current,
            moveState: moveStateRef.current,
          });
        }
      } else {
        controls.update();
      }

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerlockchange", onPointerLockChange);
      renderer.domElement.removeEventListener("mousedown", onMouseDown);

      if (document.pointerLockElement === renderer.domElement) {
        document.exitPointerLock();
      }

      if (publishedWorldRootRef.current) {
        publishedWorldRootRef.current.traverse((obj) => {
          const mesh = obj as THREE.Mesh;
          if (!(mesh as any).isMesh) return;

          mesh.geometry?.dispose();

          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            mesh.material?.dispose();
          }
        });

        scene.remove(publishedWorldRootRef.current);
        publishedWorldRootRef.current = null;
      }

      if (playSkyRootRef.current) {
        playSkyRootRef.current.traverse((obj) => {
          const mesh = obj as THREE.Mesh;
          if (!(mesh as any).isMesh) return;

          mesh.geometry?.dispose();

          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => {
              const mm = m as THREE.MeshBasicMaterial;
              mm.map?.dispose();
              mm.dispose();
            });
          } else {
            const mm = mesh.material as THREE.MeshBasicMaterial;
            mm.map?.dispose();
            mm.dispose();
          }
        });

        scene.remove(playSkyRootRef.current);
        playSkyRootRef.current = null;
        playSkyCloud2Ref.current = null;
        playSkyCloud3Ref.current = null;
      }

      if (islandRootRef.current) {
        scene.remove(islandRootRef.current);
        islandRootRef.current = null;
      }

      scene.environment = null;

      if (envRTRef.current) {
        envRTRef.current.dispose();
        envRTRef.current = null;
      }

      controls.dispose();
      controlsRef.current = null;
      cameraRef.current = null;
      sceneRef.current = null;

      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      rendererRef.current = null;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadPublishedWorld() {
      const scene = sceneRef.current;
      const root = publishedWorldRootRef.current;
      const controls = controlsRef.current;
      const camera = cameraRef.current;

      if (!scene || !root || !controls || !camera) return;
      if (!publishedWorldId) return;

      setLoadError(null);
      setWorldName("");
      setAuthorName("");
      setPlayMode(false);
      worldBoundsRef.current = null;

      root.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (!(mesh as any).isMesh) return;

        mesh.geometry?.dispose();

        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose());
        } else {
          mesh.material?.dispose();
        }
      });
      root.clear();

      try {
        const res = await listPublishedWorlds();
        if (cancelled) return;

        const world: PublishedWorldDocument | undefined = res.worlds?.find(
          (w) => w.publishedWorldId === publishedWorldId
        );

        if (!world) {
          setLoadError("Published world not found.");
          return;
        }

        setWorldName(world.worldName || "Untitled World");

        try {
          const profile = await GetUserProfile(world.publisherUserId);
          if (!cancelled) {
            setAuthorName(profile.username || "unknown user");
          }
        } catch (err) {
          console.error("Failed to resolve viewer author name", err);
          if (!cancelled) {
            setAuthorName("unknown user");
          }
        }

        let minX = Infinity;
        let minY = Infinity;
        let minZ = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;
        let maxZ = -Infinity;

        for (const group of world.groups) {
          const groupRoot = new THREE.Group();
          groupRoot.name = `published-group:${group.groupId}`;
          groupRoot.position.set(
            group.position.x,
            group.position.y,
            group.position.z
          );

          const euler = quarterTurnsToEuler(group.rotation);
          groupRoot.rotation.set(euler.x, euler.y, euler.z);

          for (const surface of group.surfaces) {
            const geometry = new THREE.BufferGeometry();

            geometry.setAttribute(
              "position",
              new THREE.Float32BufferAttribute(surface.positions, 3)
            );
            geometry.setAttribute(
              "normal",
              new THREE.Float32BufferAttribute(surface.normals, 3)
            );
            geometry.setIndex(surface.indices);
            geometry.computeBoundingSphere();

            const material = new THREE.MeshStandardMaterial({
              color: new THREE.Color(surface.color),
              transparent: surface.isBlueprint,
              opacity: surface.isBlueprint ? 0.4 : 0.7,
            });

            if (surface.isBlueprint) {
              material.depthWrite = false;
            }

            applyHeightMistToStandardMaterial(material, {
              yBottom: -12,
              yTop: 1,
              maxOpacity: 0.3,
              color: 0xffffff,
            });

            material.needsUpdate = true;

            const mesh = new THREE.Mesh(geometry, material);
            mesh.castShadow = !surface.isBlueprint;
            mesh.receiveShadow = true;
            mesh.renderOrder = surface.isBlueprint ? 1 : 0;

            groupRoot.add(mesh);
          }

          root.add(groupRoot);

          if (group.bounds) {
            minX = Math.min(minX, group.bounds.min.x);
            minY = Math.min(minY, group.bounds.min.y);
            minZ = Math.min(minZ, group.bounds.min.z);
            maxX = Math.max(maxX, group.bounds.max.x);
            maxY = Math.max(maxY, group.bounds.max.y);
            maxZ = Math.max(maxZ, group.bounds.max.z);
          }
        }

        if (Number.isFinite(minX)) {
          worldBoundsRef.current = { minX, minY, minZ, maxX, maxY, maxZ };

          recenterCameraOnBounds({
            minX,
            minY,
            minZ,
            maxX,
            maxY,
            maxZ,
            controls,
            camera,
          });
        }
      } catch (err) {
        console.error("Failed to load published world", err);
        if (!cancelled) {
          setLoadError("Failed to load published world.");
        }
      }
    }

    loadPublishedWorld();

    return () => {
      cancelled = true;
    };
  }, [publishedWorldId]);

  useEffect(() => {
    const scene = sceneRef.current;
    const controls = controlsRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;
    const playSkyRoot = playSkyRootRef.current;

    if (!scene || !controls || !camera || !renderer) return;

    if (!playMode) {
      controls.enabled = true;
      if (playSkyRoot) playSkyRoot.visible = false;

      exitFpsMode({
        renderer,
        fpsState: fpStateRef.current,
        moveState: moveStateRef.current,
        camera,
      });

      const bounds = worldBoundsRef.current;
      if (bounds) {
        recenterCameraOnBounds({
          ...bounds,
          controls,
          camera,
        });
      }

      return;
    }

    const bounds = worldBoundsRef.current;
    if (!bounds) return;

    controls.enabled = false;
    if (playSkyRoot) playSkyRoot.visible = true;

    enterFpsMode({
      camera,
      renderer,
      fpsState: fpStateRef.current,
      bounds,
    });
  }, [playMode]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        userSelect: "none",
        backgroundImage: playMode ? "none" : `url('/world/bg.png')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
    >
      {!playMode && (
        <div className="clouds" aria-hidden>
          <img className="cloud cloudBg" src="/world/bgc.png" alt="" />
          <img className="cloud cloudMg" src="/world/mgc.png" alt="" />
          <img className="cloud cloudFg" src="/world/fgc.png" alt="" />
        </div>
      )}

      <div
        ref={mountRef}
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zIndex: 10,
          cursor: playMode ? "crosshair" : "default",
        }}
      />

      {!playMode && !loadError && (worldName || authorName) && (
        <div
          style={{
            position: "absolute",
            top: 60,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            pointerEvents: "auto",
            textAlign: "center",
            color: "#DBFAFF",
          }}
        >
          <div
            style={{
              fontSize: 45,
              lineHeight: 1.05,
              letterSpacing: "0.1em",
              maxWidth: "80vw",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {worldName}
          </div>

          <div
            style={{
              fontSize: 24,
              opacity: 0.72,
              maxWidth: "80vw",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {authorName ? `by ${authorName}` : ""}
          </div>

          <div
            className="pix-icon"
            onClick={() => {
              setPlayMode(true);
            }}
            style={{
              marginTop: 8,
              fontSize: 30,
              color: "#DBFAFF",
              userSelect: "none",
            }}
          >
            Let's Go!
          </div>
        </div>
      )}

      {playMode && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 40,
            pointerEvents: "none",
            color: "#DBFAFF",
            fontSize: 20,
            opacity: 0.9,
          }}
        >
          +
        </div>
      )}

      {loadError && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              background: "rgba(0,0,0,0.55)",
              color: "white",
              padding: "12px 16px",
              borderRadius: 6,
              fontSize: 16,
            }}
          >
            {loadError}
          </div>
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
          0% {
            transform: translate3d(calc(-50% - 0.2%), -50%, 0);
          }
          50% {
            transform: translate3d(calc(-50% + 0.2%), -50%, 0);
          }
          100% {
            transform: translate3d(calc(-50% - 0.2%), -50%, 0);
          }
        }

        @keyframes cloudSineMg {
          0% {
            transform: translate3d(calc(-50% + 0.3%), calc(-50% + 0.05%), 0);
          }
          50% {
            transform: translate3d(calc(-50% - 0.3%), calc(-50% - 0.05%), 0);
          }
          100% {
            transform: translate3d(calc(-50% + 0.3%), calc(-50% + 0.05%), 0);
          }
        }

        @keyframes cloudSineFg {
          0% {
            transform: translate3d(calc(-50% - 0.4%), calc(-50% - 0.075%), 0);
          }
          50% {
            transform: translate3d(calc(-50% + 0.4%), calc(-50% + 0.075%), 0);
          }
          100% {
            transform: translate3d(calc(-50% - 0.4%), calc(-50% - 0.075%), 0);
          }
        }
      `}</style>
    </div>
  );
}