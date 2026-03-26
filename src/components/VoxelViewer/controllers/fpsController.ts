import * as THREE from "three";

export type FpsMoveState = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
};

export type FpsState = {
  active: boolean;
  yaw: number;
  pitch: number;
  position: THREE.Vector3;
  velocityY: number;
  grounded: boolean;
};

export function createFpsMoveState(): FpsMoveState {
  return {
    forward: false,
    backward: false,
    left: false,
    right: false,
  };
}

export function createFpsState(): FpsState {
  return {
    active: false,
    yaw: 0,
    pitch: 0,
    position: new THREE.Vector3(),
    velocityY: 0,
    grounded: false,
  };
}

export function handleFpsKeyDown(
  e: KeyboardEvent,
  moveState: FpsMoveState,
  isActive: boolean
) {
  if (!isActive) return;
  if (e.repeat) return;

  if (e.code === "KeyW") moveState.forward = true;
  if (e.code === "KeyS") moveState.backward = true;
  if (e.code === "KeyA") moveState.left = true;
  if (e.code === "KeyD") moveState.right = true;
}

export function handleFpsKeyUp(e: KeyboardEvent, moveState: FpsMoveState) {
  if (e.code === "KeyW") moveState.forward = false;
  if (e.code === "KeyS") moveState.backward = false;
  if (e.code === "KeyA") moveState.left = false;
  if (e.code === "KeyD") moveState.right = false;
}

export function handleFpsPointerMove(
  e: PointerEvent,
  fpsState: FpsState,
  lookSpeed = 0.0022
) {
  if (!fpsState.active) return;

  fpsState.yaw -= e.movementX * lookSpeed;
  fpsState.pitch -= e.movementY * lookSpeed;

  const maxPitch = Math.PI / 2 - 0.01;
  fpsState.pitch = Math.max(-maxPitch, Math.min(maxPitch, fpsState.pitch));
}

export function updateFpsCamera(params: {
  dt: number;
  camera: THREE.PerspectiveCamera;
  fpsState: FpsState;
  moveState: FpsMoveState;
  moveSpeed?: number;
  gravity?: number;
  eyeHeight?: number;
  floorY?: number;
}) {
  const {
    dt,
    camera,
    fpsState,
    moveState,
    moveSpeed = 18,
    gravity = -30,
    eyeHeight = 1.7,
    floorY = 0,
  } = params;

  const yaw = fpsState.yaw;
  const forward = new THREE.Vector3(Math.sin(yaw), 0, Math.cos(yaw));
  const right = new THREE.Vector3(forward.z, 0, -forward.x);

  const move = new THREE.Vector3();

  if (moveState.forward) move.add(forward);
  if (moveState.backward) move.sub(forward);
  if (moveState.right) move.add(right);
  if (moveState.left) move.sub(right);

  if (move.lengthSq() > 0) {
    move.normalize().multiplyScalar(moveSpeed * dt);
    fpsState.position.add(move);
  }

  fpsState.velocityY += gravity * dt;
  fpsState.position.y += fpsState.velocityY * dt;

  if (fpsState.position.y < floorY + eyeHeight) {
    fpsState.position.y = floorY + eyeHeight;
    fpsState.velocityY = 0;
    fpsState.grounded = true;
  } else {
    fpsState.grounded = false;
  }

  camera.position.copy(fpsState.position);
  camera.rotation.set(fpsState.pitch, fpsState.yaw, 0, "YXZ");
}

export function enterFpsMode(params: {
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  fpsState: FpsState;
  bounds: {
    minX: number;
    minZ: number;
    maxX: number;
    maxZ: number;
  };
  floorY?: number;
  eyeHeight?: number;
  skyColor?: string | number;
}) {
  const {
    camera,
    scene,
    renderer,
    fpsState,
    bounds,
    floorY = 0,
    eyeHeight = 1.7,
    skyColor = "#6db7ff",
  } = params;

  const centerX = (bounds.minX + bounds.maxX + 1) / 2;
  const centerZ = (bounds.minZ + bounds.maxZ + 1) / 2;

  scene.background = new THREE.Color(skyColor);

  fpsState.position.set(centerX, floorY + eyeHeight, centerZ);
  fpsState.velocityY = 0;
  fpsState.grounded = true;
  fpsState.yaw = 0;
  fpsState.pitch = 0;

  camera.position.copy(fpsState.position);
  camera.rotation.set(0, 0, 0, "YXZ");

  renderer.domElement.requestPointerLock?.();
}

export function exitFpsMode(params: {
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  fpsState: FpsState;
  moveState: FpsMoveState;
}) {
  const { scene, renderer, fpsState, moveState } = params;

  fpsState.active = false;
  moveState.forward = false;
  moveState.backward = false;
  moveState.left = false;
  moveState.right = false;

  scene.background = null;

  if (document.pointerLockElement === renderer.domElement) {
    document.exitPointerLock();
  }
}