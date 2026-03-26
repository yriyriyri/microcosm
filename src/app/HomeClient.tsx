"use client";

import { useEffect, useState } from "react";
import LoginScreen from "@/components/Auth/LoginScreen";
import { useAuthState } from "@/components/Auth/state";
import { Me } from "@/services/auth";
import { nukeVoxelEditorDatabases } from "@/components/VoxelEditor/database/nukeEditorDatabases";
import { useSound } from "@/components/VoxelEditor/audio/SoundProvider";
import Games from "@/components/Home/Games/Games";
import Library from "@/components/Home/Library/Library";
import Marketplace from "@/components/Home/Marketplace/Marketplace";

type HomeTab = "marketplace" | "library" | "games";

function HomeClientInner() {
  const { auth, setAuth, clearAuth } = useAuthState();
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<HomeTab>("library");
  const { click } = useSound();

  useEffect(() => {
    let cancelled = false;

    async function boot() {
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

      try {
        const me = await Me();
        if (cancelled) return;

        setAuth({
          ...auth,
          isAuthenticated: true,
          me,
          bootstrapped: true,
        });
      } catch {
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
  }, []);

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

  if (loading || !auth.bootstrapped) {
    return (
      <main
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "#368fe4",
          backgroundImage: "url('/world/bg.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      />
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
        backgroundColor: "#368fe4",
        backgroundImage: "url('/world/bg.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
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
          gap: 20,
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
            color: "#DBFAFF",
            cursor: "pointer",
            opacity: tab === "games" ? 1 : 0.75,
            userSelect: "none",
            fontSize: 25,
            overflow: "visible",
          }}
        >
          Games
        </label>

        <label
          className="pix-icon"
          onClick={() => {
            click();
            setTab("marketplace");
          }}
          style={{
            color: "#DBFAFF",
            cursor: "pointer",
            opacity: tab === "marketplace" ? 1 : 0.75,
            userSelect: "none",
            fontSize: 25,
            overflow: "visible",
          }}
        >
          Marketplace
        </label>

        <label
          className="pix-icon"
          onClick={() => {
            click();
            setTab("library");
          }}
          style={{
            color: "#DBFAFF",
            cursor: "pointer",
            opacity: tab === "library" ? 1 : 0.75,
            userSelect: "none",
            fontSize: 25,
            overflow: "visible",
          }}
        >
          Library
        </label>
      </div>

      {tab === "marketplace" && <Marketplace />}
      {tab === "library" && <Library />}
      {tab === "games" && <Games />}
    </main>
  );
}

export default function HomeClient() {
  return <HomeClientInner />;
}