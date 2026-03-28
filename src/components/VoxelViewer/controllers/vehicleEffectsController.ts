import * as THREE from "three";
import type { DriveMoveState, DriveState } from "./vehicleController";

type VehicleAnchorPreset = {
  engineVentStrips: THREE.Vector3[][];
  leftSparkLine: [THREE.Vector3, THREE.Vector3];
  rightSparkLine: [THREE.Vector3, THREE.Vector3];
};

type TrailPoint = {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  up: THREE.Vector3;
  age: number;
};

type ContrailStrip = {
  root: THREE.Mesh;
  geometry: THREE.BufferGeometry;
  material: THREE.ShaderMaterial;
  points: TrailPoint[];
  sourceLocal: THREE.Vector3;
  width: number;
};

type SparkParticle = {
  sprite: THREE.Sprite;
  velocity: THREE.Vector3;
  age: number;
  life: number;
  active: boolean;
  gravity: number;
  startScale: number;
  endScale: number;
  startOpacity: number;
};

type VehicleEffectsController = {
  update: (dt: number, driveState: DriveState, moveState: DriveMoveState) => void;
  reset: () => void;
  dispose: () => void;
};

type TrailMode = "idle" | "drive" | "boost" | "handbrake" | "boostFade";

const CONTRAIL_LIFE_IDLE = 0.11;
const CONTRAIL_LIFE_DRIVE = 0.34;
const CONTRAIL_LIFE_BOOST = 0.48;
const CONTRAIL_LIFE_HANDBRAKE = 0.44;

const CONTRAIL_WIDTH_IDLE = 2.0;
const CONTRAIL_WIDTH_DRIVE = 3.0;
const CONTRAIL_WIDTH_BOOST = 5.0;
const CONTRAIL_WIDTH_HANDBRAKE = 4.6;

const CONTRAIL_MIN_SPEED_FOR_DRIVE = 8;
const CONTRAIL_MIN_SPEED_FOR_BOOST = 45;

const CONTRAIL_MAX_POINTS = 28;
const CONTRAIL_MIN_POINT_DISTANCE = 0.8;

const CONTRAIL_LAUNCH_SPEED = 1000;
const CONTRAIL_DRAG = 0.992;
const CONTRAIL_UP_LIFT = 0.28;

const CONTRAIL_HEAD_OPACITY = 1.0;
const CONTRAIL_TAIL_FADE_EXPONENT = 3.2;

const CONTRAIL_MODE_SPUTTER_DURATION = 1.0;
const CONTRAIL_IDLE_SPUTTER_DURATION = 0.55;
const CONTRAIL_DRIFT_SPUTTER_STRENGTH = 0.45;
const CONTRAIL_MODE_SPUTTER_STRENGTH = 0.55;
const CONTRAIL_IDLE_SPUTTER_STRENGTH = 0.75;

const CONTRAIL_SPUTTER_FREQ_A = 30;
const CONTRAIL_SPUTTER_FREQ_B = 51;
const CONTRAIL_SPUTTER_WIDTH_FLICKER = 0.28;

const CONTRAIL_LIFE_BOOST_FADE = 0.26;
const CONTRAIL_WIDTH_BOOST_FADE = 3.8;
const CONTRAIL_BOOST_FADE_DURATION = 3.8;

const SPARK_MAX_PARTICLES = 240;
const SPARK_EMIT_RATE = 120.0;
const SPARK_MIN_SPEED = 14;
const SPARK_BANK_DEADZONE = 0.06;

const SPARK_LIFE_MIN = 0.16;
const SPARK_LIFE_MAX = 0.42;

const SPARK_SCALE_MIN = 1.4;
const SPARK_SCALE_MAX = 4.8;
const SPARK_END_SCALE_MULT = 0.35;

const SPARK_OPACITY_MIN = 0.75;
const SPARK_OPACITY_MAX = 1.0;

const SPARK_SIDE_SPEED_MIN = 18;
const SPARK_SIDE_SPEED_MAX = 42;
const SPARK_BACK_SPEED_MIN = 10;
const SPARK_BACK_SPEED_MAX = 26;
const SPARK_UP_SPEED_MIN = 5;
const SPARK_UP_SPEED_MAX = 15;

const SPARK_GRAVITY_MIN = 42;
const SPARK_GRAVITY_MAX = 78;
const SPARK_DRAG = 0.982;

const SPARK_COLOR = 0xff7a00;

