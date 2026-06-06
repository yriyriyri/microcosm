"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = __importDefault(require("node:http"));
const auth_js_1 = require("./auth.js");
const env_js_1 = require("./env.js");
const store_js_1 = require("./store.js");
function withCors(headers) {
    headers.set("access-control-allow-origin", env_js_1.VOXL_WEB_ORIGIN);
    headers.set("access-control-allow-methods", "GET,POST,PUT,DELETE,OPTIONS");
    headers.set("access-control-allow-headers", "authorization,content-type");
    return headers;
}
function json(status, payload) {
    return new Response(JSON.stringify(payload), {
        status,
        headers: withCors(new Headers({ "content-type": "application/json" })),
    });
}
async function parseBody(req) {
    const text = await req.text();
    if (!text.trim()) {
        throw json(400, { ok: false, error: "missing request body" });
    }
    try {
        return JSON.parse(text);
    }
    catch {
        throw json(400, { ok: false, error: "invalid json" });
    }
}
function notFound() {
    return json(404, { ok: false, error: "not found" });
}
async function handle(req) {
    if (req.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: withCors(new Headers()) });
    }
    const url = new URL(req.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";
    const segments = path.split("/").filter(Boolean);
    if (path === "/health") {
        return json(200, { ok: true, status: "ok" });
    }
    try {
        if (path === "/v1/published-assets" && req.method === "GET") {
            return json(200, { ok: true, assets: (0, store_js_1.listPublishedAssetDetails)() });
        }
        if (segments.length === 3 &&
            segments[0] === "v1" &&
            segments[1] === "published-assets" &&
            req.method === "GET") {
            const detail = (0, store_js_1.getPublishedAssetDetail)(segments[2]);
            return detail ? json(200, { ok: true, value: detail }) : notFound();
        }
        if (segments.length === 3 &&
            segments[0] === "v1" &&
            segments[1] === "asset-versions" &&
            req.method === "GET") {
            const version = (0, store_js_1.getAssetVersion)(segments[2]);
            return version ? json(200, { ok: true, value: version }) : notFound();
        }
        if (path === "/v1/published-worlds" && req.method === "GET") {
            return json(200, { ok: true, worlds: (0, store_js_1.listPublishedWorlds)() });
        }
        if (segments.length === 3 &&
            segments[0] === "v1" &&
            segments[1] === "published-worlds" &&
            req.method === "GET") {
            const world = (0, store_js_1.getPublishedWorld)(segments[2]);
            return world ? json(200, { ok: true, value: world }) : notFound();
        }
        if (segments[0] !== "v1" || segments[1] !== "me") {
            return notFound();
        }
        const user = await (0, auth_js_1.requireAuthenticatedUser)(req);
        if (path === "/v1/me/assets/manifest" &&
            req.method === "GET") {
            return json(200, {
                ok: true,
                items: (0, store_js_1.listOwnedAssetManifest)(user.userId),
            });
        }
        if (path === "/v1/me/assets" && req.method === "POST") {
            const body = await parseBody(req);
            return json(201, { ok: true, value: (0, store_js_1.createOwnedAsset)(user.userId, body) });
        }
        if (segments.length === 4 &&
            segments[2] === "assets" &&
            req.method === "GET") {
            const asset = (0, store_js_1.getOwnedAssetHead)(user.userId, segments[3]);
            return asset ? json(200, { ok: true, value: asset }) : notFound();
        }
        if (segments.length === 4 &&
            segments[2] === "assets" &&
            req.method === "PUT") {
            const body = await parseBody(req);
            const result = (0, store_js_1.updateOwnedAsset)(user.userId, segments[3], body);
            if (!result)
                return notFound();
            if (!result.ok) {
                return json(409, {
                    ok: false,
                    error: "conflict",
                    current: result.current,
                });
            }
            return json(200, { ok: true, value: result.value });
        }
        if (segments.length === 4 &&
            segments[2] === "assets" &&
            req.method === "DELETE") {
            const deleted = (0, store_js_1.deleteOwnedAsset)(user.userId, segments[3]);
            return deleted ? json(200, { ok: true }) : notFound();
        }
        if (segments.length === 5 &&
            segments[2] === "assets" &&
            segments[4] === "publish" &&
            req.method === "POST") {
            const detail = (0, store_js_1.publishOwnedAsset)(user.userId, segments[3]);
            return detail ? json(200, { ok: true, value: detail }) : notFound();
        }
        if (path === "/v1/me/worlds/manifest" &&
            req.method === "GET") {
            return json(200, {
                ok: true,
                items: (0, store_js_1.listOwnedWorldManifest)(user.userId),
            });
        }
        if (path === "/v1/me/worlds" && req.method === "POST") {
            const body = await parseBody(req);
            return json(201, { ok: true, value: (0, store_js_1.createOwnedWorld)(user.userId, body) });
        }
        if (segments.length === 4 &&
            segments[2] === "worlds" &&
            req.method === "GET") {
            const world = (0, store_js_1.getOwnedWorld)(user.userId, segments[3]);
            return world ? json(200, { ok: true, value: world }) : notFound();
        }
        if (segments.length === 4 &&
            segments[2] === "worlds" &&
            req.method === "PUT") {
            const body = await parseBody(req);
            const result = (0, store_js_1.updateOwnedWorld)(user.userId, segments[3], body);
            if (!result)
                return notFound();
            if (!result.ok) {
                return json(409, {
                    ok: false,
                    error: "conflict",
                    current: result.current,
                });
            }
            return json(200, { ok: true, value: result.value });
        }
        if (segments.length === 4 &&
            segments[2] === "worlds" &&
            req.method === "DELETE") {
            const deleted = (0, store_js_1.deleteOwnedWorld)(user.userId, segments[3]);
            return deleted ? json(200, { ok: true }) : notFound();
        }
        if (segments.length === 5 &&
            segments[2] === "worlds" &&
            segments[4] === "publish" &&
            req.method === "POST") {
            const published = (0, store_js_1.publishOwnedWorld)(user.userId, segments[3]);
            return published ? json(200, { ok: true, value: published }) : notFound();
        }
        return notFound();
    }
    catch (error) {
        if (error instanceof Response)
            return error;
        console.error("API request failed", error);
        return json(500, { ok: false, error: "internal server error" });
    }
}
const seededPresets = (0, store_js_1.seedPresetMarketplaceAssets)();
console.info(`[api] Preset marketplace seed complete (${seededPresets.presetCount} presets)`);
const server = node_http_1.default.createServer(async (req, res) => {
    const origin = `http://${req.headers.host ?? `127.0.0.1:${env_js_1.VOXL_API_PORT}`}`;
    const request = new Request(new URL(req.url ?? "/", origin), {
        method: req.method,
        headers: req.headers,
        body: req.method === "GET" || req.method === "HEAD"
            ? undefined
            : req,
        duplex: req.method === "GET" || req.method === "HEAD" ? undefined : "half",
    });
    const response = await handle(request);
    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
        res.setHeader(key, value);
    });
    if (!response.body) {
        res.end();
        return;
    }
    const body = Buffer.from(await response.arrayBuffer());
    res.end(body);
});
server.listen(env_js_1.VOXL_API_PORT, "127.0.0.1", () => {
    console.log(`Microcosm API listening on http://127.0.0.1:${env_js_1.VOXL_API_PORT}`);
});
