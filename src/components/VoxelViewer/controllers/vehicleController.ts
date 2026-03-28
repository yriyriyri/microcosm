import * as THREE from "three";
import {
  createCameraShakeState,
  resetCameraShake,
  setSustainCameraShake,
  triggerCameraShake,
  updateCameraShake,
  type CameraShakeState,
} from "./cameraShakeController";

const DRIVE_ACCEL = 70;
const DRIVE_COAST_DRAG = 0.994;

const DRIVE_MAX_DRIVE_SPEED = 110;
const DRIVE_MAX_FORWARD_SPEED = 300;
const DRIVE_TURN_SPEED = 0.6;

const DRIVE_CAMERA_HEIGHT = 24;
const DRIVE_CAMERA_DISTANCE = 70;
const DRIVE_CAMERA_SPEED_DISTANCE = 34;
const DRIVE_CAMERA_LERP = 5.5;
const DRIVE_CAMERA_LOOK_LERP = 6.5;

const DRIVE_FOV = 82;

const DRIVE_MIN_DRIFT_SPEED = 14;
const DRIVE_MAX_DRIFT_ANGLE = Math.PI / 5;
const DRIVE_HANDBRAKE_MAX_DRIFT_ANGLE = Math.PI / 2.9;

const DRIVE_DRIFT_BUILD_RESPONSE = 1.5;
const DRIVE_DRIFT_RETURN_RESPONSE = 2.5;
const DRIVE_HANDBRAKE_DRIFT_BUILD_RESPONSE = 2.8;
const DRIVE_HANDBRAKE_STEER_CONTROL = 0.4;
const DRIVE_HANDBRAKE_SPEED_DRAG = 0.999;
const DRIVE_HANDBRAKE_SPEED_GAIN = 17.0;

const DRIVE_FLY_SPEED = 80;
const DRIVE_BOOST_MULTIPLIER = 1.7;

const DRIVE_NORMAL_STEER_CONTROL = 1.3; 
const DRIVE_BOOST_STEER_CONTROL = 1.0;
const DRIVE_NORMAL_STEER_SPEED_FALLOFF = 0.34;
const DRIVE_BOOST_STEER_SPEED_FALLOFF = 0.4;
const DRIVE_BOOST_ACCEL_MULTIPLIER = 1.5;
const DRIVE_BOOST_OVERSPEED_DRAG = 0.9965;
const DRIVE_NORMAL_OVERSPEED_DRAG = 0.992;

const DRIVE_VISUAL_STEER_ANGLE = Math.PI / 7;
const DRIVE_VISUAL_BANK_ANGLE = Math.PI / 5;
const DRIVE_HANDBRAKE_VISUAL_BANK_ANGLE = Math.PI / 3;

const DRIVE_NORMAL_VISUAL_STEER_MULTIPLIER = 1.1;
const DRIVE_BOOST_VISUAL_STEER_MULTIPLIER = 1.2;
const DRIVE_HANDBRAKE_VISUAL_STEER_MULTIPLIER = 0.82;

const DRIVE_BOOST_VISUAL_BANK_MULTIPLIER = 1.18;
const DRIVE_NORMAL_VISUAL_RESPONSE = 1.0;
const DRIVE_BOOST_VISUAL_RESPONSE = 1.5;
const DRIVE_HANDBRAKE_VISUAL_RESPONSE = 1.1;

const DRIVE_VERTICAL_RESPONSE = 5.5;
const DRIVE_BOOST_RESPONSE = 3.2;
const DRIVE_CAMERA_PULLBACK_EXPONENT = 5.0;
const DRIVE_DRIFT_SPEED_REFERENCE = DRIVE_MAX_DRIVE_SPEED * DRIVE_BOOST_MULTIPLIER;
const DRIVE_HANDBRAKE_BOOST_HOLD = 1.0;

