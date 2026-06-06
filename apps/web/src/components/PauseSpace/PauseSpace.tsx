import * as THREE from "three";

type BarInfo = {
  mesh: THREE.Mesh;
  material: THREE.ShaderMaterial;
  uniforms: {
    uTex: { value: THREE.Texture };
    uOpacity: { value: number };
    uBandWidth: { value: number };
    uBandOffset: { value: number };
    uSpeed: { value: number };
    uTime: { value: number };
    uBGColor: { value: THREE.Color };
    uColorMix: { value: number };
  };
};

export class PauseSpace3D {
  public texture: THREE.Texture;

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;

  private sceneTarget: THREE.WebGLRenderTarget;
  private finalTarget: THREE.WebGLRenderTarget;

  private fullscreenScene: THREE.Scene;
  private fullscreenCam: THREE.OrthographicCamera;
  private fullscreenQuad: THREE.Mesh;

  private postMaterial: THREE.ShaderMaterial;

  private clock: THREE.Clock;
  private bars: BarInfo[] = [];

  constructor(renderer: THREE.WebGLRenderer, width: number, height: number) {
    this.sceneTarget = new THREE.WebGLRenderTarget(width, height, {
      depthBuffer: false,
      stencilBuffer: false,
      magFilter: THREE.LinearFilter,
      minFilter: THREE.LinearFilter,
      colorSpace: THREE.SRGBColorSpace,
    });

    this.finalTarget = new THREE.WebGLRenderTarget(width, height, {
      depthBuffer: false,
      stencilBuffer: false,
      magFilter: THREE.LinearFilter,
      minFilter: THREE.LinearFilter,
      colorSpace: THREE.SRGBColorSpace,
    });

    this.texture = this.finalTarget.texture;

    const bgHex = 0xd9eefa
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(bgHex);

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 3);
    this.camera.lookAt(0, 0, 0);

