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
          <img
            src="/login/logo.png"
            alt="logo"
            draggable={false}
            style={{
              display: "block",
              width: 320,
              maxWidth: "85vw",
              height: "auto",
              imageRendering: "pixelated",
              margin: "0 auto 70px",
            }}
          />

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
                  color: "#082C45",
                  fontSize: "1rem",
                  outline: "none",
                  caretColor: "#082C45",
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
                value={password}
                disabled={isSubmitting}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handlePasswordKeyDown}
                style={{
                  background: "rgb(225, 249, 254)",
                  boxShadow: "0 0 2px 2px #DBFAFF, 0 0 0 1px #DBFAFF",
                  border: "none",
                  borderRadius: 0,
                  color: "#082C45",
                  fontSize: "1rem",
                  outline: "none",
                  caretColor: "#082C45",
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
                marginTop: 20,
                alignItems: "center",
              }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  all: "unset",
                  appearance: "none",
                  cursor: isSubmitting ? "default" : "pointer",
                  display: "inline-block",
                  fontFamily: "var(--font-eagle), monospace",
                  fontSize: "1.25rem",
                  lineHeight: 1,
                  color: "#DBFAFF",
                  letterSpacing: "0.06em",
                  opacity: isSubmitting ? 0.6 : 1,
                }}
              >
                {isSubmitting ? "logging in..." : "Lets Go !"}
              </button>

              <button
                type="button"
                style={{
                  all: "unset",
                  appearance: "none",
                  cursor: "default",
                  display: "inline-block",
                  fontFamily: "var(--font-eagle), monospace",
                  fontSize: "1rem",
                  lineHeight: 1,
                  color: "#DBFAFF",
                  letterSpacing: "0.06em",
                  opacity: 0.6,
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