export type DriveMoveState = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  boost: boolean;
  barrelRollLeft: boolean;
  barrelRollRight: boolean;
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
  wasBoosting: boolean;
  wasHandbraking: boolean;
  cameraShake: CameraShakeState;
  barrelRollActive: boolean;
  barrelRollDir: number;
  barrelRollTime: number;
  barrelRollDuration: number;
  barrelRollVisual: number;
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
    barrelRollLeft: false,
    barrelRollRight: false,
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
    wasBoosting: false,
    wasHandbraking: false,
    cameraShake: createCameraShakeState(),
    barrelRollActive: false,
    barrelRollDir: 0,
    barrelRollTime: 0,
    barrelRollDuration: 2.2,
    barrelRollVisual: 0,
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
    moveState.boost = true;
  }

  if (e.code === "KeyL") {
    moveState.barrelRollLeft = true;
  }

  if (e.code === "KeyK") {
    moveState.barrelRollRight = true;
  }

  if (e.code === "Enter" || e.code === "KeyQ") {
    moveState.down = true;
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
  if (e.code === "ShiftLeft" || e.code === "ShiftRight") moveState.boost = false;
  if (e.code === "KeyK") moveState.barrelRollLeft = false;
  if (e.code === "KeyL") moveState.barrelRollRight = false;
  if (e.code === "Enter" || e.code === "KeyQ") moveState.down = false;
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
  driveState.wasBoosting = false;
  driveState.wasHandbraking = false;
  driveState.barrelRollActive = false;
  driveState.barrelRollDir = 0;
  driveState.barrelRollTime = 0;
  driveState.barrelRollVisual = 0;
  resetCameraShake(driveState.cameraShake);

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
  moveState.barrelRollLeft = false;
  moveState.barrelRollRight = false;
  driveState.wasBoosting = false;
  driveState.wasHandbraking = false;
  driveState.barrelRollActive = false;
  driveState.barrelRollDir = 0;
  driveState.barrelRollTime = 0;
  driveState.barrelRollVisual = 0;
  resetCameraShake(driveState.cameraShake);

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

function easeOutCubic(t: number): number {
  const x = 1 - t;
  return 1 - x * x * x;
}

function triggerBarrelRoll(driveState: DriveState, dir: number) {
  driveState.barrelRollActive = true;
  driveState.barrelRollDir = dir;
  driveState.barrelRollTime = 0;
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
  const throttleInput = moveState.forward ? 1 : 0;
  const handbrake = moveState.backward;
  const boosting = moveState.boost && !handbrake;

  if (moveState.barrelRollLeft) {
    triggerBarrelRoll(driveState, 1);
    moveState.barrelRollLeft = false;
  }

  if (moveState.barrelRollRight) {
    triggerBarrelRoll(driveState, -1);
    moveState.barrelRollRight = false;
  }
  
  const wasBoosting = driveState.wasBoosting;
  const wasHandbraking = driveState.wasHandbraking;
  
  const enteredBoost = boosting && !wasBoosting && !wasHandbraking;
  const enteredHandbrake = handbrake && !wasHandbraking;
  const enteredHandbrakeFromBoost = enteredHandbrake && wasBoosting;
  
  if (enteredBoost) {
    triggerCameraShake(driveState.cameraShake, "medium");
  }
  
  if (enteredHandbrakeFromBoost) {
    triggerCameraShake(driveState.cameraShake, "heavy");
  } else if (enteredHandbrake) {
    triggerCameraShake(driveState.cameraShake, "medium");
  }
  
  if (handbrake) {
    setSustainCameraShake(driveState.cameraShake, "medium");
  } else if (boosting) {
    setSustainCameraShake(driveState.cameraShake, "small");
  } else {
    setSustainCameraShake(driveState.cameraShake, null);
  }

  const targetBoostFactor = boosting
    ? DRIVE_BOOST_MULTIPLIER
    : handbrake
      ? Math.max(driveState.boostFactor, DRIVE_HANDBRAKE_BOOST_HOLD)
      : 1;
  const boostAlpha = 1 - Math.exp(-DRIVE_BOOST_RESPONSE * dt);
  driveState.boostFactor = THREE.MathUtils.lerp(
    driveState.boostFactor,
    targetBoostFactor,
    boostAlpha
  );

  const driveSpeedCap = DRIVE_MAX_DRIVE_SPEED * driveState.boostFactor;
  const hardSpeedCap = DRIVE_MAX_FORWARD_SPEED;

  const preSpeed01 = clamp(driveState.speed / DRIVE_DRIFT_SPEED_REFERENCE, 0, 1);

  let steerControl = DRIVE_NORMAL_STEER_CONTROL;
  let steerSpeedFalloff = DRIVE_NORMAL_STEER_SPEED_FALLOFF;

  if (boosting) {
    steerControl = DRIVE_BOOST_STEER_CONTROL;
    steerSpeedFalloff = DRIVE_BOOST_STEER_SPEED_FALLOFF;
  }

  if (handbrake) {
    steerControl = DRIVE_HANDBRAKE_STEER_CONTROL;
    steerSpeedFalloff = 0.15;
  }

  const steerScale = 1 - preSpeed01 * steerSpeedFalloff;

  if (steerInput !== 0 && Math.abs(driveState.speed) > 0.1) {
    driveState.yaw +=
      steerInput *
      DRIVE_TURN_SPEED *
      steerControl *
      Math.max(0.18, steerScale) *
      dt;
  }

  if (throttleInput > 0) {
    const accelMultiplier = boosting ? DRIVE_BOOST_ACCEL_MULTIPLIER : 1;
    driveState.speed += DRIVE_ACCEL * accelMultiplier * dt;
  } else {
    driveState.speed *= handbrake ? DRIVE_HANDBRAKE_SPEED_DRAG : DRIVE_COAST_DRAG;
    if (Math.abs(driveState.speed) < 0.02) driveState.speed = 0;
  }

  const isActivelyHandbrakeDrifting =
    handbrake &&
    steerInput !== 0 &&
    driveState.speed >= DRIVE_MIN_DRIFT_SPEED;

  if (isActivelyHandbrakeDrifting) {
    driveState.speed += DRIVE_HANDBRAKE_SPEED_GAIN * dt;
  }

  if (driveState.speed > driveSpeedCap) {
    driveState.speed *= boosting
      ? DRIVE_BOOST_OVERSPEED_DRAG
      : handbrake
        ? 0.9994
        : DRIVE_NORMAL_OVERSPEED_DRAG;
  }

  driveState.speed = clamp(driveState.speed, 0, hardSpeedCap);

  const speedAbs = Math.abs(driveState.speed);
  const speed01 = clamp(speedAbs / DRIVE_MAX_FORWARD_SPEED, 0, 1);
  const driftSpeed01 = clamp(speedAbs / DRIVE_DRIFT_SPEED_REFERENCE, 0, 1);

  let targetDriftAngle = 0;
  if (speedAbs >= DRIVE_MIN_DRIFT_SPEED) {
    const maxDrift = handbrake
      ? DRIVE_HANDBRAKE_MAX_DRIFT_ANGLE
      : DRIVE_MAX_DRIFT_ANGLE;

    targetDriftAngle = -steerInput * maxDrift * driftSpeed01;
  }

  const driftResponse = handbrake
    ? DRIVE_HANDBRAKE_DRIFT_BUILD_RESPONSE
    : steerInput !== 0
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

  const visualSteerMultiplier = handbrake
    ? DRIVE_HANDBRAKE_VISUAL_STEER_MULTIPLIER
    : boosting
      ? DRIVE_BOOST_VISUAL_STEER_MULTIPLIER
      : DRIVE_NORMAL_VISUAL_STEER_MULTIPLIER;

  const visualTurnTarget =
    steerInput * DRIVE_VISUAL_STEER_ANGLE * visualSteerMultiplier * driftSpeed01 -
    driveState.driftAngle * 0.35;

  const visualBankBase = handbrake
    ? DRIVE_HANDBRAKE_VISUAL_BANK_ANGLE
    : DRIVE_VISUAL_BANK_ANGLE * (boosting ? DRIVE_BOOST_VISUAL_BANK_MULTIPLIER : 1.0);

  const visualBankTarget =
    -steerInput * visualBankBase * driftSpeed01;

  const visualResponse = handbrake
    ? DRIVE_HANDBRAKE_VISUAL_RESPONSE
    : boosting
      ? DRIVE_BOOST_VISUAL_RESPONSE
      : DRIVE_NORMAL_VISUAL_RESPONSE;
  
  const visualAlpha = 1 - Math.exp(-visualResponse * dt);

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

  if (driveState.barrelRollActive) {
    driveState.barrelRollTime += dt;
    const t = clamp(
      driveState.barrelRollTime / driveState.barrelRollDuration,
      0,
      1
    );
    driveState.barrelRollVisual =
      driveState.barrelRollDir * easeOutCubic(t) * Math.PI * 2;

    if (t >= 1) {
      driveState.barrelRollActive = false;
      driveState.barrelRollDir = 0;
      driveState.barrelRollTime = 0;
      driveState.barrelRollVisual = 0;
    }
  }

  vehicleRoot.rotation.set(
    0,
    driveState.yaw + driveState.visualSteerYaw,
    driveState.visualBank + driveState.barrelRollVisual
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

  const shake = updateCameraShake(driveState.cameraShake, dt);

  const camForward = driveState.lookTarget
    .clone()
    .sub(camera.position)
    .normalize();

  const camRight = new THREE.Vector3()
    .crossVectors(camForward, new THREE.Vector3(0, 1, 0))
    .normalize();

  const camUp = new THREE.Vector3()
    .crossVectors(camRight, camForward)
    .normalize();

  camera.position
    .addScaledVector(camRight, shake.positionOffset.x)
    .addScaledVector(camUp, shake.positionOffset.y)
    .addScaledVector(camForward, shake.positionOffset.z);

  const shakenLookTarget = driveState.lookTarget
    .clone()
    .addScaledVector(camRight, shake.positionOffset.x * 0.35)
    .addScaledVector(camUp, shake.positionOffset.y * 0.2);

  camera.lookAt(shakenLookTarget);
  camera.rotateZ(shake.rollOffset);
  
  driveState.wasBoosting = boosting;
  driveState.wasHandbraking = handbrake;
}