    const keyLight = new THREE.PointLight(0xffffff, 2.0, 10.0);
    keyLight.position.set(2, 2, 3);
    this.scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x4488ff, 1.5, 10.0);
    rimLight.position.set(-2, -1, -2);
    this.scene.add(rimLight);

    const texLoader = new THREE.TextureLoader();
    const godrayTex = texLoader.load("/pause/godray.jpeg", (t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.wrapS = THREE.ClampToEdgeWrapping;
      t.wrapT = THREE.ClampToEdgeWrapping;
      t.minFilter = THREE.LinearFilter;
      t.magFilter = THREE.LinearFilter;
      t.generateMipmaps = false;
    });

    const bgColor = new THREE.Color(bgHex);

    const createGodrayMaterial = (
      bandWidth: number,
      startOffset: number,
      speed: number
    ) => {
      const uniforms = {
        uTex: { value: godrayTex },

        uOpacity: { value: 0.5 },

        uBandWidth: { value: bandWidth },

        uBandOffset: { value: startOffset },

        uSpeed: { value: speed },

        uTime: { value: 0.0 },

        uBGColor: { value: bgColor.clone() },

        uColorMix: { value: 0.3 },
      };

      const mat = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          varying vec2 vUv;

          uniform sampler2D uTex;
          uniform float uOpacity;
          uniform float uBandWidth;
          uniform float uBandOffset;
          uniform float uSpeed;
          uniform float uTime;
          uniform vec3  uBGColor;
          uniform float uColorMix;

          vec3 screenBlend(vec3 A, vec3 B) {
            return 1.0 - (1.0 - A) * (1.0 - B);
          }

          void main() {
            vec2 rotatedUv = vec2(vUv.y, 1.0 - vUv.x);

            float scrollBase = fract(uBandOffset + uSpeed * uTime);

            float bandX = fract(scrollBase + rotatedUv.x * uBandWidth);
            vec2 sampleUv = vec2(bandX, rotatedUv.y);

            vec4 texColor = texture2D(uTex, sampleUv);

            float brightness = max(texColor.r, max(texColor.g, texColor.b));
            float cutoff = 0.55;
            float range  = 1.0 - cutoff;
            float boosted = (brightness - cutoff) / range;
            boosted = clamp(boosted, 0.0, 1.0);
            boosted = pow(boosted, 0.4);

            float alpha = boosted * uOpacity;

            float edgeFeather = 0.15;
            float distX = min(vUv.x, 1.0 - vUv.x);
            float distY = min(vUv.y, 1.0 - vUv.y);
            float edgeMaskX = smoothstep(0.0, edgeFeather, distX);
            float edgeMaskY = smoothstep(0.0, edgeFeather, distY);
            float edgeMask  = edgeMaskX * edgeMaskY;
            alpha *= edgeMask;

            if (alpha < 0.001) discard;

            vec3 screened = screenBlend(uBGColor, texColor.rgb);
            vec3 finalRGB = mix(screened, texColor.rgb, uColorMix);

            gl_FragColor = vec4(finalRGB, alpha);
          }
        `,
        transparent: true,
        depthTest: true,
        depthWrite: false,
      });

      return { mat, uniforms };
    };

    const BAR_W = 3.0;
    const BAR_H = 0.8;
    const makeBar = (pos: THREE.Vector3, rotZRadians: number) => {
      const geo = new THREE.PlaneGeometry(BAR_W, BAR_H);

      const bandWidth = 0.1;

      const startOffset = Math.random();

      const speed = (Math.random() * 2.0 - 1.0) * 0.015;

      const { mat, uniforms } = createGodrayMaterial(
        bandWidth,
        startOffset,
        speed
      );

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(pos);
      mesh.rotation.z = rotZRadians;

      this.scene.add(mesh);

      this.bars.push({
        mesh,
        material: mat,
        uniforms,
      });
    };

    makeBar(new THREE.Vector3(-1.3, -1.0,  0.0), 0.0);
    makeBar(new THREE.Vector3( 1.3,  0.9,  0.0), 0.0);
    makeBar(new THREE.Vector3( 1.6, -0.8, -1.0), 0.0);
    makeBar(new THREE.Vector3(-1.2,  0.0, -0.3), Math.PI / 2.0);
    makeBar(new THREE.Vector3( 1.0,  0.2, -0.8), Math.PI / 2.0);

    makeBar(new THREE.Vector3(-1.8, -0.2,  0.3), 0.0);
    makeBar(new THREE.Vector3( 1.7,  0.1,  0.5), 0.0);
    makeBar(new THREE.Vector3( 0.0,  1.3, -0.6), 0.0);
    makeBar(new THREE.Vector3(-1.9,  0.8,  0.6), Math.PI / 2.0);
    makeBar(new THREE.Vector3( 2.0, -0.4, -1.2), Math.PI / 2.0);

    this.fullscreenScene = new THREE.Scene();
    this.fullscreenCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const postUniforms = {
      uSceneTex: { value: this.sceneTarget.texture },
      uResolution: { value: new THREE.Vector2(width, height) },

      uOverlayOpacity: { value: 0.4 },

      uBlurStrength: { value: 0.5 }, 
    };

    this.postMaterial = new THREE.ShaderMaterial({
      uniforms: postUniforms,
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec2 vUv;

        uniform sampler2D uSceneTex;
        uniform vec2 uResolution;
        uniform float uOverlayOpacity;
        uniform float uBlurStrength;

        const int NUM_SAMPLES = 100;

        vec3 sampleBlur(in sampler2D tex, in vec2 uv, in vec2 res) {
          vec2 px = 1.0 / res;

          float w0 = 0.204164; 
          float w1 = 0.123831;
          float w2 = 0.075;

          vec3 c = texture2D(tex, uv).rgb * w0;

          c += texture2D(tex, uv + vec2( px.x, 0.0)).rgb * w1;
          c += texture2D(tex, uv + vec2(-px.x, 0.0)).rgb * w1;
          c += texture2D(tex, uv + vec2(0.0,  px.y)).rgb * w1;
          c += texture2D(tex, uv + vec2(0.0, -px.y)).rgb * w1;

          c += texture2D(tex, uv + vec2( px.x,  px.y)).rgb * w2;
          c += texture2D(tex, uv + vec2(-px.x,  px.y)).rgb * w2;
          c += texture2D(tex, uv + vec2( px.x, -px.y)).rgb * w2;
          c += texture2D(tex, uv + vec2(-px.x, -px.y)).rgb * w2;

          return c;
        }

        void main() {
          vec3 sceneColor = texture2D(uSceneTex, vUv).rgb;

          vec3 blurred = sampleBlur(uSceneTex, vUv, uResolution);

          vec3 softScene = mix(sceneColor, blurred, uBlurStrength);

          vec2 fragCoord = vUv * uResolution;
          vec2 warpUv = fragCoord / uResolution;

          vec3 smearCol = vec3(0.0);
          float scale = 1.0;

          for (int i = 0; i < NUM_SAMPLES; i++) {
            scale -= 0.0002;
            warpUv -= 0.5;
            warpUv *= scale;
            warpUv += 0.5;

            vec3 baseSample = texture2D(uSceneTex, warpUv).rgb * 0.08;
            smearCol += smoothstep(0.0, 1.0, baseSample);
          }

          vec3 finalColor = mix(softScene, smearCol, uOverlayOpacity);

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      depthTest: false,
      depthWrite: false,
      transparent: false,
    });

    const quadGeo = new THREE.PlaneGeometry(2, 2);
    this.fullscreenQuad = new THREE.Mesh(quadGeo, this.postMaterial);
    this.fullscreenScene.add(this.fullscreenQuad);

    this.clock = new THREE.Clock();

    renderer.toneMappingExposure = 1.2;
  }

  public renderFrame(renderer: THREE.WebGLRenderer) {
    const t = this.clock.getElapsedTime();
    for (let i = 0; i < this.bars.length; i++) {
      this.bars[i].uniforms.uTime.value = t;
    }

    renderer.setRenderTarget(this.sceneTarget);
    renderer.render(this.scene, this.camera);

    renderer.setRenderTarget(this.finalTarget);
    renderer.render(this.fullscreenScene, this.fullscreenCam);

    renderer.setRenderTarget(null);
  }

  public resize(width: number, height: number) {
    this.sceneTarget.setSize(width, height);
    this.finalTarget.setSize(width, height);

    this.texture = this.finalTarget.texture;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.postMaterial.uniforms.uSceneTex.value = this.sceneTarget.texture;
    this.postMaterial.uniforms.uResolution.value.set(width, height);
  }

  public dispose() {
    for (let i = 0; i < this.bars.length; i++) {
      const { mesh, material } = this.bars[i];
      (mesh.geometry as THREE.BufferGeometry).dispose();
      material.dispose();
    }
    this.bars.length = 0;

    (this.fullscreenQuad.geometry as THREE.BufferGeometry).dispose();
    this.postMaterial.dispose();

    this.sceneTarget.dispose();
    this.finalTarget.dispose();
  }
}