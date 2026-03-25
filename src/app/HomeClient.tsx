"use client";

import { useEffect, useState } from "react";
import VoxelEditor from "@/components/VoxelEditor/VoxelEditor";
import { SoundProvider } from "@/components/VoxelEditor/audio/SoundProvider";
import LoginScreen from "@/components/Auth/LoginScreen";
import { useAuthState } from "@/components/Auth/state";
import { Me } from "@/services/auth";
import { nukeVoxelEditorDatabases } from "@/components/VoxelEditor/database/nukeEditorDatabases";

function HomeClientInner() {
  const { auth, setAuth, clearAuth } = useAuthState();
  const [loading, setLoading] = useState(true);

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

  //temp logout + db helpers for testing

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
    <main style={{ width: "100vw", height: "100vh" }}>
      <VoxelEditor />
    </main>
  );
}

export default function HomeClient() {
  return (
    <SoundProvider>
      <HomeClientInner />
    </SoundProvider>
  );
}