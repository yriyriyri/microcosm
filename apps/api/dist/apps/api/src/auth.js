"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuthenticatedUser = requireAuthenticatedUser;
const env_js_1 = require("./env.js");
async function requireAuthenticatedUser(req) {
    const authHeader = req.headers.get("authorization") ?? "";
    const match = authHeader.match(/^Bearer\s+(.+)$/i);
    if (!match) {
        throw new Response(JSON.stringify({ ok: false, error: "missing bearer token" }), {
            status: 401,
            headers: { "content-type": "application/json" },
        });
    }
    const accessToken = match[1];
    const res = await fetch(`${env_js_1.VOXL_AUTH_API_URL}/auth/me`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    if (!res.ok) {
        throw new Response(JSON.stringify({ ok: false, error: "unauthorized" }), {
            status: 401,
            headers: { "content-type": "application/json" },
        });
    }
    const payload = (await res.json());
    if (!payload.user_id) {
        throw new Response(JSON.stringify({ ok: false, error: "unauthorized" }), {
            status: 401,
            headers: { "content-type": "application/json" },
        });
    }
    return {
        userId: payload.user_id,
        username: payload.username ?? "",
        accessToken,
    };
}
