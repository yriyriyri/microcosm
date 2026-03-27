import * as THREE from "three";

const DRIVE_ACCEL = 130;
const DRIVE_BRAKE = 90;
const DRIVE_COAST_DRAG = 0.994;
const DRIVE_BRAKE_DRAG = 0.985;

const DRIVE_MAX_FORWARD_SPEED = 160;
const DRIVE_MAX_REVERSE_SPEED = 24;
const DRIVE_TURN_SPEED = 0.6;

const DRIVE_CAMERA_HEIGHT = 24;
const DRIVE_CAMERA_DISTANCE = 70;
const DRIVE_CAMERA_SPEED_DISTANCE = 34;
const DRIVE_CAMERA_LERP = 5.5;
const DRIVE_CAMERA_LOOK_LERP = 6.5;

const DRIVE_FOV = 82;

const DRIVE_MIN_DRIFT_SPEED = 14;
const DRIVE_MAX_DRIFT_ANGLE = Math.PI / 5;

const DRIVE_DRIFT_BUILD_RESPONSE = 1.0;
const DRIVE_DRIFT_RETURN_RESPONSE = 3.2;

const DRIVE_FLY_SPEED = 60;
const DRIVE_BOOST_MULTIPLIER = 1.5;

const DRIVE_VISUAL_STEER_ANGLE = Math.PI / 5;
const DRIVE_VISUAL_BANK_ANGLE = Math.PI / 3;
const DRIVE_VISUAL_RESPONSE = 1.3;

const DRIVE_VERTICAL_RESPONSE = 5.5;
const DRIVE_BOOST_RESPONSE = 3.2;
const DRIVE_CAMERA_PULLBACK_EXPONENT = 5.0;

export type DriveMoveState = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  boost: boolean;
};

export type DriveState = {
  active: boolean;
  vehicleRoot: THREE.Object3D | null;
  speed: number;
  yaw: number;
  driftAngle: number;
  followOffsetLocal: THREE.Vector3;
  velocity: THREE.Vector3;
  lookTarget: THREE.Vector3;
  visualSteerYaw: number;
  visualBank: number;
  verticalSpeed: number;
  boostFactor: number;
};

export function createDriveMoveState(): DriveMoveState {
  return {
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false,
    down: false,
    boost: false,
  };
}

export function createDriveState(): DriveState {
  return {
    active: false,
    vehicleRoot: null,
    speed: 0,
    yaw: 0,
    driftAngle: 0,
    followOffsetLocal: new THREE.Vector3(),
    velocity: new THREE.Vector3(),
    lookTarget: new THREE.Vector3(),
    visualSteerYaw: 0,
    visualBank: 0,
    verticalSpeed: 0,
    boostFactor: 1,
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

  if (e.code === "Space") {
    moveState.up = true;
    e.preventDefault();
  }

  if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
    moveState.down = true;
  }

  if (e.code === "Enter" || e.code === "NumpadEnter") {
    moveState.boost = true;
  }
}

