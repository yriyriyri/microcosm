import * as THREE from "three";

export type CameraShakeKind = "small" | "medium" | "heavy";

type ShakePreset = {
  amplitude: number;
  frequency: number;
  rollAmplitude: number;
};

const SHAKE_PRESETS: Record<CameraShakeKind, ShakePreset> = {
  small: {
    amplitude: 0.18,
    frequency: 58,
    rollAmplitude: 0.0018,
  },
  medium: {
    amplitude: 0.42,
    frequency: 86,
    rollAmplitude: 0.0035,
  },
  heavy: {
    amplitude: 0.82,
    frequency: 122,
    rollAmplitude: 0.006,
  },
};

const SHAKE_SUSTAIN_LERP = 14.0;
const SHAKE_IMPULSE_DECAY = 10.5;

export type CameraShakeState = {
  time: number;

  impulseAmplitude: number;
  impulseFrequency: number;
  impulseRollAmplitude: number;

  sustainAmplitude: number;
  sustainFrequency: number;
  sustainRollAmplitude: number;

  currentSustainAmplitude: number;
  currentSustainRollAmplitude: number;
};

export function createCameraShakeState(): CameraShakeState {
  return {
    time: 0,

    impulseAmplitude: 0,
    impulseFrequency: SHAKE_PRESETS.small.frequency,
    impulseRollAmplitude: 0,

    sustainAmplitude: 0,
    sustainFrequency: SHAKE_PRESETS.small.frequency,
    sustainRollAmplitude: 0,

    currentSustainAmplitude: 0,
    currentSustainRollAmplitude: 0,
  };
}

export function resetCameraShake(state: CameraShakeState) {
  state.time = 0;

  state.impulseAmplitude = 0;
  state.impulseFrequency = SHAKE_PRESETS.small.frequency;
  state.impulseRollAmplitude = 0;

  state.sustainAmplitude = 0;
  state.sustainFrequency = SHAKE_PRESETS.small.frequency;
  state.sustainRollAmplitude = 0;

  state.currentSustainAmplitude = 0;
  state.currentSustainRollAmplitude = 0;
}

export function triggerCameraShake(
  state: CameraShakeState,
  kind: CameraShakeKind
) {
  const preset = SHAKE_PRESETS[kind];

  state.impulseAmplitude = Math.max(state.impulseAmplitude, preset.amplitude);
  state.impulseFrequency = preset.frequency;
  state.impulseRollAmplitude = Math.max(
    state.impulseRollAmplitude,
    preset.rollAmplitude
  );
}

export function setSustainCameraShake(
  state: CameraShakeState,
  kind: CameraShakeKind | null
) {
  if (!kind) {
    state.sustainAmplitude = 0;
    state.sustainRollAmplitude = 0;
    return;
  }

  const preset = SHAKE_PRESETS[kind];
  state.sustainAmplitude = preset.amplitude;
  state.sustainFrequency = preset.frequency;
  state.sustainRollAmplitude = preset.rollAmplitude;
}

export function updateCameraShake(
  state: CameraShakeState,
  dt: number
): {
  positionOffset: THREE.Vector3;
  rollOffset: number;
} {
  state.time += dt;

  const sustainAlpha = 1 - Math.exp(-SHAKE_SUSTAIN_LERP * dt);
  state.currentSustainAmplitude = THREE.MathUtils.lerp(
    state.currentSustainAmplitude,
    state.sustainAmplitude,
    sustainAlpha
  );
  state.currentSustainRollAmplitude = THREE.MathUtils.lerp(
    state.currentSustainRollAmplitude,
    state.sustainRollAmplitude,
    sustainAlpha
  );

  const decay = Math.exp(-SHAKE_IMPULSE_DECAY * dt);
  state.impulseAmplitude *= decay;
  state.impulseRollAmplitude *= decay;

  const amp = state.currentSustainAmplitude + state.impulseAmplitude;

  const fx =
    Math.sin(state.time * (state.sustainFrequency * 1.0 + 0.0)) * 0.55 +
    Math.sin(state.time * (state.impulseFrequency * 1.18 + 19.0)) * 0.45;

  const fy =
    Math.sin(state.time * (state.sustainFrequency * 1.42 + 27.0)) * 0.6 +
    Math.sin(state.time * (state.impulseFrequency * 1.63 + 9.0)) * 0.4;

  const fz =
    Math.sin(state.time * (state.sustainFrequency * 1.16 + 15.0)) * 0.5 +
    Math.sin(state.time * (state.impulseFrequency * 1.87 + 33.0)) * 0.5;

  const rollAmp = state.currentSustainRollAmplitude + state.impulseRollAmplitude;
  const roll =
    Math.sin(state.time * 48.0 + 2.7) * rollAmp +
    Math.sin(state.time * 73.0 + 0.9) * rollAmp * 0.45;

  return {
    positionOffset: new THREE.Vector3(
      fx * amp,
      fy * amp * 0.55,
      fz * amp * 0.24
    ),
    rollOffset: roll,
  };
}