"use client";

export default function Marketplace() {
  return (
    <div
      style={{
        position: "absolute",
        top: 52,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 20,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        pointerEvents: "auto",
        paddingTop: 20,
      }}
    >
      <div
        className="pix-logo"
        style={{
          fontSize: 32,
          color: "#DBFAFF",
        }}
      >
        Marketplace Placeholder
      </div>
    </div>
  );
}