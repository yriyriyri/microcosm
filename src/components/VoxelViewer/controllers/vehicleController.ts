import * as THREE from "three";

const DRIVE_ACCEL = 110;
const DRIVE_BRAKE = 90;
const DRIVE_COAST_DRAG = 0.992;
const DRIVE_BRAKE_DRAG = 0.985;

const DRIVE_MAX_FORWARD_SPEED = 140;
const DRIVE_MAX_REVERSE_SPEED = 24;
const DRIVE_TURN_SPEED = 0.9;

const DRIVE_CAMERA_HEIGHT = 40;
const DRIVE_CAMERA_DISTANCE = 62;
const DRIVE_CAMERA_SPEED_DISTANCE = 34;
const DRIVE_CAMERA_LERP = 6.5;
const DRIVE_CAMERA_LOOK_LERP = 7.5;

const DRIVE_FLOOR_Y = 0;
const DRIVE_FOV = 82;

const DRIVE_MIN_TURN_RESPONSE = 0.06;
const DRIVE_MAX_TURN_RESPONSE = 1.1;
const DRIVE_MIN_DRIFT_SPEED = 14;

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
  velocity: THREE.Vector3;
  lookTarget: THREE.Vector3;
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
    velocity: new THREE.Vector3(),
    lookTarget: new THREE.Vector3(),
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
  driveState.velocity.set(0, 0, 0);
  driveState.lookTarget.copy(centerWorld);

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
  driveState.velocity.set(0, 0, 0);

  moveState.forward = false;
  moveState.backward = false;
  moveState.left = false;
  moveState.right = false;

  if (camera) {
    camera.fov = 40;
    camera.updateProjectionMatrix();
  }
}

function signedAngleY(from: THREE.Vector3, to: THREE.Vector3): number {
  const cross = from.x * to.z - from.z * to.x;
  const dot = from.x * to.x + from.z * to.z;
  return Math.atan2(cross, dot);
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
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

  const steerInput = (moveState.left ? 1 : 0) + (moveState.right ? -1 : 0);
  const throttleInput = (moveState.forward ? 1 : 0) - (moveState.backward ? 1 : 0);

  // visual facing
  if (steerInput !== 0 && Math.abs(driveState.speed) > 0.1) {
    driveState.yaw += steerInput * DRIVE_TURN_SPEED * dt;
  }

  const forwardDir = new THREE.Vector3(
    Math.sin(driveState.yaw),
    0,
    Math.cos(driveState.yaw)
  ).normalize();

  // engine / braking acts on scalar speed
  if (throttleInput > 0) {
    driveState.speed += DRIVE_ACCEL * dt;
  } else if (throttleInput < 0) {
    driveState.speed -= DRIVE_BRAKE * dt;
  } else {
    driveState.speed *= DRIVE_COAST_DRAG;
    if (Math.abs(driveState.speed) < 0.02) driveState.speed = 0;
  }

  driveState.speed = clamp(
    driveState.speed,
    -DRIVE_MAX_REVERSE_SPEED,
    DRIVE_MAX_FORWARD_SPEED
  );

  // if nearly stopped, snap movement direction to facing so low-speed turning stays responsive
  const planarVelocity = driveState.velocity.clone().setY(0);
  const planarSpeed = planarVelocity.length();

  if (planarSpeed < DRIVE_MIN_DRIFT_SPEED) {
    driveState.velocity.copy(forwardDir).multiplyScalar(driveState.speed);
  } else {
    const velDir = planarVelocity.normalize();

    // higher speed => lower response => bigger turning radius
    const speed01 = clamp(planarSpeed / DRIVE_MAX_FORWARD_SPEED, 0, 1);
    const turnResponse =
      DRIVE_MAX_TURN_RESPONSE * (1 - speed01) +
      DRIVE_MIN_TURN_RESPONSE * speed01;

    const angleToForward = signedAngleY(velDir, forwardDir);
    const maxStep = turnResponse * dt;
    const appliedAngle = clamp(angleToForward, -maxStep, maxStep);

    const nextVelDir = velDir
      .clone()
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), appliedAngle)
      .normalize();

    driveState.velocity.copy(nextVelDir).multiplyScalar(driveState.speed);
  }

  // braking should resist motion direction, not heading
  if (throttleInput < 0 && driveState.velocity.lengthSq() > 0) {
    driveState.velocity.multiplyScalar(DRIVE_BRAKE_DRAG);
  }

  vehicleRoot.position.addScaledVector(driveState.velocity, dt);
  vehicleRoot.position.y = DRIVE_FLOOR_Y;
  vehicleRoot.rotation.y = driveState.yaw;
  vehicleRoot.updateMatrixWorld(true);

  const targetWorld = vehicleRoot.localToWorld(
    driveState.followOffsetLocal.clone()
  );

  const speed01 = clamp(Math.abs(driveState.speed) / DRIVE_MAX_FORWARD_SPEED, 0, 1);
  const dynamicDistance =
    DRIVE_CAMERA_DISTANCE + DRIVE_CAMERA_SPEED_DISTANCE * speed01;

  const backDir = forwardDir.clone().multiplyScalar(-dynamicDistance);
  const desiredCamPos = targetWorld
    .clone()
    .add(backDir)
    .add(new THREE.Vector3(0, DRIVE_CAMERA_HEIGHT, 0));

  const camAlpha = 1 - Math.exp(-DRIVE_CAMERA_LERP * dt);
  camera.position.lerp(desiredCamPos, camAlpha);

  const desiredLookTarget = targetWorld
    .clone()
    .add(forwardDir.clone().multiplyScalar(10 + 28 * speed01));

  const lookAlpha = 1 - Math.exp(-DRIVE_CAMERA_LOOK_LERP * dt);
  driveState.lookTarget.lerp(desiredLookTarget, lookAlpha);

  camera.lookAt(driveState.lookTarget);
}