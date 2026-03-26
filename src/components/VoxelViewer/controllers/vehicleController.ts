import * as THREE from "three";

const DRIVE_ACCEL = 65;
const DRIVE_BRAKE = 80;
const DRIVE_DRAG = 2.4;
const DRIVE_MAX_FORWARD_SPEED = 55;
const DRIVE_MAX_REVERSE_SPEED = 20;
const DRIVE_TURN_SPEED = 1.8;

const DRIVE_CAMERA_HEIGHT = 22;
const DRIVE_CAMERA_DISTANCE = 36;
const DRIVE_CAMERA_LERP = 8;

const DRIVE_FLOOR_Y = 0;
const DRIVE_FOV = 78;

export type DriveMoveState = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
};

export type DriveState = {
  active: boolean;
  vehicleRoot: THREE.Object3D | null;
  speed: number;
  yaw: number;
  followOffsetLocal: THREE.Vector3;
};

export function createDriveMoveState(): DriveMoveState {
  return {
    forward: false,
    backward: false,
    left: false,
    right: false,
  };
}

export function createDriveState(): DriveState {
  return {
    active: false,
    vehicleRoot: null,
    speed: 0,
    yaw: 0,
    followOffsetLocal: new THREE.Vector3(),
  };
}

export function handleDriveKeyDown(
  e: KeyboardEvent,
  moveState: DriveMoveState,
  isActive: boolean
) {
  if (!isActive) return;
  if (e.repeat) return;

  if (e.code === "KeyW") moveState.forward = true;
  if (e.code === "KeyS") moveState.backward = true;
  if (e.code === "KeyA") moveState.left = true;
  if (e.code === "KeyD") moveState.right = true;
}

export function handleDriveKeyUp(
  e: KeyboardEvent,
  moveState: DriveMoveState
) {
  if (e.code === "KeyW") moveState.forward = false;
  if (e.code === "KeyS") moveState.backward = false;
  if (e.code === "KeyA") moveState.left = false;
  if (e.code === "KeyD") moveState.right = false;
}

export function enterDriveMode(params: {
  camera: THREE.PerspectiveCamera;
  vehicleRoot: THREE.Object3D;
  driveState: DriveState;
}) {
  const { camera, vehicleRoot, driveState } = params;

  vehicleRoot.updateMatrixWorld(true);

  const box = new THREE.Box3().setFromObject(vehicleRoot);
  const centerWorld = new THREE.Vector3();
  box.getCenter(centerWorld);

  const centerLocal = vehicleRoot.worldToLocal(centerWorld.clone());

  driveState.active = true;
  driveState.vehicleRoot = vehicleRoot;
  driveState.speed = 0;
  driveState.yaw = vehicleRoot.rotation.y;
  driveState.followOffsetLocal.copy(centerLocal);

  camera.fov = DRIVE_FOV;
  camera.updateProjectionMatrix();
}

export function exitDriveMode(params: {
  camera?: THREE.PerspectiveCamera | null;
  driveState: DriveState;
  moveState: DriveMoveState;
}) {
  const { camera, driveState, moveState } = params;

  driveState.active = false;
  driveState.vehicleRoot = null;
  driveState.speed = 0;
  driveState.followOffsetLocal.set(0, 0, 0);

  moveState.forward = false;
  moveState.backward = false;
  moveState.left = false;
  moveState.right = false;

  if (camera) {
    camera.fov = 40;
    camera.updateProjectionMatrix();
  }
}

export function updateDriveCamera(params: {
  dt: number;
  camera: THREE.PerspectiveCamera;
  driveState: DriveState;
  moveState: DriveMoveState;
}) {
  const { dt, camera, driveState, moveState } = params;
  const vehicleRoot = driveState.vehicleRoot;
  if (!vehicleRoot) return;

  if (moveState.forward) {
    driveState.speed += DRIVE_ACCEL * dt;
  } else if (moveState.backward) {
    driveState.speed -= DRIVE_BRAKE * dt;
  } else {
    const dragFactor = Math.max(0, 1 - DRIVE_DRAG * dt);
    driveState.speed *= dragFactor;
    if (Math.abs(driveState.speed) < 0.02) driveState.speed = 0;
  }

  driveState.speed = Math.min(
    DRIVE_MAX_FORWARD_SPEED,
    Math.max(-DRIVE_MAX_REVERSE_SPEED, driveState.speed)
  );

  const turnInput = (moveState.left ? 1 : 0) + (moveState.right ? -1 : 0);

  if (turnInput !== 0 && Math.abs(driveState.speed) > 0.1) {
    const steerScale =
      0.35 + 0.65 * Math.min(1, Math.abs(driveState.speed) / DRIVE_MAX_FORWARD_SPEED);
    driveState.yaw += turnInput * DRIVE_TURN_SPEED * steerScale * dt;
  }

  const forward = new THREE.Vector3(
    -Math.sin(driveState.yaw),
    0,
    -Math.cos(driveState.yaw)
  );

  vehicleRoot.position.addScaledVector(forward, driveState.speed * dt);
  vehicleRoot.position.y = DRIVE_FLOOR_Y;
  vehicleRoot.rotation.y = driveState.yaw;
  vehicleRoot.updateMatrixWorld(true);

  const targetWorld = vehicleRoot.localToWorld(driveState.followOffsetLocal.clone());

  const camOffset = new THREE.Vector3(0, DRIVE_CAMERA_HEIGHT, DRIVE_CAMERA_DISTANCE)
    .applyAxisAngle(new THREE.Vector3(0, 1, 0), driveState.yaw);

  const desiredCamPos = targetWorld.clone().add(camOffset);

  const lerpAlpha = 1 - Math.exp(-DRIVE_CAMERA_LERP * dt);
  camera.position.lerp(desiredCamPos, lerpAlpha);
  camera.lookAt(targetWorld);
}