"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { PauseSpace3D } from "./PauseSpace";

export default function PauseSpaceBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    mount.appendChild(renderer.domElement);

    const pauseSpace = new PauseSpace3D(
      renderer,
      mount.clientWidth,
      mount.clientHeight
    );

    let raf = 0;
    let disposed = false;

    const render = () => {
      if (disposed) return;
      pauseSpace.renderFrame(renderer);

      renderer.setRenderTarget(null);
      renderer.clear();
      renderer.render(
        new THREE.Scene().add(
          (() => {
            const scene = new THREE.Scene();
            const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
            const mat = new THREE.MeshBasicMaterial({
              map: pauseSpace.texture,
            });
            const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
            scene.add(quad);
            (render as any)._scene = scene;
            (render as any)._cam = cam;
            (render as any)._mat = mat;
            (render as any)._geo = quad.geometry;
            return quad;
          })()
        ) as unknown as THREE.Scene,
        (render as any)._cam
      );

      raf = window.requestAnimationFrame(render);
    };

    const scene = new THREE.Scene();
    const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const mat = new THREE.MeshBasicMaterial({ map: pauseSpace.texture });
    const geo = new THREE.PlaneGeometry(2, 2);
    const quad = new THREE.Mesh(geo, mat);
    scene.add(quad);

    const loop = () => {
      if (disposed) return;
      pauseSpace.renderFrame(renderer);
      renderer.setRenderTarget(null);
      renderer.clear();
      renderer.render(scene, cam);
      raf = window.requestAnimationFrame(loop);
    };

    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(w, h, false);
      pauseSpace.resize(w, h);
    };

    window.addEventListener("resize", onResize);
    loop();

    return () => {
      disposed = true;
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);

      geo.dispose();
      mat.dispose();
      pauseSpace.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    />
  );
}