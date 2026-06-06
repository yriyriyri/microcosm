"use client";

import { useEffect, useState } from "react";
import LoginScreen from "@/components/Auth/LoginScreen";
import { useAuthState } from "@/components/Auth/state";
import { Me } from "@/services/auth";
import { nukeVoxelEditorDatabases } from "@/components/VoxelEditor/database/nukeEditorDatabases";
import { ensurePresetAssetsInstalledOnce } from "@/components/VoxelEditor/database/AssetPresets";
import { useSound } from "@/components/VoxelEditor/audio/SoundProvider";
import Atlas from "@/components/Home/Atlas/Atlas";
import Library from "@/components/Home/Library/Library";
import Marketplace from "@/components/Home/Marketplace/Marketplace";
import LoadingOverlay from "@/components/VoxelEditor/ui/LoadingOverlay";
import PauseSpaceBackground from "@/components/PauseSpace/PauseSpaceBackground";

const STATIC_IMAGE_PATHS = [
  "/pfp/1.png",
  "/pfp/2.png",
  "/pfp/3.png",
  "/pfp/4.png",
  "/pfp/5.png",
  "/pfp/6.png",
  "/pfp/7.png",
  "/pfp/8.png",

  "/library/1.png",
  "/library/2.png",
  "/library/3.png",
  "/library/4.png",

  "/library/createnew.png",
  "/library/create.png",
  "/library/delete.png",

  "/atlas/expand.png",
  "/atlas/play.png",

  "/marketplace/byte.png",
  "/marketplace/hourglass.png",
  "/marketplace/user.png",
  "/marketplace/voxel.png",

] as const;

const STATIC_VIDEO_PATHS = ["/focus/screen.mp4"] as const;

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

function preloadVideo(src: string): Promise<void> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      video.onloadeddata = null;
      video.oncanplay = null;
      video.onerror = null;
      resolve();
    };

    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
    video.onloadeddata = finish;
    video.oncanplay = finish;
    video.onerror = finish;
    video.src = src;
    video.load();

    window.setTimeout(finish, 2500);
  });
}

async function preloadStaticHomeAssets(onStatus?: (text: string) => void) {
  onStatus?.("preloading interface…");

  await Promise.all([
    ...STATIC_IMAGE_PATHS.map((src) => preloadImage(src)),
    ...STATIC_VIDEO_PATHS.map((src) => preloadVideo(src)),
  ]);
}

type HomeTab = "marketplace" | "library" | "games";

function HomeClientInner() {
  const { auth, setAuth, clearAuth } = useAuthState();
  const [loading, setLoading] = useState(true);
  const [presetsReady, setPresetsReady] = useState(false);
  const [presetProgress, setPresetProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("booting…");
  const [tab, setTab] = useState<HomeTab>("library");
  const { click } = useSound();

  useEffect(() => {
    let cancelled = false;
  
    async function boot() {
      setPresetsReady(false);
      setPresetProgress(0);
  
      if (!auth.accessToken) {
        if (!cancelled) {
          setAuth({
            ...auth,
            bootstrapped: true,
            isAuthenticated: false,
            me: null,
          });
          setLoading(false);
        }
        return;
      }
  
      setLoading(true);
  
      try {
        const me = await Me();
        if (cancelled) return;
  
        setAuth({
          ...auth,
          isAuthenticated: true,
          me,
          bootstrapped: true,
        });
  
        setLoadingText("loading presets…");
        setPresetProgress(0);
        
        await Promise.all([
          ensurePresetAssetsInstalledOnce({
            onProgress: (p, info) => {
              if (cancelled) return;
              setPresetProgress(p);
        
              if (info?.name) {
                setLoadingText(`installing: ${info.name}`);
              } else if (info?.done != null && info?.total != null) {
                setLoadingText(`installing presets… (${info.done}/${info.total})`);
              } else {
                setLoadingText("installing presets…");
              }
            },
          }),
          preloadStaticHomeAssets(),
        ]);
        
        if (cancelled) return;
        
        setPresetProgress(1);
        setLoadingText("finalizing…");
        setPresetsReady(true);
      } catch (e) {
        console.error("Home boot failed", e);
        if (cancelled) return;
        clearAuth();
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
  
    boot();
  
    return () => {
      cancelled = true;
    };
  }, [auth.accessToken]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    (window as any).voxlAuth = {
      logout: () => {
        clearAuth();
        window.location.reload();
      },
      get: () => auth,
    };

    (window as any).voxlDb = {
      nuke: async () => {
        await nukeVoxelEditorDatabases();
        window.location.reload();
      },
    };

    return () => {
      try {
        delete (window as any).voxlAuth;
      } catch {}
      try {
        delete (window as any).voxlDb;
      } catch {}
    };
  }, [auth, clearAuth]);

  const showBootOverlay =
    loading || !auth.bootstrapped || (auth.isAuthenticated && !presetsReady);

  if (showBootOverlay) {
    return (
      <main
        style={{
          width: "100vw",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#368fe4",
          backgroundImage: "url('/world/bg.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      >
        <LoadingOverlay
          show={true}
          progress={auth.isAuthenticated ? presetProgress : 0}
          text={auth.isAuthenticated ? loadingText : "booting…"}
          fadeMs={120}
        />
      </main>
    );
  }

  if (!auth.isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#DBFAFF",
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
          zIndex: 0,
          transform: "scale(1.01)",
          transformOrigin: "center center",
        }}
      >
        <source src="/focus/screen.mp4" type="video/mp4" />
      </video>

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 52,
            zIndex: 90,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 20,
            right: 24,
            zIndex: 100,
            display: "flex",
            gap: 30,
            alignItems: "center",
            pointerEvents: "auto",
          }}
        >
          <label
            className="pix-icon"
            onClick={() => {
              click();
              setTab("games");
            }}
            style={{
              color: "#20293D",
              cursor: "pointer",
              opacity: tab === "games" ? 1 : 0.75,
              userSelect: "none",
              fontSize: 28,
              overflow: "visible",
            }}
          >
            Atlas
          </label>

          <label
            className="pix-icon"
            onClick={() => {
              click();
              setTab("library");
            }}
            style={{
              color: "#20293D",
              cursor: "pointer",
              opacity: tab === "library" ? 1 : 0.75,
              userSelect: "none",
              fontSize: 28,
              overflow: "visible",
            }}
          >
            Library
          </label>

          <label
            className="pix-icon"
            onClick={() => {
              click();
              setTab("marketplace");
            }}
            style={{
              color: "#20293D",
              cursor: "pointer",
              opacity: tab === "marketplace" ? 1 : 0.75,
              userSelect: "none",
              fontSize: 28,
              overflow: "visible",
            }}
          >
            Marketplace
          </label>
        </div>

        {tab === "marketplace" && <Marketplace />}
        {tab === "library" && <Library />}
        {tab === "games" && <Atlas />}
      </div>
    </main>
  );
}

export default function HomeClient() {
  return <HomeClientInner />;
}