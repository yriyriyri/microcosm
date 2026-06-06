export const VOXL_AUTH_API_URL =
  process.env.NEXT_PUBLIC_VOXL_AUTH_API_URL || "https://api.voxldev.world";

export const VOXL_API_URL =
  process.env.NEXT_PUBLIC_VOXL_API_URL ||
  process.env.NEXT_PUBLIC_VOXL_MINI_API_URL ||
  "http://127.0.0.1:4001";