const VEHICLE_ANCHORS: Record<string, VehicleAnchorPreset> = {
  preset_car: {
    engineVentStrips: [
      [
        new THREE.Vector3(-15.5, 8.7, 5.3),
        new THREE.Vector3(-15.5, 11.1, 5.3),
        new THREE.Vector3(-15.5, 13.5, 5.3),
      ],
      [
        new THREE.Vector3(15.5, 8.7, 5.3),
        new THREE.Vector3(15.5, 11.1, 5.3),
        new THREE.Vector3(15.5, 13.5, 5.3),
      ],
    ],
    leftSparkLine: [
      new THREE.Vector3(-15.9, 1.2, -10.8),
      new THREE.Vector3(-15.9, 1.2, 10.8),
    ],
    rightSparkLine: [
      new THREE.Vector3(15.9, 1.2, -10.8),
      new THREE.Vector3(15.9, 1.2, 10.8),
    ],
  },
  "preset_mini-hovercraft": {
    engineVentStrips: [
      [
        new THREE.Vector3(-10.9, 6.4, 9.3),
        new THREE.Vector3(-10.9, 8.2, 9.3),
        new THREE.Vector3(-10.9, 10.0, 9.3),
      ],
      [
        new THREE.Vector3(10.9, 6.4, 9.3),
        new THREE.Vector3(10.9, 8.2, 9.3),
        new THREE.Vector3(10.9, 10.0, 9.3),
      ],
    ],
    leftSparkLine: [
      new THREE.Vector3(-11.4, 1.0, -7.8),
      new THREE.Vector3(-11.4, 1.0, 8.4),
    ],
    rightSparkLine: [
      new THREE.Vector3(11.4, 1.0, -7.8),
      new THREE.Vector3(11.4, 1.0, 8.4),
    ],
  },
};

function getVehiclePreset(vehicleRoot: THREE.Object3D | null): VehicleAnchorPreset | null {
  if (!vehicleRoot) return null;
  const assetId = vehicleRoot.userData?.latestMarketplaceAssetId;
  if (typeof assetId !== "string") return null;
  return VEHICLE_ANCHORS[assetId] ?? null;
}

function getForwardWorld(vehicleRoot: THREE.Object3D): THREE.Vector3 {
  const q = new THREE.Quaternion();
  vehicleRoot.getWorldQuaternion(q);
  return new THREE.Vector3(0, 0, 1).applyQuaternion(q).normalize();
}

function getUpWorld(vehicleRoot: THREE.Object3D): THREE.Vector3 {
  const q = new THREE.Quaternion();
  vehicleRoot.getWorldQuaternion(q);
  return new THREE.Vector3(0, 1, 0).applyQuaternion(q).normalize();
}

function getRightWorld(vehicleRoot: THREE.Object3D): THREE.Vector3 {
  const q = new THREE.Quaternion();
  vehicleRoot.getWorldQuaternion(q);
  return new THREE.Vector3(1, 0, 0).applyQuaternion(q).normalize();
}

function modeWidth(mode: TrailMode): number {
  if (mode === "boost") return CONTRAIL_WIDTH_BOOST;
  if (mode === "boostFade") return CONTRAIL_WIDTH_BOOST_FADE;
  if (mode === "handbrake") return CONTRAIL_WIDTH_HANDBRAKE;
  if (mode === "drive") return CONTRAIL_WIDTH_DRIVE;
  return CONTRAIL_WIDTH_IDLE;
}

function modeLife(mode: TrailMode): number {
  if (mode === "boost") return CONTRAIL_LIFE_BOOST;
  if (mode === "boostFade") return CONTRAIL_LIFE_BOOST_FADE;
  if (mode === "handbrake") return CONTRAIL_LIFE_HANDBRAKE;
  if (mode === "drive") return CONTRAIL_LIFE_DRIVE;
  return CONTRAIL_LIFE_IDLE;
}

function createContrailMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    depthTest: true,
    side: THREE.DoubleSide,
    toneMapped: false,
    uniforms: {
      uColor: { value: new THREE.Color(0xffffff) },
    },
    vertexShader: `
      attribute float aAlpha;
      varying float vAlpha;

      void main() {
        vAlpha = aAlpha;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      varying float vAlpha;

      void main() {
        gl_FragColor = vec4(uColor, vAlpha);
      }
    `,
  });
}

