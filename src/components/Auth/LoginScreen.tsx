"use client";

import React, { FormEvent, useRef, useState } from "react";
import { Login, Me } from "@/services/auth";
import { useAuthState } from "./state";

export default function LoginScreen() {
  const { auth, setAuth } = useAuthState();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputUsernameRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);

  const handleUsernameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      inputPasswordRef.current?.focus();
    }
  };

  const handlePasswordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await Login(username.trim(), password);

      if (response.status === 200) {
        const accessToken = response.data?.access_token ?? "";

        const provisionalAuth = {
          ...auth,
          isAuthenticated: true,
          accessToken,
          me: null,
          bootstrapped: true,
        };

        setAuth(provisionalAuth);

        try {
          const me = await Me(accessToken);
          setAuth({
            ...provisionalAuth,
            me,
          });
        } catch {
          setAuth(provisionalAuth);
        }
      } else {
        setErrorMessage("login failed");
      }
    } catch (err: any) {
      if (err?.response?.status === 401) {
        setErrorMessage("invalid username or password");
      } else {
        setErrorMessage("unknown error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('/world/bg.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        padding: 24,
      }}
    >

      <style>{`
        @keyframes loginLogoBob {
          0%   { transform: translate3d(0, 0px, 0); }
          25%  { transform: translate3d(0, -1.5px, 0); }
          50%  { transform: translate3d(0, 0px, 0); }
          75%  { transform: translate3d(0, 1.5px, 0); }
          100% { transform: translate3d(0, 0px, 0); }
        }

        .voxl-login-input::placeholder {
          color: rgba(0, 50, 76, 0.55);
        }
      `}</style>

      <div
        style={{
          width: "100%",
          maxWidth: 480,
          display: "flex",
          justifyContent: "center",
          color: "#DBFAFF",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            ["--form-width" as any]: "280px",
            ["--track" as any]: "0.06em",
          }}
        >
          <div
            aria-label="VOXL logo"
            style={{
              display: "block",
              width: 400,
              maxWidth: "85vw",
              height: "auto",
              margin: "0 auto 50px",
              animation: "loginLogoBob 2.1s linear infinite",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 117 30"
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                fill: "#DBFAFF",
                shapeRendering: "crispEdges",
              }}
            >
              <g shapeRendering="crispEdges">
                <polygon points="84 5 85 5 85 8 84 8 84 10 83 10 83 11 82 11 82 12 81 12 81 13 80 13 80 14 79 14 79 16 80 16 80 17 81 17 81 18 82 18 82 19 83 19 83 20 84 20 84 22 85 22 85 25 84 25 84 26 83 26 83 27 79 27 79 26 77 26 77 25 75 25 75 24 74 24 74 23 72 23 72 22 71 22 71 23 69 23 69 24 68 24 68 25 66 25 66 26 64 26 64 27 60 27 60 26 59 26 59 25 58 25 58 22 59 22 59 20 60 20 60 19 61 19 61 18 62 18 62 17 63 17 63 16 64 16 64 14 63 14 63 13 62 13 62 12 61 12 61 11 60 11 60 10 59 10 59 8 58 8 58 5 59 5 59 4 60 4 60 3 64 3 64 4 66 4 66 5 68 5 68 6 69 6 69 7 71 7 71 8 72 8 72 7 74 7 74 6 75 6 75 5 77 5 77 4 79 4 79 3 83 3 83 4 84 4 84 5" />
                <polygon points="115 19 115 24 114 24 114 25 113 25 113 26 111 26 111 27 90 27 90 26 89 26 89 25 88 25 88 5 89 5 89 4 90 4 90 3 97 3 97 4 98 4 98 5 99 5 99 16 111 16 111 17 113 17 113 18 114 18 114 19 115 19" />
                <polygon points="26 5 27 5 27 9 26 9 26 11 25 11 25 13 24 13 24 15 23 15 23 17 22 17 22 19 21 19 21 21 20 21 20 23 19 23 19 25 18 25 18 26 17 26 17 27 12 27 12 26 11 26 11 25 10 25 10 23 9 23 9 21 8 21 8 19 7 19 7 17 6 17 6 15 5 15 5 13 4 13 4 11 3 11 3 9 2 9 2 5 3 5 3 4 4 4 4 3 9 3 9 4 10 4 10 5 11 5 11 6 13 6 13 7 16 7 16 6 18 6 18 5 19 5 19 4 20 4 20 3 25 3 25 4 26 4 26 5" />
                <polygon points="55 5 56 5 56 25 55 25 55 26 54 26 54 27 31 27 31 26 30 26 30 25 29 25 29 5 30 5 30 4 31 4 31 3 54 3 54 4 55 4 55 5" />
              </g>
            </svg>
          </div>

          <form
            onSubmit={handleSubmit}
            autoComplete="on"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              width: "100%",
              color: "#DBFAFF",
              fontFamily: "var(--font-eagle), monospace",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                width: "var(--form-width)",
                margin: "6px auto 0",
              }}
            >
              <input
                ref={inputUsernameRef}
                type="text"
                name="username"
                autoComplete="username"
                placeholder="username"
                className="voxl-login-input pix-input"
                value={username}
                maxLength={24}
                disabled={isSubmitting}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleUsernameKeyDown}
                style={{
                  background: "rgb(225, 249, 254)",
                  boxShadow: "0 0 2px 2px #DBFAFF, 0 0 0 1px #DBFAFF",
                  border: "none",
                  borderRadius: 0,
                  color: "#00324c",
                  fontSize: "1rem",
                  outline: "none",
                  caretColor: "#00324c",
                  fontFamily: "var(--font-eagle), monospace",
                  flex: 1,
                  minWidth: 0,
                  textAlign: "left",
                  padding: "6px 8px",
                  letterSpacing: "0.06em",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                width: "var(--form-width)",
                margin: "6px auto 0",
              }}
            >
              <input
                ref={inputPasswordRef}
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="password"
                className="voxl-login-input pix-input"
                value={password}
                disabled={isSubmitting}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handlePasswordKeyDown}
                style={{
                  background: "rgb(225, 249, 254)",
                  boxShadow: "0 0 2px 2px #DBFAFF, 0 0 0 1px #DBFAFF",
                  border: "none",
                  borderRadius: 0,
                  color: "#00324c",
                  fontSize: "1rem",
                  outline: "none",
                  caretColor: "#00324c",
                  fontFamily: "var(--font-eagle), monospace",
                  flex: 1,
                  minWidth: 0,
                  textAlign: "left",
                  padding: "6px 8px",
                  letterSpacing: "0.06em",
                }}
              />
            </div>

            <div
              style={{
                minHeight: 20,
                color: "#DBFAFF",
                fontSize: "0.8em",
                width: "var(--form-width)",
                marginTop: 6,
                textAlign: "center",
              }}
            >
              {errorMessage}
            </div>

            <div
              style={{
                width: "var(--form-width)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                marginTop: 10,
                alignItems: "center",
              }}
            >
              <button
                type="submit"
                className="pix-icon"
                disabled={isSubmitting}
                style={{
                  appearance: "none",
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  fontFamily: "var(--font-eagle), monospace",
                  fontSize: "1.25rem",
                  lineHeight: 1,
                  color: "#DBFAFF",
                  letterSpacing: "0.06em",
                  opacity: isSubmitting ? 0.6 : 1,
                  cursor: isSubmitting ? "default" : "pointer",
                }}
              >
                {isSubmitting ? "logging in..." : "Lets Go !"}
              </button>

              <button
                type="button"
                className="pix-icon"
                style={{
                  appearance: "none",
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  fontFamily: "var(--font-eagle), monospace",
                  fontSize: "1rem",
                  lineHeight: 1,
                  color: "#DBFAFF",
                  letterSpacing: "0.06em",
                  opacity: 0.6,
                  cursor: "pointer",
                }}
              >
                sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}