export function handleDriveKeyUp(
  e: KeyboardEvent,
  moveState: DriveMoveState
) {
  if (e.code === "KeyW") moveState.forward = false;
  if (e.code === "KeyS") moveState.backward = false;
  if (e.code === "KeyA") moveState.left = false;
  if (e.code === "KeyD") moveState.right = false;

  if (e.code === "Space") moveState.up = false;
  if (e.code === "ShiftLeft" || e.code === "ShiftRight") moveState.down = false;
  if (e.code === "Enter" || e.code === "NumpadEnter") moveState.boost = false;
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
  driveState.visualSteerYaw = 0;
  driveState.visualBank = 0;
  driveState.driftAngle = 0;
  driveState.verticalSpeed = 0;
  driveState.boostFactor = 1;
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
  driveState.yaw = 0;
  driveState.visualSteerYaw = 0;
  driveState.visualBank = 0;
  driveState.driftAngle = 0;
  driveState.verticalSpeed = 0;
  driveState.boostFactor = 1;
  driveState.followOffsetLocal.set(0, 0, 0);
  driveState.velocity.set(0, 0, 0);

  moveState.forward = false;
  moveState.backward = false;
  moveState.left = false;
  moveState.right = false;
  moveState.up = false;
  moveState.down = false;
  moveState.boost = false;

  if (camera) {
    camera.fov = 40;
    camera.updateProjectionMatrix();
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function moveToward(current: number, target: number, maxDelta: number): number {
  if (current < target) return Math.min(current + maxDelta, target);
  if (current > target) return Math.max(current - maxDelta, target);
  return current;
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
  const throttleInput =
    (moveState.forward ? 1 : 0) - (moveState.backward ? 1 : 0);

  const targetBoostFactor = moveState.boost ? DRIVE_BOOST_MULTIPLIER : 1;
  const boostAlpha = 1 - Math.exp(-DRIVE_BOOST_RESPONSE * dt);
  driveState.boostFactor = THREE.MathUtils.lerp(
    driveState.boostFactor,
    targetBoostFactor,
    boostAlpha
  );

  if (steerInput !== 0 && Math.abs(driveState.speed) > 0.1) {
    driveState.yaw += steerInput * DRIVE_TURN_SPEED * dt;
  }

  if (throttleInput > 0) {
    driveState.speed += DRIVE_ACCEL * driveState.boostFactor * dt;
  } else if (throttleInput < 0) {
    driveState.speed -= DRIVE_BRAKE * dt;
  } else {
    driveState.speed *= DRIVE_COAST_DRAG;
    if (Math.abs(driveState.speed) < 0.02) driveState.speed = 0;
  }

  driveState.speed = clamp(
    driveState.speed,
    -DRIVE_MAX_REVERSE_SPEED,
    DRIVE_MAX_FORWARD_SPEED * driveState.boostFactor
  );

  const speedAbs = Math.abs(driveState.speed);
  const speed01 = clamp(
    speedAbs / (DRIVE_MAX_FORWARD_SPEED * DRIVE_BOOST_MULTIPLIER),
    0,
    1
  );

  let targetDriftAngle = 0;
  if (speedAbs >= DRIVE_MIN_DRIFT_SPEED) {
    targetDriftAngle = -steerInput * DRIVE_MAX_DRIFT_ANGLE * speed01;
  }

  const driftResponse =
    steerInput !== 0
      ? DRIVE_DRIFT_BUILD_RESPONSE
      : DRIVE_DRIFT_RETURN_RESPONSE;

  driveState.driftAngle = moveToward(
    driveState.driftAngle,
    targetDriftAngle,
    driftResponse * dt
  );

  const moveYaw = driveState.yaw + driveState.driftAngle;

  const moveDir = new THREE.Vector3(
    Math.sin(moveYaw),
    0,
    Math.cos(moveYaw)
  ).normalize();

  driveState.velocity.copy(moveDir).multiplyScalar(driveState.speed);

  if (throttleInput < 0 && driveState.velocity.lengthSq() > 0) {
    driveState.velocity.multiplyScalar(DRIVE_BRAKE_DRAG);
  }

  vehicleRoot.position.addScaledVector(driveState.velocity, dt);

  const verticalInput = (moveState.up ? 1 : 0) - (moveState.down ? 1 : 0);
  const targetVerticalSpeed = verticalInput * DRIVE_FLY_SPEED;
  const verticalAlpha = 1 - Math.exp(-DRIVE_VERTICAL_RESPONSE * dt);
  driveState.verticalSpeed = THREE.MathUtils.lerp(
    driveState.verticalSpeed,
    targetVerticalSpeed,
    verticalAlpha
  );
  vehicleRoot.position.y += driveState.verticalSpeed * dt;

  const visualTurnTarget =
    steerInput * DRIVE_VISUAL_STEER_ANGLE * speed01 -
    driveState.driftAngle * 0.35;

  const visualBankTarget =
    -steerInput * DRIVE_VISUAL_BANK_ANGLE * speed01;

  const visualAlpha = 1 - Math.exp(-DRIVE_VISUAL_RESPONSE * dt);

  driveState.visualSteerYaw = THREE.MathUtils.lerp(
    driveState.visualSteerYaw,
    visualTurnTarget,
    visualAlpha
  );

  driveState.visualBank = THREE.MathUtils.lerp(
    driveState.visualBank,
    visualBankTarget,
    visualAlpha
  );

  vehicleRoot.rotation.set(
    0,
    driveState.yaw + driveState.visualSteerYaw,
    driveState.visualBank
  );

  vehicleRoot.updateMatrixWorld(true);

  const targetWorld = vehicleRoot.localToWorld(
    driveState.followOffsetLocal.clone()
  );

  const pullbackT = Math.pow(speed01, DRIVE_CAMERA_PULLBACK_EXPONENT);
  const dynamicDistance =
    DRIVE_CAMERA_DISTANCE + DRIVE_CAMERA_SPEED_DISTANCE * pullbackT;

  const forwardDir = new THREE.Vector3(
    Math.sin(driveState.yaw),
    0,
    Math.cos(driveState.yaw)
  ).normalize();

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