function makeContrailStrip(sourceLocal: THREE.Vector3): ContrailStrip {
  const geometry = new THREE.BufferGeometry();

  const maxVerts = (CONTRAIL_MAX_POINTS - 1) * 6;
  const positions = new Float32Array(maxVerts * 3);
  const alphas = new Float32Array(maxVerts);

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aAlpha", new THREE.BufferAttribute(alphas, 1));
  geometry.setDrawRange(0, 0);

  const material = createContrailMaterial();

  const mesh = new THREE.Mesh(geometry, material);
  mesh.frustumCulled = false;
  mesh.renderOrder = 920;

  return {
    root: mesh,
    geometry,
    material,
    points: [],
    sourceLocal: sourceLocal.clone(),
    width: CONTRAIL_WIDTH_IDLE,
  };
}

function writeStripGeometry(
  strip: ContrailStrip,
  camera: THREE.PerspectiveCamera,
  headOpacity: number,
  life: number
) {
  const pts = strip.points;
  const posAttr = strip.geometry.getAttribute("position") as THREE.BufferAttribute;
  const alphaAttr = strip.geometry.getAttribute("aAlpha") as THREE.BufferAttribute;

  if (pts.length < 2) {
    strip.geometry.setDrawRange(0, 0);
    posAttr.needsUpdate = true;
    alphaAttr.needsUpdate = true;
    return;
  }

  let v = 0;
  let triVerts = 0;

  for (let i = 0; i < pts.length - 1; i += 1) {
    const a = pts[i];
    const b = pts[i + 1];

    const tangent = b.position.clone().sub(a.position);
    if (tangent.lengthSq() < 1e-6) continue;
    tangent.normalize();

    const upHint = a.up.clone().add(b.up).normalize();
    let side = new THREE.Vector3().crossVectors(upHint, tangent);

    if (side.lengthSq() < 1e-6) {
      const center = a.position.clone().add(b.position).multiplyScalar(0.5);
      const toCamera = camera.position.clone().sub(center).normalize();
      side = new THREE.Vector3().crossVectors(toCamera, tangent);
    }

    if (side.lengthSq() < 1e-6) continue;
    side.normalize();

    const halfW = strip.width * 0.5;

    const aL = a.position.clone().addScaledVector(side, halfW);
    const aR = a.position.clone().addScaledVector(side, -halfW);
    const bL = b.position.clone().addScaledVector(side, halfW);
    const bR = b.position.clone().addScaledVector(side, -halfW);

    const alphaA =
      headOpacity * Math.pow(Math.max(0, 1 - a.age / life), CONTRAIL_TAIL_FADE_EXPONENT);
    const alphaB =
      headOpacity * Math.pow(Math.max(0, 1 - b.age / life), CONTRAIL_TAIL_FADE_EXPONENT);

    const verts = [
      [aL, alphaA],
      [aR, alphaA],
      [bL, alphaB],
      [aR, alphaA],
      [bR, alphaB],
      [bL, alphaB],
    ] as const;

    for (const [p, alpha] of verts) {
      posAttr.setXYZ(v, p.x, p.y, p.z);
      alphaAttr.setX(v, alpha);
      v += 1;
    }

    triVerts += 6;
  }

  strip.geometry.setDrawRange(0, triVerts);
  posAttr.needsUpdate = true;
  alphaAttr.needsUpdate = true;
}

function createSparkMaterial(texture: THREE.Texture): THREE.SpriteMaterial {
  return new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    depthTest: true,
    color: SPARK_COLOR,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
}

