import * as THREE from "three";

export function applyHeightMistToStandardMaterial(
  material: THREE.MeshStandardMaterial,
  {
    yBottom = -10,
    yTop = 5,
    maxOpacity = 0.3,
    color = 0xffffff as THREE.Color | number | string,
  } = {}
) {
  const mistColor =
    color instanceof THREE.Color ? color : new THREE.Color(color);

  const mistUniforms = {
    uMistYBottom: { value: yBottom },
    uMistYTop: { value: yTop },
    uMistMaxOpacity: { value: maxOpacity },
    uMistColor: { value: mistColor },
  };

  if (material.userData.__heightMistPatched) return;
  material.userData.__heightMistPatched = true;

  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, mistUniforms);

    shader.vertexShader = shader.vertexShader
      .replace(
        `#include <common>`,
        `#include <common>
         varying vec3 vWorldPosition;`
      )
      .replace(
        `#include <worldpos_vertex>`,
        `#include <worldpos_vertex>
         vWorldPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;`
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        `#include <common>`,
        `#include <common>
         varying vec3 vWorldPosition;
         uniform float uMistYBottom;
         uniform float uMistYTop;
         uniform float uMistMaxOpacity;
         uniform vec3 uMistColor;`
      )
      .replace(
        `#include <dithering_fragment>`,
        `
         float mistT = clamp(1.0 - smoothstep(uMistYBottom, uMistYTop, vWorldPosition.y), 0.0, 1.0);
         float mistAlpha = mistT * uMistMaxOpacity;
         gl_FragColor.rgb = mix(gl_FragColor.rgb, uMistColor, mistAlpha);
         #include <dithering_fragment>
        `
      );
  };

  material.needsUpdate = true;
}