"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";
import { RGBELoader } from "three/examples/jsm/Addons.js";

import { applyAnimatedHeightMistToStandardMaterial, updateHeightMistMaterialTime, } from "@/materials/animatedHeightMist";
import { listPublishedWorlds } from "@/services/publishedWorlds";
import { GetUserProfile } from "@/services/user";
import type { PublishedWorldDocument } from "@/components/VoxelEditor/domain/publishedWorldTypes";

import { createVehicleEffectsController } from "./controllers/vehicleEffectsController";

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

import {
  createDriveMoveState,
  createDriveState,
  enterDriveMode,
  exitDriveMode,
  handleDriveKeyDown,
  handleDriveKeyUp,
  updateDriveCamera,
} from "./controllers/vehicleController";

const TEMP_WORLD_SCALE = 1.0;
const JEFF_TARGET_HEIGHT = 10;
const JEFF_Y_OFFSET = -5.0;
const JEFF_ROT_Y = Math.PI / 2;

type Bounds3 = {
  minX: number;
  minY: number;
  minZ: number;
  maxX: number;
  maxY: number;
  maxZ: number;
};

const PLAY_SKY_RADIUS_0 = 9000;
const PLAY_SKY_RADIUS_1 = 8500;
const PLAY_SKY_RADIUS_2 = 8000;
const PLAY_SKY_RADIUS_3 = 7500;

const PLAY_SKY_SEGMENTS_W = 512;
const PLAY_SKY_SEGMENTS_H = 220;

const PLAY_SKY_ROT_SPEED_1 = 0.005;
const PLAY_SKY_ROT_SPEED_2 = 0.01;
const PLAY_SKY_ROT_SPEED_3 = 0.018;

const CLOUD_LIGHT_START_Y = 125;
const CLOUD_LIGHT_FULL_Y = 450;
const CLOUD_LIGHT_MAX_INTENSITY = 25.0;

const VIEWER_MIST_Y_BOTTOM = -200;
const VIEWER_MIST_Y_TOP = 200;
const VIEWER_MIST_MAX_OPACITY = 0.7;
const VIEWER_MIST_COLOR = 0xffffff;

const SHARED_MIST_NOISE_SCALE = 0.01;
const SHARED_MIST_NOISE_STRENGTH = 0.5;
const SHARED_MIST_NOISE_SCROLL = { x: 0.5, y: 0.012, z: 0.004 };

const ISLAND_MIST_Y_BOTTOM = -40;
const ISLAND_MIST_Y_TOP = 10;
const ISLAND_MIST_MAX_OPACITY = 0.60;

const DRIVABLE_MARKETPLACE_IDS = new Set([
  "preset_car",
  "preset_mini-hovercraft",
]);

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