export function createVehicleEffectsController(params: {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  sparkTexturePath?: string;
}): VehicleEffectsController {
  const {
    scene,
    camera,
    sparkTexturePath = "/player/orangespark.png",
  } = params;

  const root = new THREE.Group();
  root.name = "vehicle-effects-root";
  scene.add(root);

  let strips: ContrailStrip[] = [];
  let activeVehicleKey: string | null = null;

  let time = 0;
  let currentMode: TrailMode = "idle";
  let previousMode: TrailMode = "idle";
  let modeTransitionTimer = 0;
  let idleSputterTimer = 0;
  let boostFadeTimer = 0;

  const sparkTexture = new THREE.TextureLoader().load(sparkTexturePath);
  sparkTexture.colorSpace = THREE.SRGBColorSpace;
  sparkTexture.minFilter = THREE.NearestFilter;
  sparkTexture.magFilter = THREE.NearestFilter;
  sparkTexture.generateMipmaps = false;
  sparkTexture.needsUpdate = true;

  const sparksRoot = new THREE.Group();
  sparksRoot.name = "vehicle-sparks-root";
  root.add(sparksRoot);

  const sparks: SparkParticle[] = [];
  for (let i = 0; i < SPARK_MAX_PARTICLES; i += 1) {
    const sprite = new THREE.Sprite(createSparkMaterial(sparkTexture));
    sprite.visible = false;
    sprite.renderOrder = 1100;
    sparksRoot.add(sprite);

    sparks.push({
      sprite,
      velocity: new THREE.Vector3(),
      age: 0,
      life: 1,
      active: false,
      gravity: 60,
      startScale: 1,
      endScale: 1,
      startOpacity: 1,
    });
  }

  let sparkEmitCarry = 0;

  function allocSpark(): SparkParticle | null {
    for (const s of sparks) {
      if (!s.active) return s;
    }
    return null;
  }

  function emitSpark(params: {
    worldPos: THREE.Vector3;
    outwardDir: THREE.Vector3;
    backwardDir: THREE.Vector3;
    upDir: THREE.Vector3;
  }) {
    const s = allocSpark();
    if (!s) return;

    s.active = true;
    s.age = 0;
    s.life = THREE.MathUtils.lerp(SPARK_LIFE_MIN, SPARK_LIFE_MAX, Math.random());
    s.gravity = THREE.MathUtils.lerp(SPARK_GRAVITY_MIN, SPARK_GRAVITY_MAX, Math.random());
    s.startScale = THREE.MathUtils.lerp(SPARK_SCALE_MIN, SPARK_SCALE_MAX, Math.random());
    s.endScale = s.startScale * SPARK_END_SCALE_MULT;
    s.startOpacity = THREE.MathUtils.lerp(SPARK_OPACITY_MIN, SPARK_OPACITY_MAX, Math.random());

    s.sprite.visible = true;
    s.sprite.position.copy(params.worldPos);
    s.sprite.scale.setScalar(s.startScale);

    const outwardSpeed = THREE.MathUtils.lerp(SPARK_SIDE_SPEED_MIN, SPARK_SIDE_SPEED_MAX, Math.random());
    const backwardSpeed = THREE.MathUtils.lerp(SPARK_BACK_SPEED_MIN, SPARK_BACK_SPEED_MAX, Math.random());
    const upSpeed = THREE.MathUtils.lerp(SPARK_UP_SPEED_MIN, SPARK_UP_SPEED_MAX, Math.random());

    s.velocity
      .copy(params.outwardDir)
      .multiplyScalar(outwardSpeed)
      .addScaledVector(params.backwardDir, backwardSpeed)
      .addScaledVector(params.upDir, upSpeed);

    const mat = s.sprite.material as THREE.SpriteMaterial;
    mat.color.setHex(SPARK_COLOR);
    mat.opacity = s.startOpacity;
  }

  function rebuildForVehicle(vehicleRoot: THREE.Object3D | null) {
    for (const strip of strips) {
      root.remove(strip.root);
      strip.geometry.dispose();
      strip.material.dispose();
    }
    strips = [];
    activeVehicleKey = null;

    const preset = getVehiclePreset(vehicleRoot);
    if (!vehicleRoot || !preset) return;

    activeVehicleKey = String(vehicleRoot.userData?.latestMarketplaceAssetId ?? "");

    for (const engine of preset.engineVentStrips) {
      for (const vent of engine) {
        const strip = makeContrailStrip(vent);
        strips.push(strip);
        root.add(strip.root);
      }
    }
  }

  function reset() {
    modeTransitionTimer = 0;
    idleSputterTimer = 0;
    currentMode = "idle";
    previousMode = "idle";
    sparkEmitCarry = 0;
    boostFadeTimer = 0;

    for (const strip of strips) {
      strip.points.length = 0;
      strip.geometry.setDrawRange(0, 0);
    }

    for (const s of sparks) {
      s.active = false;
      s.sprite.visible = false;
    }
  }

  function update(dt: number, driveState: DriveState, moveState: DriveMoveState) {
    time += dt;

    const vehicleRoot = driveState.vehicleRoot;
    const preset = getVehiclePreset(vehicleRoot);
    const vehicleKey =
      vehicleRoot && typeof vehicleRoot.userData?.latestMarketplaceAssetId === "string"
        ? vehicleRoot.userData.latestMarketplaceAssetId
        : null;

    for (const s of sparks) {
      if (!s.active) continue;

      s.age += dt;
      if (s.age >= s.life) {
        s.active = false;
        s.sprite.visible = false;
        continue;
      }

      s.velocity.multiplyScalar(Math.pow(SPARK_DRAG, dt * 60));
      s.velocity.y -= s.gravity * dt;
      s.sprite.position.addScaledVector(s.velocity, dt);

      const t = s.age / s.life;
      const scale = THREE.MathUtils.lerp(s.startScale, s.endScale, t);
      s.sprite.scale.setScalar(scale);

      const mat = s.sprite.material as THREE.SpriteMaterial;
      mat.opacity = s.startOpacity * (1 - t);
    }

    if (!vehicleRoot || !preset || !vehicleKey) {
      reset();
      return;
    }

    if (vehicleKey !== activeVehicleKey || strips.length === 0) {
      rebuildForVehicle(vehicleRoot);
    }

    const speed = Math.abs(driveState.speed);
    const handbrakeActive = !!moveState.backward && speed >= CONTRAIL_MIN_SPEED_FOR_DRIVE;
    const boosting =
      !!moveState.boost && !!moveState.forward && speed >= CONTRAIL_MIN_SPEED_FOR_BOOST;
    const drifting = !!moveState.backward && ((moveState.left ? 1 : 0) + (moveState.right ? 1 : 0)) > 0;
    
    const rawNextMode: TrailMode = boosting
      ? "boost"
      : handbrakeActive
        ? "handbrake"
        : "idle";
    
    const nextMode: TrailMode =
      currentMode === "boost" && rawNextMode === "idle"
        ? "boostFade"
        : rawNextMode;
    
    if (nextMode !== currentMode) {
      previousMode = currentMode;
      currentMode = nextMode;
      modeTransitionTimer = CONTRAIL_MODE_SPUTTER_DURATION;
    
      if (nextMode === "idle") {
        idleSputterTimer = CONTRAIL_IDLE_SPUTTER_DURATION;
      }
    
      if (nextMode === "boostFade") {
        boostFadeTimer = CONTRAIL_BOOST_FADE_DURATION;
      }
    }
    
    modeTransitionTimer = Math.max(0, modeTransitionTimer - dt);
    idleSputterTimer = Math.max(0, idleSputterTimer - dt);
    boostFadeTimer = Math.max(0, boostFadeTimer - dt);
    
    if (currentMode === "boostFade" && boostFadeTimer <= 0) {
      previousMode = currentMode;
      currentMode = "idle";
      idleSputterTimer = CONTRAIL_IDLE_SPUTTER_DURATION;
      modeTransitionTimer = CONTRAIL_MODE_SPUTTER_DURATION;
    }

    modeTransitionTimer = Math.max(0, modeTransitionTimer - dt);
    idleSputterTimer = Math.max(0, idleSputterTimer - dt);

    let life = modeLife(currentMode);
    let width = modeWidth(currentMode);
    let headOpacity = CONTRAIL_HEAD_OPACITY;
    
    if (currentMode === "boostFade") {
      const fadeT = THREE.MathUtils.clamp(
        boostFadeTimer / CONTRAIL_BOOST_FADE_DURATION,
        0,
        1
      );
    
      headOpacity *= fadeT;
      width = THREE.MathUtils.lerp(CONTRAIL_WIDTH_IDLE, width, fadeT);
      life = THREE.MathUtils.lerp(CONTRAIL_LIFE_IDLE, life, fadeT);
    }

    if (modeTransitionTimer > 0) {
      const t = 1 - modeTransitionTimer / CONTRAIL_MODE_SPUTTER_DURATION;
      width = THREE.MathUtils.lerp(modeWidth(previousMode), modeWidth(currentMode), t);
    }

    const sputterBase =
      Math.sin(time * CONTRAIL_SPUTTER_FREQ_A) * 0.5 +
      Math.sin(time * CONTRAIL_SPUTTER_FREQ_B) * 0.5;

    let sputterStrength = 0;
    if (modeTransitionTimer > 0) sputterStrength += CONTRAIL_MODE_SPUTTER_STRENGTH;
    if (idleSputterTimer > 0) {
      sputterStrength +=
        CONTRAIL_IDLE_SPUTTER_STRENGTH * (idleSputterTimer / CONTRAIL_IDLE_SPUTTER_DURATION);
    }
    if (drifting) sputterStrength += CONTRAIL_DRIFT_SPUTTER_STRENGTH;
    if (currentMode === "boostFade") sputterStrength += 0.35;

    sputterStrength = Math.min(1, sputterStrength);

    const gate = THREE.MathUtils.clamp(1 - Math.max(0, sputterBase) * sputterStrength, 0, 1);

    width *= 1 + sputterBase * sputterStrength * CONTRAIL_SPUTTER_WIDTH_FLICKER;
    headOpacity *= gate;

    const forward = getForwardWorld(vehicleRoot);
    const backward = forward.clone().multiplyScalar(-1);
    const up = getUpWorld(vehicleRoot);

    for (let s = 0; s < strips.length; s += 1) {
      const strip = strips[s];
      strip.width = width;

      for (let i = strip.points.length - 1; i >= 0; i -= 1) {
        const p = strip.points[i];
        p.age += dt;

        if (p.age >= life) {
          strip.points.splice(i, 1);
          continue;
        }

        p.position.addScaledVector(p.velocity, dt);
        p.velocity.multiplyScalar(Math.pow(CONTRAIL_DRAG, dt * 60));
        p.velocity.addScaledVector(up, CONTRAIL_UP_LIFT * dt);
      }

      const sourceWorld = vehicleRoot.localToWorld(strip.sourceLocal.clone());

      const stripPhase = s * 0.37;
      const stripPulse =
        Math.sin(time * CONTRAIL_SPUTTER_FREQ_A + stripPhase) * 0.5 +
        Math.sin(time * CONTRAIL_SPUTTER_FREQ_B + stripPhase) * 0.5;

      const stripGate = THREE.MathUtils.clamp(
        1 - Math.max(0, stripPulse) * sputterStrength,
        0,
        1
      );

      const shouldEmit =
      currentMode !== "idle" &&
      (stripGate > 0.18 ||
        currentMode === "boost" ||
        currentMode === "handbrake" ||
        currentMode === "boostFade");

      if (shouldEmit) {
        const last = strip.points[strip.points.length - 1];
        if (
          !last ||
          last.position.distanceToSquared(sourceWorld) >=
            CONTRAIL_MIN_POINT_DISTANCE * CONTRAIL_MIN_POINT_DISTANCE
        ) {
          strip.points.push({
            position: sourceWorld,
            velocity: backward.clone().multiplyScalar(CONTRAIL_LAUNCH_SPEED),
            up: up.clone(),
            age: 0,
          });
        }
      }

      if (strip.points.length > CONTRAIL_MAX_POINTS) {
        strip.points.splice(0, strip.points.length - CONTRAIL_MAX_POINTS);
      }

      writeStripGeometry(strip, camera, headOpacity * stripGate, life);
    }

    const sparksHandbrakeActive = !!moveState.backward && speed >= SPARK_MIN_SPEED;
    if (!sparksHandbrakeActive) {
      sparkEmitCarry = 0;
      return;
    }

    const rightDir = getRightWorld(vehicleRoot);
    const upDir = getUpWorld(vehicleRoot);
    const backwardDir = getForwardWorld(vehicleRoot).multiplyScalar(-1);

    const bank = driveState.visualBank;
    const emitLeft = bank > SPARK_BANK_DEADZONE ? true : Math.abs(bank) <= SPARK_BANK_DEADZONE;
    const emitRight = bank < -SPARK_BANK_DEADZONE ? true : Math.abs(bank) <= SPARK_BANK_DEADZONE;

    sparkEmitCarry += SPARK_EMIT_RATE * dt;

    while (sparkEmitCarry >= 1) {
      sparkEmitCarry -= 1;

      if (emitLeft) {
        const [lineStart, lineEnd] = preset.leftSparkLine;
        const localPos = lineStart.clone().lerp(lineEnd, Math.random());
        const worldPos = vehicleRoot.localToWorld(localPos);
        emitSpark({
          worldPos,
          outwardDir: rightDir.clone().multiplyScalar(-1),
          backwardDir,
          upDir,
        });
      }

      if (emitRight) {
        const [lineStart, lineEnd] = preset.rightSparkLine;
        const localPos = lineStart.clone().lerp(lineEnd, Math.random());
        const worldPos = vehicleRoot.localToWorld(localPos);
        emitSpark({
          worldPos,
          outwardDir: rightDir.clone(),
          backwardDir,
          upDir,
        });
      }
    }
  }

  function dispose() {
    for (const strip of strips) {
      root.remove(strip.root);
      strip.geometry.dispose();
      strip.material.dispose();
    }
    strips = [];

    for (const s of sparks) {
      const mat = s.sprite.material as THREE.Material;
      mat.dispose();
      sparksRoot.remove(s.sprite);
    }

    sparkTexture.dispose();
    scene.remove(root);
  }

  return {
    update,
    reset,
    dispose,
  };
}