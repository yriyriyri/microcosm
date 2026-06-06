import * as THREE from "three";

const FPS_LOOK_SPEED = 0.0022;
const FPS_MAX_PITCH = Math.PI / 2 - 0.01;

const FPS_MOVE_SPEED = 28;
const FPS_GRAVITY = -42;
const FPS_EYE_HEIGHT = 17;
const FPS_FLOOR_Y = 0;
const FPS_JUMP_VELOCITY = 18;

const FPS_FOV = 75;

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
  fpsState: FpsState,
  isActive: boolean
) {
  if (!isActive) return;
  if (e.repeat) return;

  if (e.code === "KeyW") moveState.forward = true;
  if (e.code === "KeyS") moveState.backward = true;
  if (e.code === "KeyA") moveState.left = true;
  if (e.code === "KeyD") moveState.right = true;

  if (e.code === "Space" && fpsState.grounded) {
    fpsState.velocityY = FPS_JUMP_VELOCITY;
    fpsState.grounded = false;
    e.preventDefault();
  }
}

export function handleFpsKeyUp(e: KeyboardEvent, moveState: FpsMoveState) {
  if (e.code === "KeyW") moveState.forward = false;
  if (e.code === "KeyS") moveState.backward = false;
  if (e.code === "KeyA") moveState.left = false;
  if (e.code === "KeyD") moveState.right = false;
}

export function handleFpsPointerMove(
  e: PointerEvent,
  fpsState: FpsState
) {
  if (!fpsState.active) return;

  fpsState.yaw -= e.movementX * FPS_LOOK_SPEED;
  fpsState.pitch -= e.movementY * FPS_LOOK_SPEED;
  fpsState.pitch = Math.max(
    -FPS_MAX_PITCH,
    Math.min(FPS_MAX_PITCH, fpsState.pitch)
  );
}

export function updateFpsCamera(params: {
  dt: number;
  camera: THREE.PerspectiveCamera;
  fpsState: FpsState;
  moveState: FpsMoveState;
}) {
  const { dt, camera, fpsState, moveState } = params;

  const yaw = fpsState.yaw;

  const forward = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw));
  const right = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw));

  const move = new THREE.Vector3();

  if (moveState.forward) move.add(forward);
  if (moveState.backward) move.sub(forward);
  if (moveState.right) move.add(right);
  if (moveState.left) move.sub(right);

  if (move.lengthSq() > 0) {
    move.normalize().multiplyScalar(FPS_MOVE_SPEED * dt);
    fpsState.position.add(move);
  }

  fpsState.velocityY += FPS_GRAVITY * dt;
  fpsState.position.y += fpsState.velocityY * dt;

  if (fpsState.position.y < FPS_FLOOR_Y + FPS_EYE_HEIGHT) {
    fpsState.position.y = FPS_FLOOR_Y + FPS_EYE_HEIGHT;
    fpsState.velocityY = 0;
    fpsState.grounded = true;
  } else {
    fpsState.grounded = false;
  }

  camera.fov = FPS_FOV;
  camera.updateProjectionMatrix();

  camera.position.copy(fpsState.position);
  camera.rotation.set(fpsState.pitch, fpsState.yaw, 0, "YXZ");
}

export function enterFpsMode(params: {
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  fpsState: FpsState;
  bounds: {
    minX: number;
    minZ: number;
    maxX: number;
    maxZ: number;
  };
}) {
  const { camera, renderer, fpsState } = params;

  fpsState.position.set(0, FPS_FLOOR_Y + FPS_EYE_HEIGHT, 0);
  fpsState.velocityY = 0;
  fpsState.grounded = true;
  fpsState.yaw = 0;
  fpsState.pitch = 0;

  camera.fov = FPS_FOV;
  camera.updateProjectionMatrix();

  camera.position.copy(fpsState.position);
  camera.rotation.set(0, 0, 0, "YXZ");

  renderer.domElement.requestPointerLock?.();
}

export function exitFpsMode(params: {
  renderer: THREE.WebGLRenderer;
  fpsState: FpsState;
  moveState: FpsMoveState;
  camera?: THREE.PerspectiveCamera | null;
}) {
  const { renderer, fpsState, moveState, camera } = params;

  fpsState.active = false;
  moveState.forward = false;
  moveState.backward = false;
  moveState.left = false;
  moveState.right = false;

  if (camera) {
    camera.fov = 40;
    camera.updateProjectionMatrix();
  }

  if (document.pointerLockElement === renderer.domElement) {
    document.exitPointerLock();
  }
}