function disposeObject3D(root: THREE.Object3D | null) {
  if (!root) return;

  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!(mesh as any).isMesh) return;

    mesh.geometry?.dispose();

    if (Array.isArray(mesh.material)) {
      for (const m of mesh.material) {
        const mm = m as THREE.Material & { map?: THREE.Texture | null };
        mm.map?.dispose?.();
        mm.dispose();
      }
    } else {
      const mm = mesh.material as THREE.Material & { map?: THREE.Texture | null };
      mm.map?.dispose?.();
      mm.dispose();
    }
  });
}

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
  const publishedWorldRootRef = useRef<THREE.Group | null>(null);
  const playSkyRootRef = useRef<THREE.Group | null>(null);
  const playSkyCloud1Ref = useRef<THREE.Mesh | null>(null);
  const playSkyCloud2Ref = useRef<THREE.Mesh | null>(null);
  const playSkyCloud3Ref = useRef<THREE.Mesh | null>(null);

  const playSkyWarm1Ref = useRef<THREE.Mesh | null>(null);
  const playSkyWarm2Ref = useRef<THREE.Mesh | null>(null);
  const playSkyWarm3Ref = useRef<THREE.Mesh | null>(null);
  const envRTRef = useRef<THREE.WebGLRenderTarget | null>(null);

  const jeffTemplateRef = useRef<THREE.Object3D | null>(null);
  const jeffInstanceRef = useRef<THREE.Object3D | null>(null);

  const vehicleEffectsRef = useRef<ReturnType<typeof createVehicleEffectsController> | null>(null);

  const jeffClipsRef = useRef<THREE.AnimationClip[]>([]);
  const jeffMixerRef = useRef<THREE.AnimationMixer | null>(null);
  const jeffFinishHandlerRef = useRef<((e: { action: THREE.AnimationAction }) => void) | null>(null);

  const raycasterRef = useRef(new THREE.Raycaster());
  const hoveredVehicleRootRef = useRef<THREE.Object3D | null>(null);
  const hoveredVehicleBoxRef = useRef<THREE.Box3Helper | null>(null);

  const moveStateRef = useRef(createFpsMoveState());
  const fpStateRef = useRef(createFpsState());

  const driveMoveStateRef = useRef(createDriveMoveState());
  const driveStateRef = useRef(createDriveState());

  const worldBoundsRef = useRef<Bounds3 | null>(null);
  const playModeRef = useRef(false);

  const [loadError, setLoadError] = useState<string | null>(null);
  const [worldName, setWorldName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [playMode, setPlayMode] = useState(false);
  const [driveMode, setDriveMode] = useState(false);

  function snapTo(value: number, step: number) {
    return Math.round(value / step) * step;
  }

  function clearHoveredVehicleBox() {
    const scene = sceneRef.current;
    const helper = hoveredVehicleBoxRef.current;
    if (!scene || !helper) return;
    scene.remove(helper);
    (helper.material as THREE.Material).dispose();
    hoveredVehicleBoxRef.current = null;
  }

  function setHoveredVehicleBoxFor(root: THREE.Object3D | null) {
    const scene = sceneRef.current;
    if (!scene) return;

    clearHoveredVehicleBox();
    hoveredVehicleRootRef.current = root;

    if (!root) return;

    const box = new THREE.Box3().setFromObject(root);
    const helper = new THREE.Box3Helper(box, 0xc7ecff);
    helper.renderOrder = 9999;
    scene.add(helper);
    hoveredVehicleBoxRef.current = helper;
  }

  function detachJeff() {
    const inst = jeffInstanceRef.current;
    if (inst) {
      inst.parent?.remove(inst);
      jeffInstanceRef.current = null;
    }
  
    if (jeffMixerRef.current && jeffFinishHandlerRef.current) {
      jeffMixerRef.current.removeEventListener("finished", jeffFinishHandlerRef.current);
      jeffFinishHandlerRef.current = null;
    }
  
    if (jeffMixerRef.current) {
      jeffMixerRef.current.stopAllAction();
      jeffMixerRef.current = null;
    }
  }

  function attachJeffToVehicle(vehicleRoot: THREE.Object3D) {
    const template = jeffTemplateRef.current;
    if (!template) return;
  
    detachJeff();
  
    vehicleRoot.updateMatrixWorld(true);
  
    const vehicleBox = new THREE.Box3().setFromObject(vehicleRoot);
    const vehicleCenterWorld = new THREE.Vector3();
    vehicleBox.getCenter(vehicleCenterWorld);
  
    const vehicleTopCenterWorld = new THREE.Vector3(
      vehicleCenterWorld.x,
      vehicleBox.max.y,
      vehicleCenterWorld.z
    );
  
    const attachLocal = vehicleRoot.worldToLocal(vehicleTopCenterWorld.clone());
  
    const cloned = cloneSkeleton(template) as THREE.Object3D;
    cloned.name = "jeff-rider";
  
    const rawBox = new THREE.Box3().setFromObject(cloned);
    const rawSize = new THREE.Vector3();
    const rawCenter = new THREE.Vector3();
    rawBox.getSize(rawSize);
    rawBox.getCenter(rawCenter);
  
    const rawHeight = Math.max(rawSize.y, 0.0001);
    const uniformScale = JEFF_TARGET_HEIGHT / rawHeight;
    cloned.scale.setScalar(uniformScale);
    cloned.updateMatrixWorld(true);
  
    const scaledBox = new THREE.Box3().setFromObject(cloned);
    const scaledSize = new THREE.Vector3();
    const scaledCenter = new THREE.Vector3();
    scaledBox.getSize(scaledSize);
    scaledBox.getCenter(scaledCenter);
  
    cloned.position.set(
      attachLocal.x - scaledCenter.x,
      attachLocal.y - (scaledCenter.y - scaledSize.y * 0.5) + JEFF_Y_OFFSET,
      attachLocal.z - scaledCenter.z
    );
    cloned.rotation.set(0, JEFF_ROT_Y, 0);
  
    cloned.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!(mesh as any).isMesh) return;
    
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    
      const applyTo = (mat: THREE.Material) => {
        const m = mat as THREE.MeshStandardMaterial;
        if (!("roughness" in m)) return;
    
        const clonedMat = m.clone();
        clonedMat.roughness = 0.9;
        clonedMat.metalness = 0.02;
    
        applyAnimatedHeightMistToStandardMaterial(clonedMat, {
          yBottom: VIEWER_MIST_Y_BOTTOM,
          yTop: VIEWER_MIST_Y_TOP,
          maxOpacity: VIEWER_MIST_MAX_OPACITY,
          color: VIEWER_MIST_COLOR,
          noiseScale: SHARED_MIST_NOISE_SCALE,
          noiseStrength: SHARED_MIST_NOISE_STRENGTH,
          noiseScroll: SHARED_MIST_NOISE_SCROLL,
        });
    
        clonedMat.needsUpdate = true;
        return clonedMat;
      };
    
      if (Array.isArray(mesh.material)) {
        mesh.material = mesh.material.map((mat) => applyTo(mat) ?? mat);
      } else {
        mesh.material = applyTo(mesh.material) ?? mesh.material;
      }
    });
  
    vehicleRoot.add(cloned);
    jeffInstanceRef.current = cloned;
  
    if (jeffClipsRef.current.length > 0) {
      const mixer = new THREE.AnimationMixer(cloned);
      jeffMixerRef.current = mixer;
    
      const enterClip = jeffClipsRef.current[0] ?? null;
      const loopClip = jeffClipsRef.current[2] ?? jeffClipsRef.current[0] ?? null;
    
      if (enterClip) {
        const enterAction = mixer.clipAction(enterClip);
        enterAction.reset();
        enterAction.setLoop(THREE.LoopOnce, 1);
        enterAction.clampWhenFinished = true;
        enterAction.play();
    
        const onFinished = (e: { action: THREE.AnimationAction }) => {
          if (e.action !== enterAction) return;
    
          mixer.removeEventListener("finished", onFinished);
          jeffFinishHandlerRef.current = null;
    
          if (!loopClip) return;
    
          const loopAction = mixer.clipAction(loopClip);
          loopAction.reset();
          loopAction.setLoop(THREE.LoopRepeat, Infinity);
          loopAction.clampWhenFinished = false;
          loopAction.play();
        };
    
        mixer.addEventListener("finished", onFinished);
        jeffFinishHandlerRef.current = onFinished;
      }
    }
  }

  function findVehicleRootFromObject(obj: THREE.Object3D | null): THREE.Object3D | null {
    let cur: THREE.Object3D | null = obj;
    while (cur) {
      const latestMarketplaceAssetId = cur.userData?.latestMarketplaceAssetId;
      if (
        typeof latestMarketplaceAssetId === "string" &&
        DRIVABLE_MARKETPLACE_IDS.has(latestMarketplaceAssetId)
      ) {
        return cur;
      }
      cur = cur.parent;
    }
    return null;
  }

  function updateVehicleHover() {
    const camera = cameraRef.current;
    const root = publishedWorldRootRef.current;
    if (!camera || !root) {
      setHoveredVehicleBoxFor(null);
      return;
    }

    const raycaster = raycasterRef.current;
    raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);

    const hits = raycaster.intersectObject(root, true);
    const hitRoot =
      hits.length > 0 ? findVehicleRootFromObject(hits[0].object) : null;

    if (hitRoot !== hoveredVehicleRootRef.current) {
      setHoveredVehicleBoxFor(hitRoot);
    } else if (hoveredVehicleBoxRef.current && hitRoot) {
      hoveredVehicleBoxRef.current.box.setFromObject(hitRoot);
    }
  }

  function syncPlaySkyLayerRotation(layer: 1 | 2 | 3) {
    const cloud =
      layer === 1
        ? playSkyCloud1Ref.current
        : layer === 2
          ? playSkyCloud2Ref.current
          : playSkyCloud3Ref.current;
  
    const warm =
      layer === 1
        ? playSkyWarm1Ref.current
        : layer === 2
          ? playSkyWarm2Ref.current
          : playSkyWarm3Ref.current;
  
    if (!cloud || !warm) return;
    warm.rotation.y = cloud.rotation.y;
  }

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
      200000
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

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambient);

    const cloudSun = new THREE.DirectionalLight(0xffcc88, 0);
    cloudSun.position.set(300, 1800, -900);
    cloudSun.target.position.set(0, 200, 0);
    cloudSun.castShadow = true;
    cloudSun.shadow.bias = -0.00005;
    cloudSun.shadow.normalBias = 0.005;
    cloudSun.shadow.mapSize.set(4096, 4096);
    cloudSun.shadow.camera.left = -280;
    cloudSun.shadow.camera.right = 280;
    cloudSun.shadow.camera.top = 280;
    cloudSun.shadow.camera.bottom = -280;
    cloudSun.shadow.camera.near = 50;
    cloudSun.shadow.camera.far = 2600;
    scene.add(cloudSun.target);
    scene.add(cloudSun);

    const cloudWarmHemi = new THREE.HemisphereLight(0xffd6a0, 0x8aa0b8, 0);
    scene.add(cloudWarmHemi);

    const hemi = new THREE.HemisphereLight(0xdff4ff, 0x6fa0c8, 3.0);
    scene.add(hemi);

    const dir = new THREE.DirectionalLight(0xfdfbd3, 2.0);
    dir.castShadow = true;
    dir.shadow.bias = -0.00005;
    dir.shadow.normalBias = 0.005;
    dir.shadow.mapSize.set(4096, 4096);
    dir.shadow.camera.left = -280;
    dir.shadow.camera.right = 280;
    dir.shadow.camera.top = 280;
    dir.shadow.camera.bottom = -280;
    dir.shadow.camera.near = 50;
    dir.shadow.camera.far = 2600;
    dir.position.setFromSphericalCoords(
      250,
      THREE.MathUtils.degToRad(60),
      THREE.MathUtils.degToRad(30)
    );
    dir.target.position.set(0, 0, 50);
    scene.add(dir.target);
    scene.add(dir);

    const cloudSunOffset = new THREE.Vector3(300, 1800, -900);
    const dirOffset = dir.position.clone().sub(dir.target.position);

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

            m.roughness = 0.9;
            m.metalness = 0.02;

            if (scene.environment) {
              (m as any).envMap = scene.environment;
            }

            applyAnimatedHeightMistToStandardMaterial(m, {
              yBottom: ISLAND_MIST_Y_BOTTOM,
              yTop: ISLAND_MIST_Y_TOP,
              maxOpacity: ISLAND_MIST_MAX_OPACITY,
              color: VIEWER_MIST_COLOR,
              noiseScale: SHARED_MIST_NOISE_SCALE,
              noiseStrength: SHARED_MIST_NOISE_STRENGTH,
              noiseScroll: SHARED_MIST_NOISE_SCROLL,
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

    gltfLoader.load(
      "/player/Jeff.glb",
      (gltf) => {
        const root = gltf.scene;
        root.name = "jeff-template";
        root.visible = true;
    
        root.traverse((obj) => {
          const mesh = obj as THREE.Mesh;
          if (!(mesh as any).isMesh) return;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        });
    
        jeffTemplateRef.current = root;
        jeffClipsRef.current = gltf.animations ?? [];
      },
      undefined,
      (err) => {
        console.error("Failed to load /player/Jeff.glb", err);
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
      tex.minFilter = THREE.NearestFilter;
      tex.magFilter = THREE.NearestFilter;
      tex.generateMipmaps = false;
      tex.needsUpdate = true;
    };

    texLoader.load("/player/skybox0.png", (texture) => {
      setupSkyTexture(texture);
    
      const geometry = new THREE.SphereGeometry(
        PLAY_SKY_RADIUS_0,
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
      mesh.name = "play-sky-0";
      mesh.rotation.y = 0;
      playSkyRoot.add(mesh);
    });
    
    texLoader.load("/player/skybox1.png", (texture) => {
      setupSkyTexture(texture);
    
      const geometry = new THREE.SphereGeometry(
        PLAY_SKY_RADIUS_1,
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
      mesh.name = "play-sky-1";
      mesh.rotation.y = 160;
      playSkyRoot.add(mesh);
      playSkyCloud1Ref.current = mesh;
      syncPlaySkyLayerRotation(1);
    });

    texLoader.load("/player/skybox1-warm.png", (texture) => {
      setupSkyTexture(texture);
    
      const geometry = new THREE.SphereGeometry(
        PLAY_SKY_RADIUS_1,
        PLAY_SKY_SEGMENTS_W,
        PLAY_SKY_SEGMENTS_H
      );
    
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
        fog: false,
        blending: THREE.NormalBlending,
        opacity: 0,
        toneMapped: false,
      });
    
      const mesh = new THREE.Mesh(geometry, material);
      mesh.name = "play-sky-1-warm";
      mesh.rotation.y = 160;
      playSkyRoot.add(mesh);
      playSkyWarm1Ref.current = mesh;
      syncPlaySkyLayerRotation(1);
    });
    
    texLoader.load("/player/skybox2.png", (texture) => {
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
      mesh.rotation.y = 0;
      playSkyRoot.add(mesh);
      playSkyCloud2Ref.current = mesh;
      syncPlaySkyLayerRotation(2);
    });

    texLoader.load("/player/skybox2-warm.png", (texture) => {
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
        blending: THREE.NormalBlending,
        opacity: 0,
        toneMapped: false,
      });
    
      const mesh = new THREE.Mesh(geometry, material);
      mesh.name = "play-sky-2-warm";
      mesh.rotation.y = 0;
      playSkyRoot.add(mesh);
      playSkyWarm2Ref.current = mesh;
      syncPlaySkyLayerRotation(2);
    });
    
    texLoader.load("/player/skybox3.png", (texture) => {
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
      mesh.rotation.y = 0;
      playSkyRoot.add(mesh);
      playSkyCloud3Ref.current = mesh;
      syncPlaySkyLayerRotation(3);
    });

    texLoader.load("/player/skybox3-warm.png", (texture) => {
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
        toneMapped: false,
        blending: THREE.NormalBlending,
        opacity: 0,
      });
    
      const mesh = new THREE.Mesh(geometry, material);
      mesh.name = "play-sky-3-warm";
      mesh.rotation.y = 0;
      playSkyRoot.add(mesh);
      playSkyWarm3Ref.current = mesh;
      syncPlaySkyLayerRotation(3);
    });

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    vehicleEffectsRef.current = createVehicleEffectsController({
      scene,
      camera,
    });

    window.addEventListener("resize", onResize);

    const onKeyDown = (e: KeyboardEvent) => {
      if (driveStateRef.current.active) {
        if (e.code === "KeyE") {
          const renderer = rendererRef.current;
          const activeCamera = cameraRef.current;

          exitDriveMode({
            camera: activeCamera,
            driveState: driveStateRef.current,
            moveState: driveMoveStateRef.current,
          });

          detachJeff();
          setDriveMode(false);

          if (renderer) {
            renderer.domElement.requestPointerLock?.();
          }

          fpStateRef.current.active = true;
          e.preventDefault();
          return;
        }

        handleDriveKeyDown(e, driveMoveStateRef.current, true);
        return;
      }

      handleFpsKeyDown(
        e,
        moveStateRef.current,
        fpStateRef.current,
        fpStateRef.current.active
      );

      if (
        e.code === "KeyE" &&
        playModeRef.current &&
        fpStateRef.current.active &&
        hoveredVehicleRootRef.current
      ) {
        const activeCamera = cameraRef.current;
        const renderer = rendererRef.current;
        if (!activeCamera || !renderer) return;

        const vehicleRoot = hoveredVehicleRootRef.current;

        enterDriveMode({
          camera: activeCamera,
          vehicleRoot,
          driveState: driveStateRef.current,
        });

        attachJeffToVehicle(vehicleRoot);

        setDriveMode(true);
        fpStateRef.current.active = false;

        if (document.pointerLockElement === renderer.domElement) {
          document.exitPointerLock();
        }

        clearHoveredVehicleBox();
        hoveredVehicleRootRef.current = null;

        e.preventDefault();
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      handleFpsKeyUp(e, moveStateRef.current);
      handleDriveKeyUp(e, driveMoveStateRef.current);
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
      if (driveStateRef.current.active) return;
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

      const timeSeconds = now * 0.001;

      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (!(mesh as any).isMesh) return;
        updateHeightMistMaterialTime(mesh.material, timeSeconds);
      });

      if (playModeRef.current) {
        if (playSkyCloud1Ref.current) {
          playSkyCloud1Ref.current.rotation.y += PLAY_SKY_ROT_SPEED_1 * dt;
          syncPlaySkyLayerRotation(1);
        }
        
        if (playSkyCloud2Ref.current) {
          playSkyCloud2Ref.current.rotation.y += PLAY_SKY_ROT_SPEED_2 * dt;
          syncPlaySkyLayerRotation(2);
        }
        
        if (playSkyCloud3Ref.current) {
          playSkyCloud3Ref.current.rotation.y += PLAY_SKY_ROT_SPEED_3 * dt;
          syncPlaySkyLayerRotation(3);
        }
      }

      if (cloudSun) {
        let probeY = camera.position.y;
      
        if (driveStateRef.current.active && driveStateRef.current.vehicleRoot) {
          probeY = driveStateRef.current.vehicleRoot.position.y;
        }
      
        const t = THREE.MathUtils.clamp(
          (probeY - CLOUD_LIGHT_START_Y) / (CLOUD_LIGHT_FULL_Y - CLOUD_LIGHT_START_Y),
          0,
          1
        );
      
        const eased = t * t * (3 - 2 * t);
      
        if (playSkyWarm1Ref.current) {
          const mat = playSkyWarm1Ref.current.material as THREE.MeshBasicMaterial;
          mat.opacity = eased * 0.12;
        }        
        if (playSkyWarm2Ref.current) {
          const mat = playSkyWarm2Ref.current.material as THREE.MeshBasicMaterial;
          mat.opacity = eased * 0.1;
        }        
        if (playSkyWarm3Ref.current) {
          const mat = playSkyWarm3Ref.current.material as THREE.MeshBasicMaterial;
          mat.opacity = eased * 0.15;
        }
        cloudWarmHemi.intensity = eased * 8.2;
        cloudSun.intensity = eased * CLOUD_LIGHT_MAX_INTENSITY;
        hemi.intensity = THREE.MathUtils.lerp(3.0, 2.0, eased);
        renderer.toneMappingExposure = THREE.MathUtils.lerp(1.0, 1.12, eased);
      }

      const SHADOW_SNAP = 8;

      let shadowFocus = camera.position;
      
      if (driveStateRef.current.active && driveStateRef.current.vehicleRoot) {
        shadowFocus = driveStateRef.current.vehicleRoot.position;
      }
      
      const sx = snapTo(shadowFocus.x, SHADOW_SNAP);
      const sy = snapTo(shadowFocus.y, SHADOW_SNAP);
      const sz = snapTo(shadowFocus.z, SHADOW_SNAP);
      
      cloudSun.target.position.set(sx, sy, sz);
      cloudSun.position.copy(cloudSun.target.position).add(cloudSunOffset);
      cloudSun.target.updateMatrixWorld();
      
      dir.target.position.set(sx, sy, sz);
      dir.position.copy(dir.target.position).add(dirOffset);
      dir.target.updateMatrixWorld();

      if (jeffMixerRef.current) {
        jeffMixerRef.current.update(dt);
      }

      if (driveStateRef.current.active) {
        const activeCamera = cameraRef.current;
        if (activeCamera) {
          updateDriveCamera({
            dt,
            camera: activeCamera,
            driveState: driveStateRef.current,
            moveState: driveMoveStateRef.current,
          });
        }
      } else if (fpStateRef.current.active) {
        const activeCamera = cameraRef.current;
        if (activeCamera) {
          updateFpsCamera({
            dt,
            camera: activeCamera,
            fpsState: fpStateRef.current,
            moveState: moveStateRef.current,
          });

          if (playModeRef.current) {
            updateVehicleHover();
          }
        }
      } else {
        if (!playModeRef.current) {
          clearHoveredVehicleBox();
        }
        controls.update();
      }

      vehicleEffectsRef.current?.update(dt, driveStateRef.current, driveMoveStateRef.current);

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

      detachJeff();
      if (jeffMixerRef.current) {
        jeffMixerRef.current.stopAllAction();
        jeffMixerRef.current = null;
      }
      jeffClipsRef.current = [];

      clearHoveredVehicleBox();
      hoveredVehicleRootRef.current = null;

      if (publishedWorldRootRef.current) {
        disposeObject3D(publishedWorldRootRef.current);
        scene.remove(publishedWorldRootRef.current);
        publishedWorldRootRef.current = null;
      }

      if (playSkyRootRef.current) {
        disposeObject3D(playSkyRootRef.current);
        scene.remove(playSkyRootRef.current);
        playSkyRootRef.current = null;
        playSkyCloud1Ref.current = null;
        playSkyCloud2Ref.current = null;
        playSkyCloud3Ref.current = null;
        playSkyWarm1Ref.current = null;
        playSkyWarm2Ref.current = null;
        playSkyWarm3Ref.current = null;
      }

      if (vehicleEffectsRef.current) {
        vehicleEffectsRef.current.dispose();
        vehicleEffectsRef.current = null;
      }

      if (islandRootRef.current) {
        disposeObject3D(islandRootRef.current);
        scene.remove(islandRootRef.current);
        islandRootRef.current = null;
      }

      scene.environment = null;

      if (envRTRef.current) {
        envRTRef.current.dispose();
        envRTRef.current = null;
      }

      if (jeffTemplateRef.current) {
        disposeObject3D(jeffTemplateRef.current);
        jeffTemplateRef.current = null;
      }

      dracoLoader.dispose();
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
      const root = publishedWorldRootRef.current;
      const controls = controlsRef.current;
      const camera = cameraRef.current;

      if (!root || !controls || !camera) return;
      if (!publishedWorldId) return;

      setLoadError(null);
      setWorldName("");
      setAuthorName("");
      setPlayMode(false);
      setDriveMode(false);
      worldBoundsRef.current = null;
      clearHoveredVehicleBox();
      hoveredVehicleRootRef.current = null;
      detachJeff();

      driveStateRef.current.active = false;
      driveStateRef.current.vehicleRoot = null;
      driveStateRef.current.speed = 0;
      driveMoveStateRef.current.forward = false;
      driveMoveStateRef.current.backward = false;
      driveMoveStateRef.current.left = false;
      driveMoveStateRef.current.right = false;
      vehicleEffectsRef.current?.reset();

      disposeObject3D(root);
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
        
          const latestMarketplaceAssetId = group.latestMarketplaceAssetId ?? null;
          const isVehicle =
            latestMarketplaceAssetId === "preset_car" ||
            latestMarketplaceAssetId === "preset_mini-hovercraft";
        
          const yOffset = isVehicle ? 0 : 20;
        
          groupRoot.position.set(
            group.position.x,
            group.position.y + yOffset,
            group.position.z
          );
        
          const euler = quarterTurnsToEuler(group.rotation);
          groupRoot.rotation.set(euler.x, euler.y, euler.z);
          groupRoot.scale.setScalar(TEMP_WORLD_SCALE);
        
          let meshParent: THREE.Object3D = groupRoot;
          let driveRoot: THREE.Group | null = null;
          let visualRoot: THREE.Group | null = null;
        
          let localMinX = Infinity;
          let localMinY = Infinity;
          let localMinZ = Infinity;
          let localMaxX = -Infinity;
          let localMaxY = -Infinity;
          let localMaxZ = -Infinity;
        
          if (isVehicle) {
            driveRoot = new THREE.Group();
            driveRoot.name = `vehicle-drive-root:${group.groupId}`;
            driveRoot.userData.latestMarketplaceAssetId = latestMarketplaceAssetId;
        
            visualRoot = new THREE.Group();
            visualRoot.name = `vehicle-visual-root:${group.groupId}`;
        
            driveRoot.add(visualRoot);
            groupRoot.add(driveRoot);
        
            meshParent = visualRoot;
          } else {
            groupRoot.userData.latestMarketplaceAssetId = latestMarketplaceAssetId;
          }
        
          for (const surface of group.surfaces) {
            const positions = surface.positions;
        
            for (let i = 0; i < positions.length; i += 3) {
              const x = positions[i];
              const y = positions[i + 1];
              const z = positions[i + 2];
        
              if (x < localMinX) localMinX = x;
              if (y < localMinY) localMinY = y;
              if (z < localMinZ) localMinZ = z;
              if (x > localMaxX) localMaxX = x;
              if (y > localMaxY) localMaxY = y;
              if (z > localMaxZ) localMaxZ = z;
            }
        
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
              opacity: surface.isBlueprint ? 0.4 : 0.78,
              roughness: 0.9,
              metalness: 0.02,
            });
        
            if (sceneRef.current?.environment) {
              material.envMap = sceneRef.current.environment;
            }
        
            if (surface.isBlueprint) {
              material.depthWrite = false;
            }
        
            applyAnimatedHeightMistToStandardMaterial(material, {
              yBottom: VIEWER_MIST_Y_BOTTOM,
              yTop: VIEWER_MIST_Y_TOP,
              maxOpacity: VIEWER_MIST_MAX_OPACITY,
              color: VIEWER_MIST_COLOR,
              noiseScale: SHARED_MIST_NOISE_SCALE,
              noiseStrength: SHARED_MIST_NOISE_STRENGTH,
              noiseScroll: SHARED_MIST_NOISE_SCROLL,
            });
        
            material.needsUpdate = true;
        
            const mesh = new THREE.Mesh(geometry, material);
            mesh.castShadow = !surface.isBlueprint;
            mesh.receiveShadow = true;
            mesh.renderOrder = surface.isBlueprint ? 1 : 0;
        
            meshParent.add(mesh);
          }
        
          if (
            isVehicle &&
            driveRoot &&
            visualRoot &&
            Number.isFinite(localMinX) &&
            Number.isFinite(localMinY) &&
            Number.isFinite(localMinZ)
          ) {
            const pivotLocal = new THREE.Vector3(
              (localMinX + localMaxX) * 0.5,
              localMinY,
              localMinZ
            );
        
            driveRoot.position.copy(pivotLocal);
            visualRoot.position.copy(pivotLocal).multiplyScalar(-1);
          }
        
          root.add(groupRoot);
        
          if (group.bounds) {
            minX = Math.min(minX, group.bounds.min.x * TEMP_WORLD_SCALE);
            minY = Math.min(minY, group.bounds.min.y * TEMP_WORLD_SCALE);
            minZ = Math.min(minZ, group.bounds.min.z * TEMP_WORLD_SCALE);
            maxX = Math.max(maxX, group.bounds.max.x * TEMP_WORLD_SCALE);
            maxY = Math.max(maxY, group.bounds.max.y * TEMP_WORLD_SCALE);
            maxZ = Math.max(maxZ, group.bounds.max.z * TEMP_WORLD_SCALE);
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
    const controls = controlsRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;
    const playSkyRoot = playSkyRootRef.current;

    if (!controls || !camera || !renderer) return;

    if (!playMode) {
      controls.enabled = true;
      if (playSkyRoot) playSkyRoot.visible = false;

      exitDriveMode({
        camera,
        driveState: driveStateRef.current,
        moveState: driveMoveStateRef.current,
      });

      detachJeff();
      setDriveMode(false);
      vehicleEffectsRef.current?.reset();

      exitFpsMode({
        renderer,
        fpsState: fpStateRef.current,
        moveState: moveStateRef.current,
        camera,
      });

      clearHoveredVehicleBox();
      hoveredVehicleRootRef.current = null;

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
        <>
          {!driveMode && (
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

          {!driveMode && hoveredVehicleRootRef.current && (
            <div
              style={{
                position: "absolute",
                left: "50%",
                bottom: 48,
                transform: "translateX(-50%)",
                zIndex: 40,
                pointerEvents: "none",
                color: "#DBFAFF",
                fontSize: 20,
                opacity: 0.9,
              }}
            >
              Press E to enter
            </div>
          )}
        </>
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