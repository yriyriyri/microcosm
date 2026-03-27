import * as THREE from "three";

type HeightMistOptions = {
  yBottom?: number;
  yTop?: number;
  maxOpacity?: number;
  color?: THREE.Color | number | string;
  noiseScale?: number;
  noiseStrength?: number;
  noiseScroll?: THREE.Vector3 | { x: number; y: number; z: number };
};

export function applyAnimatedHeightMistToStandardMaterial(
  material: THREE.MeshStandardMaterial,
  {
    yBottom = -10,
    yTop = 5,
    maxOpacity = 0.3,
    color = 0xffffff,
    noiseScale = 0.02,
    noiseStrength = 0.65,
    noiseScroll = { x: 0.0, y: 0.02, z: 0.0 },
  }: HeightMistOptions = {}
) {
  const mistColor =
    color instanceof THREE.Color ? color.clone() : new THREE.Color(color);

  const scroll =
    noiseScroll instanceof THREE.Vector3
      ? noiseScroll.clone()
      : new THREE.Vector3(noiseScroll.x, noiseScroll.y, noiseScroll.z);

  if (material.userData.__heightMistPatched) {
    material.userData.__heightMistUniforms.uMistYBottom.value = yBottom;
    material.userData.__heightMistUniforms.uMistYTop.value = yTop;
    material.userData.__heightMistUniforms.uMistMaxOpacity.value = maxOpacity;
    material.userData.__heightMistUniforms.uMistColor.value.copy(mistColor);
    material.userData.__heightMistUniforms.uMistNoiseScale.value = noiseScale;
    material.userData.__heightMistUniforms.uMistNoiseStrength.value = noiseStrength;
    material.userData.__heightMistUniforms.uMistNoiseScroll.value.copy(scroll);
    return;
  }

  const mistUniforms = {
    uMistYBottom: { value: yBottom },
    uMistYTop: { value: yTop },
    uMistMaxOpacity: { value: maxOpacity },
    uMistColor: { value: mistColor },
    uMistTime: { value: 0 },
    uMistNoiseScale: { value: noiseScale },
    uMistNoiseStrength: { value: noiseStrength },
    uMistNoiseScroll: { value: scroll },
  };

  material.userData.__heightMistPatched = true;
  material.userData.__heightMistUniforms = mistUniforms;

  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, mistUniforms);

    shader.vertexShader = shader.vertexShader
      .replace(
        `#include <common>`,
        `#include <common>
         varying vec3 vHeightMistWorldPosition;`
      )
      .replace(
        `#include <worldpos_vertex>`,
        `#include <worldpos_vertex>
         vHeightMistWorldPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;`
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        `#include <common>`,
        `#include <common>
         varying vec3 vHeightMistWorldPosition;
         uniform float uMistYBottom;
         uniform float uMistYTop;
         uniform float uMistMaxOpacity;
         uniform vec3 uMistColor;
         uniform float uMistTime;
         uniform float uMistNoiseScale;
         uniform float uMistNoiseStrength;
         uniform vec3 uMistNoiseScroll;

         float hash13(vec3 p) {
           p = fract(p * 0.1031);
           p += dot(p, p.yzx + 33.33);
           return fract((p.x + p.y) * p.z);
         }

         float valueNoise3D(vec3 p) {
           vec3 i = floor(p);
           vec3 f = fract(p);
           f = f * f * (3.0 - 2.0 * f);

           float n000 = hash13(i + vec3(0.0, 0.0, 0.0));
           float n100 = hash13(i + vec3(1.0, 0.0, 0.0));
           float n010 = hash13(i + vec3(0.0, 1.0, 0.0));
           float n110 = hash13(i + vec3(1.0, 1.0, 0.0));
           float n001 = hash13(i + vec3(0.0, 0.0, 1.0));
           float n101 = hash13(i + vec3(1.0, 0.0, 1.0));
           float n011 = hash13(i + vec3(0.0, 1.0, 1.0));
           float n111 = hash13(i + vec3(1.0, 1.0, 1.0));

           float nx00 = mix(n000, n100, f.x);
           float nx10 = mix(n010, n110, f.x);
           float nx01 = mix(n001, n101, f.x);
           float nx11 = mix(n011, n111, f.x);

           float nxy0 = mix(nx00, nx10, f.y);
           float nxy1 = mix(nx01, nx11, f.y);

           return mix(nxy0, nxy1, f.z);
         }

         float fbm3(vec3 p) {
           float value = 0.0;
           float amplitude = 0.5;
           for (int i = 0; i < 4; i++) {
             value += valueNoise3D(p) * amplitude;
             p *= 2.02;
             amplitude *= 0.5;
           }
           return value;
         }`
      )
      .replace(
        `#include <dithering_fragment>`,
        `
         float mistHeight = clamp(
           1.0 - smoothstep(uMistYBottom, uMistYTop, vHeightMistWorldPosition.y),
           0.0,
           1.0
         );

         vec3 mistNoisePos =
           vHeightMistWorldPosition * uMistNoiseScale +
           uMistNoiseScroll * uMistTime;

         float noiseA = fbm3(mistNoisePos);
         float noiseB = fbm3(mistNoisePos * 1.9 + vec3(17.3, 9.2, 5.7));
         float noise = mix(noiseA, noiseB, 0.35);

         float densityMask = mix(1.0, noise, uMistNoiseStrength);

         float mistAlpha = mistHeight * densityMask * uMistMaxOpacity;

         gl_FragColor.rgb = mix(gl_FragColor.rgb, uMistColor, mistAlpha);

         #include <dithering_fragment>
        `
      );
  };

  material.needsUpdate = true;
}