module.exports = [
"[project]/apps/web/src/components/VoxelEditor/ui/LoadingOverlay.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LoadingOverlay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function LoadingOverlay(props) {
    const { show, progress, text, fadeMs = 120, className, style } = props;
    const pct = Math.round(Math.max(0, Math.min(1, progress)) * 100);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(show);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (show) {
            setMounted(true);
            return;
        }
        const t = window.setTimeout(()=>setMounted(false), fadeMs);
        return ()=>window.clearTimeout(t);
    }, [
        show,
        fadeMs
    ]);
    if (!mounted) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className,
        style: {
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#368fe4",
            backgroundImage: "url(/world/bg.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            pointerEvents: "none",
            opacity: show ? 1 : 0,
            transition: `opacity ${fadeMs}ms linear`,
            ...style
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: 560,
                maxWidth: "85vw",
                color: "#C7ECFF"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        height: 15,
                        width: "100%",
                        background: "rgba(199,236,255,0.18)",
                        overflow: "hidden"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            height: "100%",
                            width: `${pct}%`,
                            background: "#C7ECFF",
                            transition: "width 120ms ease-out"
                        }
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/VoxelEditor/ui/LoadingOverlay.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/VoxelEditor/ui/LoadingOverlay.tsx",
                    lineNumber: 59,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: 10,
                        fontSize: 16,
                        letterSpacing: "0.08em",
                        opacity: 0.9,
                        whiteSpace: "nowrap",
                        textAlign: "left"
                    },
                    children: (text ?? "loading…") + " - " + pct + "%"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/VoxelEditor/ui/LoadingOverlay.tsx",
                    lineNumber: 77,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/VoxelEditor/ui/LoadingOverlay.tsx",
            lineNumber: 52,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/VoxelEditor/ui/LoadingOverlay.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/apps/web/src/services/env.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VOXL_API_URL",
    ()=>VOXL_API_URL,
    "VOXL_AUTH_API_URL",
    ()=>VOXL_AUTH_API_URL
]);
const VOXL_AUTH_API_URL = process.env.NEXT_PUBLIC_VOXL_AUTH_API_URL || "https://api.voxldev.world";
const VOXL_API_URL = process.env.NEXT_PUBLIC_VOXL_API_URL || process.env.NEXT_PUBLIC_VOXL_MINI_API_URL || "http://127.0.0.1:4001";
}),
"[project]/apps/web/src/services/voxlMiniClient.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "voxlMiniClient",
    ()=>voxlMiniClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Auth$2f$state$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/Auth/state.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$env$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/env.ts [app-ssr] (ecmascript)");
;
;
;
const voxlMiniClient = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$env$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VOXL_API_URL"] || ""
});
voxlMiniClient.interceptors.request.use((config)=>{
    const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Auth$2f$state$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStoredAuthentication"])();
    if (auth.isAuthenticated && auth.accessToken) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }
    return config;
}, (error)=>Promise.reject(error));
voxlMiniClient.interceptors.response.use((response)=>response, (error)=>{
    if (("TURBOPACK compile-time value", "undefined") !== "undefined" && error.response?.status === 401) //TURBOPACK unreachable
    ;
    return Promise.reject(error);
});
}),
"[project]/apps/web/src/services/versionedWorlds.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createOwnedWorld",
    ()=>createOwnedWorld,
    "deleteOwnedWorld",
    ()=>deleteOwnedWorld,
    "getOwnedWorld",
    ()=>getOwnedWorld,
    "getPublishedWorldSnapshot",
    ()=>getPublishedWorldSnapshot,
    "listOwnedWorldManifest",
    ()=>listOwnedWorldManifest,
    "listPublishedWorldSnapshots",
    ()=>listPublishedWorldSnapshots,
    "publishOwnedWorld",
    ()=>publishOwnedWorld,
    "updateOwnedWorld",
    ()=>updateOwnedWorld
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$voxlMiniClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/voxlMiniClient.ts [app-ssr] (ecmascript)");
;
async function listOwnedWorldManifest() {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$voxlMiniClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["voxlMiniClient"].get("/v1/me/worlds/manifest");
    return Array.isArray(res.data?.items) ? res.data.items : [];
}
async function getOwnedWorld(worldId) {
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$voxlMiniClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["voxlMiniClient"].get(`/v1/me/worlds/${worldId}`);
        return res.data?.value ?? null;
    } catch (error) {
        if (error?.response?.status === 404) return null;
        throw error;
    }
}
async function createOwnedWorld(input) {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$voxlMiniClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["voxlMiniClient"].post("/v1/me/worlds", input);
    return res.data.value;
}
async function updateOwnedWorld(worldId, input) {
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$voxlMiniClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["voxlMiniClient"].put(`/v1/me/worlds/${worldId}`, input);
        return {
            ok: true,
            value: res.data.value
        };
    } catch (error) {
        if (error?.response?.status === 409 && error.response.data?.current) {
            return {
                ok: false,
                current: error.response.data.current
            };
        }
        throw error;
    }
}
async function deleteOwnedWorld(worldId) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$voxlMiniClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["voxlMiniClient"].delete(`/v1/me/worlds/${worldId}`);
    } catch (error) {
        if (error?.response?.status === 404) return;
        throw error;
    }
}
async function publishOwnedWorld(worldId) {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$voxlMiniClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["voxlMiniClient"].post(`/v1/me/worlds/${worldId}/publish`);
    return res.data.value;
}
async function listPublishedWorldSnapshots() {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$voxlMiniClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["voxlMiniClient"].get("/v1/published-worlds");
    return Array.isArray(res.data?.worlds) ? res.data.worlds : [];
}
async function getPublishedWorldSnapshot(publishedWorldId) {
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$voxlMiniClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["voxlMiniClient"].get(`/v1/published-worlds/${publishedWorldId}`);
        return res.data?.value ?? null;
    } catch (error) {
        if (error?.response?.status === 404) return null;
        throw error;
    }
}
}),
"[project]/apps/web/src/services/publishedWorlds.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPublishedWorld",
    ()=>getPublishedWorld,
    "getPublishedWorldGroupAssetReference",
    ()=>getPublishedWorldGroupAssetReference,
    "listPublishedWorlds",
    ()=>listPublishedWorlds,
    "publishWorld",
    ()=>publishWorld
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedWorlds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/versionedWorlds.ts [app-ssr] (ecmascript)");
;
function getPublishedWorldGroupAssetReference(group) {
    const listingId = group.listingId ?? group.latestMarketplaceAssetId ?? null;
    if (typeof listingId === "string" && listingId.trim()) {
        return {
            key: `listing:${listingId}`,
            kind: "listing",
            id: listingId
        };
    }
    const assetVersionId = group.assetVersionId ?? group.renderAssetId ?? null;
    if (typeof assetVersionId === "string" && assetVersionId.trim()) {
        return {
            key: `version:${assetVersionId}`,
            kind: "version",
            id: assetVersionId
        };
    }
    return null;
}
function snapshotToLegacyDocument(snapshot) {
    const latestMarketplaceAssetIds = Array.from(new Set(snapshot.groups.map((group)=>group.listingId ?? null).filter((value)=>typeof value === "string" && !!value)));
    return {
        publishedWorldId: snapshot.publishedWorldId,
        publisherUserId: snapshot.ownerAccountId,
        worldName: snapshot.worldName,
        voxelCount: snapshot.voxelCount,
        latestMarketplaceAssetIds,
        groups: snapshot.groups.map((group)=>({
                groupId: group.groupId,
                renderAssetId: group.assetVersionId,
                assetVersionId: group.assetVersionId,
                sourceAssetHeadId: group.sourceAssetHeadId,
                listingId: group.listingId ?? null,
                latestMarketplaceAssetId: group.listingId ?? null,
                assetKind: group.listingId ? "marketplace" : "draft",
                logicTag: group.logicTag ?? null,
                position: group.position,
                rotation: group.rotation,
                bounds: group.bounds,
                voxelCount: group.voxelCount,
                surfaces: group.surfaces
            })),
        createdAt: snapshot.createdAt,
        updatedAt: snapshot.createdAt
    };
}
async function publishWorld(worldId) {
    const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedWorlds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publishOwnedWorld"])(worldId);
    return snapshotToLegacyDocument(snapshot);
}
async function listPublishedWorlds() {
    const snapshots = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedWorlds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["listPublishedWorldSnapshots"])();
    return {
        ok: true,
        worlds: snapshots.map(snapshotToLegacyDocument)
    };
}
async function getPublishedWorld(publishedWorldId) {
    const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedWorlds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPublishedWorldSnapshot"])(publishedWorldId);
    return snapshot ? snapshotToLegacyDocument(snapshot) : null;
}
}),
"[project]/apps/web/src/materials/heightMist.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyHeightMistToStandardMaterial",
    ()=>applyHeightMistToStandardMaterial
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
;
function applyHeightMistToStandardMaterial(material, { yBottom = -10, yTop = 5, maxOpacity = 0.3, color = 0xffffff } = {}) {
    const mistColor = color instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"] ? color : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"](color);
    const mistUniforms = {
        uMistYBottom: {
            value: yBottom
        },
        uMistYTop: {
            value: yTop
        },
        uMistMaxOpacity: {
            value: maxOpacity
        },
        uMistColor: {
            value: mistColor
        }
    };
    if (material.userData.__heightMistPatched) return;
    material.userData.__heightMistPatched = true;
    material.onBeforeCompile = (shader)=>{
        Object.assign(shader.uniforms, mistUniforms);
        shader.vertexShader = shader.vertexShader.replace(`#include <common>`, `#include <common>
         varying vec3 vHeightMistWorldPosition;`).replace(`#include <worldpos_vertex>`, `#include <worldpos_vertex>
         vHeightMistWorldPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;`);
        shader.fragmentShader = shader.fragmentShader.replace(`#include <common>`, `#include <common>
         varying vec3 vHeightMistWorldPosition;
         uniform float uMistYBottom;
         uniform float uMistYTop;
         uniform float uMistMaxOpacity;
         uniform vec3 uMistColor;`).replace(`#include <dithering_fragment>`, `
         float mistT = clamp(
           1.0 - smoothstep(uMistYBottom, uMistYTop, vHeightMistWorldPosition.y),
           0.0,
           1.0
         );
         float mistAlpha = mistT * uMistMaxOpacity;
         gl_FragColor.rgb = mix(gl_FragColor.rgb, uMistColor, mistAlpha);
         #include <dithering_fragment>
        `);
    };
    material.needsUpdate = true;
}
}),
"[project]/apps/web/src/components/VoxelEditor/Types.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

//internal data structure ,, metadata referenced in voxelWorld
__turbopack_context__.s([
    "add",
    ()=>add,
    "isSame",
    ()=>isSame,
    "keyOf",
    ()=>keyOf
]);
function keyOf(c) {
    return `${c.x},${c.y},${c.z}`;
}
function add(a, b) {
    return {
        x: a.x + b.x,
        y: a.y + b.y,
        z: a.z + b.z
    };
}
function isSame(a, b) {
    return a.x === b.x && a.y === b.y && a.z === b.z;
}
}),
"[project]/packages/voxel-core/src/voxelTypes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "add",
    ()=>add,
    "isSame",
    ()=>isSame,
    "keyOf",
    ()=>keyOf
]);
function keyOf(coord) {
    return `${coord.x},${coord.y},${coord.z}`;
}
function add(a, b) {
    return {
        x: a.x + b.x,
        y: a.y + b.y,
        z: a.z + b.z
    };
}
function isSame(a, b) {
    return a.x === b.x && a.y === b.y && a.z === b.z;
}
}),
"[project]/packages/voxel-core/src/groupTypes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/packages/voxel-core/src/compiledAssetTypes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ASSET_COMPILED_RENDER_VERSION",
    ()=>ASSET_COMPILED_RENDER_VERSION
]);
const ASSET_COMPILED_RENDER_VERSION = 1;
}),
"[project]/packages/voxel-core/src/buildAssetCompiledRender.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildAssetCompiledRender",
    ()=>buildAssetCompiledRender
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$voxel$2d$core$2f$src$2f$compiledAssetTypes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/voxel-core/src/compiledAssetTypes.ts [app-ssr] (ecmascript)");
;
function keyOfLocal(coord) {
    return `${coord.x},${coord.y},${coord.z}`;
}
function computeBounds(voxels) {
    if (!voxels.length) return null;
    let minX = Infinity;
    let minY = Infinity;
    let minZ = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    let maxZ = -Infinity;
    for (const voxel of voxels){
        minX = Math.min(minX, voxel.local.x);
        minY = Math.min(minY, voxel.local.y);
        minZ = Math.min(minZ, voxel.local.z);
        maxX = Math.max(maxX, voxel.local.x);
        maxY = Math.max(maxY, voxel.local.y);
        maxZ = Math.max(maxZ, voxel.local.z);
    }
    return {
        min: {
            x: minX,
            y: minY,
            z: minZ
        },
        max: {
            x: maxX,
            y: maxY,
            z: maxZ
        }
    };
}
function buildAssetCompiledRender(group) {
    const voxels = group.voxels ?? [];
    const occupied = new Set(voxels.map((voxel)=>keyOfLocal(voxel.local)));
    const buckets = new Map();
    const getBucket = (color, isBlueprint)=>{
        const key = `${color}|${isBlueprint ? "bp" : "solid"}`;
        let bucket = buckets.get(key);
        if (!bucket) {
            bucket = {
                color,
                isBlueprint,
                positions: [],
                normals: [],
                indices: [],
                vertexCount: 0,
                triangleCount: 0
            };
            buckets.set(key, bucket);
        }
        return bucket;
    };
    const hasLocalVoxel = (x, y, z)=>occupied.has(keyOfLocal({
            x,
            y,
            z
        }));
    const pushFace = (bucket, verts, normal)=>{
        const base = bucket.vertexCount;
        for (const [x, y, z] of verts){
            bucket.positions.push(x, y, z);
            bucket.normals.push(normal[0], normal[1], normal[2]);
        }
        bucket.indices.push(base + 0, base + 1, base + 2, base + 0, base + 2, base + 3);
        bucket.vertexCount += 4;
        bucket.triangleCount += 2;
    };
    for (const voxel of voxels){
        const { x, y, z } = voxel.local;
        const bucket = getBucket(voxel.color, voxel.isBlueprint);
        if (!hasLocalVoxel(x + 1, y, z)) {
            pushFace(bucket, [
                [
                    x + 1,
                    y,
                    z
                ],
                [
                    x + 1,
                    y + 1,
                    z
                ],
                [
                    x + 1,
                    y + 1,
                    z + 1
                ],
                [
                    x + 1,
                    y,
                    z + 1
                ]
            ], [
                1,
                0,
                0
            ]);
        }
        if (!hasLocalVoxel(x - 1, y, z)) {
            pushFace(bucket, [
                [
                    x,
                    y,
                    z + 1
                ],
                [
                    x,
                    y + 1,
                    z + 1
                ],
                [
                    x,
                    y + 1,
                    z
                ],
                [
                    x,
                    y,
                    z
                ]
            ], [
                -1,
                0,
                0
            ]);
        }
        if (!hasLocalVoxel(x, y + 1, z)) {
            pushFace(bucket, [
                [
                    x,
                    y + 1,
                    z
                ],
                [
                    x,
                    y + 1,
                    z + 1
                ],
                [
                    x + 1,
                    y + 1,
                    z + 1
                ],
                [
                    x + 1,
                    y + 1,
                    z
                ]
            ], [
                0,
                1,
                0
            ]);
        }
        if (!hasLocalVoxel(x, y - 1, z)) {
            pushFace(bucket, [
                [
                    x,
                    y,
                    z + 1
                ],
                [
                    x,
                    y,
                    z
                ],
                [
                    x + 1,
                    y,
                    z
                ],
                [
                    x + 1,
                    y,
                    z + 1
                ]
            ], [
                0,
                -1,
                0
            ]);
        }
        if (!hasLocalVoxel(x, y, z + 1)) {
            pushFace(bucket, [
                [
                    x + 1,
                    y,
                    z + 1
                ],
                [
                    x + 1,
                    y + 1,
                    z + 1
                ],
                [
                    x,
                    y + 1,
                    z + 1
                ],
                [
                    x,
                    y,
                    z + 1
                ]
            ], [
                0,
                0,
                1
            ]);
        }
        if (!hasLocalVoxel(x, y, z - 1)) {
            pushFace(bucket, [
                [
                    x,
                    y,
                    z
                ],
                [
                    x,
                    y + 1,
                    z
                ],
                [
                    x + 1,
                    y + 1,
                    z
                ],
                [
                    x + 1,
                    y,
                    z
                ]
            ], [
                0,
                0,
                -1
            ]);
        }
    }
    return {
        version: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$voxel$2d$core$2f$src$2f$compiledAssetTypes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ASSET_COMPILED_RENDER_VERSION"],
        bounds: computeBounds(voxels),
        voxelCount: voxels.length,
        surfaces: Array.from(buckets.values()).filter((surface)=>surface.vertexCount > 0 && surface.indices.length > 0)
    };
}
}),
"[project]/packages/voxel-core/src/versionedContracts.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/packages/voxel-core/src/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$voxel$2d$core$2f$src$2f$voxelTypes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/voxel-core/src/voxelTypes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$voxel$2d$core$2f$src$2f$groupTypes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/voxel-core/src/groupTypes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$voxel$2d$core$2f$src$2f$compiledAssetTypes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/voxel-core/src/compiledAssetTypes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$voxel$2d$core$2f$src$2f$buildAssetCompiledRender$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/voxel-core/src/buildAssetCompiledRender.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$voxel$2d$core$2f$src$2f$versionedContracts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/voxel-core/src/versionedContracts.ts [app-ssr] (ecmascript)");
;
;
;
;
;
}),
"[project]/apps/web/src/components/VoxelEditor/domain/buildAssetCompiledRender.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$voxel$2d$core$2f$src$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/voxel-core/src/index.ts [app-ssr] (ecmascript) <locals>");
;
}),
"[project]/apps/web/src/components/VoxelEditor/domain/cloudMappers.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assetRecordToDraftAssetDocument",
    ()=>assetRecordToDraftAssetDocument,
    "assetRecordToMarketplaceAssetDocument",
    ()=>assetRecordToMarketplaceAssetDocument,
    "draftAssetDocumentToSaveAssetInput",
    ()=>draftAssetDocumentToSaveAssetInput,
    "marketplaceAssetDocumentToSaveAssetInput",
    ()=>marketplaceAssetDocumentToSaveAssetInput,
    "worldDocumentToSaveWorldInput",
    ()=>worldDocumentToSaveWorldInput,
    "worldRecordToWorldDocument",
    ()=>worldRecordToWorldDocument
]);
function inferDraftKind(meta) {
    return meta.inLibrary === false ? "override" : "normal";
}
function assetRecordToDraftAssetDocument(asset, ownerAccountId = null) {
    const meta = asset.meta;
    return {
        assetId: meta.id,
        ownerAccountId,
        name: meta.name,
        voxelGroup: asset.group,
        compiledRender: asset.compiledRender,
        createdAt: meta.createdAt,
        updatedAt: meta.updatedAt,
        thumbStorageKey: meta.thumbStorageKey ?? null,
        sourceAssetId: meta.sourceAssetId ?? null,
        linkedMarketplaceAssetId: meta.linkedMarketplaceAssetId ?? null,
        lineageAssetIds: meta.lineageAssetIds ?? [],
        isLibraryItem: meta.inLibrary ?? true,
        draftKind: inferDraftKind(meta)
    };
}
function assetRecordToMarketplaceAssetDocument(asset, creatorAccountId = null) {
    const meta = asset.meta;
    return {
        assetId: meta.id,
        creatorAccountId,
        publishedFromDraftAssetId: meta.publishedFromAssetId ?? null,
        name: meta.name,
        voxelGroup: asset.group,
        compiledRender: asset.compiledRender,
        createdAt: meta.createdAt,
        thumbStorageKey: meta.thumbStorageKey ?? null,
        lineageAssetIds: meta.lineageAssetIds ?? []
    };
}
function worldRecordToWorldDocument(world, ownerAccountId = null) {
    const instances = world.data.instances.filter((inst)=>!!inst.assetId && !!inst.assetKind).map((inst)=>({
            instanceId: inst.instanceId,
            assetId: inst.assetId,
            assetKind: inst.assetKind,
            overrideAssetId: inst.overrideAssetId ?? null,
            position: inst.position,
            rotation: inst.rotation ?? {
                x: 0,
                y: 0,
                z: 0
            }
        }));
    return {
        worldId: world.meta.id,
        ownerAccountId,
        name: world.meta.name,
        instances,
        createdAt: world.meta.createdAt,
        updatedAt: world.meta.updatedAt,
        thumbStorageKey: world.meta.thumbStorageKey ?? null
    };
}
function worldDocumentToSaveWorldInput(doc) {
    const instances = doc.instances.map((inst)=>({
            instanceId: inst.instanceId,
            assetId: inst.assetId,
            assetKind: inst.assetKind,
            overrideAssetId: inst.overrideAssetId ?? null,
            position: inst.position,
            rotation: inst.rotation ?? {
                x: 0,
                y: 0,
                z: 0
            }
        }));
    const data = {
        instances
    };
    return {
        id: doc.worldId,
        name: doc.name,
        data,
        thumb: null,
        thumbStorageKey: doc.thumbStorageKey ?? null
    };
}
function draftAssetDocumentToSaveAssetInput(doc) {
    return {
        id: doc.assetId,
        name: doc.name,
        group: doc.voxelGroup,
        thumb: null,
        thumbStorageKey: doc.thumbStorageKey ?? null,
        visibility: "private",
        inLibrary: doc.isLibraryItem ?? doc.draftKind !== "override",
        isPreset: false,
        sourceAssetId: doc.sourceAssetId ?? null,
        linkedMarketplaceAssetId: doc.linkedMarketplaceAssetId ?? null,
        lineageAssetIds: doc.lineageAssetIds ?? [],
        publishedFromAssetId: null,
        isImmutable: false,
        forceNewId: !doc.assetId
    };
}
function marketplaceAssetDocumentToSaveAssetInput(doc) {
    return {
        id: doc.assetId,
        name: doc.name,
        group: doc.voxelGroup,
        thumb: null,
        thumbStorageKey: doc.thumbStorageKey ?? null,
        visibility: "marketplace",
        inLibrary: false,
        isPreset: false,
        linkedMarketplaceAssetId: null,
        lineageAssetIds: doc.lineageAssetIds ?? [],
        publishedFromAssetId: doc.publishedFromDraftAssetId ?? null,
        isImmutable: true,
        forceNewId: !doc.assetId
    };
}
}),
"[project]/apps/web/src/services/versionedAssets.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createOwnedAsset",
    ()=>createOwnedAsset,
    "deleteOwnedAsset",
    ()=>deleteOwnedAsset,
    "getAssetVersion",
    ()=>getAssetVersion,
    "getOwnedAsset",
    ()=>getOwnedAsset,
    "getPublishedAsset",
    ()=>getPublishedAsset,
    "listOwnedAssetManifest",
    ()=>listOwnedAssetManifest,
    "listPublishedAssets",
    ()=>listPublishedAssets,
    "publishOwnedAsset",
    ()=>publishOwnedAsset,
    "updateOwnedAsset",
    ()=>updateOwnedAsset
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$voxlMiniClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/voxlMiniClient.ts [app-ssr] (ecmascript)");
;
async function listOwnedAssetManifest() {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$voxlMiniClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["voxlMiniClient"].get("/v1/me/assets/manifest");
    return Array.isArray(res.data?.items) ? res.data.items : [];
}
async function getOwnedAsset(assetHeadId) {
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$voxlMiniClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["voxlMiniClient"].get(`/v1/me/assets/${assetHeadId}`);
        return res.data?.value ?? null;
    } catch (error) {
        if (error?.response?.status === 404) return null;
        throw error;
    }
}
async function createOwnedAsset(input) {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$voxlMiniClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["voxlMiniClient"].post("/v1/me/assets", input);
    return res.data.value;
}
async function updateOwnedAsset(assetHeadId, input) {
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$voxlMiniClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["voxlMiniClient"].put(`/v1/me/assets/${assetHeadId}`, input);
        return {
            ok: true,
            value: res.data.value
        };
    } catch (error) {
        if (error?.response?.status === 409 && error.response.data?.current) {
            return {
                ok: false,
                current: error.response.data.current
            };
        }
        throw error;
    }
}
async function deleteOwnedAsset(assetHeadId) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$voxlMiniClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["voxlMiniClient"].delete(`/v1/me/assets/${assetHeadId}`);
    } catch (error) {
        if (error?.response?.status === 404) return;
        throw error;
    }
}
async function publishOwnedAsset(assetHeadId) {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$voxlMiniClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["voxlMiniClient"].post(`/v1/me/assets/${assetHeadId}/publish`);
    return res.data.value;
}
async function listPublishedAssets() {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$voxlMiniClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["voxlMiniClient"].get("/v1/published-assets");
    return Array.isArray(res.data?.assets) ? res.data.assets : [];
}
async function getPublishedAsset(listingId) {
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$voxlMiniClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["voxlMiniClient"].get(`/v1/published-assets/${listingId}`);
        return res.data?.value ?? null;
    } catch (error) {
        if (error?.response?.status === 404) return null;
        throw error;
    }
}
async function getAssetVersion(assetVersionId) {
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$voxlMiniClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["voxlMiniClient"].get(`/v1/asset-versions/${assetVersionId}`);
        return res.data?.value ?? null;
    } catch (error) {
        if (error?.response?.status === 404) return null;
        throw error;
    }
}
}),
"[project]/apps/web/src/components/VoxelEditor/repositories/ownedAssetCache.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OwnedAssetCache",
    ()=>OwnedAssetCache,
    "deleteOwnedAssetCache",
    ()=>deleteOwnedAssetCache
]);
const DB_VERSION = 1;
const STORE_RECORDS = "records";
const STORE_KV = "kv";
function dbName(ownerAccountId) {
    return `voxel_editor_assets_cache:${ownerAccountId}`;
}
function txDone(tx) {
    return new Promise((resolve, reject)=>{
        tx.oncomplete = ()=>resolve();
        tx.onerror = ()=>reject(tx.error ?? new Error("IndexedDB asset cache transaction failed"));
        tx.onabort = ()=>reject(tx.error ?? new Error("IndexedDB asset cache transaction aborted"));
    });
}
async function openAssetCacheDb(ownerAccountId) {
    return await new Promise((resolve, reject)=>{
        const req = indexedDB.open(dbName(ownerAccountId), DB_VERSION);
        req.onupgradeneeded = ()=>{
            const db = req.result;
            if (!db.objectStoreNames.contains(STORE_RECORDS)) {
                db.createObjectStore(STORE_RECORDS, {
                    keyPath: "id"
                });
            }
            if (!db.objectStoreNames.contains(STORE_KV)) {
                db.createObjectStore(STORE_KV, {
                    keyPath: "key"
                });
            }
        };
        req.onsuccess = ()=>resolve(req.result);
        req.onerror = ()=>reject(req.error ?? new Error("Failed to open owned asset cache"));
    });
}
async function deleteOwnedAssetCache(ownerAccountId) {
    await new Promise((resolve, reject)=>{
        const req = indexedDB.deleteDatabase(dbName(ownerAccountId));
        req.onsuccess = ()=>resolve();
        req.onerror = ()=>reject(req.error ?? new Error("Failed to delete owned asset cache"));
        req.onblocked = ()=>reject(new Error("Owned asset cache deletion blocked by an open connection"));
    });
}
class OwnedAssetCache {
    ownerAccountId;
    constructor(ownerAccountId){
        this.ownerAccountId = ownerAccountId;
    }
    async listMeta() {
        const db = await openAssetCacheDb(this.ownerAccountId);
        return await new Promise((resolve, reject)=>{
            const tx = db.transaction([
                STORE_RECORDS
            ], "readonly");
            const req = tx.objectStore(STORE_RECORDS).getAll();
            req.onsuccess = ()=>{
                const rows = (req.result ?? []).map((row)=>row.record.meta).sort((a, b)=>b.updatedAt - a.updatedAt);
                resolve(rows);
            };
            req.onerror = ()=>reject(req.error ?? new Error("Failed to list owned asset cache"));
        });
    }
    async findIdByName(name) {
        const normalized = name.trim().toLowerCase();
        if (!normalized) return null;
        const metas = await this.listMeta();
        return metas.find((meta)=>meta.name.trim().toLowerCase() === normalized)?.id ?? null;
    }
    async getMeta(id) {
        const record = await this.load(id);
        return record?.meta ?? null;
    }
    async load(id) {
        const db = await openAssetCacheDb(this.ownerAccountId);
        return await new Promise((resolve, reject)=>{
            const tx = db.transaction([
                STORE_RECORDS
            ], "readonly");
            const req = tx.objectStore(STORE_RECORDS).get(id);
            req.onsuccess = ()=>{
                const row = req.result ?? null;
                resolve(row?.record ?? null);
            };
            req.onerror = ()=>reject(req.error ?? new Error("Failed to read owned asset cache"));
        });
    }
    async save(record) {
        const db = await openAssetCacheDb(this.ownerAccountId);
        const tx = db.transaction([
            STORE_RECORDS
        ], "readwrite");
        tx.objectStore(STORE_RECORDS).put({
            id: record.meta.id,
            record
        });
        await txDone(tx);
    }
    async delete(id) {
        const db = await openAssetCacheDb(this.ownerAccountId);
        const tx = db.transaction([
            STORE_RECORDS
        ], "readwrite");
        tx.objectStore(STORE_RECORDS).delete(id);
        await txDone(tx);
    }
    async clear() {
        const db = await openAssetCacheDb(this.ownerAccountId);
        const tx = db.transaction([
            STORE_RECORDS,
            STORE_KV
        ], "readwrite");
        tx.objectStore(STORE_RECORDS).clear();
        tx.objectStore(STORE_KV).clear();
        await txDone(tx);
    }
    async rename(id, name) {
        const record = await this.load(id);
        if (!record) return;
        await this.save({
            ...record,
            meta: {
                ...record.meta,
                name,
                updatedAt: Date.now()
            }
        });
    }
    async updateThumbnail(id, thumb) {
        const record = await this.load(id);
        if (!record) return;
        await this.save({
            ...record,
            meta: {
                ...record.meta,
                thumb,
                updatedAt: Date.now()
            }
        });
    }
    async setLibraryMembership(id, inLibrary) {
        const record = await this.load(id);
        if (!record) return;
        await this.save({
            ...record,
            meta: {
                ...record.meta,
                inLibrary,
                updatedAt: Date.now()
            }
        });
    }
    async isInLibrary(id) {
        return !!(await this.getMeta(id))?.inLibrary;
    }
    async getKv(key) {
        const db = await openAssetCacheDb(this.ownerAccountId);
        return await new Promise((resolve, reject)=>{
            const tx = db.transaction([
                STORE_KV
            ], "readonly");
            const req = tx.objectStore(STORE_KV).get(key);
            req.onsuccess = ()=>resolve(req.result?.value ?? null);
            req.onerror = ()=>reject(req.error ?? new Error("Failed to read asset cache kv"));
        });
    }
    async setKv(key, value) {
        const db = await openAssetCacheDb(this.ownerAccountId);
        const tx = db.transaction([
            STORE_KV
        ], "readwrite");
        tx.objectStore(STORE_KV).put({
            key,
            value
        });
        await txDone(tx);
    }
}
}),
"[project]/apps/web/src/components/VoxelEditor/repositories/repositoryMedia.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "blobToDataUrl",
    ()=>blobToDataUrl,
    "dataUrlToBlob",
    ()=>dataUrlToBlob
]);
async function blobToDataUrl(blob) {
    return await new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = ()=>resolve(String(reader.result ?? ""));
        reader.onerror = ()=>reject(reader.error ?? new Error("Failed to read blob"));
        reader.readAsDataURL(blob);
    });
}
function dataUrlToBlob(dataUrl) {
    if (!dataUrl || typeof dataUrl !== "string") return null;
    if (!dataUrl.startsWith("data:")) return null;
    const commaIndex = dataUrl.indexOf(",");
    if (commaIndex === -1) return null;
    const header = dataUrl.slice(0, commaIndex);
    const body = dataUrl.slice(commaIndex + 1);
    const mimeMatch = header.match(/^data:([^;]+);base64$/i);
    const mimeType = mimeMatch?.[1] ?? "application/octet-stream";
    try {
        const binary = atob(body);
        const bytes = new Uint8Array(binary.length);
        for(let i = 0; i < binary.length; i += 1){
            bytes[i] = binary.charCodeAt(i);
        }
        return new Blob([
            bytes
        ], {
            type: mimeType
        });
    } catch  {
        return null;
    }
}
}),
"[project]/apps/web/src/components/VoxelEditor/repositories/remoteAssetRepository.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RemoteAssetRepository",
    ()=>RemoteAssetRepository
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$domain$2f$cloudMappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/domain/cloudMappers.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Auth$2f$state$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/Auth/state.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedAssets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/versionedAssets.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$ownedAssetCache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/repositories/ownedAssetCache.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$repositoryMedia$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/repositories/repositoryMedia.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const OWNER_NAMESPACE_KEY = "voxl:last-owned-asset-owner";
const MANIFEST_SYNC_TTL_MS = 5_000;
const PUBLISHED_LIST_TTL_MS = 10_000;
function isPresetListingId(value) {
    return typeof value === "string" && value.startsWith("preset_");
}
function safeSlug(name) {
    return (name || "asset").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80) || "asset";
}
function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(()=>URL.revokeObjectURL(url), 1000);
}
function currentOwnerId() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Auth$2f$state$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStoredAuthentication"])().me?.user_id ?? null;
}
function requireOwnerId() {
    const ownerId = currentOwnerId();
    if (!ownerId) {
        throw new Error("You must be logged in to access owned assets.");
    }
    return ownerId;
}
function draftKindFromLegacy(input) {
    if (input.inLibrary === false && !input.linkedMarketplaceAssetId) {
        return "override";
    }
    return "normal";
}
async function thumbToStorageKey(thumb) {
    if (thumb === undefined) return undefined;
    if (thumb === null) return null;
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$repositoryMedia$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["blobToDataUrl"])(thumb);
}
function ownedDocToAssetRecord(doc) {
    const linkedMarketplaceAssetId = doc.linkedListingId ?? null;
    const lineageAssetIds = doc.lineageAssetHeadIds ?? [];
    return {
        meta: {
            id: doc.assetHeadId,
            name: doc.name,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
            voxelCount: doc.compiledRender.voxelCount,
            thumb: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$repositoryMedia$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dataUrlToBlob"])(doc.thumbStorageKey),
            thumbStorageKey: doc.thumbStorageKey ?? null,
            visibility: "private",
            inLibrary: doc.isLibraryItem,
            isPreset: isPresetListingId(linkedMarketplaceAssetId) || lineageAssetIds.some((value)=>isPresetListingId(value)),
            sourceAssetId: doc.sourceAssetHeadId ?? null,
            linkedMarketplaceAssetId,
            lineageAssetIds,
            publishedFromAssetId: null,
            isImmutable: false
        },
        group: doc.voxelGroup,
        compiledRender: doc.compiledRender
    };
}
function publishedDetailToAssetRecord(detail) {
    const { listing, currentVersion } = detail;
    const lineageAssetIds = [
        listing.listingId,
        currentVersion.assetHeadId
    ].filter((value, index, arr)=>!!value && arr.indexOf(value) === index);
    return {
        meta: {
            id: listing.listingId,
            name: listing.name,
            createdAt: listing.createdAt,
            updatedAt: listing.updatedAt,
            voxelCount: currentVersion.compiledRender.voxelCount,
            thumb: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$repositoryMedia$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dataUrlToBlob"])(currentVersion.thumbStorageKey ?? listing.thumbStorageKey ?? null),
            thumbStorageKey: currentVersion.thumbStorageKey ?? listing.thumbStorageKey ?? null,
            visibility: "marketplace",
            inLibrary: false,
            isPreset: isPresetListingId(listing.listingId),
            sourceAssetId: currentVersion.assetHeadId,
            linkedMarketplaceAssetId: listing.listingId,
            lineageAssetIds,
            publishedFromAssetId: currentVersion.assetHeadId,
            isImmutable: true
        },
        group: currentVersion.voxelGroup,
        compiledRender: currentVersion.compiledRender
    };
}
class RemoteAssetRepository {
    caches = new Map();
    ownerSyncPromises = new Map();
    ownerSyncedAt = new Map();
    publishedByListingId = new Map();
    publishedSyncedAt = 0;
    cacheFor(ownerId) {
        let cache = this.caches.get(ownerId);
        if (!cache) {
            cache = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$ownedAssetCache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OwnedAssetCache"](ownerId);
            this.caches.set(ownerId, cache);
        }
        return cache;
    }
    async cleanupOwnerNamespace(ownerId) {
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const previousOwner = undefined;
    }
    async syncOwnedAssets(force = false) {
        const ownerId = currentOwnerId();
        if (!ownerId) return;
        const lastSyncedAt = this.ownerSyncedAt.get(ownerId) ?? 0;
        if (!force && Date.now() - lastSyncedAt < MANIFEST_SYNC_TTL_MS) {
            return;
        }
        const existing = this.ownerSyncPromises.get(ownerId);
        if (existing) {
            await existing;
            return;
        }
        const promise = (async ()=>{
            await this.cleanupOwnerNamespace(ownerId);
            const cache = this.cacheFor(ownerId);
            const manifest = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedAssets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["listOwnedAssetManifest"])();
            const manifestById = new Map(manifest.map((item)=>[
                    item.assetHeadId,
                    item
                ]));
            const cachedMetas = await cache.listMeta();
            await Promise.all(cachedMetas.map(async (meta)=>{
                const row = manifestById.get(meta.id);
                if (!row || row.deletedAt) {
                    await cache.delete(meta.id);
                }
            }));
            await Promise.all(manifest.map(async (item)=>{
                if (item.deletedAt) {
                    await cache.delete(item.assetHeadId);
                    return;
                }
                const cachedMeta = await cache.getMeta(item.assetHeadId);
                if (cachedMeta && cachedMeta.updatedAt === item.updatedAt) {
                    return;
                }
                const doc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedAssets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getOwnedAsset"])(item.assetHeadId);
                if (!doc) return;
                await cache.save(ownedDocToAssetRecord(doc));
            }));
            this.ownerSyncedAt.set(ownerId, Date.now());
        })().finally(()=>{
            this.ownerSyncPromises.delete(ownerId);
        });
        this.ownerSyncPromises.set(ownerId, promise);
        await promise;
    }
    async syncPublishedAssets(force = false) {
        if (!force && Date.now() - this.publishedSyncedAt < PUBLISHED_LIST_TTL_MS) {
            return;
        }
        const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedAssets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["listPublishedAssets"])();
        this.publishedByListingId.clear();
        for (const row of rows){
            this.publishedByListingId.set(row.listing.listingId, row);
        }
        this.publishedSyncedAt = Date.now();
    }
    async getOwnedRecord(id) {
        await this.syncOwnedAssets();
        const ownerId = currentOwnerId();
        if (!ownerId) return null;
        const cache = this.cacheFor(ownerId);
        return await cache.load(id);
    }
    async getPublishedDetail(listingId) {
        await this.syncPublishedAssets();
        const cached = this.publishedByListingId.get(listingId);
        if (cached) return cached;
        try {
            const detail = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedAssets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPublishedAsset"])(listingId);
            if (!detail) return null;
            this.publishedByListingId.set(listingId, detail);
            return detail;
        } catch  {
            return null;
        }
    }
    async buildCreateInput(input) {
        return {
            name: input.name,
            voxelGroup: input.group,
            thumbStorageKey: await thumbToStorageKey(input.thumb ?? null),
            sourceAssetHeadId: input.sourceAssetId ?? null,
            linkedListingId: input.linkedMarketplaceAssetId ?? null,
            lineageAssetHeadIds: input.lineageAssetIds ?? [],
            draftKind: draftKindFromLegacy(input),
            isLibraryItem: input.inLibrary ?? true
        };
    }
    async updateOwnedRecord(current, input, attempt = 0) {
        const payload = {
            expectedDraftRevision: current.draftRevision,
            name: input.name,
            voxelGroup: input.group,
            thumbStorageKey: await thumbToStorageKey(input.thumb) ?? current.thumbStorageKey ?? null,
            sourceAssetHeadId: input.sourceAssetId ?? current.sourceAssetHeadId ?? null,
            linkedListingId: input.linkedMarketplaceAssetId ?? current.linkedListingId ?? null,
            lineageAssetHeadIds: input.lineageAssetIds ?? current.lineageAssetHeadIds ?? [],
            draftKind: draftKindFromLegacy({
                inLibrary: input.inLibrary ?? current.isLibraryItem,
                linkedMarketplaceAssetId: input.linkedMarketplaceAssetId ?? current.linkedListingId ?? null
            }),
            isLibraryItem: input.inLibrary ?? current.isLibraryItem
        };
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedAssets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateOwnedAsset"])(current.assetHeadId, payload);
        if (result.ok) {
            await this.cacheFor(current.ownerAccountId).save(ownedDocToAssetRecord(result.value));
            this.ownerSyncedAt.set(current.ownerAccountId, Date.now());
            return result.value;
        }
        await this.cacheFor(current.ownerAccountId).save(ownedDocToAssetRecord(result.current));
        if (attempt >= 1) {
            throw new Error("Asset changed remotely during save.");
        }
        return await this.updateOwnedRecord(result.current, input, attempt + 1);
    }
    async listAssets() {
        const [owned, published] = await Promise.all([
            this.listPrivateAssets(),
            this.listMarketplaceAssets()
        ]);
        return [
            ...owned,
            ...published
        ].sort((a, b)=>b.updatedAt - a.updatedAt);
    }
    async listLibraryAssets() {
        await this.syncOwnedAssets();
        const ownerId = currentOwnerId();
        if (!ownerId) return [];
        return (await this.cacheFor(ownerId).listMeta()).filter((meta)=>!!meta.inLibrary);
    }
    async listMarketplaceAssets() {
        await this.syncPublishedAssets();
        return Array.from(this.publishedByListingId.values()).map((detail)=>publishedDetailToAssetRecord(detail).meta).sort((a, b)=>b.updatedAt - a.updatedAt);
    }
    async listPublishedMarketplaceAssets() {
        return (await this.listMarketplaceAssets()).filter((asset)=>!asset.isPreset);
    }
    async listPrivateAssets() {
        await this.syncOwnedAssets();
        const ownerId = currentOwnerId();
        if (!ownerId) return [];
        return await this.cacheFor(ownerId).listMeta();
    }
    async findAssetIdByName(name) {
        await this.syncOwnedAssets();
        const ownerId = currentOwnerId();
        if (!ownerId) return null;
        return await this.cacheFor(ownerId).findIdByName(name);
    }
    async getAssetMeta(id) {
        const owned = await this.getOwnedRecord(id);
        if (owned) return owned.meta;
        const published = await this.getPublishedDetail(id);
        return published ? publishedDetailToAssetRecord(published).meta : null;
    }
    async loadAsset(id) {
        const owned = await this.getOwnedRecord(id);
        if (owned) return owned;
        const published = await this.getPublishedDetail(id);
        return published ? publishedDetailToAssetRecord(published) : null;
    }
    async saveAsset(input) {
        if (input.visibility === "marketplace") {
            throw new Error("Direct marketplace asset saves are not supported.");
        }
        const ownerId = requireOwnerId();
        if (!input.id || input.forceNewId) {
            const created = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedAssets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createOwnedAsset"])(await this.buildCreateInput(input));
            await this.cacheFor(ownerId).save(ownedDocToAssetRecord(created));
            this.ownerSyncedAt.set(ownerId, Date.now());
            return created.assetHeadId;
        }
        const current = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedAssets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getOwnedAsset"])(input.id);
        if (!current) {
            const created = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedAssets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createOwnedAsset"])(await this.buildCreateInput(input));
            await this.cacheFor(ownerId).save(ownedDocToAssetRecord(created));
            this.ownerSyncedAt.set(ownerId, Date.now());
            return created.assetHeadId;
        }
        const updated = await this.updateOwnedRecord(current, input);
        return updated.assetHeadId;
    }
    async createPrivateAsset(input) {
        return await this.saveAsset({
            name: input.name,
            group: input.group,
            thumb: input.thumb ?? null,
            thumbStorageKey: input.thumbStorageKey ?? null,
            visibility: "private",
            inLibrary: input.inLibrary ?? true,
            isImmutable: false,
            sourceAssetId: input.sourceAssetId ?? null,
            linkedMarketplaceAssetId: input.linkedMarketplaceAssetId ?? null,
            lineageAssetIds: input.lineageAssetIds ?? [],
            forceNewId: true
        });
    }
    async publishAssetToMarketplace(id) {
        const detail = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedAssets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publishOwnedAsset"])(id);
        this.publishedByListingId.set(detail.listing.listingId, detail);
        this.publishedSyncedAt = Date.now();
        return detail.listing.listingId;
    }
    async forkAssetToPrivateDraft(id, opts) {
        const loaded = await this.loadAsset(id);
        if (!loaded) throw new Error("Asset not found");
        const sourceAssetId = loaded.meta.sourceAssetId ?? loaded.meta.publishedFromAssetId ?? loaded.meta.id;
        const lineageAssetIds = [
            ...loaded.meta.lineageAssetIds ?? [],
            sourceAssetId
        ].filter((value, index, arr)=>!!value && arr.indexOf(value) === index);
        return await this.createPrivateAsset({
            name: opts?.name ?? loaded.meta.name,
            group: loaded.group,
            thumb: loaded.meta.thumb ?? null,
            sourceAssetId,
            linkedMarketplaceAssetId: null,
            lineageAssetIds,
            inLibrary: opts?.addToLibrary ?? true,
            forceNewId: true
        });
    }
    async acquireMarketplaceAssetToLibrary(id, opts) {
        const detail = await this.getPublishedDetail(id);
        if (!detail) throw new Error("Marketplace asset not found");
        const owned = await this.listPrivateAssets();
        const existing = owned.find((asset)=>asset.linkedMarketplaceAssetId === detail.listing.listingId);
        if (existing) {
            await this.addAssetToLibrary(existing.id);
            return existing.id;
        }
        return await this.createPrivateAsset({
            name: opts?.name ?? detail.listing.name,
            group: detail.currentVersion.voxelGroup,
            thumb: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$repositoryMedia$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dataUrlToBlob"])(detail.currentVersion.thumbStorageKey ?? detail.listing.thumbStorageKey ?? null),
            sourceAssetId: detail.currentVersion.assetHeadId,
            linkedMarketplaceAssetId: detail.listing.listingId,
            lineageAssetIds: [
                detail.listing.listingId,
                detail.currentVersion.assetHeadId
            ],
            inLibrary: true,
            forceNewId: true
        });
    }
    async overwritePrivateAssetContent(params) {
        const loaded = await this.loadAsset(params.assetId);
        if (!loaded) throw new Error("Asset not found");
        if (loaded.meta.visibility !== "private" || loaded.meta.isImmutable) {
            throw new Error("Only mutable private assets can be overwritten");
        }
        if (loaded.meta.linkedMarketplaceAssetId) {
            throw new Error("Marketplace-linked assets cannot be structurally overwritten");
        }
        return await this.saveAsset({
            id: loaded.meta.id,
            name: loaded.meta.name,
            group: params.group,
            thumb: params.thumb ?? loaded.meta.thumb ?? null,
            thumbStorageKey: loaded.meta.thumbStorageKey ?? null,
            visibility: "private",
            inLibrary: loaded.meta.inLibrary ?? true,
            isPreset: loaded.meta.isPreset ?? false,
            sourceAssetId: loaded.meta.sourceAssetId ?? null,
            linkedMarketplaceAssetId: loaded.meta.linkedMarketplaceAssetId ?? null,
            lineageAssetIds: loaded.meta.lineageAssetIds ?? [],
            isImmutable: false,
            forceNewId: false
        });
    }
    async saveNonStructuralAssetProgress(params) {
        const loaded = await this.loadAsset(params.assetId);
        if (!loaded) throw new Error("Asset not found");
        if (loaded.meta.visibility !== "private" || loaded.meta.isImmutable) {
            throw new Error("Only mutable private assets can save local progress");
        }
        return await this.saveAsset({
            id: loaded.meta.id,
            name: loaded.meta.name,
            group: params.group,
            thumb: params.thumb ?? loaded.meta.thumb ?? null,
            thumbStorageKey: loaded.meta.thumbStorageKey ?? null,
            visibility: "private",
            inLibrary: loaded.meta.inLibrary ?? true,
            isPreset: loaded.meta.isPreset ?? false,
            sourceAssetId: loaded.meta.sourceAssetId ?? null,
            linkedMarketplaceAssetId: loaded.meta.linkedMarketplaceAssetId ?? null,
            lineageAssetIds: loaded.meta.lineageAssetIds ?? [],
            isImmutable: false,
            forceNewId: false
        });
    }
    async remixAssetFromSource(params) {
        return await this.createPrivateAsset({
            name: params.name,
            group: params.group,
            thumb: params.thumb ?? null,
            sourceAssetId: params.sourceAssetId ?? null,
            linkedMarketplaceAssetId: null,
            lineageAssetIds: params.lineageAssetIds ?? [],
            inLibrary: true,
            forceNewId: true
        });
    }
    async updateAssetThumbnail(params) {
        const current = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedAssets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getOwnedAsset"])(params.assetId);
        if (!current) return;
        await this.updateOwnedRecord(current, {
            id: current.assetHeadId,
            name: current.name,
            group: current.voxelGroup,
            thumb: params.thumb,
            visibility: "private",
            inLibrary: current.isLibraryItem,
            sourceAssetId: current.sourceAssetHeadId ?? null,
            linkedMarketplaceAssetId: current.linkedListingId ?? null,
            lineageAssetIds: current.lineageAssetHeadIds ?? []
        });
    }
    async loadDraftAssetDocument(id, ownerAccountId = null) {
        const record = await this.loadAsset(id);
        if (!record) return null;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$domain$2f$cloudMappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRecordToDraftAssetDocument"])(record, ownerAccountId);
    }
    async loadMarketplaceAssetDocument(id, creatorAccountId = null) {
        const record = await this.loadAsset(id);
        if (!record) return null;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$domain$2f$cloudMappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRecordToMarketplaceAssetDocument"])(record, creatorAccountId);
    }
    async saveDraftAssetDocument(input) {
        return await this.saveAsset((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$domain$2f$cloudMappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["draftAssetDocumentToSaveAssetInput"])(input));
    }
    async saveMarketplaceAssetDocument(input) {
        const created = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedAssets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createOwnedAsset"])({
            name: input.name,
            voxelGroup: input.voxelGroup,
            thumbStorageKey: input.thumbStorageKey ?? null,
            sourceAssetHeadId: null,
            linkedListingId: null,
            lineageAssetHeadIds: input.lineageAssetIds ?? [],
            draftKind: "normal",
            isLibraryItem: false
        });
        const detail = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedAssets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publishOwnedAsset"])(created.assetHeadId);
        this.publishedByListingId.set(detail.listing.listingId, detail);
        this.publishedSyncedAt = Date.now();
        return detail.listing.listingId;
    }
    async renameAsset(id, name) {
        const current = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedAssets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getOwnedAsset"])(id);
        if (!current) return;
        await this.updateOwnedRecord(current, {
            id: current.assetHeadId,
            name,
            group: current.voxelGroup,
            visibility: "private",
            inLibrary: current.isLibraryItem,
            sourceAssetId: current.sourceAssetHeadId ?? null,
            linkedMarketplaceAssetId: current.linkedListingId ?? null,
            lineageAssetIds: current.lineageAssetHeadIds ?? []
        });
    }
    async deleteAsset(id) {
        const ownerId = currentOwnerId();
        if (!ownerId) return;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedAssets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteOwnedAsset"])(id);
        await this.cacheFor(ownerId).delete(id);
        this.ownerSyncedAt.set(ownerId, Date.now());
    }
    async deleteAllAssets() {
        const owned = await this.listPrivateAssets();
        for (const asset of owned){
            await this.deleteAsset(asset.id);
        }
    }
    async addAssetToLibrary(id) {
        const current = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedAssets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getOwnedAsset"])(id);
        if (!current) return;
        await this.updateOwnedRecord(current, {
            id: current.assetHeadId,
            name: current.name,
            group: current.voxelGroup,
            visibility: "private",
            inLibrary: true,
            sourceAssetId: current.sourceAssetHeadId ?? null,
            linkedMarketplaceAssetId: current.linkedListingId ?? null,
            lineageAssetIds: current.lineageAssetHeadIds ?? []
        });
    }
    async removeAssetFromLibrary(id) {
        const current = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedAssets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getOwnedAsset"])(id);
        if (!current) return;
        await this.updateOwnedRecord(current, {
            id: current.assetHeadId,
            name: current.name,
            group: current.voxelGroup,
            visibility: "private",
            inLibrary: false,
            sourceAssetId: current.sourceAssetHeadId ?? null,
            linkedMarketplaceAssetId: current.linkedListingId ?? null,
            lineageAssetIds: current.lineageAssetHeadIds ?? []
        });
    }
    async isAssetInLibrary(id) {
        const ownerId = currentOwnerId();
        if (!ownerId) return false;
        await this.syncOwnedAssets();
        return await this.cacheFor(ownerId).isInLibrary(id);
    }
    async exportAssetToFiles(id) {
        const loaded = await this.loadAsset(id);
        if (!loaded) throw new Error("Asset not found");
        const base = safeSlug(loaded.meta.name);
        downloadBlob(new Blob([
            JSON.stringify(loaded.group, null, 2)
        ], {
            type: "application/json"
        }), `${base}.json`);
        if (loaded.meta.thumb) {
            downloadBlob(loaded.meta.thumb.type === "image/png" ? loaded.meta.thumb : new Blob([
                loaded.meta.thumb
            ], {
                type: "image/png"
            }), `${base}.png`);
        }
    }
    async getKv(key) {
        const ownerId = currentOwnerId();
        if (!ownerId) {
            if ("TURBOPACK compile-time truthy", 1) return null;
            //TURBOPACK unreachable
            ;
        }
        return await this.cacheFor(ownerId).getKv(key);
    }
    async setKv(key, value) {
        const ownerId = currentOwnerId();
        if (!ownerId) {
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            return;
        }
        await this.cacheFor(ownerId).setKv(key, value);
    }
}
}),
"[project]/apps/web/src/components/VoxelEditor/repositories/ownedWorldCache.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OwnedWorldCache",
    ()=>OwnedWorldCache,
    "deleteOwnedWorldCache",
    ()=>deleteOwnedWorldCache
]);
const DB_VERSION = 1;
const STORE_RECORDS = "records";
function dbName(ownerAccountId) {
    return `voxel_editor_worlds_cache:${ownerAccountId}`;
}
function txDone(tx) {
    return new Promise((resolve, reject)=>{
        tx.oncomplete = ()=>resolve();
        tx.onerror = ()=>reject(tx.error ?? new Error("IndexedDB world cache transaction failed"));
        tx.onabort = ()=>reject(tx.error ?? new Error("IndexedDB world cache transaction aborted"));
    });
}
async function openWorldCacheDb(ownerAccountId) {
    return await new Promise((resolve, reject)=>{
        const req = indexedDB.open(dbName(ownerAccountId), DB_VERSION);
        req.onupgradeneeded = ()=>{
            const db = req.result;
            if (!db.objectStoreNames.contains(STORE_RECORDS)) {
                db.createObjectStore(STORE_RECORDS, {
                    keyPath: "id"
                });
            }
        };
        req.onsuccess = ()=>resolve(req.result);
        req.onerror = ()=>reject(req.error ?? new Error("Failed to open owned world cache"));
    });
}
async function deleteOwnedWorldCache(ownerAccountId) {
    await new Promise((resolve, reject)=>{
        const req = indexedDB.deleteDatabase(dbName(ownerAccountId));
        req.onsuccess = ()=>resolve();
        req.onerror = ()=>reject(req.error ?? new Error("Failed to delete owned world cache"));
        req.onblocked = ()=>reject(new Error("Owned world cache deletion blocked by an open connection"));
    });
}
class OwnedWorldCache {
    ownerAccountId;
    constructor(ownerAccountId){
        this.ownerAccountId = ownerAccountId;
    }
    async listMeta() {
        const db = await openWorldCacheDb(this.ownerAccountId);
        return await new Promise((resolve, reject)=>{
            const tx = db.transaction([
                STORE_RECORDS
            ], "readonly");
            const req = tx.objectStore(STORE_RECORDS).getAll();
            req.onsuccess = ()=>{
                const rows = (req.result ?? []).map((row)=>row.record.meta).sort((a, b)=>b.updatedAt - a.updatedAt);
                resolve(rows);
            };
            req.onerror = ()=>reject(req.error ?? new Error("Failed to list owned world cache"));
        });
    }
    async findIdByName(name) {
        const normalized = name.trim().toLowerCase();
        if (!normalized) return null;
        const metas = await this.listMeta();
        return metas.find((meta)=>meta.name.trim().toLowerCase() === normalized)?.id ?? null;
    }
    async getMeta(id) {
        const record = await this.load(id);
        return record?.meta ?? null;
    }
    async load(id) {
        const db = await openWorldCacheDb(this.ownerAccountId);
        return await new Promise((resolve, reject)=>{
            const tx = db.transaction([
                STORE_RECORDS
            ], "readonly");
            const req = tx.objectStore(STORE_RECORDS).get(id);
            req.onsuccess = ()=>{
                const row = req.result ?? null;
                resolve(row?.record ?? null);
            };
            req.onerror = ()=>reject(req.error ?? new Error("Failed to read owned world cache"));
        });
    }
    async save(record) {
        const db = await openWorldCacheDb(this.ownerAccountId);
        const tx = db.transaction([
            STORE_RECORDS
        ], "readwrite");
        tx.objectStore(STORE_RECORDS).put({
            id: record.meta.id,
            record
        });
        await txDone(tx);
    }
    async delete(id) {
        const db = await openWorldCacheDb(this.ownerAccountId);
        const tx = db.transaction([
            STORE_RECORDS
        ], "readwrite");
        tx.objectStore(STORE_RECORDS).delete(id);
        await txDone(tx);
    }
    async clear() {
        const db = await openWorldCacheDb(this.ownerAccountId);
        const tx = db.transaction([
            STORE_RECORDS
        ], "readwrite");
        tx.objectStore(STORE_RECORDS).clear();
        await txDone(tx);
    }
}
}),
"[project]/apps/web/src/components/VoxelEditor/repositories/remoteWorldRepository.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RemoteWorldRepository",
    ()=>RemoteWorldRepository
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$domain$2f$cloudMappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/domain/cloudMappers.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Auth$2f$state$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/Auth/state.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedWorlds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/versionedWorlds.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$ownedWorldCache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/repositories/ownedWorldCache.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$repositoryMedia$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/repositories/repositoryMedia.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const OWNER_NAMESPACE_KEY = "voxl:last-owned-world-owner";
const MANIFEST_SYNC_TTL_MS = 5_000;
function currentOwnerId() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Auth$2f$state$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStoredAuthentication"])().me?.user_id ?? null;
}
function requireOwnerId() {
    const ownerId = currentOwnerId();
    if (!ownerId) {
        throw new Error("You must be logged in to access owned worlds.");
    }
    return ownerId;
}
async function thumbToStorageKey(thumb) {
    if (thumb === undefined) return undefined;
    if (thumb === null) return null;
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$repositoryMedia$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["blobToDataUrl"])(thumb);
}
function worldDataToOwnedInstances(data) {
    return data.instances.filter((instance)=>!!instance.assetId).map((instance)=>({
            instanceId: instance.instanceId,
            assetHeadId: instance.assetId,
            overrideAssetHeadId: instance.overrideAssetId ?? null,
            logicTag: instance.logicTag ?? null,
            position: instance.position,
            rotation: instance.rotation ?? {
                x: 0,
                y: 0,
                z: 0
            }
        }));
}
function ownedWorldToLegacyRecord(doc) {
    return {
        meta: {
            id: doc.worldId,
            name: doc.name,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
            instanceCount: doc.instances.length,
            thumb: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$repositoryMedia$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dataUrlToBlob"])(doc.thumbStorageKey),
            thumbStorageKey: doc.thumbStorageKey ?? null
        },
        data: {
            instances: doc.instances.map((instance)=>({
                    instanceId: instance.instanceId,
                    assetId: instance.assetHeadId,
                    assetKind: "draft",
                    overrideAssetId: instance.overrideAssetHeadId ?? null,
                    logicTag: instance.logicTag ?? null,
                    position: instance.position,
                    rotation: instance.rotation ?? {
                        x: 0,
                        y: 0,
                        z: 0
                    }
                }))
        }
    };
}
class RemoteWorldRepository {
    caches = new Map();
    ownerSyncPromises = new Map();
    ownerSyncedAt = new Map();
    cacheFor(ownerId) {
        let cache = this.caches.get(ownerId);
        if (!cache) {
            cache = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$ownedWorldCache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OwnedWorldCache"](ownerId);
            this.caches.set(ownerId, cache);
        }
        return cache;
    }
    async cleanupOwnerNamespace(ownerId) {
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const previousOwner = undefined;
    }
    async syncOwnedWorlds(force = false) {
        const ownerId = currentOwnerId();
        if (!ownerId) return;
        const lastSyncedAt = this.ownerSyncedAt.get(ownerId) ?? 0;
        if (!force && Date.now() - lastSyncedAt < MANIFEST_SYNC_TTL_MS) {
            return;
        }
        const existing = this.ownerSyncPromises.get(ownerId);
        if (existing) {
            await existing;
            return;
        }
        const promise = (async ()=>{
            await this.cleanupOwnerNamespace(ownerId);
            const cache = this.cacheFor(ownerId);
            const manifest = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedWorlds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["listOwnedWorldManifest"])();
            const manifestById = new Map(manifest.map((item)=>[
                    item.worldId,
                    item
                ]));
            const cachedMetas = await cache.listMeta();
            await Promise.all(cachedMetas.map(async (meta)=>{
                const row = manifestById.get(meta.id);
                if (!row || row.deletedAt) {
                    await cache.delete(meta.id);
                }
            }));
            await Promise.all(manifest.map(async (item)=>{
                if (item.deletedAt) {
                    await cache.delete(item.worldId);
                    return;
                }
                const cachedMeta = await cache.getMeta(item.worldId);
                if (cachedMeta && cachedMeta.updatedAt === item.updatedAt) {
                    return;
                }
                const doc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedWorlds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getOwnedWorld"])(item.worldId);
                if (!doc) return;
                await cache.save(ownedWorldToLegacyRecord(doc));
            }));
            this.ownerSyncedAt.set(ownerId, Date.now());
        })().finally(()=>{
            this.ownerSyncPromises.delete(ownerId);
        });
        this.ownerSyncPromises.set(ownerId, promise);
        await promise;
    }
    async updateOwnedRecord(current, input, attempt = 0) {
        const payload = {
            expectedDraftRevision: current.draftRevision,
            name: input.name,
            instances: worldDataToOwnedInstances(input.data),
            thumbStorageKey: await thumbToStorageKey(input.thumb) ?? current.thumbStorageKey ?? null
        };
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedWorlds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateOwnedWorld"])(current.worldId, payload);
        if (result.ok) {
            await this.cacheFor(current.ownerAccountId).save(ownedWorldToLegacyRecord(result.value));
            this.ownerSyncedAt.set(current.ownerAccountId, Date.now());
            return result.value;
        }
        await this.cacheFor(current.ownerAccountId).save(ownedWorldToLegacyRecord(result.current));
        if (attempt >= 1) {
            throw new Error("World changed remotely during save.");
        }
        return await this.updateOwnedRecord(result.current, input, attempt + 1);
    }
    async listWorlds() {
        await this.syncOwnedWorlds();
        const ownerId = currentOwnerId();
        if (!ownerId) return [];
        return await this.cacheFor(ownerId).listMeta();
    }
    async findWorldIdByName(name) {
        await this.syncOwnedWorlds();
        const ownerId = currentOwnerId();
        if (!ownerId) return null;
        return await this.cacheFor(ownerId).findIdByName(name);
    }
    async getWorldMeta(id) {
        await this.syncOwnedWorlds();
        const ownerId = currentOwnerId();
        if (!ownerId) return null;
        return await this.cacheFor(ownerId).getMeta(id);
    }
    async loadWorld(id) {
        await this.syncOwnedWorlds();
        const ownerId = currentOwnerId();
        if (!ownerId) return null;
        const cached = await this.cacheFor(ownerId).load(id);
        if (cached) return cached;
        const remote = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedWorlds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getOwnedWorld"])(id);
        if (!remote) return null;
        const record = ownedWorldToLegacyRecord(remote);
        await this.cacheFor(ownerId).save(record);
        return record;
    }
    async saveWorld(input) {
        const ownerId = requireOwnerId();
        if (!input.id) {
            const payload = {
                name: input.name,
                instances: worldDataToOwnedInstances(input.data),
                thumbStorageKey: await thumbToStorageKey(input.thumb ?? null)
            };
            const created = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedWorlds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createOwnedWorld"])(payload);
            await this.cacheFor(ownerId).save(ownedWorldToLegacyRecord(created));
            this.ownerSyncedAt.set(ownerId, Date.now());
            return created.worldId;
        }
        const current = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedWorlds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getOwnedWorld"])(input.id);
        if (!current) {
            const created = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedWorlds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createOwnedWorld"])({
                name: input.name,
                instances: worldDataToOwnedInstances(input.data),
                thumbStorageKey: await thumbToStorageKey(input.thumb ?? null)
            });
            await this.cacheFor(ownerId).save(ownedWorldToLegacyRecord(created));
            this.ownerSyncedAt.set(ownerId, Date.now());
            return created.worldId;
        }
        const updated = await this.updateOwnedRecord(current, input);
        return updated.worldId;
    }
    async renameWorld(id, name) {
        const current = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedWorlds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getOwnedWorld"])(id);
        if (!current) return;
        await this.updateOwnedRecord(current, {
            id: current.worldId,
            name,
            data: ownedWorldToLegacyRecord(current).data,
            thumb: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$repositoryMedia$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dataUrlToBlob"])(current.thumbStorageKey),
            thumbStorageKey: current.thumbStorageKey ?? null
        });
    }
    async deleteWorld(id) {
        const ownerId = currentOwnerId();
        if (!ownerId) return;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedWorlds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteOwnedWorld"])(id);
        await this.cacheFor(ownerId).delete(id);
        this.ownerSyncedAt.set(ownerId, Date.now());
    }
    async loadWorldDocument(id, ownerAccountId = null) {
        const record = await this.loadWorld(id);
        if (!record) return null;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$domain$2f$cloudMappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["worldRecordToWorldDocument"])(record, ownerAccountId);
    }
    async saveWorldDocument(input) {
        return await this.saveWorld((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$domain$2f$cloudMappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["worldDocumentToSaveWorldInput"])(input));
    }
}
}),
"[project]/apps/web/src/components/VoxelEditor/repositories/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assetRepository",
    ()=>assetRepository,
    "worldRepository",
    ()=>worldRepository
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$remoteAssetRepository$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/repositories/remoteAssetRepository.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$remoteWorldRepository$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/repositories/remoteWorldRepository.ts [app-ssr] (ecmascript)");
;
;
const assetRepository = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$remoteAssetRepository$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RemoteAssetRepository"]();
const worldRepository = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$remoteWorldRepository$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RemoteWorldRepository"]();
}),
"[project]/apps/web/src/components/VoxelEditor/VoxelWorld.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VoxelWorld",
    ()=>VoxelWorld
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$Types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/Types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$domain$2f$buildAssetCompiledRender$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/domain/buildAssetCompiledRender.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$voxel$2d$core$2f$src$2f$buildAssetCompiledRender$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/voxel-core/src/buildAssetCompiledRender.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/repositories/index.ts [app-ssr] (ecmascript)");
;
;
;
;
// file scope constants
const DEFAULT_GROUP = "default";
// helpers
// identity
function makeRuntimeId() {
    const c = globalThis.crypto;
    if (c?.randomUUID) return c.randomUUID();
    return `instance_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}
// color helpers for deprecated blueprint tint
function hexToRgb24(hex) {
    const h = hex.startsWith("#") ? hex.slice(1) : hex;
    return parseInt(h, 16) & 0x00ffffff;
}
function rgb24ToHex(v) {
    const s = (v & 0x00ffffff).toString(16).padStart(6, "0");
    return `#${s}`;
}
function hexToRgb01(hex) {
    const v = hexToRgb24(hex);
    return {
        r: (v >> 16 & 255) / 255,
        g: (v >> 8 & 255) / 255,
        b: (v & 255) / 255
    };
}
function rgb01ToHex(r, g, b) {
    const R = Math.max(0, Math.min(255, Math.round(r * 255)));
    const G = Math.max(0, Math.min(255, Math.round(g * 255)));
    const B = Math.max(0, Math.min(255, Math.round(b * 255)));
    return `#${R.toString(16).padStart(2, "0")}${G.toString(16).padStart(2, "0")}${B.toString(16).padStart(2, "0")}`;
}
function clamp01(x) {
    return Math.min(1, Math.max(0, x));
}
function rgbToHsv(r, g, b) {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    let h = 0;
    if (d !== 0) {
        if (max === r) h = (g - b) / d % 6;
        else if (max === g) h = (b - r) / d + 2;
        else h = (r - g) / d + 4;
        h /= 6;
        if (h < 0) h += 1;
    }
    const s = max === 0 ? 0 : d / max;
    const v = max;
    return {
        h,
        s,
        v
    };
}
function hsvToRgb(h, s, v) {
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch(i % 6){
        case 0:
            return {
                r: v,
                g: t,
                b: p
            };
        case 1:
            return {
                r: q,
                g: v,
                b: p
            };
        case 2:
            return {
                r: p,
                g: v,
                b: t
            };
        case 3:
            return {
                r: p,
                g: q,
                b: v
            };
        case 4:
            return {
                r: t,
                g: p,
                b: v
            };
        case 5:
            return {
                r: v,
                g: p,
                b: q
            };
        default:
            return {
                r: v,
                g: t,
                b: p
            };
    }
}
function blueprintTint(hex) {
    const { r, g, b } = hexToRgb01(hex);
    const lum = clamp01(0.2126 * r + 0.7152 * g + 0.0722 * b);
    const hsv0 = rgbToHsv(r, g, b);
    const BLUE_MIN = 195 / 360;
    const BLUE_MAX = 225 / 360;
    const h2 = BLUE_MIN + hsv0.h * (BLUE_MAX - BLUE_MIN);
    const s2 = 0.6;
    const V_MIN = 0.72;
    const V_MAX = 0.995;
    const lum2 = Math.pow(lum, 0.9);
    const v2 = V_MIN + (V_MAX - V_MIN) * lum2;
    const bp = hsvToRgb(h2, s2, clamp01(v2));
    const bpMix = 0.6;
    let r2 = r * (1 - bpMix) + bp.r * bpMix;
    let g2 = g * (1 - bpMix) + bp.g * bpMix;
    let b2 = b * (1 - bpMix) + bp.b * bpMix;
    const lift = 1.1;
    r2 *= lift;
    g2 *= lift;
    b2 *= lift;
    return rgb01ToHex(clamp01(r2), clamp01(g2), clamp01(b2));
}
// rotation helpers
function normalizeQuarterTurn(v) {
    const n = ((v ?? 0) % 4 + 4) % 4;
    return n;
}
function normalizeRotation(r) {
    return {
        x: normalizeQuarterTurn(r?.x),
        y: normalizeQuarterTurn(r?.y),
        z: normalizeQuarterTurn(r?.z)
    };
}
function rotationToEuler(r) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Euler"](r.x * (Math.PI / 2), r.y * (Math.PI / 2), r.z * (Math.PI / 2), "XYZ");
}
class VoxelWorld {
    // fields 
    scene;
    groups = new Map();
    worldIndex = new Map();
    geometry;
    materialCache = new Map();
    renderCfg;
    // lifecycle
    constructor(scene, cfg){
        this.scene = scene;
        this.geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BoxGeometry"](1, 1, 1);
        this.renderCfg = {
            blueprintOpacity: cfg?.blueprintOpacity ?? 0.7,
            blueprintDepthWrite: cfg?.blueprintDepthWrite ?? false,
            blueprintTint: cfg?.blueprintTint ?? false,
            mode: cfg?.mode ?? "voxel"
        };
        this.ensureGroup(DEFAULT_GROUP, {
            x: 0,
            y: 0,
            z: 0
        });
    }
    dispose() {
        for (const g of this.groups.values()){
            this.disposeGroup(g);
        }
        this.groups.clear();
        this.worldIndex.clear();
        this.geometry.dispose();
        for (const m of this.materialCache.values())m.dispose();
        this.materialCache.clear();
    }
    clear() {
        for (const g of this.groups.values()){
            this.disposeGroup(g);
        }
        this.groups.clear();
        this.worldIndex.clear();
        this.ensureGroup(DEFAULT_GROUP, {
            x: 0,
            y: 0,
            z: 0
        });
    }
    // private internals
    disposeMeshOnly(mesh, opts) {
        if (!mesh) return;
        mesh.parent?.remove(mesh);
        mesh.geometry?.dispose();
        if (opts?.disposeMaterial) {
            if (Array.isArray(mesh.material)) {
                for (const material of mesh.material)material.dispose();
            } else {
                mesh.material.dispose();
            }
        }
    }
    clearCompiledArtifacts(group) {
        for (const mesh of group.compiledVisualMeshes){
            this.disposeMeshOnly(mesh);
        }
        group.compiledVisualMeshes = [];
        if (group.compiledPickMesh) {
            this.disposeMeshOnly(group.compiledPickMesh, {
                disposeMaterial: true
            });
            group.compiledPickMesh = null;
        }
    }
    disposeGroup(group) {
        this.clearCompiledArtifacts(group);
        for (const voxel of group.voxels.values()){
            if (voxel.mesh) {
                group.root.remove(voxel.mesh);
            }
        }
        group.voxels.clear();
        this.scene.remove(group.root);
    }
    applyGroupRootUserData(groupId, group) {
        group.root.userData.groupId = groupId;
        group.root.userData.instanceId = group.source.instanceId;
        group.root.userData.sourceAssetId = group.source.assetId;
        group.root.userData.sourceAssetKind = group.source.assetKind;
        group.root.userData.overrideAssetId = group.source.overrideAssetId;
        group.root.userData.renderAssetId = group.source.overrideAssetId ?? group.source.assetId ?? null;
        group.root.userData.logicTag = group.source.logicTag;
        group.root.userData.rotation = {
            ...group.rotation
        };
    }
    applyVoxelMeshUserData(params) {
        const { mesh, coord, local, groupId, isBlueprint, source } = params;
        mesh.userData.coord = {
            ...coord
        };
        mesh.userData.isBlueprint = isBlueprint;
        mesh.userData.groupId = groupId;
        mesh.userData.local = {
            ...local
        };
        mesh.userData.instanceId = source.instanceId;
        mesh.userData.sourceAssetId = source.assetId;
        mesh.userData.sourceAssetKind = source.assetKind;
        mesh.userData.overrideAssetId = source.overrideAssetId;
        mesh.userData.renderAssetId = source.overrideAssetId ?? source.assetId ?? null;
        mesh.userData.logicTag = source.logicTag;
    }
    buildPickMeshFromCompiledRender(groupId, source, compiledRender) {
        if (!compiledRender.surfaces.length) return null;
        const positions = [];
        const normals = [];
        const indices = [];
        let vertexOffset = 0;
        for (const surface of compiledRender.surfaces){
            positions.push(...surface.positions);
            normals.push(...surface.normals);
            for (const index of surface.indices){
                indices.push(index + vertexOffset);
            }
            vertexOffset += surface.vertexCount;
        }
        if (!positions.length || !indices.length) return null;
        const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"]();
        geometry.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](positions, 3));
        geometry.setAttribute("normal", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](normals, 3));
        geometry.setIndex(indices);
        geometry.computeBoundingSphere();
        const material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            transparent: true,
            opacity: 0,
            depthWrite: false,
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DoubleSide"]
        });
        material.colorWrite = false;
        const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](geometry, material);
        mesh.name = `voxel-group-pick:${groupId}`;
        this.applyVoxelMeshUserData({
            mesh,
            coord: {
                x: 0,
                y: 0,
                z: 0
            },
            local: {
                x: 0,
                y: 0,
                z: 0
            },
            groupId,
            isBlueprint: false,
            source
        });
        return mesh;
    }
    syncCompiledGroupRender(groupId, group) {
        if (this.renderCfg.mode !== "compiled") return;
        this.clearCompiledArtifacts(group);
        const snapshot = this.getGroupSnapshot(groupId);
        const compiledRender = group.compiledRender ?? (snapshot ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$voxel$2d$core$2f$src$2f$buildAssetCompiledRender$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildAssetCompiledRender"])(snapshot) : null);
        group.compiledRender = compiledRender;
        if (!compiledRender || !compiledRender.surfaces.length) return;
        for (const surface of compiledRender.surfaces){
            const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            geometry.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](surface.positions, 3));
            geometry.setAttribute("normal", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](surface.normals, 3));
            geometry.setIndex(surface.indices);
            geometry.computeBoundingSphere();
            const material = this.getMaterial(surface.color, surface.isBlueprint);
            const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](geometry, material);
            mesh.castShadow = !surface.isBlueprint;
            mesh.receiveShadow = true;
            mesh.renderOrder = surface.isBlueprint ? 1 : 0;
            mesh.userData.groupId = groupId;
            mesh.userData.instanceId = group.source.instanceId;
            mesh.userData.sourceAssetId = group.source.assetId;
            mesh.userData.sourceAssetKind = group.source.assetKind;
            mesh.userData.overrideAssetId = group.source.overrideAssetId;
            mesh.userData.renderAssetId = group.source.overrideAssetId ?? group.source.assetId ?? null;
            mesh.userData.logicTag = group.source.logicTag;
            group.root.add(mesh);
            group.compiledVisualMeshes.push(mesh);
        }
        const pickMesh = this.buildPickMeshFromCompiledRender(groupId, group.source, compiledRender);
        if (pickMesh) {
            group.root.add(pickMesh);
            group.compiledPickMesh = pickMesh;
        }
    }
    ensureGroup(groupId, position) {
        let g = this.groups.get(groupId);
        if (g) return g;
        const instanceId = makeRuntimeId();
        const rotation = normalizeRotation();
        const root = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
        root.name = `voxel-group:${groupId}`;
        root.position.set(position.x, position.y, position.z);
        const euler = rotationToEuler(rotation);
        root.rotation.set(euler.x, euler.y, euler.z);
        this.scene.add(root);
        g = {
            position: {
                ...position
            },
            rotation,
            root,
            voxels: new Map(),
            compiledRender: null,
            compiledVisualMeshes: [],
            compiledPickMesh: null,
            source: {
                instanceId,
                assetId: null,
                assetKind: null,
                overrideAssetId: null,
                logicTag: null
            }
        };
        this.applyGroupRootUserData(groupId, g);
        this.groups.set(groupId, g);
        return g;
    }
    getMaterial(color, isBlueprint) {
        const key = `${color}|${isBlueprint ? "bp" : "solid"}|${isBlueprint ? this.renderCfg.blueprintOpacity : 1}`;
        let mat = this.materialCache.get(key);
        if (mat) return mat;
        const displayColor = isBlueprint && this.renderCfg.blueprintTint ? blueprintTint(color) : color;
        mat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"](displayColor),
            transparent: isBlueprint,
            opacity: isBlueprint ? this.renderCfg.blueprintOpacity : 0.7
        });
        if (isBlueprint) {
            mat.depthWrite = this.renderCfg.blueprintDepthWrite;
        }
        this.materialCache.set(key, mat);
        return mat;
    }
    worldFrom(groupPos, local) {
        return {
            x: groupPos.x + local.x,
            y: groupPos.y + local.y,
            z: groupPos.z + local.z
        };
    }
    normalizeGroupIdBase(base) {
        const b = (base ?? "").trim();
        const safe = b.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_\-]/g, "").slice(0, 48);
        return safe || "group";
    }
    // group identity
    makeUniqueGroupId(base = "group") {
        let root = this.normalizeGroupIdBase(base);
        if (root === DEFAULT_GROUP) root = "group";
        let candidate = root;
        let i = 1;
        while(this.groups.has(candidate)){
            candidate = `${root}_${i++}`;
        }
        return candidate;
    }
    createGroup(position, baseId = "group") {
        const gid = this.makeUniqueGroupId(baseId);
        this.addGroup(gid, position);
        return gid;
    }
    addGroup(groupId, position) {
        this.ensureGroup(groupId, position);
    }
    removeGroup(groupId) {
        const g = this.groups.get(groupId);
        if (!g) return false;
        const gp = g.position;
        for (const v of g.voxels.values()){
            const world = this.worldFrom(gp, v.local);
            this.worldIndex.delete((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$Types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyOf"])(world));
        }
        this.disposeGroup(g);
        this.groups.delete(groupId);
        return true;
    }
    listGroupIds() {
        return Array.from(this.groups.keys());
    }
    // instantiation
    getGroupSnapshot(groupId) {
        const g = this.groups.get(groupId);
        if (!g) return null;
        const voxels = [];
        for (const v of g.voxels.values()){
            voxels.push({
                local: {
                    ...v.local
                },
                color: v.color,
                isBlueprint: v.isBlueprint
            });
        }
        return {
            groupId,
            position: {
                ...g.position
            },
            voxels
        };
    }
    setGroupVoxelsLocal(groupId, voxels, opts) {
        const keepPosition = opts?.keepPosition ?? true;
        const existing = this.groups.get(groupId);
        if (existing && !keepPosition) {
            const ok = this.setGroupPosition(groupId, {
                x: 0,
                y: 0,
                z: 0
            });
            if (!ok) return false;
        }
        const g = this.ensureGroup(groupId, this.getGroupPosition(groupId));
        const gp = g.position;
        for (const v of g.voxels.values()){
            const world = this.worldFrom(gp, v.local);
            this.worldIndex.delete((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$Types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyOf"])(world));
            if (v.mesh) {
                g.root.remove(v.mesh);
            }
        }
        g.voxels.clear();
        this.clearCompiledArtifacts(g);
        for (const v of voxels){
            this.addVoxelLocal(groupId, v.local, v.color, {
                isBlueprint: v.isBlueprint
            });
        }
        if (this.renderCfg.mode === "compiled") {
            g.compiledRender = opts?.compiledRender ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$voxel$2d$core$2f$src$2f$buildAssetCompiledRender$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildAssetCompiledRender"])({
                groupId,
                position: {
                    ...g.position
                },
                voxels
            });
            this.syncCompiledGroupRender(groupId, g);
        }
        return true;
    }
    instantiateGroupState(state, opts) {
        const base = opts.baseId ?? state.groupId ?? "asset";
        const gid = this.makeUniqueGroupId(base);
        this.addGroup(gid, {
            ...opts.at
        });
        this.setGroupRotation(gid, opts.rotation ?? {
            x: 0,
            y: 0,
            z: 0
        });
        this.setGroupSource(gid, {
            instanceId: opts.instanceId ?? makeRuntimeId(),
            assetId: opts.sourceAssetId ?? null,
            assetKind: opts.sourceAssetKind ?? null,
            logicTag: opts.logicTag ?? null
        });
        this.setGroupVoxelsLocal(gid, state.voxels, {
            keepPosition: true,
            compiledRender: opts.compiledRender ?? null
        });
        return gid;
    }
    // group level actions
    getGroupPosition(groupId) {
        return this.groups.get(groupId)?.position ?? {
            x: 0,
            y: 0,
            z: 0
        };
    }
    setGroupPosition(groupId, position) {
        const g = this.groups.get(groupId);
        if (!g) return false;
        const oldPos = g.position;
        if (oldPos.x === position.x && oldPos.y === position.y && oldPos.z === position.z) return true;
        for (const v of g.voxels.values()){
            const world = {
                x: oldPos.x + v.local.x,
                y: oldPos.y + v.local.y,
                z: oldPos.z + v.local.z
            };
            this.worldIndex.delete((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$Types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyOf"])(world));
        }
        g.position = {
            ...position
        };
        g.root.position.set(position.x, position.y, position.z);
        for (const v of g.voxels.values()){
            const world = {
                x: position.x + v.local.x,
                y: position.y + v.local.y,
                z: position.z + v.local.z
            };
            this.worldIndex.set((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$Types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyOf"])(world), v);
            if (v.mesh) {
                this.applyVoxelMeshUserData({
                    mesh: v.mesh,
                    coord: world,
                    local: v.local,
                    groupId,
                    isBlueprint: v.isBlueprint,
                    source: g.source
                });
            }
        }
        return true;
    }
    getGroupRotation(groupId) {
        const g = this.groups.get(groupId);
        return g ? {
            ...g.rotation
        } : {
            x: 0,
            y: 0,
            z: 0
        };
    }
    setGroupRotation(groupId, rotation) {
        const g = this.groups.get(groupId);
        if (!g) return false;
        g.rotation = normalizeRotation({
            ...g.rotation,
            ...rotation
        });
        const euler = rotationToEuler(g.rotation);
        g.root.rotation.set(euler.x, euler.y, euler.z);
        return true;
    }
    getGroupSource(groupId) {
        const g = this.groups.get(groupId);
        if (!g) return null;
        return {
            ...g.source
        };
    }
    setGroupSource(groupId, source) {
        const g = this.groups.get(groupId);
        if (!g) return false;
        g.source = {
            instanceId: source.instanceId !== undefined ? source.instanceId : g.source.instanceId,
            assetId: source.assetId !== undefined ? source.assetId : g.source.assetId,
            assetKind: source.assetKind !== undefined ? source.assetKind : g.source.assetKind,
            overrideAssetId: source.overrideAssetId !== undefined ? source.overrideAssetId : g.source.overrideAssetId,
            logicTag: source.logicTag !== undefined ? source.logicTag : g.source.logicTag
        };
        this.applyGroupRootUserData(groupId, g);
        for (const v of g.voxels.values()){
            const world = this.worldFrom(g.position, v.local);
            if (v.mesh) {
                this.applyVoxelMeshUserData({
                    mesh: v.mesh,
                    coord: world,
                    local: v.local,
                    groupId,
                    isBlueprint: v.isBlueprint,
                    source: g.source
                });
            }
        }
        if (g.compiledPickMesh) {
            this.applyVoxelMeshUserData({
                mesh: g.compiledPickMesh,
                coord: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                local: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                groupId,
                isBlueprint: false,
                source: g.source
            });
        }
        for (const mesh of g.compiledVisualMeshes){
            mesh.userData.instanceId = g.source.instanceId;
            mesh.userData.sourceAssetId = g.source.assetId;
            mesh.userData.sourceAssetKind = g.source.assetKind;
            mesh.userData.overrideAssetId = g.source.overrideAssetId;
            mesh.userData.renderAssetId = g.source.overrideAssetId ?? g.source.assetId ?? null;
            mesh.userData.logicTag = g.source.logicTag;
        }
        return true;
    }
    clearGroupSource(groupId) {
        return this.setGroupSource(groupId, {
            assetId: null,
            assetKind: null,
            overrideAssetId: null,
            logicTag: null
        });
    }
    getGroupLogicTag(groupId) {
        return this.groups.get(groupId)?.source.logicTag ?? null;
    }
    setGroupLogicTag(groupId, logicTag) {
        return this.setGroupSource(groupId, {
            logicTag
        });
    }
    rotateGroup90(groupId, axis, dir) {
        const g = this.groups.get(groupId);
        if (!g) return false;
        const next = {
            ...g.rotation
        };
        next[axis] = normalizeQuarterTurn(next[axis] + dir);
        return this.setGroupRotation(groupId, next);
    }
    // voxel level actions
    has(coord) {
        return this.worldIndex.has((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$Types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyOf"])(coord));
    }
    get(coord) {
        const v = this.worldIndex.get((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$Types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyOf"])(coord));
        if (!v) return undefined;
        const g = this.groups.get(v.groupId);
        const gp = g?.position ?? {
            x: 0,
            y: 0,
            z: 0
        };
        return {
            coord,
            color: v.color,
            mesh: v.mesh,
            isBlueprint: v.isBlueprint,
            groupId: v.groupId,
            local: {
                ...v.local
            },
            groupPosition: {
                ...gp
            },
            sourceAssetId: g?.source.assetId ?? null,
            sourceAssetKind: g?.source.assetKind ?? null,
            overrideAssetId: g?.source.overrideAssetId ?? null,
            logicTag: g?.source.logicTag ?? null
        };
    }
    addVoxel(coord, color, opts) {
        const groupId = opts?.groupId ?? DEFAULT_GROUP;
        const g = this.ensureGroup(groupId, {
            x: 0,
            y: 0,
            z: 0
        });
        const local = {
            x: coord.x - g.position.x,
            y: coord.y - g.position.y,
            z: coord.z - g.position.z
        };
        return this.addVoxelLocal(groupId, local, color, {
            isBlueprint: opts?.isBlueprint
        });
    }
    addVoxelLocal(groupId, local, color, opts) {
        const g = this.ensureGroup(groupId, {
            x: 0,
            y: 0,
            z: 0
        });
        const world = this.worldFrom(g.position, local);
        const worldKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$Types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyOf"])(world);
        if (this.worldIndex.has(worldKey)) return false;
        const localKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$Types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyOf"])(local);
        if (g.voxels.has(localKey)) return false;
        const isBlueprint = !!opts?.isBlueprint;
        let mesh = null;
        if (this.renderCfg.mode === "voxel") {
            const mat = this.getMaterial(color, isBlueprint);
            mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](this.geometry, mat);
            mesh.position.set(local.x + 0.5, local.y + 0.5, local.z + 0.5);
            mesh.castShadow = !isBlueprint;
            mesh.receiveShadow = true;
            mesh.renderOrder = isBlueprint ? 1 : 0;
            this.applyVoxelMeshUserData({
                mesh,
                coord: world,
                local,
                groupId,
                isBlueprint,
                source: g.source
            });
            g.root.add(mesh);
        }
        const rec = {
            local: {
                ...local
            },
            color,
            mesh,
            isBlueprint,
            groupId
        };
        g.voxels.set(localKey, rec);
        this.worldIndex.set(worldKey, rec);
        if (this.renderCfg.mode === "compiled") {
            g.compiledRender = null;
        }
        return true;
    }
    removeVoxel(coord) {
        const worldKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$Types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyOf"])(coord);
        const v = this.worldIndex.get(worldKey);
        if (!v) return;
        const g = this.groups.get(v.groupId);
        if (!g) {
            this.worldIndex.delete(worldKey);
            return;
        }
        const localKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$Types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyOf"])(v.local);
        if (v.mesh) {
            g.root.remove(v.mesh);
        }
        g.voxels.delete(localKey);
        this.worldIndex.delete(worldKey);
        if (this.renderCfg.mode === "compiled") {
            g.compiledRender = null;
            this.syncCompiledGroupRender(v.groupId, g);
        }
    }
    isBlueprint(coord) {
        return this.worldIndex.get((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$Types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyOf"])(coord))?.isBlueprint ?? false;
    }
    setIsBlueprint(coord, isBlueprint) {
        const v = this.worldIndex.get((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$Types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyOf"])(coord));
        if (!v) return;
        if (v.isBlueprint === isBlueprint) return;
        v.isBlueprint = isBlueprint;
        if (v.mesh) {
            v.mesh.material = this.getMaterial(v.color, isBlueprint);
            v.mesh.castShadow = !isBlueprint;
            v.mesh.renderOrder = isBlueprint ? 1 : 0;
            v.mesh.userData.isBlueprint = isBlueprint;
        }
        const group = this.groups.get(v.groupId);
        if (this.renderCfg.mode === "compiled" && group) {
            group.compiledRender = null;
            this.syncCompiledGroupRender(v.groupId, group);
        }
    }
    setColor(coord, color) {
        const v = this.worldIndex.get((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$Types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyOf"])(coord));
        if (!v) return;
        if (v.color === color) return;
        v.color = color;
        if (v.mesh) {
            v.mesh.material = this.getMaterial(v.color, v.isBlueprint);
        }
        const group = this.groups.get(v.groupId);
        if (this.renderCfg.mode === "compiled" && group) {
            group.compiledRender = null;
            this.syncCompiledGroupRender(v.groupId, group);
        }
    }
    getGroupId(coord) {
        return this.worldIndex.get((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$Types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyOf"])(coord))?.groupId ?? DEFAULT_GROUP;
    }
    setGroupId(coord, nextGroupId) {
        const worldKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$Types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyOf"])(coord);
        const v = this.worldIndex.get(worldKey);
        if (!v) return;
        if (v.groupId === nextGroupId) return;
        const from = this.groups.get(v.groupId);
        if (!from) return;
        const to = this.ensureGroup(nextGroupId, {
            x: 0,
            y: 0,
            z: 0
        });
        const nextLocal = {
            x: coord.x - to.position.x,
            y: coord.y - to.position.y,
            z: coord.z - to.position.z
        };
        const nextLocalKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$Types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyOf"])(nextLocal);
        if (to.voxels.has(nextLocalKey)) return;
        if (this.worldIndex.get(worldKey)?.groupId !== v.groupId) return;
        if (v.mesh) {
            from.root.remove(v.mesh);
        }
        from.voxels.delete((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$Types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyOf"])(v.local));
        v.groupId = nextGroupId;
        v.local = {
            ...nextLocal
        };
        if (v.mesh) {
            v.mesh.position.set(nextLocal.x + 0.5, nextLocal.y + 0.5, nextLocal.z + 0.5);
            this.applyVoxelMeshUserData({
                mesh: v.mesh,
                coord: coord,
                local: nextLocal,
                groupId: nextGroupId,
                isBlueprint: v.isBlueprint,
                source: to.source
            });
            to.root.add(v.mesh);
        }
        to.voxels.set(nextLocalKey, v);
        this.worldIndex.set(worldKey, v);
        if (this.renderCfg.mode === "compiled") {
            from.compiledRender = null;
            to.compiledRender = null;
            this.syncCompiledGroupRender(v.groupId, to);
            this.syncCompiledGroupRender(from.root.userData.groupId, from);
        }
    }
    rotateGroupLocals90(groupId, axis, dir) {
        const g = this.groups.get(groupId);
        if (!g) return false;
        const gp = g.position;
        const rot = (p)=>{
            const x = p.x | 0, y = p.y | 0, z = p.z | 0;
            if (axis === "y") {
                return dir === 1 ? {
                    x: z,
                    y,
                    z: -x
                } : {
                    x: -z,
                    y,
                    z: x
                };
            }
            if (axis === "x") {
                return dir === 1 ? {
                    x,
                    y: z,
                    z: -y
                } : {
                    x,
                    y: -z,
                    z: y
                };
            }
            return dir === 1 ? {
                x: y,
                y: -x,
                z
            } : {
                x: -y,
                y: x,
                z
            };
        };
        for (const v of g.voxels.values()){
            const worldOld = this.worldFrom(gp, v.local);
            this.worldIndex.delete((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$Types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyOf"])(worldOld));
        }
        const nextVoxels = new Map();
        for (const v of g.voxels.values()){
            const nextLocal = rot(v.local);
            const nextLocalKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$Types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyOf"])(nextLocal);
            if (nextVoxels.has(nextLocalKey)) {
                for (const vv of g.voxels.values()){
                    const world = this.worldFrom(gp, vv.local);
                    this.worldIndex.set((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$Types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyOf"])(world), vv);
                }
                return false;
            }
            v.local = {
                ...nextLocal
            };
            if (v.mesh) {
                v.mesh.position.set(nextLocal.x + 0.5, nextLocal.y + 0.5, nextLocal.z + 0.5);
            }
            const worldNew = this.worldFrom(gp, nextLocal);
            if (v.mesh) {
                this.applyVoxelMeshUserData({
                    mesh: v.mesh,
                    coord: worldNew,
                    local: nextLocal,
                    groupId,
                    isBlueprint: v.isBlueprint,
                    source: g.source
                });
            }
            nextVoxels.set(nextLocalKey, v);
            this.worldIndex.set((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$Types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyOf"])(worldNew), v);
        }
        g.voxels = nextVoxels;
        if (this.renderCfg.mode === "compiled") {
            g.compiledRender = null;
            this.syncCompiledGroupRender(groupId, g);
        }
        return true;
    }
    listMeshes() {
        const out = [];
        for (const g of this.groups.values()){
            if (this.renderCfg.mode === "compiled") {
                if (g.compiledPickMesh) out.push(g.compiledPickMesh);
                continue;
            }
            for (const v of g.voxels.values()){
                if (v.mesh) out.push(v.mesh);
            }
        }
        return out;
    }
    // group bounds
    getGroupBounds(groupId) {
        const g = this.groups.get(groupId);
        if (!g || g.voxels.size === 0) return null;
        g.root.updateMatrixWorld(true);
        let minX = Infinity, minY = Infinity, minZ = Infinity;
        let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
        const p = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]();
        for (const v of g.voxels.values()){
            p.set(v.local.x + 0.5, v.local.y + 0.5, v.local.z + 0.5);
            p.applyMatrix4(g.root.matrixWorld);
            const vxMin = p.x - 0.5;
            const vyMin = p.y - 0.5;
            const vzMin = p.z - 0.5;
            const vxMax = p.x + 0.5;
            const vyMax = p.y + 0.5;
            const vzMax = p.z + 0.5;
            minX = Math.min(minX, vxMin);
            minY = Math.min(minY, vyMin);
            minZ = Math.min(minZ, vzMin);
            maxX = Math.max(maxX, vxMax);
            maxY = Math.max(maxY, vyMax);
            maxZ = Math.max(maxZ, vzMax);
        }
        return {
            min: {
                x: Math.floor(minX),
                y: Math.floor(minY),
                z: Math.floor(minZ)
            },
            max: {
                x: Math.ceil(maxX) - 1,
                y: Math.ceil(maxY) - 1,
                z: Math.ceil(maxZ) - 1
            }
        };
    }
    getAllGroupBounds() {
        const out = new Map();
        for (const [groupId] of this.groups.entries()){
            const b = this.getGroupBounds(groupId);
            if (b) out.set(groupId, b);
        }
        return out;
    }
    getPublishedGroupBounds(groupId) {
        const g = this.groups.get(groupId);
        if (!g || g.voxels.size === 0) return null;
        g.root.updateMatrixWorld(true);
        let minX = Infinity, minY = Infinity, minZ = Infinity;
        let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
        const p = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]();
        let found = false;
        for (const v of g.voxels.values()){
            if (v.isBlueprint) continue;
            found = true;
            p.set(v.local.x + 0.5, v.local.y + 0.5, v.local.z + 0.5);
            p.applyMatrix4(g.root.matrixWorld);
            const vxMin = p.x - 0.5;
            const vyMin = p.y - 0.5;
            const vzMin = p.z - 0.5;
            const vxMax = p.x + 0.5;
            const vyMax = p.y + 0.5;
            const vzMax = p.z + 0.5;
            minX = Math.min(minX, vxMin);
            minY = Math.min(minY, vyMin);
            minZ = Math.min(minZ, vzMin);
            maxX = Math.max(maxX, vxMax);
            maxY = Math.max(maxY, vyMax);
            maxZ = Math.max(maxZ, vzMax);
        }
        if (!found) return null;
        return {
            min: {
                x: Math.floor(minX),
                y: Math.floor(minY),
                z: Math.floor(minZ)
            },
            max: {
                x: Math.ceil(maxX) - 1,
                y: Math.ceil(maxY) - 1,
                z: Math.ceil(maxZ) - 1
            }
        };
    }
    // world persistence
    exportPacked() {
        let n = 0;
        for (const g of this.groups.values())n += g.voxels.size;
        const localPositions = new Int32Array(n * 3);
        const colors = new Uint32Array(n);
        const blueprints = new Uint8Array(n);
        const groupTable = [];
        const groupIndex = new Map();
        const ensureGroupIndex = (gid)=>{
            let idx = groupIndex.get(gid);
            if (idx != null) return idx;
            idx = groupTable.length;
            groupTable.push(gid);
            groupIndex.set(gid, idx);
            return idx;
        };
        const all = this.listGroupIds();
        all.sort();
        for (const gid of all)ensureGroupIndex(gid);
        const groupPositions = new Int32Array(groupTable.length * 3);
        for(let gi = 0; gi < groupTable.length; gi++){
            const gid = groupTable[gi];
            const gp = this.getGroupPosition(gid);
            groupPositions[gi * 3 + 0] = gp.x | 0;
            groupPositions[gi * 3 + 1] = gp.y | 0;
            groupPositions[gi * 3 + 2] = gp.z | 0;
        }
        const groupIds = new Uint32Array(n);
        let i = 0;
        for (const gid of groupTable){
            const g = this.groups.get(gid);
            if (!g) continue;
            const gi = ensureGroupIndex(gid);
            for (const v of g.voxels.values()){
                localPositions[i * 3 + 0] = v.local.x | 0;
                localPositions[i * 3 + 1] = v.local.y | 0;
                localPositions[i * 3 + 2] = v.local.z | 0;
                colors[i] = hexToRgb24(v.color);
                blueprints[i] = v.isBlueprint ? 1 : 0;
                groupIds[i] = gi;
                i++;
            }
        }
        return {
            localPositions,
            colors,
            blueprints,
            groupIds,
            groupTable,
            groupPositions
        };
    }
    importPacked(packed) {
        this.clear();
        const { localPositions: positions, colors } = packed;
        const bp = packed.blueprints;
        const groupIds = packed.groupIds;
        const groupTable = packed.groupTable;
        const groupPositions = packed.groupPositions;
        if (groupTable && groupTable.length) {
            for(let gi = 0; gi < groupTable.length; gi++){
                const gid = groupTable[gi] ?? DEFAULT_GROUP;
                const x = groupPositions ? groupPositions[gi * 3 + 0] : 0;
                const y = groupPositions ? groupPositions[gi * 3 + 1] : 0;
                const z = groupPositions ? groupPositions[gi * 3 + 2] : 0;
                this.addGroup(gid, {
                    x,
                    y,
                    z
                });
            }
        } else {
            this.addGroup(DEFAULT_GROUP, {
                x: 0,
                y: 0,
                z: 0
            });
        }
        const n = Math.min(colors.length, Math.floor(positions.length / 3));
        for(let i = 0; i < n; i++){
            const lx = positions[i * 3 + 0] | 0;
            const ly = positions[i * 3 + 1] | 0;
            const lz = positions[i * 3 + 2] | 0;
            const color = rgb24ToHex(colors[i]);
            const isBlueprint = bp ? bp[i] === 1 : false;
            let gid = DEFAULT_GROUP;
            if (groupIds && groupTable) {
                gid = groupTable[groupIds[i] ?? 0] ?? DEFAULT_GROUP;
            }
            this.addVoxelLocal(gid, {
                x: lx,
                y: ly,
                z: lz
            }, color, {
                isBlueprint
            });
        }
    }
    transformCompiledBoundsToWorld(bounds, position, rotation) {
        if (!bounds) return null;
        const matrix = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Matrix4"]().makeRotationFromEuler(rotationToEuler(rotation)).setPosition(position.x, position.y, position.z);
        const box = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box3"]();
        const corners = [
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](bounds.min.x, bounds.min.y, bounds.min.z),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](bounds.min.x, bounds.min.y, bounds.max.z + 1),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](bounds.min.x, bounds.max.y + 1, bounds.min.z),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](bounds.min.x, bounds.max.y + 1, bounds.max.z + 1),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](bounds.max.x + 1, bounds.min.y, bounds.min.z),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](bounds.max.x + 1, bounds.min.y, bounds.max.z + 1),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](bounds.max.x + 1, bounds.max.y + 1, bounds.min.z),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](bounds.max.x + 1, bounds.max.y + 1, bounds.max.z + 1)
        ];
        for (const corner of corners){
            box.expandByPoint(corner.applyMatrix4(matrix));
        }
        return {
            min: {
                x: Math.floor(box.min.x),
                y: Math.floor(box.min.y),
                z: Math.floor(box.min.z)
            },
            max: {
                x: Math.ceil(box.max.x) - 1,
                y: Math.ceil(box.max.y) - 1,
                z: Math.ceil(box.max.z) - 1
            }
        };
    }
    exportWorldData() {
        const instances = [];
        for (const [groupId, g] of this.groups.entries()){
            if (groupId === DEFAULT_GROUP) continue;
            if (!g.voxels.size) continue;
            if (!g.source.assetId || !g.source.assetKind) continue;
            instances.push({
                instanceId: g.source.instanceId,
                assetId: g.source.assetId,
                assetKind: g.source.assetKind,
                overrideAssetId: g.source.overrideAssetId ?? null,
                logicTag: g.source.logicTag ?? null,
                position: {
                    ...g.position
                },
                rotation: {
                    ...g.rotation
                }
            });
        }
        return {
            instances
        };
    }
    async importWorldData(data) {
        this.clear();
        for (const inst of data.instances){
            if (!inst.assetId || !inst.assetKind) continue;
            const renderAssetId = inst.overrideAssetId ?? inst.assetId;
            const loaded = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].loadAsset(renderAssetId);
            if (!loaded) {
                console.warn("Missing asset while importing world:", renderAssetId);
                continue;
            }
            this.instantiateGroupState(loaded.group, {
                at: inst.position,
                baseId: loaded.meta.name,
                instanceId: inst.instanceId,
                sourceAssetId: inst.assetId,
                sourceAssetKind: inst.assetKind,
                logicTag: inst.logicTag ?? null,
                rotation: inst.rotation ?? {
                    x: 0,
                    y: 0,
                    z: 0
                },
                compiledRender: loaded.compiledRender
            });
            const gid = this.listGroupIds().at(-1);
            if (!gid) continue;
            this.setGroupSource(gid, {
                instanceId: inst.instanceId,
                assetId: inst.assetId,
                assetKind: inst.assetKind,
                overrideAssetId: inst.overrideAssetId ?? null,
                logicTag: inst.logicTag ?? null
            });
        }
    }
    async refreshInstancesFromSourceAsset(params) {
        const { sourceAssetId, nextAssetId, nextAssetKind, skipGroupId = null, includeOverridden = false } = params;
        const resolvedAssetId = nextAssetId ?? sourceAssetId;
        const loaded = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].loadAsset(resolvedAssetId);
        if (!loaded) {
            console.warn("Missing asset while refreshing instances:", resolvedAssetId);
            return [];
        }
        const touched = [];
        for (const [groupId, g] of this.groups.entries()){
            if (groupId === DEFAULT_GROUP) continue;
            if (skipGroupId && groupId === skipGroupId) continue;
            if (g.source.assetId !== sourceAssetId) continue;
            const hasOverride = !!g.source.overrideAssetId;
            if (hasOverride && !includeOverridden) continue;
            this.setGroupVoxelsLocal(groupId, loaded.group.voxels, {
                keepPosition: true,
                compiledRender: loaded.compiledRender
            });
            if (nextAssetId !== undefined || nextAssetKind !== undefined) {
                this.setGroupSource(groupId, {
                    assetId: nextAssetId !== undefined ? nextAssetId : g.source.assetId,
                    assetKind: nextAssetKind !== undefined ? nextAssetKind : g.source.assetKind
                });
            }
            touched.push(groupId);
        }
        return touched;
    }
    // publishing
    async getPublishedWorldSnapshot() {
        const groups = [];
        const latestMarketplaceAssetIdsSet = new Set();
        let voxelCount = 0;
        for (const [groupId, g] of this.groups.entries()){
            if (groupId === DEFAULT_GROUP) continue;
            if (!g.voxels.size) continue;
            const baked = await this.getPublishedBakedGroupSnapshot(groupId);
            if (!baked) continue;
            if (baked.latestMarketplaceAssetId) {
                latestMarketplaceAssetIdsSet.add(baked.latestMarketplaceAssetId);
            }
            voxelCount += baked.voxelCount;
            groups.push(baked);
        }
        return {
            voxelCount,
            latestMarketplaceAssetIds: Array.from(latestMarketplaceAssetIdsSet),
            groups
        };
    }
    // private publishing helpers
    async getPublishedBakedGroupSnapshot(groupId) {
        const g = this.groups.get(groupId);
        if (!g || !g.voxels.size) return null;
        const renderAssetId = g.source.overrideAssetId ?? g.source.assetId ?? null;
        if (!renderAssetId) return null;
        const loaded = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].loadAsset(renderAssetId);
        if (!loaded) return null;
        const compiledRender = loaded.compiledRender ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$voxel$2d$core$2f$src$2f$buildAssetCompiledRender$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildAssetCompiledRender"])(loaded.group);
        if (!compiledRender.surfaces.length) return null;
        return {
            groupId,
            renderAssetId,
            latestMarketplaceAssetId: await this.getLatestMarketplaceAssetIdForGroup(groupId),
            assetKind: g.source.assetKind ?? null,
            logicTag: g.source.logicTag ?? null,
            position: {
                ...g.position
            },
            rotation: {
                ...g.rotation
            },
            bounds: this.transformCompiledBoundsToWorld(compiledRender.bounds, g.position, g.rotation),
            voxelCount: compiledRender.voxelCount,
            surfaces: compiledRender.surfaces
        };
    }
    async getLatestMarketplaceAssetIdForGroup(groupId) {
        const g = this.groups.get(groupId);
        if (!g) return null;
        const assetId = g.source.assetId;
        if (!assetId) return null;
        try {
            const meta = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].getAssetMeta(assetId);
            const linkedMarketplaceAssetId = meta?.linkedMarketplaceAssetId;
            if (typeof linkedMarketplaceAssetId === "string" && linkedMarketplaceAssetId.trim()) {
                return linkedMarketplaceAssetId;
            }
            const lineage = meta?.lineageAssetIds;
            if (Array.isArray(lineage) && lineage.length > 0) {
                const first = lineage[0];
                return typeof first === "string" && first.trim() ? first : null;
            }
            return null;
        } catch (err) {
            console.warn("Failed to resolve latest marketplace lineage for asset:", assetId, err);
            return null;
        }
    }
}
}),
"[project]/apps/web/src/components/VoxelEditor/vox/voxImport.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseVox",
    ()=>parseVox
]);
class R {
    dv;
    o = 0;
    td = new TextDecoder();
    constructor(buf){
        this.dv = new DataView(buf);
    }
    u8() {
        const v = this.dv.getUint8(this.o);
        this.o += 1;
        return v;
    }
    i32() {
        const v = this.dv.getInt32(this.o, true);
        this.o += 4;
        return v;
    }
    u32() {
        const v = this.dv.getUint32(this.o, true);
        this.o += 4;
        return v;
    }
    str(len) {
        const bytes = new Uint8Array(this.dv.buffer, this.o, len);
        this.o += len;
        return this.td.decode(bytes);
    }
    id4() {
        return this.str(4);
    }
    dict() {
        const n = this.i32();
        const out = {};
        for(let i = 0; i < n; i++){
            const k = this.str(this.i32());
            const v = this.str(this.i32());
            out[k] = v;
        }
        return out;
    }
}
function isExposedToAir(x, y, z, occupied) {
    return !occupied.has(`${x + 1}|${y}|${z}`) || !occupied.has(`${x - 1}|${y}|${z}`) || !occupied.has(`${x}|${y + 1}|${z}`) || !occupied.has(`${x}|${y - 1}|${z}`) || !occupied.has(`${x}|${y}|${z + 1}`) || !occupied.has(`${x}|${y}|${z - 1}`);
}
function parseTranslation(s) {
    if (!s) return {
        x: 0,
        y: 0,
        z: 0
    };
    const parts = s.trim().split(/\s+/).map((n)=>parseInt(n, 10));
    return {
        x: parts[0] || 0,
        y: parts[1] || 0,
        z: parts[2] || 0
    };
}
function rotatePaletteRightBy1(p) {
    const out = p.slice();
    const last = out[255];
    for(let i = 255; i > 0; i--)out[i] = out[i - 1];
    out[0] = {
        ...last,
        a: 0
    };
    return out;
}
const ID3 = [
    1,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    1
];
function decodePackedRotation(packed) {
    const i0 = packed >> 0 & 0x3;
    const i1 = packed >> 2 & 0x3;
    const s0 = packed >> 4 & 1 ? -1 : 1;
    const s1 = packed >> 5 & 1 ? -1 : 1;
    const s2 = packed >> 6 & 1 ? -1 : 1;
    if (i0 > 2 || i1 > 2 || i0 === i1) return ID3.slice();
    const i2 = 3 - i0 - i1;
    const m = new Array(9).fill(0);
    m[0 * 3 + i0] = s0;
    m[1 * 3 + i1] = s1;
    m[2 * 3 + i2] = s2;
    return m;
}
function mulMat3(A, B) {
    const C = new Array(9).fill(0);
    for(let r = 0; r < 3; r++){
        for(let c = 0; c < 3; c++){
            C[r * 3 + c] = A[r * 3 + 0] * B[0 * 3 + c] + A[r * 3 + 1] * B[1 * 3 + c] + A[r * 3 + 2] * B[2 * 3 + c];
        }
    }
    return C;
}
function mulMat3Vec3(m, v) {
    return {
        x: m[0] * v.x + m[1] * v.y + m[2] * v.z,
        y: m[3] * v.x + m[4] * v.y + m[5] * v.z,
        z: m[6] * v.x + m[7] * v.y + m[8] * v.z
    };
}
function compose(parent, local) {
    const R = mulMat3(parent.R, local.R);
    const tLocalInParent = mulMat3Vec3(parent.R, local.t);
    const t = {
        x: tLocalInParent.x + parent.t.x,
        y: tLocalInParent.y + parent.t.y,
        z: tLocalInParent.z + parent.t.z
    };
    return {
        R,
        t
    };
}
function rgbaToHex(c) {
    const to2 = (n)=>n.toString(16).padStart(2, "0");
    return `#${to2(c.r)}${to2(c.g)}${to2(c.b)}`;
}
// map to y up
function mvToEditor(p) {
    return {
        x: p.x,
        y: p.z,
        z: -p.y
    };
}
function roundCellFromCenter(center) {
    return Math.round(center - 0.5);
}
function parseVox(buffer) {
    const r = new R(buffer);
    const magic = r.id4();
    if (magic !== "VOX ") throw new Error("not a .vox file (missing VOX header)");
    const version = r.i32();
    if (version !== 150 && version !== 200) {
        throw new Error(`unsupported .vox version: ${version} expected 150 or 200`);
    }
    let palette = null;
    const models = [];
    const nodes = new Map();
    let pendingSize = null;
    function parseChunkList(endOffset) {
        while(r.o < endOffset){
            const chunkId = r.id4();
            const chunkSize = r.u32();
            const childSize = r.u32();
            const dataStart = r.o;
            const dataEnd = dataStart + chunkSize;
            const childrenEnd = dataEnd + childSize;
            switch(chunkId){
                case "MAIN":
                    {
                        r.o = dataEnd;
                        if (childSize > 0) parseChunkList(childrenEnd);
                        r.o = childrenEnd;
                        continue;
                    }
                case "SIZE":
                    {
                        const x = r.i32();
                        const y = r.i32();
                        const z = r.i32();
                        pendingSize = {
                            x,
                            y,
                            z
                        };
                        break;
                    }
                case "XYZI":
                    {
                        const n = r.i32();
                        const voxels = new Array(n);
                        for(let i = 0; i < n; i++){
                            const x = r.u8();
                            const y = r.u8();
                            const z = r.u8();
                            const ci = r.u8();
                            voxels[i] = {
                                x,
                                y,
                                z,
                                ci
                            };
                        }
                        models.push({
                            size: pendingSize ?? {
                                x: 0,
                                y: 0,
                                z: 0
                            },
                            voxels
                        });
                        pendingSize = null;
                        break;
                    }
                case "RGBA":
                    {
                        const raw = new Array(256);
                        for(let i = 0; i < 256; i++)raw[i] = {
                            r: r.u8(),
                            g: r.u8(),
                            b: r.u8(),
                            a: r.u8()
                        };
                        palette = rotatePaletteRightBy1(raw);
                        break;
                    }
                case "nTRN":
                    {
                        const id = r.i32();
                        r.dict();
                        const child = r.i32();
                        r.i32();
                        r.i32();
                        const numFrames = r.i32();
                        const frame0 = r.dict();
                        for(let f = 1; f < numFrames; f++)r.dict();
                        const rotPacked = frame0["_r"] ? parseInt(frame0["_r"], 10) & 0xff : 0;
                        const t = parseTranslation(frame0["_t"]);
                        nodes.set(id, {
                            kind: "trn",
                            trn: {
                                id,
                                child,
                                rotPacked,
                                t
                            }
                        });
                        break;
                    }
                case "nGRP":
                    {
                        const id = r.i32();
                        r.dict();
                        const numChildren = r.i32();
                        const children = [];
                        for(let i = 0; i < numChildren; i++)children.push(r.i32());
                        nodes.set(id, {
                            kind: "grp",
                            grp: {
                                id,
                                children
                            }
                        });
                        break;
                    }
                case "nSHP":
                    {
                        const id = r.i32();
                        r.dict();
                        const numModels = r.i32();
                        const modelIds = [];
                        for(let k = 0; k < numModels; k++){
                            modelIds.push(r.i32());
                            r.dict();
                        }
                        nodes.set(id, {
                            kind: "shp",
                            shp: {
                                id,
                                modelIds
                            }
                        });
                        break;
                    }
                default:
                    break;
            }
            r.o = dataEnd;
            if (childSize > 0) parseChunkList(childrenEnd);
            r.o = childrenEnd;
        }
    }
    parseChunkList(buffer.byteLength);
    if (!palette) {
        palette = new Array(256).fill(0).map((_, i)=>({
                r: i,
                g: i,
                b: i,
                a: 255
            }));
        palette[0].a = 0;
    }
    const instances = [];
    if (nodes.size === 0) {
        instances.push({
            modelId: 0,
            xf: {
                R: ID3,
                t: {
                    x: 0,
                    y: 0,
                    z: 0
                }
            },
            groupId: "default"
        });
    } else {
        const referenced = new Set();
        for (const n of nodes.values()){
            if (n.kind === "trn") referenced.add(n.trn.child);
            if (n.kind === "grp") for (const c of n.grp.children)referenced.add(c);
        }
        const roots = [
            ...nodes.keys()
        ].filter((id)=>!referenced.has(id));
        const startRoots = roots.length ? roots : nodes.has(0) ? [
            0
        ] : [
            ...nodes.keys()
        ].slice(0, 1);
        function walk(nodeId, parentXf, stack) {
            const n = nodes.get(nodeId);
            if (!n) return;
            if (stack.has(nodeId)) return;
            stack.add(nodeId);
            if (n.kind === "trn") {
                const local = {
                    R: decodePackedRotation(n.trn.rotPacked),
                    t: n.trn.t
                };
                walk(n.trn.child, compose(parentXf, local), stack);
                stack.delete(nodeId);
                return;
            }
            if (n.kind === "grp") {
                for (const c of n.grp.children)walk(c, parentXf, stack);
                stack.delete(nodeId);
                return;
            }
            // nSHP => instance
            const modelId = n.shp.modelIds[0] ?? 0;
            const groupId = `shp:${n.shp.id}`;
            instances.push({
                modelId,
                xf: parentXf,
                groupId
            });
            stack.delete(nodeId);
        }
        for (const root of startRoots)walk(root, {
            R: ID3,
            t: {
                x: 0,
                y: 0,
                z: 0
            }
        }, new Set());
    }
    // emit WORLD voxels first -> then convert to group - local
    const voxelsByGroup = new Map();
    const globalDedupe = new Set();
    for (const inst of instances){
        const model = models[inst.modelId];
        if (!model) continue;
        const pivot = {
            x: model.size.x / 2,
            y: model.size.y / 2,
            z: model.size.z / 2
        };
        let arr = voxelsByGroup.get(inst.groupId);
        if (!arr) {
            arr = [];
            voxelsByGroup.set(inst.groupId, arr);
        }
        for (const v of model.voxels){
            const localCenter = {
                x: v.x + 0.5 - pivot.x,
                y: v.y + 0.5 - pivot.y,
                z: v.z + 0.5 - pivot.z
            };
            const rotated = mulMat3Vec3(inst.xf.R, localCenter);
            const worldCenterMV = {
                x: rotated.x + inst.xf.t.x,
                y: rotated.y + inst.xf.t.y,
                z: rotated.z + inst.xf.t.z
            };
            const worldCenterEditor = mvToEditor(worldCenterMV);
            const cell = {
                x: roundCellFromCenter(worldCenterEditor.x),
                y: roundCellFromCenter(worldCenterEditor.y),
                z: roundCellFromCenter(worldCenterEditor.z)
            };
            const c = palette[v.ci] ?? palette[1];
            const color = rgbaToHex(c);
            const k = `${cell.x}|${cell.y}|${cell.z}`;
            if (globalDedupe.has(k)) continue;
            globalDedupe.add(k);
            arr.push({
                x: cell.x,
                y: cell.y,
                z: cell.z,
                color
            });
        }
    }
    // remove internal voxels
    const occupiedWorld = new Set();
    for (const worldVoxels of voxelsByGroup.values()){
        for (const v of worldVoxels){
            occupiedWorld.add(`${v.x}|${v.y}|${v.z}`);
        }
    }
    // convert WORLD voxels -> GROUPS with local coords
    const groups = [];
    for (const [groupId, worldVoxels] of voxelsByGroup.entries()){
        if (worldVoxels.length === 0) continue;
        const surfaceWorldVoxels = worldVoxels.filter((v)=>isExposedToAir(v.x, v.y, v.z, occupiedWorld));
        if (surfaceWorldVoxels.length === 0) continue;
        let minX = Infinity, minY = Infinity, minZ = Infinity;
        for (const v of surfaceWorldVoxels){
            minX = Math.min(minX, v.x);
            minY = Math.min(minY, v.y);
            minZ = Math.min(minZ, v.z);
        }
        const position = {
            x: minX,
            y: minY,
            z: minZ
        };
        const localVoxels = surfaceWorldVoxels.map((v)=>({
                x: v.x - position.x,
                y: v.y - position.y,
                z: v.z - position.z,
                color: v.color
            }));
        groups.push({
            groupId,
            position,
            voxels: localVoxels
        });
    }
    // recenter +  ground applied to group positions not voxel locals
    if (groups.length) {
        let gMinX = Infinity, gMinY = Infinity, gMinZ = Infinity;
        let gMaxX = -Infinity, gMaxY = -Infinity, gMaxZ = -Infinity;
        for (const g of groups){
            for (const v of g.voxels){
                const x = g.position.x + v.x;
                const y = g.position.y + v.y;
                const z = g.position.z + v.z;
                gMinX = Math.min(gMinX, x);
                gMaxX = Math.max(gMaxX, x);
                gMinY = Math.min(gMinY, y);
                gMaxY = Math.max(gMaxY, y);
                gMinZ = Math.min(gMinZ, z);
                gMaxZ = Math.max(gMaxZ, z);
            }
        }
        const offX = -Math.floor((gMinX + gMaxX) / 2);
        const offY = -gMinY;
        const offZ = -Math.floor((gMinZ + gMaxZ) / 2);
        for (const g of groups){
            g.position.x += offX;
            g.position.y += offY;
            g.position.z += offZ;
        }
    }
    console.log("[vox] models:", models.length, "nodes:", nodes.size, "instances:", instances.length);
    console.log("[vox] groups:", groups.map((g)=>[
            g.groupId,
            g.voxels.length
        ]).sort((a, b)=>b[1] - a[1]).slice(0, 20));
    return groups;
}
}),
"[project]/apps/web/src/components/VoxelEditor/ui/LibraryPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LibraryPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/repositories/index.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function LibraryPanel(props) {
    const { open, onClose, onOpenIsland } = props;
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [thumbUrls, setThumbUrls] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    async function refresh() {
        setLoading(true);
        try {
            setItems(await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["worldRepository"].listWorlds());
        } finally{
            setLoading(false);
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (open) refresh();
    }, [
        open
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        for (const url of Object.values(thumbUrls))URL.revokeObjectURL(url);
        const next = {};
        for (const it of items){
            const anyThumb = it.thumb;
            if (anyThumb instanceof Blob) {
                next[it.id] = URL.createObjectURL(anyThumb);
            }
        }
        setThumbUrls(next);
        return ()=>{
            for (const url of Object.values(next))URL.revokeObjectURL(url);
        };
    }, [
        items
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!open) return;
        const onKeyDown = (e)=>{
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKeyDown);
        return ()=>window.removeEventListener("keydown", onKeyDown);
    }, [
        open,
        onClose
    ]);
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#ffffff",
            color: "black",
            display: "flex",
            flexDirection: "column"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "15px 15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "baseline",
                            gap: 10
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 20
                                },
                                children: "Worlds"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/LibraryPanel.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 12,
                                    opacity: 0.75
                                },
                                children: loading ? "Loading…" : `${items.length} item${items.length === 1 ? "" : "s"}`
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/LibraryPanel.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/VoxelEditor/ui/LibraryPanel.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 40
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                onClick: refresh,
                                style: {
                                    color: "black",
                                    cursor: "pointer",
                                    fontFamily: "inherit",
                                    fontSize: 20
                                },
                                children: "Refresh"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/LibraryPanel.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                onClick: onClose,
                                style: {
                                    color: "black",
                                    cursor: "pointer",
                                    fontFamily: "inherit",
                                    fontSize: 20
                                },
                                children: "Back"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/LibraryPanel.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/VoxelEditor/ui/LibraryPanel.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/LibraryPanel.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    overflow: "auto",
                    padding: 16
                },
                children: [
                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            opacity: 0.8,
                            padding: 12
                        },
                        children: "Loading…"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/VoxelEditor/ui/LibraryPanel.tsx",
                        lineNumber: 122,
                        columnNumber: 21
                    }, this),
                    !loading && items.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: 16,
                            maxWidth: 520
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: 6
                                },
                                children: "No saved worlds yet"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/LibraryPanel.tsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 13,
                                    lineHeight: 1.5
                                },
                                children: [
                                    "Go back to the editor, build something, then hit ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "Save"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/VoxelEditor/ui/LibraryPanel.tsx",
                                        lineNumber: 133,
                                        columnNumber: 64
                                    }, this),
                                    "."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/LibraryPanel.tsx",
                                lineNumber: 132,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/VoxelEditor/ui/LibraryPanel.tsx",
                        lineNumber: 125,
                        columnNumber: 11
                    }, this),
                    !loading && items.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                            gap: 12
                        },
                        children: items.map((it)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: "rgba(255,255,255,0.04)",
                                    padding: 14,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 10
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: "100%",
                                            aspectRatio: "1 / 1",
                                            border: "1px solid rgba(0,0,0,1.0)",
                                            background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                                            overflow: "hidden",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        },
                                        children: thumbUrls[it.id] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: thumbUrls[it.id],
                                            alt: it.name,
                                            style: {
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                display: "block"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/VoxelEditor/ui/LibraryPanel.tsx",
                                            lineNumber: 171,
                                            columnNumber: 21
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 12,
                                                opacity: 0.85
                                            },
                                            children: "(no thumbnail)"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/VoxelEditor/ui/LibraryPanel.tsx",
                                            lineNumber: 182,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/VoxelEditor/ui/LibraryPanel.tsx",
                                        lineNumber: 157,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            minWidth: 0
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap"
                                            },
                                            children: it.name
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/VoxelEditor/ui/LibraryPanel.tsx",
                                            lineNumber: 187,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/VoxelEditor/ui/LibraryPanel.tsx",
                                        lineNumber: 186,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            gap: 10,
                                            flexWrap: "wrap"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                onClick: ()=>onOpenIsland(it.id),
                                                style: {
                                                    color: "black",
                                                    cursor: "pointer",
                                                    fontSize: 16
                                                },
                                                children: "Open"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/LibraryPanel.tsx",
                                                lineNumber: 199,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                onClick: async ()=>{
                                                    const name = prompt("Rename island:", it.name);
                                                    if (!name) return;
                                                    await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["worldRepository"].renameWorld(it.id, name);
                                                    await refresh();
                                                },
                                                style: {
                                                    color: "black",
                                                    cursor: "pointer",
                                                    fontSize: 16
                                                },
                                                children: "Rename"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/LibraryPanel.tsx",
                                                lineNumber: 211,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                onClick: async ()=>{
                                                    if (!confirm(`Delete "${it.name}"?`)) return;
                                                    await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["worldRepository"].deleteWorld(it.id);
                                                    await refresh();
                                                },
                                                style: {
                                                    color: "black",
                                                    cursor: "pointer",
                                                    fontSize: 16
                                                },
                                                children: "Delete"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/LibraryPanel.tsx",
                                                lineNumber: 227,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/components/VoxelEditor/ui/LibraryPanel.tsx",
                                        lineNumber: 198,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, it.id, true, {
                                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/LibraryPanel.tsx",
                                lineNumber: 147,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/VoxelEditor/ui/LibraryPanel.tsx",
                        lineNumber: 139,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/LibraryPanel.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "15px 15px",
                    fontSize: 12,
                    opacity: 0.8
                },
                children: [
                    "Tip: press ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                        children: "Esc"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/VoxelEditor/ui/LibraryPanel.tsx",
                        lineNumber: 255,
                        columnNumber: 20
                    }, this),
                    " to go back to the editor."
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/LibraryPanel.tsx",
                lineNumber: 248,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/VoxelEditor/ui/LibraryPanel.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminAssetsPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/repositories/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jszip$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jszip/lib/index.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function AdminAssetsPanel(props) {
    const { open, onClose, onRequestPlace, onRequestSaveSelected, selectedGroupId, placingLabel } = props;
    const [assets, setAssets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("New Asset");
    function slugify(s) {
        return s.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    }
    async function exportAllAsPresetZip() {
        const metas = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].listAssets();
        if (!metas.length) {
            alert("No assets to export.");
            return;
        }
        const zip = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jszip$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]();
        const manifest = {
            version: 1,
            presets: []
        };
        const assetsFolder = zip.folder("presets/assets");
        const thumbsFolder = zip.folder("presets/thumbs");
        const usedSlug = new Map();
        const uniqueSlug = (name)=>{
            const base0 = slugify(name) || "asset";
            const n = usedSlug.get(base0) ?? 0;
            usedSlug.set(base0, n + 1);
            return n === 0 ? base0 : `${base0}-${n + 1}`;
        };
        const sortedMetas = [
            ...metas
        ].sort((a, b)=>{
            const byName = a.name.localeCompare(b.name);
            if (byName !== 0) return byName;
            return a.id.localeCompare(b.id);
        });
        for (const m of sortedMetas){
            const loaded = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].loadAsset(m.id);
            if (!loaded) continue;
            const slug = uniqueSlug(loaded.meta.name);
            const id = loaded.meta.id;
            const jsonName = `${slug}.json`;
            const pngName = `${slug}.png`;
            assetsFolder.file(jsonName, JSON.stringify(loaded.group, null, 2));
            if (loaded.meta.thumb) {
                const buf = await loaded.meta.thumb.arrayBuffer();
                thumbsFolder.file(pngName, buf);
            }
            manifest.presets.push({
                id,
                name: loaded.meta.name,
                json: `/presets/assets/${jsonName}`,
                ...loaded.meta.thumb ? {
                    thumb: `/presets/thumbs/${pngName}`
                } : {}
            });
        }
        zip.file("presets/manifest.json", JSON.stringify(manifest, null, 2));
        const blob = await zip.generateAsync({
            type: "blob"
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "voxel-presets.zip";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }
    async function refresh() {
        const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].listAssets();
        setAssets(rows);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!open) return;
        refresh().catch(console.error);
    }, [
        open
    ]);
    const thumbUrls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const urls = new Map();
        for (const a of assets){
            if (a.thumb) urls.set(a.id, URL.createObjectURL(a.thumb));
        }
        return urls;
    }, [
        assets
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            for (const u of thumbUrls.values())URL.revokeObjectURL(u);
        };
    }, [
        thumbUrls
    ]);
    function badgeStyle(bg, color = "white") {
        return {
            display: "inline-block",
            padding: "2px 6px",
            borderRadius: 999,
            fontSize: 11,
            lineHeight: 1.2,
            background: bg,
            color,
            whiteSpace: "nowrap"
        };
    }
    function renderAssetBadges(a) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                display: "flex",
                gap: 6,
                flexWrap: "wrap",
                marginBottom: 8
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: badgeStyle(a.visibility === "private" ? "#1d4ed8" : "#7c3aed"),
                    children: a.visibility
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                    lineNumber: 145,
                    columnNumber: 9
                }, this),
                a.inLibrary ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: badgeStyle("#065f46"),
                    children: "in library"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                    lineNumber: 154,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: badgeStyle("#6b7280"),
                    children: "not in library"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                    lineNumber: 156,
                    columnNumber: 11
                }, this),
                a.isPreset ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: badgeStyle("#92400e"),
                    children: "preset"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                    lineNumber: 159,
                    columnNumber: 23
                }, this) : null
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
            lineNumber: 144,
            columnNumber: 7
        }, this);
    }
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "absolute",
            inset: 0,
            zIndex: 5000,
            pointerEvents: "auto"
        },
        onMouseDown: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                position: "absolute",
                top: 10,
                right: 10,
                width: "min(640px, 95vw)",
                maxHeight: "min(720px, 90vh)",
                overflow: "auto",
                background: "rgba(255,255,255,1)",
                border: "1px solid rgba(0,0,0,1)",
                padding: 14
            },
            onMouseDown: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 10
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: 20
                            },
                            children: "Assets"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                            lineNumber: 198,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: 10
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: {
                                        cursor: "pointer"
                                    },
                                    onClick: ()=>refresh().catch(console.error),
                                    children: "Refresh"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                                    lineNumber: 200,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: {
                                        cursor: "pointer"
                                    },
                                    onClick: onClose,
                                    children: "Close"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                                    lineNumber: 203,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: {
                                        cursor: "pointer"
                                    },
                                    onClick: ()=>exportAllAsPresetZip().catch(console.error),
                                    children: "Export all"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                                    lineNumber: 206,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: {
                                        cursor: "pointer",
                                        color: "#b00020"
                                    },
                                    onClick: async ()=>{
                                        await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].deleteAllAssets();
                                        await refresh();
                                    },
                                    children: "Delete all"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                                    lineNumber: 209,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                            lineNumber: 199,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                    lineNumber: 190,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        border: "1px solid rgba(0,0,0,1)",
                        padding: 10,
                        marginBottom: 12
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: 14,
                                marginBottom: 6,
                                opacity: 0.8
                            },
                            children: [
                                "Save selected group as asset: ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                    children: selectedGroupId ?? "(none)"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                                    lineNumber: 223,
                                    columnNumber: 43
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                            lineNumber: 222,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: 10,
                                alignItems: "center"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: name,
                                    onChange: (e)=>setName(e.target.value),
                                    spellCheck: false,
                                    style: {
                                        flex: 1,
                                        padding: "8px 10px",
                                        border: "1px solid rgba(0,0,0,1)"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                                    lineNumber: 226,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    disabled: !selectedGroupId,
                                    onClick: ()=>onRequestSaveSelected(name.trim() || "Asset"),
                                    style: {
                                        padding: "8px 10px",
                                        cursor: selectedGroupId ? "pointer" : "not-allowed"
                                    },
                                    children: "Save private"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                                    lineNumber: 232,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                            lineNumber: 225,
                            columnNumber: 11
                        }, this),
                        placingLabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginTop: 8,
                                fontSize: 13
                            },
                            children: [
                                "Placing: ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                    children: placingLabel
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                                    lineNumber: 242,
                                    columnNumber: 24
                                }, this),
                                " (click in scene to place, Esc to cancel)"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                            lineNumber: 241,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                    lineNumber: 221,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "grid",
                        gap: 10
                    },
                    children: [
                        assets.map((a)=>{
                            const url = thumbUrls.get(a.id);
                            const isPrivate = a.visibility === "private";
                            const isMarketplace = a.visibility === "marketplace";
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    border: "1px solid rgba(0,0,0,1)",
                                    padding: 10
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        gap: 10
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: 84,
                                                height: 84,
                                                border: "1px solid rgba(0,0,0,1)",
                                                background: "white",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                overflow: "hidden",
                                                flex: "0 0 auto"
                                            },
                                            children: url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: url,
                                                style: {
                                                    width: "100%",
                                                    height: "100%",
                                                    imageRendering: "pixelated"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                                                lineNumber: 270,
                                                columnNumber: 23
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 12
                                                },
                                                children: "no thumb"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                                                lineNumber: 275,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                                            lineNumber: 256,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                flex: 1
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 16,
                                                        marginBottom: 4
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                        children: a.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                                                        lineNumber: 281,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                                                    lineNumber: 280,
                                                    columnNumber: 21
                                                }, this),
                                                renderAssetBadges(a),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 13,
                                                        opacity: 0.8,
                                                        marginBottom: 10
                                                    },
                                                    children: [
                                                        a.voxelCount.toLocaleString(),
                                                        " voxels"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                                                    lineNumber: 286,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 12,
                                                        opacity: 0.7,
                                                        marginBottom: 6
                                                    },
                                                    children: [
                                                        "id: ",
                                                        a.id
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                                                    lineNumber: 290,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "flex",
                                                        gap: 10,
                                                        flexWrap: "wrap"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>onRequestPlace(a.id),
                                                            style: {
                                                                padding: "6px 10px",
                                                                cursor: "pointer"
                                                            },
                                                            children: "Place"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                                                            lineNumber: 295,
                                                            columnNumber: 23
                                                        }, this),
                                                        isPrivate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: async ()=>{
                                                                try {
                                                                    await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].publishAssetToMarketplace(a.id);
                                                                    await refresh();
                                                                } catch (e) {
                                                                    console.error(e);
                                                                    alert(e instanceof Error ? e.message : "Publish failed");
                                                                }
                                                            },
                                                            style: {
                                                                padding: "6px 10px",
                                                                cursor: "pointer"
                                                            },
                                                            children: "Publish"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                                                            lineNumber: 303,
                                                            columnNumber: 25
                                                        }, this),
                                                        isMarketplace && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: async ()=>{
                                                                try {
                                                                    await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].forkAssetToPrivateDraft(a.id, {
                                                                        name: `${a.name} Copy`,
                                                                        addToLibrary: true
                                                                    });
                                                                    await refresh();
                                                                } catch (e) {
                                                                    console.error(e);
                                                                    alert(e instanceof Error ? e.message : "Fork failed");
                                                                }
                                                            },
                                                            style: {
                                                                padding: "6px 10px",
                                                                cursor: "pointer"
                                                            },
                                                            children: "Fork to private"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                                                            lineNumber: 320,
                                                            columnNumber: 25
                                                        }, this),
                                                        !a.inLibrary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: async ()=>{
                                                                await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].addAssetToLibrary(a.id);
                                                                await refresh();
                                                            },
                                                            style: {
                                                                padding: "6px 10px",
                                                                cursor: "pointer"
                                                            },
                                                            children: "Add to library"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                                                            lineNumber: 340,
                                                            columnNumber: 25
                                                        }, this),
                                                        a.inLibrary && !isPrivate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: async ()=>{
                                                                await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].removeAssetFromLibrary(a.id);
                                                                await refresh();
                                                            },
                                                            style: {
                                                                padding: "6px 10px",
                                                                cursor: "pointer"
                                                            },
                                                            children: "Remove from library"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                                                            lineNumber: 352,
                                                            columnNumber: 25
                                                        }, this),
                                                        isPrivate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: async ()=>{
                                                                const next = prompt("Rename asset:", a.name);
                                                                if (!next) return;
                                                                await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].renameAsset(a.id, next);
                                                                await refresh();
                                                            },
                                                            style: {
                                                                padding: "6px 10px",
                                                                cursor: "pointer"
                                                            },
                                                            children: "Rename"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                                                            lineNumber: 364,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: async ()=>{
                                                                if (!confirm(`Delete "${a.name}"?`)) return;
                                                                await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].deleteAsset(a.id);
                                                                await refresh();
                                                            },
                                                            style: {
                                                                padding: "6px 10px",
                                                                cursor: "pointer"
                                                            },
                                                            children: "Delete"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                                                            lineNumber: 377,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: async ()=>{
                                                                try {
                                                                    await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].exportAssetToFiles(a.id);
                                                                } catch (e) {
                                                                    console.error(e);
                                                                    alert(e instanceof Error ? e.message : "Export failed");
                                                                }
                                                            },
                                                            style: {
                                                                padding: "6px 10px",
                                                                cursor: "pointer"
                                                            },
                                                            children: "Export"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                                                            lineNumber: 388,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                                                    lineNumber: 294,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                                            lineNumber: 279,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                                    lineNumber: 255,
                                    columnNumber: 17
                                }, this)
                            }, a.id, false, {
                                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                                lineNumber: 254,
                                columnNumber: 15
                            }, this);
                        }),
                        !assets.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                opacity: 0.7
                            },
                            children: "No assets yet."
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                            lineNumber: 408,
                            columnNumber: 30
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
                    lineNumber: 247,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
            lineNumber: 176,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx",
        lineNumber: 167,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/src/components/Home/PackedGrid/PackedGrid.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PackedGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
function PackedGrid(props) {
    const { items, gap = 12, columns = 8, topSpacer = false, topSpacerHeight = 50 } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: "100%",
            height: "100%",
            overflowY: "auto",
            overflowX: "visible",
            padding: "1vh",
            boxSizing: "border-box"
        },
        children: [
            topSpacer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": true,
                style: {
                    height: topSpacerHeight,
                    pointerEvents: "none",
                    flexShrink: 0
                }
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Home/PackedGrid/PackedGrid.tsx",
                lineNumber: 38,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                    gridAutoRows: "1fr",
                    gridAutoFlow: "dense",
                    gap,
                    alignContent: "start"
                },
                children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            gridColumn: item.size === "big" ? "span 2" : "span 1",
                            gridRow: item.size === "big" ? "span 2" : "span 1",
                            aspectRatio: "1 / 1",
                            minWidth: 0,
                            minHeight: 0
                        },
                        children: item.content
                    }, item.id, false, {
                        fileName: "[project]/apps/web/src/components/Home/PackedGrid/PackedGrid.tsx",
                        lineNumber: 59,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Home/PackedGrid/PackedGrid.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/Home/PackedGrid/PackedGrid.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/src/components/Home/GridContainers/AssetContainer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AssetContainer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
function AssetContainer(props) {
    const { thumbUrl, size = "small", onClick } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pix-icon",
        onClick: onClick,
        style: {
            width: "100%",
            height: "100%",
            background: "transparent",
            cursor: onClick ? "pointer" : "default",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            userSelect: "none",
            overflow: "visible"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: "100%",
                height: "100%",
                overflow: "hidden",
                background: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            },
            children: thumbUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: thumbUrl,
                alt: "",
                draggable: false,
                style: {
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    imageRendering: "pixelated",
                    background: "transparent"
                }
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Home/GridContainers/AssetContainer.tsx",
                lineNumber: 40,
                columnNumber: 11
            }, this) : null
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/Home/GridContainers/AssetContainer.tsx",
            lineNumber: 28,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/Home/GridContainers/AssetContainer.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/src/components/VoxelEditor/ui/AssetsPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AssetsPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/repositories/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/audio/SoundProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Home$2f$PackedGrid$2f$PackedGrid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/Home/PackedGrid/PackedGrid.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Home$2f$GridContainers$2f$AssetContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/Home/GridContainers/AssetContainer.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function AssetsPanel(props) {
    const { open, onClose, onRequestPlace } = props;
    const { click } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSound"])();
    const [assets, setAssets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    async function refresh() {
        const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].listLibraryAssets();
        setAssets(rows);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!open) return;
        refresh().catch(console.error);
    }, [
        open
    ]);
    const thumbUrls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const urls = new Map();
        for (const a of assets){
            if (a.thumb) urls.set(a.id, URL.createObjectURL(a.thumb));
        }
        return urls;
    }, [
        assets
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            for (const u of thumbUrls.values())URL.revokeObjectURL(u);
        };
    }, [
        thumbUrls
    ]);
    const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return assets.map((a)=>{
            const size = a.voxelCount > 2000 ? "big" : "small";
            return {
                id: a.id,
                size,
                content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Home$2f$GridContainers$2f$AssetContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    thumbUrl: thumbUrls.get(a.id),
                    size: size,
                    onClick: (e)=>{
                        click();
                        onRequestPlace(a.id, e ? {
                            x: e.clientX,
                            y: e.clientY
                        } : undefined);
                    }
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AssetsPanel.tsx",
                    lineNumber: 54,
                    columnNumber: 11
                }, this)
            };
        });
    }, [
        assets,
        thumbUrls,
        click,
        onRequestPlace
    ]);
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: "min(460px, 92vw)",
            maxHeight: "min(640px, 88vh)",
            overflow: "hidden",
            background: "rgba(0, 68, 128, 0.30)",
            borderRadius: 10,
            padding: 10,
            pointerEvents: "auto"
        },
        onMouseDown: (e)=>e.stopPropagation(),
        children: items.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: "100%",
                height: "100%"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Home$2f$PackedGrid$2f$PackedGrid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                items: items,
                columns: 4,
                gap: 10
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AssetsPanel.tsx",
                lineNumber: 87,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AssetsPanel.tsx",
            lineNumber: 86,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                color: "white",
                opacity: 0.7,
                fontSize: 14
            },
            children: "Your asset library is empty. Add assets from the marketplace."
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AssetsPanel.tsx",
            lineNumber: 90,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/VoxelEditor/ui/AssetsPanel.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/src/components/VoxelEditor/ui/GlyphsPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GlyphsPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/audio/SoundProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Home$2f$PackedGrid$2f$PackedGrid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/Home/PackedGrid/PackedGrid.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Home$2f$GridContainers$2f$AssetContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/Home/GridContainers/AssetContainer.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const GLYPHS = [
    {
        id: "glyph_car",
        name: "Car",
        logicTag: "car",
        thumbUrl: "/glyphs/car.png"
    }
];
function GlyphsPanel(props) {
    const { open, onRequestApplyGlyph } = props;
    const { click } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSound"])();
    const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return GLYPHS.map((glyph)=>({
                id: glyph.id,
                size: "small",
                content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Home$2f$GridContainers$2f$AssetContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    thumbUrl: glyph.thumbUrl,
                    size: "small",
                    onClick: (e)=>{
                        click();
                        onRequestApplyGlyph(glyph, e ? {
                            x: e.clientX,
                            y: e.clientY
                        } : undefined);
                    }
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/VoxelEditor/ui/GlyphsPanel.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this)
            }));
    }, [
        click,
        onRequestApplyGlyph
    ]);
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: "min(460px, 92vw)",
            maxHeight: "min(640px, 88vh)",
            overflow: "hidden",
            background: "rgba(0, 68, 128, 0.30)",
            borderRadius: 10,
            padding: 10,
            pointerEvents: "auto"
        },
        onMouseDown: (e)=>e.stopPropagation(),
        children: items.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: "100%",
                height: "100%"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Home$2f$PackedGrid$2f$PackedGrid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                items: items,
                columns: 4,
                gap: 10
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/GlyphsPanel.tsx",
                lineNumber: 71,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/VoxelEditor/ui/GlyphsPanel.tsx",
            lineNumber: 70,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                color: "white",
                opacity: 0.7,
                fontSize: 14
            },
            children: "No glyphs available."
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/VoxelEditor/ui/GlyphsPanel.tsx",
            lineNumber: 74,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/VoxelEditor/ui/GlyphsPanel.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/src/components/VoxelEditor/ui/MarketplacePanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MarketplacePanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/repositories/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/audio/SoundProvider.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function MarketplacePanel(props) {
    const { open, onClose } = props;
    const { click } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSound"])();
    const [assets, setAssets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    async function refresh() {
        const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].listMarketplaceAssets();
        setAssets(rows);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!open) return;
        refresh().catch(console.error);
    }, [
        open
    ]);
    const thumbUrls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const urls = new Map();
        for (const a of assets){
            if (a.thumb) urls.set(a.id, URL.createObjectURL(a.thumb));
        }
        return urls;
    }, [
        assets
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            for (const u of thumbUrls.values())URL.revokeObjectURL(u);
        };
    }, [
        thumbUrls
    ]);
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: "min(420px, 92vw)",
            maxHeight: "min(640px, 88vh)",
            overflow: "auto",
            background: "rgba(0, 68, 128, 0.30)",
            borderRadius: 10,
            padding: 10,
            pointerEvents: "auto"
        },
        onMouseDown: (e)=>e.stopPropagation(),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                display: "grid",
                gap: 10
            },
            children: [
                assets.map((a)=>{
                    const url = thumbUrls.get(a.id);
                    const alreadyInLibrary = !!a.inLibrary;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pix-icon",
                        style: {
                            width: "100%",
                            minHeight: 84,
                            borderRadius: 6,
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: 10
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 64,
                                    height: 64,
                                    flex: "0 0 auto",
                                    overflow: "hidden",
                                    borderRadius: 4,
                                    background: "rgba(255,255,255,0.08)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                },
                                children: url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: url,
                                    alt: a.name,
                                    draggable: false,
                                    style: {
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        imageRendering: "pixelated"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/VoxelEditor/ui/MarketplacePanel.tsx",
                                    lineNumber: 95,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        color: "white",
                                        fontSize: 11,
                                        textAlign: "center",
                                        padding: 6
                                    },
                                    children: "no thumb"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/VoxelEditor/ui/MarketplacePanel.tsx",
                                    lineNumber: 107,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/MarketplacePanel.tsx",
                                lineNumber: 81,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    minWidth: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            color: "white",
                                            fontSize: 16,
                                            lineHeight: 1.1,
                                            marginBottom: 4,
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap"
                                        },
                                        children: a.name
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/VoxelEditor/ui/MarketplacePanel.tsx",
                                        lineNumber: 121,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            color: "white",
                                            opacity: 0.7,
                                            fontSize: 12,
                                            lineHeight: 1.2
                                        },
                                        children: [
                                            a.visibility,
                                            " • ",
                                            a.voxelCount.toLocaleString(),
                                            " voxels"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/components/VoxelEditor/ui/MarketplacePanel.tsx",
                                        lineNumber: 135,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            color: "white",
                                            opacity: 0.8,
                                            fontSize: 11,
                                            marginTop: 6
                                        },
                                        children: alreadyInLibrary ? "Already in your library" : "Available to add"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/VoxelEditor/ui/MarketplacePanel.tsx",
                                        lineNumber: 146,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/MarketplacePanel.tsx",
                                lineNumber: 120,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                disabled: alreadyInLibrary,
                                onClick: async ()=>{
                                    click();
                                    await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].acquireMarketplaceAssetToLibrary(a.id);
                                    await refresh();
                                },
                                style: {
                                    appearance: "none",
                                    border: "none",
                                    cursor: alreadyInLibrary ? "default" : "pointer",
                                    padding: "8px 10px",
                                    borderRadius: 4,
                                    opacity: alreadyInLibrary ? 0.5 : 1
                                },
                                children: alreadyInLibrary ? "Added" : "Add"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/MarketplacePanel.tsx",
                                lineNumber: 158,
                                columnNumber: 15
                            }, this)
                        ]
                    }, a.id, true, {
                        fileName: "[project]/apps/web/src/components/VoxelEditor/ui/MarketplacePanel.tsx",
                        lineNumber: 67,
                        columnNumber: 13
                    }, this);
                }),
                !assets.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        color: "white",
                        opacity: 0.7,
                        fontSize: 14
                    },
                    children: "No marketplace assets."
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/VoxelEditor/ui/MarketplacePanel.tsx",
                    lineNumber: 181,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/VoxelEditor/ui/MarketplacePanel.tsx",
            lineNumber: 56,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/VoxelEditor/ui/MarketplacePanel.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/src/components/VoxelEditor/ui/WorldToolPalette.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WorldToolPalette
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/audio/SoundProvider.tsx [app-ssr] (ecmascript)");
"use client";
;
;
const TOOLS = [
    {
        id: "rotateright",
        title: "Rotate Right",
        src: "/icons/rotateright.png"
    },
    {
        id: "rotateleft",
        title: "Rotate Left",
        src: "/icons/rotateleft.png"
    },
    {
        id: "planemovement",
        title: "Plane Movement",
        src: "/icons/planemovement.png"
    },
    {
        id: "upmovement",
        title: "Up Movement",
        src: "/icons/upmovement.png"
    }
];
function WorldToolPalette({ value, onSelect }) {
    const { click } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSound"])();
    const isToggle = (id)=>id === "planemovement" || id === "upmovement";
    const rotateTools = TOOLS.slice(0, 2);
    const moveTools = TOOLS.slice(2);
    const hints = value === "upmovement" ? {
        movement: "movement axis: y",
        rotation: "rotation axis: x"
    } : {
        movement: "movement axis: x/z",
        rotation: "rotation axis: y"
    };
    const renderIcon = (t)=>{
        const selected = isToggle(t.id) && t.id === value;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "7vh",
                height: "7vh",
                overflow: "visible"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                className: "pix-icon",
                src: t.src,
                alt: t.title,
                title: t.title,
                draggable: false,
                style: {
                    height: "7vh",
                    width: "auto",
                    objectFit: "contain",
                    imageRendering: "pixelated",
                    cursor: "pointer",
                    pointerEvents: "auto",
                    opacity: selected ? 1 : 0.7,
                    transition: "opacity 120ms ease-out"
                },
                onClick: ()=>{
                    click();
                    onSelect(t.id);
                }
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/WorldToolPalette.tsx",
                lineNumber: 53,
                columnNumber: 9
            }, this)
        }, t.id, false, {
            fileName: "[project]/apps/web/src/components/VoxelEditor/ui/WorldToolPalette.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            gap: 10,
            alignItems: "center",
            padding: 0,
            pointerEvents: "auto",
            overflow: "visible",
            width: "7vh",
            minWidth: "7vh",
            maxWidth: "7vh"
        },
        children: [
            rotateTools.map(renderIcon),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "2vh",
                    width: "100%",
                    overflow: "visible"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        width: 25,
                        height: 2,
                        background: "rgba(199, 236, 255, 0.7)"
                    }
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/VoxelEditor/ui/WorldToolPalette.tsx",
                    lineNumber: 105,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/WorldToolPalette.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            moveTools.map(renderIcon),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "2vh",
                    width: "100%",
                    overflow: "visible"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        width: 25,
                        height: 2,
                        background: "rgba(199, 236, 255, 0.7)"
                    }
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/VoxelEditor/ui/WorldToolPalette.tsx",
                    lineNumber: 126,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/WorldToolPalette.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "relative",
                    width: "100%",
                    height: 0,
                    overflow: "visible",
                    pointerEvents: "none"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: "absolute",
                        left: 15,
                        top: 10,
                        whiteSpace: "nowrap",
                        fontSize: 12,
                        lineHeight: 1.2,
                        letterSpacing: 0.2,
                        color: "rgba(199, 236, 255, 0.7)",
                        opacity: 0.85,
                        userSelect: "none"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: hints.movement
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/VoxelEditor/ui/WorldToolPalette.tsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: hints.rotation
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/VoxelEditor/ui/WorldToolPalette.tsx",
                            lineNumber: 159,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/VoxelEditor/ui/WorldToolPalette.tsx",
                    lineNumber: 144,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/WorldToolPalette.tsx",
                lineNumber: 135,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/VoxelEditor/ui/WorldToolPalette.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VoxelWorldEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$controls$2f$OrbitControls$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/controls/OrbitControls.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$GLTFLoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/loaders/GLTFLoader.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$DRACOLoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/loaders/DRACOLoader.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$RGBELoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/loaders/RGBELoader.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Auth$2f$state$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/Auth/state.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/audio/SoundProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$publishedWorlds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/publishedWorlds.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$materials$2f$heightMist$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/materials/heightMist.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$VoxelWorld$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/VoxelWorld.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/repositories/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$vox$2f$voxImport$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/vox/voxImport.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$ui$2f$LibraryPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/ui/LibraryPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$ui$2f$AdminAssetsPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/ui/AdminAssetsPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$ui$2f$AssetsPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/ui/AssetsPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$ui$2f$GlyphsPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/ui/GlyphsPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$ui$2f$MarketplacePanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/ui/MarketplacePanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$ui$2f$WorldToolPalette$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/ui/WorldToolPalette.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
//helpers
function recenterCameraOnBounds(params) {
    const { minX, minY, minZ, maxX, maxY, maxZ, controls, camera } = params;
    if (!controls || !camera) return;
    const cx = (minX + maxX + 1) / 2;
    const cy = (minY + maxY + 1) / 2;
    const cz = (minZ + maxZ + 1) / 2;
    controls.target.set(cx + 0.5, cy + 0.5, cz + 0.5);
    controls.update();
    camera.lookAt(controls.target);
}
function getPrimaryWorldId() {
    try {
        return localStorage.getItem(PRIMARY_WORLD_ID_KEY);
    } catch  {
        return null;
    }
}
function setPrimaryWorldId(id) {
    try {
        localStorage.setItem(PRIMARY_WORLD_ID_KEY, id);
    } catch  {}
}
//file scope consts
const PRIMARY_WORLD_ID_KEY = "voxbox:primaryWorldId";
const ADMIN = false;
function VoxelWorldEditor(props) {
    const { initialWorldId = null, onFocusGroup, focusOpen } = props;
    // app / auth / sound
    const { unlock, play, startLoopAt, setLoopVolume, getTime, startLoop, click } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSound"])();
    const { me } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Auth$2f$state$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthState"])();
    const [publishing, setPublishing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // three / rendering
    const mountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const raycaster = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Raycaster"](), []);
    const mouseNDC = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"](), []);
    const rendererRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sceneRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cameraRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const controlsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const islandRootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const envMapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const envRTRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // world / session
    const worldRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const currentIslandIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [islandName, setIslandName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("My Voxbox");
    const [importModal, setImportModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // panel ui
    const [libraryOpen, setLibraryOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [assetsOpen, setAssetsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [glyphsOpen, setGlyphsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [marketplaceOpen, setMarketplaceOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // derived ui refs
    const glyphsOpenRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(glyphsOpen);
    // placement
    const [placingLabel, setPlacingLabel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const placingAssetRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const placingGlyphRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const placementPreviewObjectUrlRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [placementPreview, setPlacementPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // selection / hover helpers
    const [selectedGroupId, setSelectedGroupId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [hoveredGroupId, setHoveredGroupId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const selectedGroupIdLiveRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hoveredGroupIdLiveRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [selectedGlyphGroupId, setSelectedGlyphGroupId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [hoveredGlyphGroupId, setHoveredGlyphGroupId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const selectedGlyphGroupIdLiveRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hoveredGlyphGroupIdLiveRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const selectedBoxRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hoverBoxRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pendingGroupBoxesSyncRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const selectedGlyphOutlineRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hoverGlyphOutlineRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pendingGlyphOutlineSyncRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    // glyph visualization
    const glyphTextureCacheRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const glyphSpriteMapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const pendingGlyphSpritesSyncRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    // autosave
    const AUTOSAVE_DEBOUNCE_MS = 1800;
    const AUTOSAVE_MAX_INTERVAL_MS = 25000;
    const dirtyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const autosaveTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastSaveAtRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const autosaveInFlightRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const autosaveQueuedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    // editor tools / interaction
    const [worldTool, setWorldTool] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("planemovement");
    const worldToolRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])("planemovement");
    // drag state
    const dragRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // derived ui flags
    const showUI = !focusOpen;
    const focusCtaVisible = showUI && !!selectedGroupId && !selectedGlyphGroupId;
    const focusOpenRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(focusOpen);
    // ref sync effects
    // hover / select effects
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        selectedGroupIdLiveRef.current = selectedGroupId;
    }, [
        selectedGroupId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        hoveredGroupIdLiveRef.current = hoveredGroupId;
    }, [
        hoveredGroupId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        selectedGlyphGroupIdLiveRef.current = selectedGlyphGroupId;
    }, [
        selectedGlyphGroupId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        hoveredGlyphGroupIdLiveRef.current = hoveredGlyphGroupId;
    }, [
        hoveredGlyphGroupId
    ]);
    // ui effects
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        focusOpenRef.current = focusOpen;
    }, [
        focusOpen
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        worldToolRef.current = worldTool;
    }, [
        worldTool
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        glyphsOpenRef.current = glyphsOpen;
    }, [
        glyphsOpen
    ]);
    // editor control helpers
    function setOrbitalControlsEnabled(enabled) {
        const c = controlsRef.current;
        if (c) c.enabled = enabled;
    }
    // select / hover utilities
    function clearHelper(ref) {
        const scene = sceneRef.current;
        const h = ref.current;
        if (!scene || !h) return;
        scene.remove(h);
        h.material.dispose();
        ref.current = null;
    }
    function upsertHelper(ref, box, color) {
        const scene = sceneRef.current;
        if (!scene) return;
        clearHelper(ref);
        const helper = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box3Helper"](box, color);
        helper.renderOrder = 1000;
        scene.add(helper);
        ref.current = helper;
    }
    function syncGroupBoxes() {
        const w = worldRef.current;
        if (!w) return;
        const selected = selectedGroupIdLiveRef.current;
        const hovered = hoveredGroupIdLiveRef.current;
        if (selected) {
            const b = w.getGroupBounds(selected);
            if (b) {
                const box = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box3"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](b.min.x, b.min.y, b.min.z), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](b.max.x + 1, b.max.y + 1, b.max.z + 1));
                upsertHelper(selectedBoxRef, box, 0xC7ECFF);
            } else {
                clearHelper(selectedBoxRef);
            }
        } else {
            clearHelper(selectedBoxRef);
        }
        if (hovered && hovered !== selected) {
            const b = w.getGroupBounds(hovered);
            if (b) {
                const box = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box3"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](b.min.x, b.min.y, b.min.z), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](b.max.x + 1, b.max.y + 1, b.max.z + 1));
                upsertHelper(hoverBoxRef, box, 0x2563eb);
            } else {
                clearHelper(hoverBoxRef);
            }
        } else {
            clearHelper(hoverBoxRef);
        }
    }
    function ensureGlyphOutline(ref, color) {
        const scene = sceneRef.current;
        if (!scene) return null;
        if (ref.current) return ref.current;
        const geom = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"]().setFromPoints([
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](-0.5, -0.5, 0),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](0.5, -0.5, 0),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](0.5, 0.5, 0),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](-0.5, 0.5, 0)
        ]);
        const mat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
            color,
            transparent: true,
            opacity: 1,
            depthWrite: false
        });
        const line = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LineLoop"](geom, mat);
        line.renderOrder = 1300;
        scene.add(line);
        ref.current = line;
        return line;
    }
    function clearGlyphOutline(ref) {
        const scene = sceneRef.current;
        const line = ref.current;
        if (!scene || !line) return;
        scene.remove(line);
        line.geometry.dispose();
        line.material.dispose();
        ref.current = null;
    }
    function syncGlyphOutlineFromSprite(ref, sprite, color) {
        const camera = cameraRef.current;
        if (!sprite || !camera || !sprite.visible) {
            clearGlyphOutline(ref);
            return;
        }
        const line = ensureGlyphOutline(ref, color);
        if (!line) return;
        line.position.copy(sprite.position);
        line.quaternion.copy(camera.quaternion);
        const baseGlyphSize = typeof sprite.userData?.baseGlyphSize === "number" ? sprite.userData.baseGlyphSize : sprite.scale.x;
        line.scale.set(baseGlyphSize, baseGlyphSize, 1);
        line.visible = true;
    }
    function syncGlyphOutlines() {
        const selectedGlyphId = selectedGlyphGroupIdLiveRef.current;
        const hoveredGlyphId = hoveredGlyphGroupIdLiveRef.current;
        const selectedSprite = selectedGlyphId ? glyphSpriteMapRef.current.get(selectedGlyphId) ?? null : null;
        const hoveredSprite = hoveredGlyphId && hoveredGlyphId !== selectedGlyphId ? glyphSpriteMapRef.current.get(hoveredGlyphId) ?? null : null;
        syncGlyphOutlineFromSprite(selectedGlyphOutlineRef, selectedSprite, 0xffffff);
        syncGlyphOutlineFromSprite(hoverGlyphOutlineRef, hoveredSprite, 0x2563eb);
    }
    // pointer helpers
    function setMouseFromEvent(e) {
        const renderer = rendererRef.current;
        if (!renderer) return;
        const rect = renderer.domElement.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width * 2 - 1;
        const y = -((e.clientY - rect.top) / rect.height * 2 - 1);
        mouseNDC.set(x, y);
    }
    function updateRayFromMouse(e) {
        const camera = cameraRef.current;
        if (!camera) return;
        setMouseFromEvent(e);
        raycaster.setFromCamera(mouseNDC, camera);
    }
    function pickGroupUnderMouse() {
        const w = worldRef.current;
        if (!w) return null;
        const meshes = w.listMeshes();
        const hits = raycaster.intersectObjects(meshes, false);
        if (!hits.length) return null;
        const obj = hits[0].object;
        const gid = obj.userData?.groupId ?? null;
        return gid;
    }
    function pickVisibleGlyphUnderMouse() {
        const sprites = Array.from(glyphSpriteMapRef.current.values()).filter((s)=>s.visible);
        if (!sprites.length) return null;
        const hits = raycaster.intersectObjects(sprites, false);
        if (!hits.length) return null;
        const obj = hits[0].object;
        return obj.userData?.groupId ?? null;
    }
    function rayPlaneIntersection(plane) {
        const out = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]();
        const ok = raycaster.ray.intersectPlane(plane, out);
        return ok ? out : null;
    }
    function unitsPerScreenPixelAtWorldPointY(params) {
        const { worldPoint, camera, renderer } = params;
        const rect = renderer.domElement.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;
        if (w <= 0 || h <= 0) return 0.02;
        const ndc = worldPoint.clone().project(camera);
        const ndc2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](ndc.x, ndc.y - 2 / h, ndc.z);
        const p1 = ndc.clone().unproject(camera);
        const p2 = ndc2.unproject(camera);
        const d = p2.distanceTo(p1);
        return Number.isFinite(d) && d > 0 ? d : 0.02;
    }
    // camera helpers
    function normalizeGroupToOrigin(g) {
        if (!g.voxels.length) return {
            ...g,
            position: {
                x: 0,
                y: 0,
                z: 0
            }
        };
        let minX = Infinity, minY = Infinity, minZ = Infinity;
        for (const v of g.voxels){
            minX = Math.min(minX, v.local.x);
            minY = Math.min(minY, v.local.y);
            minZ = Math.min(minZ, v.local.z);
        }
        const voxels = g.voxels.map((v)=>({
                ...v,
                local: {
                    x: v.local.x - minX,
                    y: v.local.y - minY,
                    z: v.local.z - minZ
                }
            }));
        return {
            groupId: g.groupId,
            position: {
                x: 0,
                y: 0,
                z: 0
            },
            voxels
        };
    }
    async function captureSquareThumbnailFromCurrentCamera() {
        const renderer = rendererRef.current;
        const scene = sceneRef.current;
        const camera = cameraRef.current;
        const controls = controlsRef.current;
        if (!renderer || !scene || !camera) return null;
        controls?.update();
        camera.updateMatrixWorld(true);
        renderer.render(scene, camera);
        const srcCanvas = renderer.domElement;
        const srcW = srcCanvas.width;
        const srcH = srcCanvas.height;
        const side = Math.min(srcW, srcH);
        const sx = Math.floor((srcW - side) / 2);
        const sy = Math.floor((srcH - side) / 2);
        const THUMB = 256;
        const out = document.createElement("canvas");
        out.width = THUMB;
        out.height = THUMB;
        const ctx = out.getContext("2d");
        if (!ctx) return null;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(srcCanvas, sx, sy, side, side, 0, 0, THUMB, THUMB);
        const blob = await new Promise((resolve)=>out.toBlob((b)=>resolve(b), "image/png"));
        return blob;
    }
    // world level actions
    async function onNew() {
        const w = worldRef.current;
        if (!w) return;
        setLibraryOpen(false);
        setImportModal(null);
        setIslandName("My Voxbox");
        currentIslandIdRef.current = null;
        setSelectedGroupId(null);
        setHoveredGroupId(null);
        hoveredGroupIdLiveRef.current = null;
        w.clear();
        if (controlsRef.current && cameraRef.current) {
            cameraRef.current.position.set(172.557, 77.391, 184.354);
            controlsRef.current.target.set(0, 0, 0);
            controlsRef.current.update();
            cameraRef.current.lookAt(controlsRef.current.target);
        }
        const id = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["worldRepository"].saveWorld({
            name: "Primary World",
            data: w.exportWorldData(),
            thumb: null
        });
        currentIslandIdRef.current = id;
        setPrimaryWorldId(id);
        pendingGroupBoxesSyncRef.current = true;
        pendingGlyphSpritesSyncRef.current = true;
        pendingGlyphOutlineSyncRef.current = true;
    }
    async function onOpenFromLibrary(id) {
        const world = worldRef.current;
        if (!world) return;
        const loaded = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["worldRepository"].loadWorld(id);
        if (!loaded) return;
        currentIslandIdRef.current = loaded.meta.id;
        setIslandName(loaded.meta.name);
        await world.importWorldData(loaded.data);
        setSelectedGroupId(null);
        setHoveredGroupId(null);
        hoveredGroupIdLiveRef.current = null;
        pendingGroupBoxesSyncRef.current = true;
        pendingGlyphSpritesSyncRef.current = true;
        pendingGlyphOutlineSyncRef.current = true;
        const bounds = world.getAllGroupBounds();
        if (bounds.size > 0) {
            let minX = Infinity, minY = Infinity, minZ = Infinity;
            let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
            for (const b of bounds.values()){
                minX = Math.min(minX, b.min.x);
                minY = Math.min(minY, b.min.y);
                minZ = Math.min(minZ, b.min.z);
                maxX = Math.max(maxX, b.max.x);
                maxY = Math.max(maxY, b.max.y);
                maxZ = Math.max(maxZ, b.max.z);
            }
            recenterCameraOnBounds({
                minX,
                minY,
                minZ,
                maxX,
                maxY,
                maxZ,
                controls: controlsRef.current,
                camera: cameraRef.current
            });
        }
        setLibraryOpen(false);
    }
    async function onSaveToLibrary() {
        await autosave({
            withThumb: true
        });
    }
    async function onPublishWorld() {
        const world = worldRef.current;
        if (!world) return;
        if (!me?.user_id) {
            alert("You must be logged in to publish.");
            return;
        }
        const snapshot = await world.getPublishedWorldSnapshot();
        if (!snapshot.groups.length) {
            alert("World is empty.");
            return;
        }
        if (!currentIslandIdRef.current) {
            await autosave({
                withThumb: true
            });
        } else {
            await autosave({
                withThumb: true
            });
        }
        const worldId = currentIslandIdRef.current;
        if (!worldId) {
            alert("World could not be saved before publish.");
            return;
        }
        try {
            setPublishing(true);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$publishedWorlds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["publishWorld"])(worldId);
            alert("World published.");
        } catch (err) {
            console.error("Publish failed", err);
            alert("Failed to publish world.");
        } finally{
            setPublishing(false);
        }
    }
    // asset level actions
    async function saveLiveGroupAsPrivateAsset(params) {
        const w = worldRef.current;
        if (!w) return null;
        const snap = w.getGroupSnapshot(params.groupId);
        if (!snap) return null;
        const normalized = normalizeGroupToOrigin(snap);
        const thumb = params.withThumb ? await captureSquareThumbnailFromCurrentCamera() : null;
        const assetId = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].createPrivateAsset({
            name: (params.preferredName?.trim() || snap.groupId || "Asset").trim(),
            group: normalized,
            thumb
        });
        w.setGroupSource(params.groupId, {
            assetId,
            assetKind: "draft"
        });
        return assetId;
    }
    async function onSaveSelectedAsAsset(name) {
        const w = worldRef.current;
        const gid = selectedGroupIdLiveRef.current ?? selectedGroupId;
        if (!w || !gid) return;
        const assetId = await saveLiveGroupAsPrivateAsset({
            groupId: gid,
            preferredName: name,
            withThumb: true
        });
        if (!assetId) return;
        requestAutosave({
            immediate: true,
            reason: "save-selected-as-asset"
        });
        setAssetsOpen(true);
    }
    async function beginPlaceAsset(assetId, client) {
        const loaded = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].loadAsset(assetId);
        if (!loaded) return;
        placingAssetRef.current = {
            metaId: loaded.meta.id,
            metaName: loaded.meta.name,
            metaKind: loaded.meta.visibility === "marketplace" ? "marketplace" : "draft",
            group: loaded.group,
            compiledRender: loaded.compiledRender
        };
        setPlacingLabel(loaded.meta.name);
        setAssetsOpen(false);
        clearPlacementPreviewObjectUrl();
        const thumbUrl = loaded.meta.thumb ? URL.createObjectURL(loaded.meta.thumb) : null;
        placementPreviewObjectUrlRef.current = thumbUrl;
        setPlacementPreview({
            thumbUrl,
            x: client?.x ?? 0,
            y: client?.y ?? 0,
            kind: "asset"
        });
    }
    function beginApplyGlyph(glyph, client) {
        placingGlyphRef.current = glyph;
        setPlacingLabel(glyph.name || glyph.logicTag);
        setGlyphsOpen(false);
        setPlacementPreview({
            thumbUrl: glyph.thumbUrl,
            x: client?.x ?? 0,
            y: client?.y ?? 0,
            kind: "glyph"
        });
        pendingGlyphSpritesSyncRef.current = true;
        pendingGlyphOutlineSyncRef.current = true;
    }
    function cancelPlacementModes() {
        placingAssetRef.current = null;
        placingGlyphRef.current = null;
        setPlacingLabel(null);
        setPlacementPreview(null);
        clearPlacementPreviewObjectUrl();
        pendingGlyphSpritesSyncRef.current = true;
        pendingGlyphOutlineSyncRef.current = true;
    }
    function clearPlacementPreviewObjectUrl() {
        const url = placementPreviewObjectUrlRef.current;
        if (!url) return;
        URL.revokeObjectURL(url);
        placementPreviewObjectUrlRef.current = null;
    }
    // glyph visualization
    function getGlyphTexture(logicTag) {
        const cache = glyphTextureCacheRef.current;
        const existing = cache.get(logicTag);
        if (existing) return existing;
        const tex = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TextureLoader"]().load(`/glyphs/${logicTag}.png`);
        tex.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
        tex.magFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NearestFilter"];
        tex.minFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NearestFilter"];
        tex.generateMipmaps = false;
        cache.set(logicTag, tex);
        return tex;
    }
    function removeGlyphSprite(groupId) {
        const scene = sceneRef.current;
        const sprite = glyphSpriteMapRef.current.get(groupId);
        if (!scene || !sprite) return;
        scene.remove(sprite);
        sprite.material.dispose();
        glyphSpriteMapRef.current.delete(groupId);
    }
    function syncGlyphSprites() {
        const scene = sceneRef.current;
        const w = worldRef.current;
        if (!scene || !w) return;
        const nextVisibleGroups = new Set();
        for (const groupId of w.listGroupIds()){
            const logicTag = w.getGroupLogicTag?.(groupId);
            if (!logicTag) {
                removeGlyphSprite(groupId);
                continue;
            }
            const bounds = w.getGroupBounds(groupId);
            if (!bounds) {
                removeGlyphSprite(groupId);
                continue;
            }
            nextVisibleGroups.add(groupId);
            let sprite = glyphSpriteMapRef.current.get(groupId);
            if (!sprite) {
                const tex = getGlyphTexture(logicTag);
                const material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SpriteMaterial"]({
                    map: tex,
                    transparent: true,
                    depthWrite: false,
                    depthTest: true
                });
                sprite = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sprite"](material);
                sprite.renderOrder = 1200;
                scene.add(sprite);
                glyphSpriteMapRef.current.set(groupId, sprite);
            } else {
                const material = sprite.material;
                const wanted = getGlyphTexture(logicTag);
                if (material.map !== wanted) {
                    material.map = wanted;
                    material.needsUpdate = true;
                }
            }
            sprite.userData.groupId = groupId;
            const boxWidth = bounds.max.x - bounds.min.x + 1;
            const boxHeight = bounds.max.y - bounds.min.y + 1;
            const boxDepth = bounds.max.z - bounds.min.z + 1;
            const maxSpan = Math.max(boxWidth, boxHeight, boxDepth);
            const baseSize = Math.max(1.25, Math.min(2.5, maxSpan * 0.22));
            const normalGlyphSize = baseSize * 3;
            const isAssetSelected = selectedGroupIdLiveRef.current === groupId;
            const isGlyphSelected = selectedGlyphGroupIdLiveRef.current === groupId;
            const isHighlightedGlyph = isGlyphSelected;
            const isPlacingGlyph = placingGlyphRef.current !== null;
            sprite.visible = glyphsOpenRef.current || isPlacingGlyph || isAssetSelected || isGlyphSelected;
            const glyphSize = isHighlightedGlyph ? normalGlyphSize * 1.1 : normalGlyphSize;
            sprite.scale.set(glyphSize, glyphSize, 1);
            const material = sprite.material;
            material.opacity = isHighlightedGlyph ? 0.75 : 0.5;
            sprite.position.set(bounds.max.x + 3, bounds.max.y + 3, bounds.min.z - 3);
            sprite.userData.baseGlyphSize = normalGlyphSize;
        }
        for (const existingGroupId of Array.from(glyphSpriteMapRef.current.keys())){
            if (!nextVisibleGroups.has(existingGroupId)) {
                removeGlyphSprite(existingGroupId);
            }
        }
    }
    // import vox file flow
    async function onImportVoxFile(file) {
        try {
            const buffer = await file.arrayBuffer();
            const groups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$vox$2f$voxImport$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseVox"])(buffer);
            setImportModal({
                fileName: file.name,
                groups
            });
        } catch (err) {
            console.error(err);
            alert(err instanceof Error ? err.message : "Failed to import .vox");
        }
    }
    async function applyImport(opts) {
        const world = worldRef.current;
        const pending = importModal;
        if (!world || !pending) return;
        world.clear();
        currentIslandIdRef.current = null;
        setSelectedGroupId(null);
        setHoveredGroupId(null);
        hoveredGroupIdLiveRef.current = null;
        for (const g of pending.groups){
            const rawState = {
                groupId: g.groupId,
                position: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                voxels: g.voxels.map((v)=>({
                        local: {
                            x: v.x,
                            y: v.y,
                            z: v.z
                        },
                        color: v.color,
                        isBlueprint: opts.asBlueprint
                    }))
            };
            const normalized = normalizeGroupToOrigin(rawState);
            const assetId = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].createPrivateAsset({
                name: g.groupId || "Imported Asset",
                group: normalized,
                thumb: null
            });
            const stored = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].loadAsset(assetId);
            world.instantiateGroupState(stored?.group ?? normalized, {
                at: g.position,
                baseId: g.groupId,
                sourceAssetId: assetId,
                sourceAssetKind: "draft",
                compiledRender: stored?.compiledRender ?? null
            });
        }
        pendingGroupBoxesSyncRef.current = true;
        pendingGlyphSpritesSyncRef.current = true;
        pendingGlyphOutlineSyncRef.current = true;
        setImportModal(null);
        requestAutosave({
            immediate: true,
            reason: "import-vox"
        });
    }
    // autosave pipeline
    async function autosave(opts) {
        const world = worldRef.current;
        if (!world) return;
        if (!currentIslandIdRef.current) return;
        const data = world.exportWorldData();
        const thumb = opts?.withThumb ? await captureSquareThumbnailFromCurrentCamera() : undefined;
        const id = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["worldRepository"].saveWorld({
            name: "Primary World",
            data,
            thumb,
            id: currentIslandIdRef.current
        });
        lastSaveAtRef.current = performance.now();
        currentIslandIdRef.current = id;
        setPrimaryWorldId(id);
    }
    function requestAutosave(opts) {
        dirtyRef.current = true;
        const doSchedule = ()=>{
            if (autosaveTimerRef.current) window.clearTimeout(autosaveTimerRef.current);
            autosaveTimerRef.current = window.setTimeout(()=>{
                flushAutosave();
            }, AUTOSAVE_DEBOUNCE_MS);
        };
        if (opts?.immediate) {
            flushAutosave();
            return;
        }
        const now = performance.now();
        if (dirtyRef.current && now - lastSaveAtRef.current > AUTOSAVE_MAX_INTERVAL_MS) {
            flushAutosave();
            return;
        }
        doSchedule();
    }
    async function flushAutosave() {
        if (!dirtyRef.current) return;
        if (autosaveInFlightRef.current) {
            autosaveQueuedRef.current = true;
            return;
        }
        autosaveInFlightRef.current = true;
        try {
            await autosave({
                withThumb: false
            });
            dirtyRef.current = false;
            lastSaveAtRef.current = performance.now();
        } catch (e) {
            console.error("Autosave failed", e);
        } finally{
            autosaveInFlightRef.current = false;
            if (autosaveQueuedRef.current) {
                autosaveQueuedRef.current = false;
                flushAutosave();
            }
        }
    }
    // ui toggles
    function toggleAssets() {
        click();
        setAssetsOpen((v)=>!v);
    }
    function toggleGlyphs() {
        click();
        setGlyphsOpen((v)=>!v);
    }
    function toggleMarketplace() {
        click();
        setMarketplaceOpen((v)=>!v);
    }
    // ui selection
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        pendingGroupBoxesSyncRef.current = true;
        pendingGlyphSpritesSyncRef.current = true;
        pendingGlyphOutlineSyncRef.current = true;
    }, [
        selectedGroupId,
        hoveredGroupId,
        selectedGlyphGroupId,
        hoveredGlyphGroupId,
        focusOpen,
        glyphsOpen
    ]);
    // transient keyboard interaction guards 
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!placingLabel) return;
        const onKeyDown = (e)=>{
            if (e.key === "Escape") cancelPlacementModes();
        };
        window.addEventListener("keydown", onKeyDown);
        return ()=>window.removeEventListener("keydown", onKeyDown);
    }, [
        placingLabel
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const onKeyDown = async (e)=>{
            if (e.key !== "Backspace" && e.key !== "Delete") return;
            if (focusOpenRef.current) return;
            if (importModal) return;
            if (placingLabel) return;
            const el = document.activeElement;
            const tag = el?.tagName?.toLowerCase();
            if (tag === "input" || tag === "textarea" || el?.isContentEditable) return;
            const w = worldRef.current;
            if (!w) return;
            const selectedGlyphId = selectedGlyphGroupIdLiveRef.current;
            if (selectedGlyphId) {
                const ok = w.setGroupLogicTag?.(selectedGlyphId, null);
                if (!ok) return;
                play("deletePart");
                selectedGlyphGroupIdLiveRef.current = null;
                setSelectedGlyphGroupId(null);
                if (hoveredGlyphGroupIdLiveRef.current === selectedGlyphId) {
                    hoveredGlyphGroupIdLiveRef.current = null;
                    setHoveredGlyphGroupId(null);
                }
                pendingGlyphSpritesSyncRef.current = true;
                pendingGlyphOutlineSyncRef.current = true;
                requestAutosave({
                    immediate: true,
                    reason: "delete-glyph"
                });
                e.preventDefault();
                return;
            }
            const gid = selectedGroupIdLiveRef.current;
            if (!gid) return;
            const src = w.getGroupSource?.(gid) ?? null;
            const overrideIdToDelete = src?.overrideAssetId ?? null;
            const ok = w.removeGroup?.(gid);
            if (!ok) return;
            play("deletePart");
            try {
                if (overrideIdToDelete) {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].deleteAsset(overrideIdToDelete);
                }
            } catch (err) {
                console.error("failed to delete override asset for removed group", err);
            }
            selectedGroupIdLiveRef.current = null;
            setSelectedGroupId(null);
            if (hoveredGroupIdLiveRef.current === gid) {
                hoveredGroupIdLiveRef.current = null;
                setHoveredGroupId(null);
            }
            pendingGroupBoxesSyncRef.current = true;
            pendingGlyphSpritesSyncRef.current = true;
            pendingGlyphOutlineSyncRef.current = true;
            requestAutosave({
                immediate: true,
                reason: "delete-group"
            });
            e.preventDefault();
        };
        window.addEventListener("keydown", onKeyDown);
        return ()=>window.removeEventListener("keydown", onKeyDown);
    }, [
        importModal,
        placingLabel
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!importModal) return;
        const onKeyDown = (e)=>{
            if (e.key === "Escape") setImportModal(null);
        };
        window.addEventListener("keydown", onKeyDown);
        return ()=>window.removeEventListener("keydown", onKeyDown);
    }, [
        importModal
    ]);
    // autosave lifecycle
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const onVis = ()=>{
            if (document.visibilityState === "hidden") flushAutosave();
        };
        const onPageHide = ()=>{
            flushAutosave();
        };
        document.addEventListener("visibilitychange", onVis);
        window.addEventListener("pagehide", onPageHide);
        return ()=>{
            document.removeEventListener("visibilitychange", onVis);
            window.removeEventListener("pagehide", onPageHide);
        };
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        props.onRequestAutosaveRef?.(requestAutosave);
        return ()=>props.onRequestAutosaveRef?.(()=>{});
    }, []);
    // main three js boot
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const mount = mountRef.current;
        if (!mount) return;
        // scene boot
        const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Scene"]();
        sceneRef.current = scene;
        scene.background = null;
        const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PerspectiveCamera"](40, mount.clientWidth / mount.clientHeight, 0.1, 5000);
        camera.position.set(40, 40, 40);
        camera.lookAt(0, 0, 0);
        cameraRef.current = camera;
        const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WebGLRenderer"]({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            depth: true,
            stencil: false
        });
        rendererRef.current = renderer;
        const DPR = Math.min(window.devicePixelRatio, 2);
        renderer.setPixelRatio(DPR);
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PCFSoftShadowMap"];
        renderer.toneMapping = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NeutralToneMapping"];
        renderer.toneMappingExposure = 1.0;
        renderer.outputColorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
        mount.appendChild(renderer.domElement);
        const preventContextMenu = (e)=>e.preventDefault();
        renderer.domElement.addEventListener("contextmenu", preventContextMenu);
        scene.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AmbientLight"](0xffffff, 2.4));
        const hemi = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HemisphereLight"](0xdff4ff, 0x6fa0c8, 1.3);
        scene.add(hemi);
        const dir = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DirectionalLight"](0xffffff, 1.7);
        dir.castShadow = true;
        dir.shadow.bias = -0.0005;
        dir.shadow.mapSize.set(512, 512);
        dir.position.setFromSphericalCoords(250, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].degToRad(60), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].degToRad(30));
        dir.target.position.set(0, 0, 50);
        scene.add(dir.target);
        scene.add(dir);
        camera.position.set(172.557, 77.391, 184.354);
        cameraRef.current = camera;
        const controls = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$controls$2f$OrbitControls$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrbitControls"](camera, renderer.domElement);
        controls.enableDamping = true;
        controls.target.set(0.0, 0.0, 0.0);
        controls.update();
        camera.lookAt(controls.target);
        const hdriLoader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$RGBELoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RGBELoader"]();
        hdriLoader.load("/world/DayInTheClouds1K.hdr", (texture)=>{
            const pmrem = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PMREMGenerator"](renderer);
            const rt = pmrem.fromEquirectangular(texture);
            texture.dispose();
            pmrem.dispose();
            scene.environment = rt.texture;
            scene.environment.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
            envMapRef.current = rt.texture;
            envRTRef.current = rt;
        }, undefined, (err)=>console.error("Failed to load HDRI /world/DayInTheClouds1K.hdr", err));
        // island load
        const dracoLoader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$DRACOLoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DRACOLoader"]();
        dracoLoader.setDecoderPath("/draco/");
        dracoLoader.preload();
        const gltfLoader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$GLTFLoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GLTFLoader"]();
        gltfLoader.setDRACOLoader(dracoLoader);
        gltfLoader.load("/baked/island.glb", (gltf)=>{
            if (islandRootRef.current) {
                scene.remove(islandRootRef.current);
                islandRootRef.current = null;
            }
            const root = gltf.scene;
            root.name = "baked:island";
            root.position.set(0, 0, 0);
            root.rotation.set(0, 0, 0);
            root.scale.set(1, 1, 1);
            root.traverse((obj)=>{
                const mesh = obj;
                if (!mesh.isMesh) return;
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                const applyTo = (mat)=>{
                    const m = mat;
                    if (!("roughness" in m)) return;
                    m.roughness = 1;
                    m.metalness = 0;
                    if (scene.environment) m.envMap = scene.environment;
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$materials$2f$heightMist$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["applyHeightMistToStandardMaterial"])(m, {
                        yBottom: -12,
                        yTop: 1,
                        maxOpacity: 0.3,
                        color: 0xffffff
                    });
                    m.needsUpdate = true;
                };
                if (Array.isArray(mesh.material)) mesh.material.forEach(applyTo);
                else applyTo(mesh.material);
            });
            scene.add(root);
            islandRootRef.current = root;
        }, undefined, (err)=>{
            console.error("Failed to load /baked/island.glb", err);
        });
        // world boot
        const world = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$VoxelWorld$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VoxelWorld"](scene, {
            blueprintOpacity: 0.4,
            mode: "compiled"
        });
        worldRef.current = world;
        props.onWorldReady?.(world);
        let cancelled = false;
        (async ()=>{
            const explicitWorldId = initialWorldId?.trim() || null;
            let id = explicitWorldId;
            if (!id) {
                id = getPrimaryWorldId();
            }
            if (id) {
                const loaded = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["worldRepository"].loadWorld(id);
                if (cancelled) return;
                if (loaded) {
                    currentIslandIdRef.current = loaded.meta.id;
                    setIslandName(loaded.meta.name);
                    if (!explicitWorldId) {
                        setPrimaryWorldId(loaded.meta.id);
                    }
                    await world.importWorldData(loaded.data);
                    if (cancelled) return;
                    setSelectedGroupId(null);
                    setHoveredGroupId(null);
                    hoveredGroupIdLiveRef.current = null;
                    pendingGroupBoxesSyncRef.current = true;
                    pendingGlyphSpritesSyncRef.current = true;
                    pendingGlyphOutlineSyncRef.current = true;
                    return;
                }
                if (explicitWorldId) {
                    console.warn("Requested world not found:", explicitWorldId);
                }
                id = null;
            }
            const data = world.exportWorldData();
            const thumb = await captureSquareThumbnailFromCurrentCamera();
            if (cancelled) return;
            const newId = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["worldRepository"].saveWorld({
                name: "Primary World",
                data,
                thumb
            });
            if (cancelled) return;
            currentIslandIdRef.current = newId;
            setIslandName("My Voxbox");
            setPrimaryWorldId(newId);
        })();
        // pointer handlers
        pendingGroupBoxesSyncRef.current = true;
        pendingGlyphSpritesSyncRef.current = true;
        pendingGlyphOutlineSyncRef.current = true;
        function onPointerDown(e) {
            if (focusOpenRef.current) return;
            if (placingAssetRef.current || placingGlyphRef.current) {
                setPlacementPreview((prev)=>prev ? {
                        ...prev,
                        x: e.clientX,
                        y: e.clientY
                    } : prev);
            }
            updateRayFromMouse(e);
            const glyphGroupId = pickVisibleGlyphUnderMouse();
            if (glyphGroupId) {
                selectedGlyphGroupIdLiveRef.current = glyphGroupId;
                setSelectedGlyphGroupId(glyphGroupId);
                pendingGlyphSpritesSyncRef.current = true;
                pendingGlyphOutlineSyncRef.current = true;
                if (selectedGroupIdLiveRef.current !== null) {
                    selectedGroupIdLiveRef.current = null;
                    setSelectedGroupId(null);
                    pendingGroupBoxesSyncRef.current = true;
                }
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation?.();
                return;
            }
            if (selectedGlyphGroupIdLiveRef.current !== null) {
                selectedGlyphGroupIdLiveRef.current = null;
                setSelectedGlyphGroupId(null);
                pendingGlyphSpritesSyncRef.current = true;
                pendingGlyphOutlineSyncRef.current = true;
            }
            const placingGlyph = placingGlyphRef.current;
            if (placingGlyph && e.button === 0) {
                const w = worldRef.current;
                if (!w) return;
                const gid = pickGroupUnderMouse();
                if (!gid) return;
                const ok = w.setGroupLogicTag?.(gid, placingGlyph.logicTag);
                if (!ok) return;
                selectedGroupIdLiveRef.current = null;
                setSelectedGroupId(null);
                selectedGlyphGroupIdLiveRef.current = gid;
                setSelectedGlyphGroupId(gid);
                pendingGroupBoxesSyncRef.current = true;
                pendingGlyphSpritesSyncRef.current = true;
                pendingGlyphOutlineSyncRef.current = true;
                play("placeVoxel");
                requestAutosave({
                    immediate: true,
                    reason: `set-logic-tag:${placingGlyph.logicTag}`
                });
                cancelPlacementModes();
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation?.();
                return;
            }
            if (placingAssetRef.current && e.button === 0) {
                const w = worldRef.current;
                if (!w) return;
                let p = null;
                const meshes = w.listMeshes();
                const hits = raycaster.intersectObjects(meshes, false);
                if (hits.length) {
                    p = hits[0].point.clone();
                } else {
                    const ground = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Plane"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0), 0);
                    p = rayPlaneIntersection(ground);
                }
                if (!p) return;
                const pos = {
                    x: Math.floor(p.x),
                    y: Math.floor(p.y),
                    z: Math.floor(p.z)
                };
                w.instantiateGroupState(placingAssetRef.current.group, {
                    at: pos,
                    baseId: placingAssetRef.current.metaName,
                    sourceAssetId: placingAssetRef.current.metaId,
                    sourceAssetKind: placingAssetRef.current.metaKind,
                    compiledRender: placingAssetRef.current.compiledRender
                });
                play("placePart");
                requestAutosave({
                    reason: "place-asset"
                });
                pendingGroupBoxesSyncRef.current = true;
                pendingGlyphSpritesSyncRef.current = true;
                pendingGlyphOutlineSyncRef.current = true;
                cancelPlacementModes();
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation?.();
                return;
            }
            const gid = pickGroupUnderMouse();
            if (!gid) {
                selectedGroupIdLiveRef.current = null;
                setSelectedGroupId(null);
                pendingGroupBoxesSyncRef.current = true;
                pendingGlyphSpritesSyncRef.current = true;
                pendingGlyphOutlineSyncRef.current = true;
                return;
            }
            const prev = selectedGroupIdLiveRef.current;
            if (prev !== gid) {
                play("placeVoxel");
            }
            selectedGroupIdLiveRef.current = gid;
            setSelectedGroupId(gid);
            pendingGroupBoxesSyncRef.current = true;
            pendingGlyphSpritesSyncRef.current = true;
            pendingGlyphOutlineSyncRef.current = true;
            if (e.button !== 0) return;
            const w = worldRef.current;
            const renderer = rendererRef.current;
            const cam = cameraRef.current;
            if (!w || !renderer || !cam) return;
            const gp = w.getGroupPosition ? w.getGroupPosition(gid) : {
                x: 0,
                y: 0,
                z: 0
            };
            setOrbitalControlsEnabled(false);
            renderer.domElement.setPointerCapture(e.pointerId);
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation?.();
            const tool = worldToolRef.current;
            if (tool === "upmovement") {
                const worldPoint = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](gp.x + 0.5, gp.y + 0.5, gp.z + 0.5);
                const upp = unitsPerScreenPixelAtWorldPointY({
                    worldPoint,
                    camera: cam,
                    renderer
                });
                dragRef.current = {
                    active: true,
                    pointerId: e.pointerId,
                    groupId: gid,
                    mode: "up",
                    startGroupPos: {
                        ...gp
                    },
                    startClientY: e.clientY,
                    unitsPerPixelY: upp
                };
                return;
            }
            const plane = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Plane"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0), -gp.y);
            const hit = rayPlaneIntersection(plane);
            if (!hit) return;
            dragRef.current = {
                active: true,
                pointerId: e.pointerId,
                groupId: gid,
                mode: "plane",
                startGroupPos: {
                    ...gp
                },
                startHitPoint: hit.clone(),
                plane
            };
        }
        function onPointerMove(e) {
            if (focusOpenRef.current) return;
            if (placingAssetRef.current || placingGlyphRef.current) {
                setPlacementPreview((prev)=>prev ? {
                        ...prev,
                        x: e.clientX,
                        y: e.clientY
                    } : prev);
            }
            const d = dragRef.current;
            if (d?.active) {
                const w = worldRef.current;
                if (!w?.setGroupPosition) return;
                if (d.mode === "up") {
                    const startY = d.startGroupPos.y;
                    const startClientY = d.startClientY ?? e.clientY;
                    const upp = d.unitsPerPixelY ?? 0.02;
                    const dyPx = e.clientY - startClientY;
                    const dyWorld = -dyPx * upp;
                    const next = {
                        x: d.startGroupPos.x,
                        y: Math.round(startY + dyWorld),
                        z: d.startGroupPos.z
                    };
                    w.setGroupPosition(d.groupId, next);
                    pendingGroupBoxesSyncRef.current = true;
                    pendingGlyphSpritesSyncRef.current = true;
                    pendingGlyphOutlineSyncRef.current = true;
                    requestAutosave({
                        reason: "move-group-up"
                    });
                    e.preventDefault();
                    return;
                }
                updateRayFromMouse(e);
                const plane = d.plane;
                const hit = rayPlaneIntersection(plane);
                if (!hit) return;
                const delta = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]().subVectors(hit, d.startHitPoint);
                const dx = Math.round(delta.x);
                const dz = Math.round(delta.z);
                const next = {
                    x: d.startGroupPos.x + dx,
                    y: d.startGroupPos.y,
                    z: d.startGroupPos.z + dz
                };
                w.setGroupPosition(d.groupId, next);
                pendingGroupBoxesSyncRef.current = true;
                pendingGlyphSpritesSyncRef.current = true;
                pendingGlyphOutlineSyncRef.current = true;
                requestAutosave({
                    reason: "move-group"
                });
                e.preventDefault();
                return;
            }
            updateRayFromMouse(e);
            const hoveredGlyphId = pickVisibleGlyphUnderMouse();
            if (hoveredGlyphId) {
                if (hoveredGlyphGroupIdLiveRef.current !== hoveredGlyphId) {
                    hoveredGlyphGroupIdLiveRef.current = hoveredGlyphId;
                    setHoveredGlyphGroupId(hoveredGlyphId);
                    pendingGlyphOutlineSyncRef.current = true;
                }
                if (hoveredGroupIdLiveRef.current !== null) {
                    hoveredGroupIdLiveRef.current = null;
                    setHoveredGroupId(null);
                    pendingGroupBoxesSyncRef.current = true;
                }
                return;
            }
            if (hoveredGlyphGroupIdLiveRef.current !== null) {
                hoveredGlyphGroupIdLiveRef.current = null;
                setHoveredGlyphGroupId(null);
                pendingGlyphOutlineSyncRef.current = true;
            }
            const gid = pickGroupUnderMouse();
            const prev = hoveredGroupIdLiveRef.current;
            if (prev !== gid) {
                hoveredGroupIdLiveRef.current = gid;
                setHoveredGroupId(gid);
                pendingGroupBoxesSyncRef.current = true;
            }
        }
        function endDrag() {
            const renderer = rendererRef.current;
            const d = dragRef.current;
            if (renderer && d?.active) {
                try {
                    renderer.domElement.releasePointerCapture(d.pointerId);
                } catch  {}
            }
            dragRef.current = null;
            setOrbitalControlsEnabled(!focusOpenRef.current);
        }
        function onPointerLeave() {
            hoveredGlyphGroupIdLiveRef.current = null;
            setHoveredGlyphGroupId(null);
            pendingGlyphOutlineSyncRef.current = true;
            hoveredGroupIdLiveRef.current = null;
            setHoveredGroupId(null);
            pendingGroupBoxesSyncRef.current = true;
            endDrag();
        }
        function onPointerUp() {
            endDrag();
        }
        function onPointerCancel() {
            endDrag();
        }
        renderer.domElement.addEventListener("pointerdown", onPointerDown, true);
        renderer.domElement.addEventListener("pointermove", onPointerMove);
        renderer.domElement.addEventListener("pointercancel", onPointerCancel);
        renderer.domElement.addEventListener("pointerleave", onPointerLeave);
        window.addEventListener("pointerup", onPointerUp);
        // resize / raf
        const onResize = ()=>{
            const w = mount.clientWidth;
            const h = mount.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
            const dpr = Math.min(window.devicePixelRatio, 2);
            renderer.setPixelRatio(dpr);
        };
        window.addEventListener("resize", onResize);
        let raf = 0;
        const tick = ()=>{
            raf = requestAnimationFrame(tick);
            if (focusOpenRef.current) return;
            controls.update();
            if (pendingGroupBoxesSyncRef.current) {
                pendingGroupBoxesSyncRef.current = false;
                syncGroupBoxes();
            }
            if (pendingGlyphSpritesSyncRef.current) {
                pendingGlyphSpritesSyncRef.current = false;
                syncGlyphSprites();
            }
            if (pendingGlyphOutlineSyncRef.current) {
                pendingGlyphOutlineSyncRef.current = false;
                syncGlyphOutlines();
            }
            renderer.render(scene, camera);
        };
        tick();
        // cleanup
        return ()=>{
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", onResize);
            renderer.domElement.removeEventListener("pointerdown", onPointerDown, true);
            renderer.domElement.removeEventListener("pointermove", onPointerMove);
            renderer.domElement.removeEventListener("pointercancel", onPointerCancel);
            renderer.domElement.removeEventListener("pointerleave", onPointerLeave);
            window.removeEventListener("pointerup", onPointerUp);
            renderer.domElement.removeEventListener("contextmenu", preventContextMenu);
            props.onWorldReady?.(null);
            cancelled = true;
            world.dispose();
            worldRef.current = null;
            controls.dispose();
            controlsRef.current = null;
            if (islandRootRef.current) {
                scene.remove(islandRootRef.current);
                islandRootRef.current = null;
            }
            scene.environment = null;
            envMapRef.current = null;
            if (envRTRef.current) {
                envRTRef.current.dispose();
                envRTRef.current = null;
            }
            clearHelper(selectedBoxRef);
            clearHelper(hoverBoxRef);
            clearGlyphOutline(selectedGlyphOutlineRef);
            clearGlyphOutline(hoverGlyphOutlineRef);
            clearPlacementPreviewObjectUrl();
            for (const groupId of Array.from(glyphSpriteMapRef.current.keys())){
                removeGlyphSprite(groupId);
            }
            for (const tex of glyphTextureCacheRef.current.values()){
                tex.dispose();
            }
            glyphTextureCacheRef.current.clear();
            cameraRef.current = null;
            rendererRef.current = null;
            sceneRef.current = null;
            if (autosaveTimerRef.current) window.clearTimeout(autosaveTimerRef.current);
            if (renderer.domElement.parentElement === mount) {
                mount.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, [
        mouseNDC,
        raycaster,
        initialWorldId
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            userSelect: "none",
            backgroundImage: `url('/world/bg.png')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover"
        },
        className: "jsx-3d0d8835497919da",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": true,
                className: "jsx-3d0d8835497919da" + " " + "clouds",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: "/world/bgc.png",
                        alt: "",
                        className: "jsx-3d0d8835497919da" + " " + "cloud cloudBg"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                        lineNumber: 1847,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: "/world/mgc.png",
                        alt: "",
                        className: "jsx-3d0d8835497919da" + " " + "cloud cloudMg"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                        lineNumber: 1848,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: "/world/fgc.png",
                        alt: "",
                        className: "jsx-3d0d8835497919da" + " " + "cloud cloudFg"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                        lineNumber: 1849,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                lineNumber: 1846,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: mountRef,
                style: {
                    position: "absolute",
                    inset: 0,
                    overflow: "hidden",
                    zIndex: 10,
                    opacity: focusOpen ? 0 : 1,
                    transition: "opacity 120ms linear",
                    pointerEvents: focusOpen ? "none" : "auto"
                },
                className: "jsx-3d0d8835497919da"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                lineNumber: 1852,
                columnNumber: 7
            }, this),
            ADMIN && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    top: 0,
                    right: 0,
                    display: "flex",
                    gap: 10,
                    pointerEvents: "auto",
                    zIndex: 10
                },
                className: "jsx-3d0d8835497919da",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        onClick: ()=>setAssetsOpen(true),
                        style: {
                            padding: "15px 15px",
                            color: "black",
                            fontSize: 20,
                            cursor: "pointer"
                        },
                        className: "jsx-3d0d8835497919da",
                        children: "Assets"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                        lineNumber: 1877,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        onClick: onNew,
                        style: {
                            padding: "15px 15px",
                            color: "black",
                            fontSize: 20,
                            cursor: "pointer"
                        },
                        className: "jsx-3d0d8835497919da",
                        children: "New"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                        lineNumber: 1884,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        onClick: onSaveToLibrary,
                        style: {
                            padding: "15px 15px",
                            color: "black",
                            fontSize: 20,
                            cursor: "pointer"
                        },
                        className: "jsx-3d0d8835497919da",
                        children: "Save"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                        lineNumber: 1888,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        onClick: ()=>setLibraryOpen(true),
                        style: {
                            padding: "15px 15px",
                            color: "black",
                            fontSize: 20,
                            cursor: "pointer"
                        },
                        className: "jsx-3d0d8835497919da",
                        children: "Worlds"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                        lineNumber: 1895,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        style: {
                            padding: "15px 15px",
                            color: "black",
                            fontSize: 20,
                            cursor: "pointer"
                        },
                        className: "jsx-3d0d8835497919da",
                        children: [
                            "Import",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "file",
                                accept: ".vox",
                                style: {
                                    display: "none"
                                },
                                onChange: (e)=>{
                                    const f = e.target.files?.[0];
                                    if (f) onImportVoxFile(f);
                                    e.currentTarget.value = "";
                                },
                                className: "jsx-3d0d8835497919da"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                                lineNumber: 1904,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                        lineNumber: 1902,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                lineNumber: 1866,
                columnNumber: 9
            }, this),
            importModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "fixed",
                    inset: 0,
                    zIndex: 99999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 16
                },
                onMouseDown: ()=>setImportModal(null),
                className: "jsx-3d0d8835497919da",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        width: "min(520px, 100%)",
                        background: "rgba(255,255,255,1.0)",
                        border: "1px solid rgba(0,0,0,1.0)",
                        padding: 16
                    },
                    onMouseDown: (e)=>e.stopPropagation(),
                    className: "jsx-3d0d8835497919da",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: 20,
                                marginBottom: 20
                            },
                            className: "jsx-3d0d8835497919da",
                            children: "Import .vox"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                            lineNumber: 1940,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: 15,
                                marginBottom: 14
                            },
                            className: "jsx-3d0d8835497919da",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: 4
                                    },
                                    className: "jsx-3d0d8835497919da",
                                    children: importModal.fileName
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                                    lineNumber: 1943,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-3d0d8835497919da",
                                    children: [
                                        importModal.groups.length.toLocaleString(),
                                        " objects"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                                    lineNumber: 1944,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                            lineNumber: 1942,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: 10,
                                flexWrap: "wrap"
                            },
                            className: "jsx-3d0d8835497919da",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    onClick: ()=>applyImport({
                                            asBlueprint: false
                                        }),
                                    style: {
                                        padding: "10px 0px",
                                        cursor: "pointer",
                                        fontSize: 15
                                    },
                                    className: "jsx-3d0d8835497919da",
                                    children: "Import normally"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                                    lineNumber: 1948,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    onClick: ()=>applyImport({
                                            asBlueprint: true
                                        }),
                                    style: {
                                        padding: "10px 12px",
                                        cursor: "pointer",
                                        fontSize: 15
                                    },
                                    className: "jsx-3d0d8835497919da",
                                    children: "Import as blueprint"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                                    lineNumber: 1954,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    onClick: ()=>setImportModal(null),
                                    style: {
                                        padding: "10px 12px",
                                        cursor: "pointer",
                                        fontSize: 15
                                    },
                                    className: "jsx-3d0d8835497919da",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                                    lineNumber: 1960,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                            lineNumber: 1947,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                    lineNumber: 1931,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                lineNumber: 1919,
                columnNumber: 9
            }, this),
            showUI && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "relative",
                    zIndex: 20,
                    pointerEvents: "auto"
                },
                className: "jsx-3d0d8835497919da",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$ui$2f$LibraryPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    open: libraryOpen,
                    onClose: ()=>setLibraryOpen(false),
                    onOpenIsland: onOpenFromLibrary
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                    lineNumber: 1973,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                lineNumber: 1972,
                columnNumber: 9
            }, this),
            showUI && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    top: 20,
                    left: 0,
                    padding: 12,
                    pointerEvents: "auto",
                    zIndex: 30,
                    overflow: "visible",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    alignItems: "flex-start"
                },
                className: "jsx-3d0d8835497919da",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$ui$2f$WorldToolPalette$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        value: worldTool,
                        onSelect: (t)=>{
                            if (t === "planemovement" || t === "upmovement") {
                                setWorldTool(t);
                                return;
                            }
                            if (t === "rotateleft" || t === "rotateright") {
                                const w = worldRef.current;
                                const gid = selectedGroupIdLiveRef.current;
                                if (!w || !gid || dragRef.current?.active) return;
                                const dir = t === "rotateright" ? 1 : -1;
                                const tool = worldToolRef.current;
                                let axis = "y";
                                if (tool === "upmovement") axis = "x";
                                const ok = w.rotateGroup90?.(gid, axis, dir);
                                if (!ok) return;
                                pendingGroupBoxesSyncRef.current = true;
                                pendingGlyphSpritesSyncRef.current = true;
                                pendingGlyphOutlineSyncRef.current = true;
                                requestAutosave({
                                    reason: `rotate-group-${axis}`
                                });
                            }
                        }
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                        lineNumber: 1997,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: toggleMarketplace,
                        style: {
                            padding: "10px 12px",
                            borderRadius: 6,
                            background: "rgba(0, 50, 110, 0.5)",
                            color: "white",
                            fontSize: 16,
                            cursor: "pointer",
                            opacity: marketplaceOpen ? 1 : 0.7,
                            transition: "opacity 120ms ease-out",
                            userSelect: "none",
                            textAlign: "center",
                            minWidth: 90,
                            marginTop: 50
                        },
                        className: "jsx-3d0d8835497919da" + " " + "pix-icon",
                        children: "market"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                        lineNumber: 2027,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: publishing ? undefined : onPublishWorld,
                        style: {
                            padding: "10px 12px",
                            borderRadius: 6,
                            background: "rgba(0, 50, 110, 0.5)",
                            color: "white",
                            fontSize: 16,
                            cursor: publishing ? "default" : "pointer",
                            opacity: publishing ? 1 : 0.7,
                            transition: "opacity 120ms ease-out",
                            userSelect: "none",
                            textAlign: "center",
                            minWidth: 90
                        },
                        className: "jsx-3d0d8835497919da" + " " + "pix-icon",
                        children: publishing ? "publishing..." : "publish"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                        lineNumber: 2048,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                lineNumber: 1982,
                columnNumber: 9
            }, this),
            showUI && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    top: 21,
                    right: 10,
                    zIndex: 30,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 20,
                    pointerEvents: "auto"
                },
                className: "jsx-3d0d8835497919da",
                children: [
                    (assetsOpen || glyphsOpen || marketplaceOpen) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 12,
                            alignItems: "flex-start",
                            pointerEvents: "auto"
                        },
                        className: "jsx-3d0d8835497919da",
                        children: [
                            assetsOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    pointerEvents: "auto"
                                },
                                className: "jsx-3d0d8835497919da",
                                children: ("TURBOPACK compile-time falsy", 0) ? /*#__PURE__*/ "TURBOPACK unreachable" : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$ui$2f$AssetsPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    open: true,
                                    onClose: ()=>setAssetsOpen(false),
                                    onRequestPlace: beginPlaceAsset
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                                    lineNumber: 2104,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                                lineNumber: 2093,
                                columnNumber: 17
                            }, this),
                            glyphsOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    pointerEvents: "auto"
                                },
                                className: "jsx-3d0d8835497919da",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$ui$2f$GlyphsPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    open: true,
                                    onClose: ()=>setGlyphsOpen(false),
                                    onRequestApplyGlyph: beginApplyGlyph
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                                    lineNumber: 2115,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                                lineNumber: 2114,
                                columnNumber: 17
                            }, this),
                            marketplaceOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    pointerEvents: "auto"
                                },
                                className: "jsx-3d0d8835497919da",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$ui$2f$MarketplacePanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    open: true,
                                    onClose: ()=>setMarketplaceOpen(false)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                                    lineNumber: 2125,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                                lineNumber: 2124,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                        lineNumber: 2084,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 4,
                            alignItems: "center"
                        },
                        className: "jsx-3d0d8835497919da",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/icons/assets.png",
                                alt: "Assets",
                                onClick: toggleAssets,
                                style: {
                                    height: "10vh",
                                    width: "auto",
                                    objectFit: "contain",
                                    imageRendering: "pixelated",
                                    cursor: "pointer",
                                    pointerEvents: "auto",
                                    flex: "0 0 auto",
                                    opacity: assetsOpen ? 1 : 0.7,
                                    transition: "opacity 120ms ease-out"
                                },
                                className: "jsx-3d0d8835497919da" + " " + "pix-icon"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                                lineNumber: 2142,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/icons/glyphs.png",
                                alt: "Glyphs",
                                onClick: toggleGlyphs,
                                style: {
                                    height: "8vh",
                                    width: "auto",
                                    objectFit: "contain",
                                    imageRendering: "pixelated",
                                    cursor: "pointer",
                                    pointerEvents: "auto",
                                    flex: "0 0 auto",
                                    opacity: glyphsOpen ? 1 : 0.7,
                                    transition: "opacity 120ms ease-out"
                                },
                                className: "jsx-3d0d8835497919da" + " " + "pix-icon"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                                lineNumber: 2160,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                        lineNumber: 2134,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                lineNumber: 2071,
                columnNumber: 9
            }, this),
            showUI && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    left: "50%",
                    bottom: 50,
                    transform: focusCtaVisible ? "translate(-50%, 0)" : "translate(-50%, 140%)",
                    opacity: focusCtaVisible ? 1 : 0,
                    transition: "transform 220ms cubic-bezier(.2,.9,.2,1), opacity 180ms ease-out",
                    zIndex: 20,
                    pointerEvents: focusCtaVisible ? "auto" : "none",
                    willChange: "transform, opacity"
                },
                className: "jsx-3d0d8835497919da",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: ()=>{
                        play("whoosh");
                        onFocusGroup(selectedGroupId);
                    },
                    style: {
                        padding: "10px 14px",
                        borderRadius: 5,
                        background: "rgba(0, 50, 110, 0.5)",
                        color: "white",
                        fontSize: 20
                    },
                    className: "jsx-3d0d8835497919da" + " " + "pix-icon",
                    children: "focus mode"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                    lineNumber: 2197,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                lineNumber: 2182,
                columnNumber: 9
            }, this),
            placementPreview && placementPreview.thumbUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "fixed",
                    left: placementPreview.x,
                    top: placementPreview.y,
                    transform: "translate(-50%, -50%)",
                    zIndex: 200,
                    pointerEvents: "none",
                    opacity: 0.3
                },
                className: "jsx-3d0d8835497919da",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: placementPreview.thumbUrl,
                    alt: "",
                    draggable: false,
                    style: {
                        width: placementPreview.kind === "glyph" ? 45 : 75,
                        height: placementPreview.kind === "glyph" ? 45 : 75,
                        objectFit: "contain",
                        imageRendering: "pixelated",
                        userSelect: "none",
                        display: "block"
                    },
                    className: "jsx-3d0d8835497919da"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                    lineNumber: 2228,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
                lineNumber: 2217,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "3d0d8835497919da",
                children: ".clouds.jsx-3d0d8835497919da{z-index:5;pointer-events:none;position:absolute;inset:0;overflow:hidden}.cloud.jsx-3d0d8835497919da{object-fit:cover;width:200%;height:200%;image-rendering:pixelated;image-rendering:crisp-edges;will-change:transform;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.cloudBg.jsx-3d0d8835497919da{animation:18s ease-in-out infinite cloudSineBg}.cloudMg.jsx-3d0d8835497919da{animation:14s ease-in-out infinite cloudSineMg}.cloudFg.jsx-3d0d8835497919da{animation:12s ease-in-out infinite cloudSineFg}@keyframes cloudSineBg{0%{transform:translate(-50.2%,-50%)}50%{transform:translate(-49.8%,-50%)}to{transform:translate(-50.2%,-50%)}}@keyframes cloudSineMg{0%{transform:translate(-49.7%,-49.95%)}50%{transform:translate(-50.3%,-50.05%)}to{transform:translate(-49.7%,-49.95%)}}@keyframes cloudSineFg{0%{transform:translate(-50.4%,-50.075%)}50%{transform:translate(-49.6%,-49.925%)}to{transform:translate(-50.4%,-50.075%)}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx",
        lineNumber: 1832,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/src/components/VoxelEditor/ui/ColorPalette.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ColorPalette
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/audio/SoundProvider.tsx [app-ssr] (ecmascript)");
"use client";
;
;
const SWATCHES = [
    "#ffffff",
    "#111111",
    "#ff3b30",
    "#ff9500",
    "#ffcc00",
    "#34c759",
    "#00c7be",
    "#007aff",
    "#af52de"
];
function ColorPalette({ value, onChange }) {
    const { click } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSound"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            gap: 10,
            padding: "15px 15px 8px 15px",
            alignItems: "center"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 26px)",
                    gridAutoRows: "26px",
                    gap: 8
                },
                children: SWATCHES.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "pix-icon",
                        onClick: ()=>{
                            click();
                            onChange(c);
                        },
                        title: c,
                        type: "button",
                        style: {
                            width: 26,
                            height: 26,
                            border: c === value ? "2px solid rgba(0,0,0,0.5)" : "2px solid rgba(0,0,0,0.35)",
                            background: c,
                            cursor: "pointer",
                            padding: 0,
                            appearance: "none",
                            WebkitAppearance: "none",
                            outline: "none",
                            display: "block",
                            imageRendering: "pixelated"
                        }
                    }, c, false, {
                        fileName: "[project]/apps/web/src/components/VoxelEditor/ui/ColorPalette.tsx",
                        lineNumber: 42,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/ColorPalette.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: 22,
                    height: 1,
                    background: "rgba(0, 50, 110, 0.5)"
                }
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/ColorPalette.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                style: {
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    color: "black"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        width: 26,
                        height: 26,
                        border: "2px solid rgba(0,0,0,0.5)",
                        background: value,
                        display: "inline-block",
                        position: "relative",
                        overflow: "hidden",
                        cursor: "pointer"
                    },
                    title: value,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "color",
                        value: value,
                        onChange: (e)=>onChange(e.target.value),
                        style: {
                            position: "absolute",
                            inset: -6,
                            width: "calc(100% + 12px)",
                            height: "calc(100% + 12px)",
                            border: "none",
                            padding: 0,
                            margin: 0,
                            background: "transparent",
                            cursor: "pointer"
                        }
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/VoxelEditor/ui/ColorPalette.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/VoxelEditor/ui/ColorPalette.tsx",
                    lineNumber: 71,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/ColorPalette.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/VoxelEditor/ui/ColorPalette.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/src/components/VoxelEditor/ui/ToolPalette.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ToolPalette
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/audio/SoundProvider.tsx [app-ssr] (ecmascript)");
"use client";
;
;
const TOOLS = [
    {
        id: "pencil",
        title: "Pencil",
        src: "/icons/pencil.png"
    },
    {
        id: "marquee",
        title: "Marquee",
        src: "/icons/marquee.png"
    },
    {
        id: "eyedropper",
        title: "Eyedropper",
        src: "/icons/eyedropper.png"
    }
];
function ToolPalette({ value, onChange }) {
    const { click } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSound"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            gap: 10,
            alignItems: "center",
            padding: 0,
            overflow: "visible"
        },
        children: [
            TOOLS.map((t)=>{
                const selected = t.id === value;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    className: "pix-icon",
                    src: t.src,
                    alt: t.title,
                    title: t.title,
                    onClick: ()=>{
                        click();
                        onChange(t.id);
                    },
                    style: {
                        height: "7vh",
                        width: "auto",
                        objectFit: "contain",
                        imageRendering: "pixelated",
                        cursor: "pointer",
                        pointerEvents: "auto",
                        opacity: selected ? 1 : 0.85,
                        transition: "opacity 120ms ease-out"
                    }
                }, t.id, false, {
                    fileName: "[project]/apps/web/src/components/VoxelEditor/ui/ToolPalette.tsx",
                    lineNumber: 35,
                    columnNumber: 11
                }, this);
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: "5vh",
                    textAlign: "center",
                    fontSize: 14,
                    lineHeight: 1.2,
                    color: "#00324C",
                    opacity: 0.85,
                    userSelect: "none",
                    pointerEvents: "none",
                    whiteSpace: "nowrap"
                },
                children: [
                    value === "pencil" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: "Q: pencil"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/ToolPalette.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: "LMB: draw"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/ToolPalette.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: "RMB: erase"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/ToolPalette.tsx",
                                lineNumber: 76,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true),
                    value === "marquee" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: "W: fill box"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/ToolPalette.tsx",
                                lineNumber: 82,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: "LMB ×2: fill"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/ToolPalette.tsx",
                                lineNumber: 83,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: "RMB: cancel"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/ToolPalette.tsx",
                                lineNumber: 84,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true),
                    value === "eyedropper" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: "E: eyedropper"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/ToolPalette.tsx",
                                lineNumber: 90,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: "LMB: pick color"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/ToolPalette.tsx",
                                lineNumber: 91,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: "RMB: nothing"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/ToolPalette.tsx",
                                lineNumber: 92,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/VoxelEditor/ui/ToolPalette.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/VoxelEditor/ui/ToolPalette.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/src/components/VoxelEditor/VoxelPartEditor.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VoxelPartEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$controls$2f$OrbitControls$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/controls/OrbitControls.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$RGBELoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/loaders/RGBELoader.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/audio/SoundProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$VoxelWorld$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/VoxelWorld.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$Types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/Types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/repositories/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$ui$2f$ColorPalette$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/ui/ColorPalette.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$ui$2f$ToolPalette$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/ui/ToolPalette.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
// file scope consts
const FOCUS_GROUP_ID = "__focus__";
const SNAPSHOT_SIZE = 1024;
// helpers
function computeLocalBounds(voxels) {
    if (!voxels.length) return null;
    let minX = Infinity, minY = Infinity, minZ = Infinity;
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
    for (const v of voxels){
        const { x, y, z } = v.local;
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
        minZ = Math.min(minZ, z);
        maxZ = Math.max(maxZ, z);
    }
    return {
        minX,
        minY,
        minZ,
        maxX,
        maxY,
        maxZ
    };
}
function recenterCameraOnBounds(params) {
    const { minX, minY, minZ, maxX, maxY, maxZ, controls, camera } = params;
    if (!controls || !camera) return;
    const cx = (minX + maxX + 1) / 2;
    const cy = (minY + maxY + 1) / 2;
    const cz = (minZ + maxZ + 1) / 2;
    controls.target.set(cx + 0.5, cy + 0.5, cz + 0.5);
    controls.update();
    camera.lookAt(controls.target);
}
function raycastVoxelGrid(world, ray, maxDist = 2000, maxSteps = 4096) {
    const o = ray.origin;
    const d = ray.direction;
    let x = Math.floor(o.x);
    let y = Math.floor(o.y);
    let z = Math.floor(o.z);
    const stepX = d.x > 0 ? 1 : d.x < 0 ? -1 : 0;
    const stepY = d.y > 0 ? 1 : d.y < 0 ? -1 : 0;
    const stepZ = d.z > 0 ? 1 : d.z < 0 ? -1 : 0;
    const tDeltaX = stepX !== 0 ? Math.abs(1 / d.x) : Infinity;
    const tDeltaY = stepY !== 0 ? Math.abs(1 / d.y) : Infinity;
    const tDeltaZ = stepZ !== 0 ? Math.abs(1 / d.z) : Infinity;
    const nextBoundaryX = stepX > 0 ? x + 1 : x;
    const nextBoundaryY = stepY > 0 ? y + 1 : y;
    const nextBoundaryZ = stepZ > 0 ? z + 1 : z;
    let tMaxX = stepX !== 0 ? (nextBoundaryX - o.x) / d.x : Infinity;
    let tMaxY = stepY !== 0 ? (nextBoundaryY - o.y) / d.y : Infinity;
    let tMaxZ = stepZ !== 0 ? (nextBoundaryZ - o.z) / d.z : Infinity;
    let normal = {
        x: 0,
        y: 0,
        z: 0
    };
    let t = 0;
    for(let i = 0; i < maxSteps && t <= maxDist; i++){
        if (world.has({
            x,
            y,
            z
        })) return {
            coord: {
                x,
                y,
                z
            },
            normal,
            t
        };
        if (tMaxX < tMaxY) {
            if (tMaxX < tMaxZ) {
                x += stepX;
                t = tMaxX;
                tMaxX += tDeltaX;
                normal = {
                    x: -stepX,
                    y: 0,
                    z: 0
                };
            } else {
                z += stepZ;
                t = tMaxZ;
                tMaxZ += tDeltaZ;
                normal = {
                    x: 0,
                    y: 0,
                    z: -stepZ
                };
            }
        } else {
            if (tMaxY < tMaxZ) {
                y += stepY;
                t = tMaxY;
                tMaxY += tDeltaY;
                normal = {
                    x: 0,
                    y: -stepY,
                    z: 0
                };
            } else {
                z += stepZ;
                t = tMaxZ;
                tMaxZ += tDeltaZ;
                normal = {
                    x: 0,
                    y: 0,
                    z: -stepZ
                };
            }
        }
    }
    return null;
}
function VoxelPartEditor(props) {
    const { open, groupId, sourceAssetId, sourceAssetKind, overrideAssetId, world, onExit } = props;
    // sound
    const { play, startLoop, stopLoop, click } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSound"])();
    // editor ui state
    const [color, setColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("#34c759");
    const [tool, setTool] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("pencil");
    const [sourceAssetMeta, setSourceAssetMeta] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [effectiveAssetMeta, setEffectiveAssetMeta] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSavingAsset, setIsSavingAsset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSnapshotting, setIsSnapshotting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasStructuralChanges, setHasStructuralChanges] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // derived editor refs
    const colorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(color);
    const toolRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(tool);
    const openRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(open);
    // three refs
    const mountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sceneRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rendererRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cameraRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const controlsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const raycaster = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Raycaster"](), []);
    const mouseNDC = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"](), []);
    const pendingHoverRaycastRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // focus editing refs
    const focusWorldRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hoverPlaneRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const marqueePreviewRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const marqueeStartRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const initialCoordSetRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Set());
    // media refs
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const warmedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    // dev refs
    const solidifyFocusRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // helpers
    // ref sync helpers
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>void (colorRef.current = color), [
        color
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>void (toolRef.current = tool), [
        tool
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>void (openRef.current = open), [
        open
    ]);
    // view helpers
    function hideHover() {
        if (hoverPlaneRef.current) hoverPlaneRef.current.visible = false;
    }
    function hideMarqueePreview() {
        if (marqueePreviewRef.current) marqueePreviewRef.current.visible = false;
    }
    function showMarqueePreview(a, b) {
        const m = marqueePreviewRef.current;
        if (!m) return;
        const minX = Math.min(a.x, b.x);
        const minY = Math.min(a.y, b.y);
        const minZ = Math.min(a.z, b.z);
        const maxX = Math.max(a.x, b.x);
        const maxY = Math.max(a.y, b.y);
        const maxZ = Math.max(a.z, b.z);
        const sx = maxX - minX + 1;
        const sy = maxY - minY + 1;
        const sz = maxZ - minZ + 1;
        m.scale.set(sx, sy, sz);
        m.position.set(minX + sx / 2, minY + sy / 2, minZ + sz / 2);
        m.visible = true;
    }
    // voxel edit helpers
    function getPlacementCoord(hit, w) {
        const rec = w.get(hit.coord);
        if (rec?.isBlueprint) return hit.coord;
        const n = hit.normal;
        if (n.x === 0 && n.y === 0 && n.z === 0) return null;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$Types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["add"])(hit.coord, n);
    }
    function keyOfCoord(c) {
        return `${c.x},${c.y},${c.z}`;
    }
    function rebuildStructuralChangeState() {
        const fw = focusWorldRef.current;
        if (!fw) {
            setHasStructuralChanges(false);
            return;
        }
        const snap = fw.getGroupSnapshot(FOCUS_GROUP_ID);
        const current = new Set();
        for (const v of snap?.voxels ?? []){
            current.add(keyOfCoord(v.local));
        }
        const initial = initialCoordSetRef.current;
        if (current.size !== initial.size) {
            setHasStructuralChanges(true);
            return;
        }
        for (const k of current){
            if (!initial.has(k)) {
                setHasStructuralChanges(true);
                return;
            }
        }
        setHasStructuralChanges(false);
    }
    function getFocusedSnapshot() {
        return focusWorldRef.current?.getGroupSnapshot(FOCUS_GROUP_ID) ?? null;
    }
    function commitSnapshotToWorldInstance(snapshot) {
        if (!world || !groupId) return;
        world.setGroupVoxelsLocal(groupId, snapshot?.voxels ?? [], {
            keepPosition: true
        });
    }
    // render loop helpers
    function getLoopCtx() {
        const renderer = rendererRef.current;
        const scene = sceneRef.current;
        const camera = cameraRef.current;
        const controls = controlsRef.current;
        if (!renderer || !scene || !camera || !controls) return null;
        return {
            renderer,
            scene,
            camera,
            controls
        };
    }
    function start() {
        stop();
        const ctx = getLoopCtx();
        if (!ctx) return;
        const tick = ()=>{
            rafRef.current = requestAnimationFrame(tick);
            ctx.controls.update();
            if (pendingHoverRaycastRef.current) {
                pendingHoverRaycastRef.current = false;
                updateHoverFace();
            }
            ctx.renderer.render(ctx.scene, ctx.camera);
        };
        tick();
    }
    function stop() {
        if (rafRef.current != null) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
    }
    // raycast helpers
    function updateHoverFace() {
        const hp = hoverPlaneRef.current;
        const w = focusWorldRef.current;
        if (!hp || !w) return;
        const hit = raycastVoxelGrid(w, raycaster.ray, 2000, 4096);
        if (!hit || hit.normal.x === 0 && hit.normal.y === 0 && hit.normal.z === 0) {
            hideHover();
            if (toolRef.current === "marquee") hideMarqueePreview();
            return;
        }
        const n = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](hit.normal.x, hit.normal.y, hit.normal.z).normalize();
        hp.quaternion.setFromUnitVectors(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 1), n);
        hp.position.set(hit.coord.x + 0.5, hit.coord.y + 0.5, hit.coord.z + 0.5);
        hp.position.addScaledVector(n, 0.501);
        hp.visible = true;
        if (toolRef.current === "marquee") {
            const placeAt = getPlacementCoord(hit, w);
            if (marqueeStartRef.current && placeAt) showMarqueePreview(marqueeStartRef.current, placeAt);
            else if (!marqueeStartRef.current) hideMarqueePreview();
        }
    }
    // thumbnail snapshot helpers
    async function captureCurrentViewSquarePng(size) {
        const renderer = rendererRef.current;
        const scene = sceneRef.current;
        const camera = cameraRef.current;
        const controls = controlsRef.current;
        if (!renderer || !scene || !camera || !controls) {
            throw new Error("Snapshot renderer state unavailable");
        }
        controls.update();
        const aspect = camera.aspect || 1;
        const renderWidth = aspect >= 1 ? Math.ceil(size * aspect) : size;
        const renderHeight = aspect >= 1 ? size : Math.ceil(size / aspect);
        const prevSize = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"]();
        renderer.getSize(prevSize);
        const prevPixelRatio = renderer.getPixelRatio();
        const prevViewport = renderer.getViewport(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector4"]());
        const prevScissor = renderer.getScissor(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector4"]());
        const prevScissorTest = renderer.getScissorTest();
        const target = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebGLRenderTarget"](renderWidth, renderHeight, {
            depthBuffer: true,
            stencilBuffer: false,
            colorSpace: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"]
        });
        try {
            renderer.setRenderTarget(target);
            renderer.setViewport(0, 0, renderWidth, renderHeight);
            renderer.setScissor(0, 0, renderWidth, renderHeight);
            renderer.setScissorTest(false);
            renderer.render(scene, camera);
            renderer.setRenderTarget(null);
            const pixels = new Uint8Array(renderWidth * renderHeight * 4);
            renderer.readRenderTargetPixels(target, 0, 0, renderWidth, renderHeight, pixels);
            const sourceCanvas = document.createElement("canvas");
            sourceCanvas.width = renderWidth;
            sourceCanvas.height = renderHeight;
            const sourceCtx = sourceCanvas.getContext("2d");
            if (!sourceCtx) {
                throw new Error("Failed to create snapshot source canvas context");
            }
            const imageData = sourceCtx.createImageData(renderWidth, renderHeight);
            for(let y = 0; y < renderHeight; y += 1){
                const srcRow = renderHeight - 1 - y;
                const dstOffset = y * renderWidth * 4;
                const srcOffset = srcRow * renderWidth * 4;
                imageData.data.set(pixels.subarray(srcOffset, srcOffset + renderWidth * 4), dstOffset);
            }
            sourceCtx.putImageData(imageData, 0, 0);
            const cropSize = Math.min(renderWidth, renderHeight);
            const cropX = Math.floor((renderWidth - cropSize) / 2);
            const cropY = Math.floor((renderHeight - cropSize) / 2);
            const outputCanvas = document.createElement("canvas");
            outputCanvas.width = size;
            outputCanvas.height = size;
            const outputCtx = outputCanvas.getContext("2d");
            if (!outputCtx) {
                throw new Error("Failed to create snapshot output canvas context");
            }
            outputCtx.imageSmoothingEnabled = false;
            outputCtx.drawImage(sourceCanvas, cropX, cropY, cropSize, cropSize, 0, 0, size, size);
            const blob = await new Promise((resolve)=>outputCanvas.toBlob(resolve, "image/png"));
            if (!blob) throw new Error("Failed to encode snapshot PNG");
            return blob;
        } finally{
            target.dispose();
            renderer.setRenderTarget(null);
            renderer.setPixelRatio(prevPixelRatio);
            renderer.setSize(prevSize.x, prevSize.y, false);
            renderer.setViewport(prevViewport);
            renderer.setScissor(prevScissor);
            renderer.setScissorTest(prevScissorTest);
        }
    }
    async function handleSnapshot() {
        const fw = focusWorldRef.current;
        const effectiveAssetIdNow = effectiveAssetId;
        if (!fw || !effectiveAssetIdNow) return;
        const snapshotBefore = fw.getGroupSnapshot(FOCUS_GROUP_ID);
        const voxels = snapshotBefore?.voxels ?? [];
        if (!voxels.length) return;
        try {
            setIsSnapshotting(true);
            for (const v of voxels){
                fw.setIsBlueprint(v.local, false);
            }
            pendingHoverRaycastRef.current = true;
            await new Promise((resolve)=>requestAnimationFrame(()=>resolve()));
            const thumb = await captureCurrentViewSquarePng(SNAPSHOT_SIZE);
            await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].updateAssetThumbnail({
                assetId: effectiveAssetIdNow,
                thumb
            });
            const nextMeta = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].getAssetMeta(effectiveAssetIdNow);
            if (nextMeta) {
                setEffectiveAssetMeta(nextMeta);
                if (sourceAssetMeta?.id === effectiveAssetIdNow) {
                    setSourceAssetMeta(nextMeta);
                }
            }
            play("placeVoxel");
        } catch (err) {
            console.error(err);
            alert(err instanceof Error ? err.message : "Snapshot failed");
        } finally{
            const restoreSnap = fw.getGroupSnapshot(FOCUS_GROUP_ID);
            const restoreVoxels = restoreSnap?.voxels ?? [];
            for (const v of restoreVoxels){
                fw.setIsBlueprint(v.local, true);
            }
            pendingHoverRaycastRef.current = true;
            setIsSnapshotting(false);
        }
    }
    // asset / save flows
    async function saveInstanceOnlyStructuralOverride(snapshot) {
        if (!world || !groupId) return;
        const existingOverrideId = currentOverrideAssetId;
        let nextOverrideId;
        if (existingOverrideId) {
            nextOverrideId = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].overwritePrivateAssetContent({
                assetId: existingOverrideId,
                group: snapshot
            });
        } else {
            nextOverrideId = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].saveAsset({
                name: effectiveAssetMeta?.name ? `${effectiveAssetMeta.name} Instance Override` : sourceAssetMeta?.name ? `${sourceAssetMeta.name} Instance Override` : "Instance Override",
                group: snapshot,
                thumb: null,
                visibility: "private",
                inLibrary: false,
                isImmutable: false,
                sourceAssetId: sourceAssetMeta?.id ?? sourceAssetId ?? null,
                linkedMarketplaceAssetId: null,
                lineageAssetIds: effectiveAssetMeta?.lineageAssetIds ?? sourceAssetMeta?.lineageAssetIds ?? [],
                forceNewId: true
            });
        }
        world.setGroupSource(groupId, {
            overrideAssetId: nextOverrideId
        });
    }
    async function handleOverwriteAsset() {
        const snapshot = getFocusedSnapshot();
        if (!snapshot || !world || !groupId || !sourceAssetMeta) return;
        if (!sourceAssetIsStructurallyOverwritable) return;
        const overrideIdToDelete = currentOverrideAssetId;
        const originalSourceAssetId = sourceAssetMeta.id;
        try {
            setIsSavingAsset(true);
            const nextId = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].overwritePrivateAssetContent({
                assetId: originalSourceAssetId,
                group: snapshot
            });
            world.setGroupSource(groupId, {
                assetId: nextId,
                assetKind: "draft",
                overrideAssetId: null
            });
            await world.refreshInstancesFromSourceAsset({
                sourceAssetId: originalSourceAssetId,
                nextAssetId: nextId,
                nextAssetKind: "draft",
                includeOverridden: false
            });
            if (overrideIdToDelete) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].deleteAsset(overrideIdToDelete);
            }
            onExit();
        } catch (err) {
            console.error(err);
            alert(err instanceof Error ? err.message : "Overwrite failed");
        } finally{
            setIsSavingAsset(false);
        }
    }
    async function handleRemixAsset() {
        const snapshot = getFocusedSnapshot();
        if (!snapshot || !world || !groupId) return;
        const remixBaseMeta = canonicalRemixBaseMeta;
        const baseName = remixBaseMeta?.name ?? "Remixed Asset";
        const lineageAssetIds = [
            ...remixBaseMeta?.lineageAssetIds ?? [],
            ...remixBaseMeta?.id ? [
                remixBaseMeta.id
            ] : []
        ].filter((v, i, arr)=>!!v && arr.indexOf(v) === i);
        try {
            setIsSavingAsset(true);
            const nextId = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].remixAssetFromSource({
                sourceAssetId: remixBaseMeta?.id ?? null,
                lineageAssetIds,
                name: `${baseName} Remix`,
                group: snapshot
            });
            commitSnapshotToWorldInstance(snapshot);
            world.setGroupSource(groupId, {
                assetId: nextId,
                assetKind: "draft",
                overrideAssetId: null
            });
            onExit();
        } catch (err) {
            console.error(err);
            alert(err instanceof Error ? err.message : "Remix failed");
        } finally{
            setIsSavingAsset(false);
        }
    }
    async function commitAndExit() {
        play("whoosh");
        const snapshot = getFocusedSnapshot();
        commitSnapshotToWorldInstance(snapshot);
        if (!snapshot) {
            onExit();
            return;
        }
        const liveWorld = world;
        if (!liveWorld) {
            onExit();
            return;
        }
        try {
            setIsSavingAsset(true);
            if (isEditingOverride) {
                if (effectiveAssetMeta && effectiveAssetIsMutablePrivate) {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].overwritePrivateAssetContent({
                        assetId: effectiveAssetMeta.id,
                        group: snapshot
                    });
                }
            } else {
                if (!hasStructuralChanges) {
                    if (sourceAssetMeta && sourceAssetIsMutablePrivate) {
                        const sourceId = sourceAssetMeta.id;
                        await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].saveNonStructuralAssetProgress({
                            assetId: sourceId,
                            group: snapshot
                        });
                        await liveWorld.refreshInstancesFromSourceAsset({
                            sourceAssetId: sourceId,
                            nextAssetId: sourceId,
                            nextAssetKind: "draft",
                            includeOverridden: false
                        });
                    }
                } else {
                    await saveInstanceOnlyStructuralOverride(snapshot);
                }
            }
        } catch (err) {
            console.error(err);
        } finally{
            setIsSavingAsset(false);
        }
        onExit();
    }
    // derived booleans
    const currentGroupSource = world && groupId ? world.getGroupSource(groupId) : null;
    const currentOverrideAssetId = currentGroupSource?.overrideAssetId ?? overrideAssetId ?? null;
    const isEditingOverride = !!currentOverrideAssetId;
    const effectiveAssetId = currentOverrideAssetId ?? sourceAssetId ?? null;
    const sourceAssetIsMutablePrivate = !!sourceAssetMeta && sourceAssetMeta.visibility === "private" && !sourceAssetMeta.isImmutable;
    const sourceAssetIsStructurallyOverwritable = !!sourceAssetMeta && sourceAssetMeta.visibility === "private" && !sourceAssetMeta.linkedMarketplaceAssetId && !sourceAssetMeta.isImmutable;
    const effectiveAssetIsMutablePrivate = !!effectiveAssetMeta && effectiveAssetMeta.visibility === "private" && !effectiveAssetMeta.isImmutable;
    const showRemixButton = hasStructuralChanges && !!effectiveAssetMeta;
    const showOverwriteButton = hasStructuralChanges && sourceAssetIsStructurallyOverwritable;
    const canonicalRemixBaseMeta = sourceAssetMeta ?? effectiveAssetMeta ?? null;
    const displayAssetName = effectiveAssetMeta?.name ?? sourceAssetMeta?.name ?? (effectiveAssetId ? "Unknown Asset" : "Untitled Asset");
    // keyboard interaction guards 
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!open) return;
        const onKeyDown = (e)=>{
            if (e.ctrlKey || e.metaKey || e.altKey) return;
            const el = e.target;
            const tag = el?.tagName?.toLowerCase();
            if (tag === "input" || tag === "textarea" || el?.isContentEditable) return;
            const k = e.key.toLowerCase();
            let next = null;
            if (k === "q") next = "pencil";
            if (k === "e") next = "eyedropper";
            if (k === "w") next = "marquee";
            if (!next) return;
            if (toolRef.current === "marquee" && next !== "marquee") {
                const hadSelection = marqueeStartRef.current != null;
                marqueeStartRef.current = null;
                if (marqueePreviewRef.current) marqueePreviewRef.current.visible = false;
                if (hadSelection) {
                    stopLoop("VoxelPartEditor:extrude", 80);
                    play("extrudeEnd");
                }
            }
            click();
            setTool(next);
            toolRef.current = next;
            e.preventDefault();
        };
        window.addEventListener("keydown", onKeyDown);
        return ()=>window.removeEventListener("keydown", onKeyDown);
    }, [
        open
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!open) return;
        const onKeyDown = (e)=>{
            if (e.key === "Escape") {
                e.preventDefault();
                commitAndExit();
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return ()=>window.removeEventListener("keydown", onKeyDown);
    }, [
        open,
        groupId,
        world,
        commitAndExit
    ]);
    // main three js boot
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const mount = mountRef.current;
        if (!mount) return;
        // scene boot
        const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Scene"]();
        sceneRef.current = scene;
        const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PerspectiveCamera"](40, mount.clientWidth / mount.clientHeight, 0.1, 2000);
        camera.position.set(40, 40, 40);
        camera.lookAt(0, 0, 0);
        cameraRef.current = camera;
        const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WebGLRenderer"]({
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true
        });
        renderer.setClearColor(0x000000, 0);
        rendererRef.current = renderer;
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        mount.appendChild(renderer.domElement);
        renderer.shadowMap.type = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PCFSoftShadowMap"];
        renderer.toneMapping = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NeutralToneMapping"];
        renderer.toneMappingExposure = 1.0;
        renderer.outputColorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
        const preventContextMenu = (e)=>e.preventDefault();
        renderer.domElement.addEventListener("contextmenu", preventContextMenu);
        // lighting
        scene.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AmbientLight"](0xffffff, 2.2));
        const dir = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DirectionalLight"](0xffffff, 3.5);
        dir.castShadow = true;
        dir.shadow.bias = -0.0005;
        dir.shadow.mapSize.set(512, 512);
        dir.position.setFromSphericalCoords(150, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].degToRad(80), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].degToRad(-29));
        dir.target.position.set(0, 0, 80);
        scene.add(dir.target);
        scene.add(dir);
        const hdriLoader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$RGBELoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RGBELoader"]();
        hdriLoader.load("/world/DayInTheClouds1K.hdr", (texture)=>{
            const pmrem = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PMREMGenerator"](renderer);
            const rt = pmrem.fromEquirectangular(texture);
            texture.dispose();
            pmrem.dispose();
            scene.environment = rt.texture;
            scene.environment.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
        }, undefined, (err)=>console.error("Failed to load HDRI", err));
        // controls 
        const controls = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$controls$2f$OrbitControls$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrbitControls"](camera, renderer.domElement);
        controls.enableDamping = true;
        controls.target.set(0, 0, 0);
        controls.update();
        controlsRef.current = controls;
        // focused world boot
        const fw = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$VoxelWorld$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VoxelWorld"](scene);
        focusWorldRef.current = fw;
        fw.addGroup(FOCUS_GROUP_ID, {
            x: 0,
            y: 0,
            z: 0
        });
        // dev helpers 
        solidifyFocusRef.current = ()=>{
            const fw2 = focusWorldRef.current;
            if (!fw2) return;
            const snap = fw2.getGroupSnapshot(FOCUS_GROUP_ID);
            const voxels = snap?.voxels ?? [];
            for (const v of voxels)fw2.setIsBlueprint(v.local, false);
            console.log(`[dev] solidified focus voxels: ${voxels.length}`);
            pendingHoverRaycastRef.current = true;
        };
        window.voxSolidFocus = ()=>solidifyFocusRef.current?.();
        console.log("[dev] window.voxSolidFocus() ready");
        // hover + marquee preview meshes
        const hoverMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]("#7dd3fc"),
            transparent: true,
            opacity: 0.8,
            depthWrite: false
        });
        hoverMat.polygonOffset = true;
        hoverMat.polygonOffsetFactor = -1;
        hoverMat.polygonOffsetUnits = -1;
        const hoverPlane = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlaneGeometry"](1, 1), hoverMat);
        hoverPlane.visible = false;
        hoverPlane.renderOrder = 999;
        scene.add(hoverPlane);
        hoverPlaneRef.current = hoverPlane;
        const previewGeom = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BoxGeometry"](1, 1, 1);
        const previewMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]("#60a5fa"),
            transparent: true,
            opacity: 0.18,
            depthWrite: false
        });
        previewMat.polygonOffset = true;
        previewMat.polygonOffsetFactor = -1;
        previewMat.polygonOffsetUnits = -1;
        const previewMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](previewGeom, previewMat);
        previewMesh.visible = false;
        previewMesh.renderOrder = 998;
        const previewEdges = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LineSegments"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EdgesGeometry"](previewGeom), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
            color: 0x000000,
            transparent: true,
            opacity: 0.35
        }));
        previewMesh.add(previewEdges);
        scene.add(previewMesh);
        marqueePreviewRef.current = previewMesh;
        // pointer math helpers
        function setMouseFromEvent(e) {
            const rect = renderer.domElement.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width * 2 - 1;
            const y = -((e.clientY - rect.top) / rect.height * 2 - 1);
            mouseNDC.set(x, y);
        }
        function updateRayFromMouse(e) {
            setMouseFromEvent(e);
            raycaster.setFromCamera(mouseNDC, camera);
        }
        // edit helpers
        function fillBox(a, b, w, color) {
            const minX = Math.min(a.x, b.x);
            const minY = Math.min(a.y, b.y);
            const minZ = Math.min(a.z, b.z);
            const maxX = Math.max(a.x, b.x);
            const maxY = Math.max(a.y, b.y);
            const maxZ = Math.max(a.z, b.z);
            for(let x = minX; x <= maxX; x++){
                for(let y = minY; y <= maxY; y++){
                    for(let z = minZ; z <= maxZ; z++){
                        const c = {
                            x,
                            y,
                            z
                        };
                        const rec = w.get(c);
                        if (rec?.isBlueprint) {
                            w.setColor(c, color);
                            w.setIsBlueprint(c, false);
                        } else if (!rec) {
                            w.addVoxel(c, color, {
                                groupId: FOCUS_GROUP_ID
                            });
                        }
                    }
                }
            }
        }
        // pointer handlers
        function onPointerMove(e) {
            if (!openRef.current) return;
            updateRayFromMouse(e);
            pendingHoverRaycastRef.current = true;
        }
        function onPointerLeave() {
            hideHover();
        }
        // pointer tool handlers
        function onPointerDown(e) {
            if (!openRef.current) return;
            updateRayFromMouse(e);
            const w = focusWorldRef.current;
            if (!w) return;
            const hit = raycastVoxelGrid(w, raycaster.ray, 2000, 4096);
            const activeTool = toolRef.current;
            if (activeTool === "eyedropper") {
                if (e.button !== 0) return;
                if (hit) {
                    const rec = w.get(hit.coord);
                    if (rec) {
                        setColor(rec.color);
                        colorRef.current = rec.color;
                        play("colorPick");
                    }
                }
                pendingHoverRaycastRef.current = true;
                return;
            }
            if (activeTool === "marquee") {
                if (e.button === 2) {
                    if (marqueeStartRef.current) {
                        marqueeStartRef.current = null;
                        hideMarqueePreview();
                        stopLoop("VoxelPartEditor:extrude", 80);
                        play("extrudeEnd");
                        pendingHoverRaycastRef.current = true;
                    }
                    return;
                }
                if (e.button !== 0) return;
                if (!hit) return;
                const placeAt = getPlacementCoord(hit, w);
                if (!placeAt) return;
                if (!marqueeStartRef.current) {
                    marqueeStartRef.current = placeAt;
                    showMarqueePreview(placeAt, placeAt);
                    play("extrudeStart");
                    startLoop("VoxelPartEditor:extrude", "extrudeLoop");
                    pendingHoverRaycastRef.current = true;
                    return;
                }
                fillBox(marqueeStartRef.current, placeAt, w, colorRef.current);
                rebuildStructuralChangeState();
                marqueeStartRef.current = null;
                hideMarqueePreview();
                stopLoop("VoxelPartEditor:extrude", 80);
                play("extrudeEnd");
                pendingHoverRaycastRef.current = true;
                return;
            }
            if (e.button === 2) {
                if (hit) {
                    w.removeVoxel(hit.coord);
                    rebuildStructuralChangeState();
                    play("deleteVoxel", {
                        detune: Math.random() * 80 - 40
                    });
                }
                pendingHoverRaycastRef.current = true;
                return;
            }
            if (e.button === 0) {
                if (!hit) return;
                const rec = w.get(hit.coord);
                if (rec?.isBlueprint) {
                    w.setColor(hit.coord, colorRef.current);
                    w.setIsBlueprint(hit.coord, false);
                    rebuildStructuralChangeState();
                    play("placeVoxel");
                } else {
                    const n = hit.normal;
                    if (n.x !== 0 || n.y !== 0 || n.z !== 0) {
                        const placeAt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$Types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["add"])(hit.coord, n);
                        const target = w.get(placeAt);
                        if (target?.isBlueprint) {
                            w.setColor(placeAt, colorRef.current);
                            w.setIsBlueprint(placeAt, false);
                            rebuildStructuralChangeState();
                        } else if (!target) {
                            w.addVoxel(placeAt, colorRef.current, {
                                groupId: FOCUS_GROUP_ID
                            });
                            rebuildStructuralChangeState();
                            play("placeVoxel");
                        }
                    }
                }
                pendingHoverRaycastRef.current = true;
            }
        }
        renderer.domElement.addEventListener("pointermove", onPointerMove);
        renderer.domElement.addEventListener("pointerleave", onPointerLeave);
        renderer.domElement.addEventListener("pointerdown", onPointerDown);
        // resize handler
        const onResize = ()=>{
            const m = mountRef.current;
            const cam = cameraRef.current;
            const r = rendererRef.current;
            if (!m || !cam || !r) return;
            const w = m.clientWidth;
            const h = m.clientHeight;
            cam.aspect = w / h;
            cam.updateProjectionMatrix();
            r.setSize(w, h);
            r.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            pendingHoverRaycastRef.current = true;
        };
        window.addEventListener("resize", onResize);
        // cleanup
        return ()=>{
            window.removeEventListener("resize", onResize);
            renderer.domElement.removeEventListener("pointermove", onPointerMove);
            renderer.domElement.removeEventListener("pointerleave", onPointerLeave);
            renderer.domElement.removeEventListener("pointerdown", onPointerDown);
            renderer.domElement.removeEventListener("contextmenu", preventContextMenu);
            if (hoverPlaneRef.current) {
                scene.remove(hoverPlaneRef.current);
                hoverPlaneRef.current.geometry.dispose();
                hoverPlaneRef.current.material.dispose();
                hoverPlaneRef.current = null;
            }
            if (marqueePreviewRef.current) {
                scene.remove(marqueePreviewRef.current);
                marqueePreviewRef.current.geometry.dispose();
                marqueePreviewRef.current.material.dispose();
                marqueePreviewRef.current = null;
            }
            focusWorldRef.current?.dispose();
            focusWorldRef.current = null;
            controls.dispose();
            controlsRef.current = null;
            cameraRef.current = null;
            rendererRef.current = null;
            sceneRef.current = null;
            try {
                delete window.voxSolidFocus;
            } catch  {}
            if (renderer.domElement.parentElement === mount) {
                mount.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);
    // focus group session sync
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!open) return;
        if (!groupId) return;
        if (!world) return;
        const fw = focusWorldRef.current;
        const controls = controlsRef.current;
        const camera = cameraRef.current;
        const renderer = rendererRef.current;
        const mount = mountRef.current;
        if (!fw || !controls || !camera || !renderer || !mount) return;
        marqueeStartRef.current = null;
        hideMarqueePreview();
        hideHover();
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        const snapshot = world.getGroupSnapshot(groupId);
        const localVoxels = snapshot?.voxels ?? [];
        fw.setGroupVoxelsLocal(FOCUS_GROUP_ID, localVoxels, {
            keepPosition: false
        });
        const initial = new Set();
        for (const v of localVoxels){
            initial.add(keyOfCoord(v.local));
        }
        initialCoordSetRef.current = initial;
        setHasStructuralChanges(false);
        const b = computeLocalBounds(localVoxels);
        if (b) {
            recenterCameraOnBounds({
                minX: b.minX,
                minY: b.minY,
                minZ: b.minZ,
                maxX: b.maxX,
                maxY: b.maxY,
                maxZ: b.maxZ,
                controls,
                camera
            });
            const span = Math.max(b.maxX - b.minX + 1, b.maxY - b.minY + 1, b.maxZ - b.minZ + 1);
            camera.position.set(controls.target.x + span * 1.6, controls.target.y + span * 1.15, controls.target.z + span * 1.35);
            camera.lookAt(controls.target);
        } else {
            controls.target.set(0, 0, 0);
            controls.update();
            camera.position.set(20, 20, 20);
            camera.lookAt(0, 0, 0);
        }
        pendingHoverRaycastRef.current = true;
    }, [
        open,
        groupId,
        world
    ]);
    // asset metadata sync
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        if (!open) {
            setSourceAssetMeta(null);
            setEffectiveAssetMeta(null);
            return;
        }
        (async ()=>{
            try {
                const [sourceMeta, effectiveMeta] = await Promise.all([
                    sourceAssetId ? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].getAssetMeta(sourceAssetId) : Promise.resolve(null),
                    effectiveAssetId ? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].getAssetMeta(effectiveAssetId) : Promise.resolve(null)
                ]);
                if (cancelled) return;
                setSourceAssetMeta(sourceMeta);
                setEffectiveAssetMeta(effectiveMeta);
            } catch (err) {
                console.error(err);
                if (!cancelled) {
                    setSourceAssetMeta(null);
                    setEffectiveAssetMeta(null);
                }
            }
        })();
        return ()=>{
            cancelled = true;
        };
    }, [
        open,
        sourceAssetId,
        effectiveAssetId
    ]);
    // loop lifecycle 
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!open) {
            stop();
            return;
        }
        start();
        return ()=>stop();
    }, [
        open
    ]);
    // video lifecycle
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const v = videoRef.current;
        if (!v || warmedRef.current) return;
        warmedRef.current = true;
        v.preload = "auto";
        v.load();
        const p = v.play();
        if (p && typeof p.catch === "function") {
            p.catch(()=>{});
        }
        v.pause();
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const v = videoRef.current;
        if (!v) return;
        if (open) {
            v.play().catch(()=>{});
        } else {
            v.pause();
        }
    }, [
        open
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "fixed",
            inset: 0,
            zIndex: 10,
            pointerEvents: open ? "auto" : "none",
            opacity: open ? 1 : 0,
            transition: "opacity 120ms linear",
            background: "transparent"
        },
        "aria-hidden": !open,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                ref: videoRef,
                autoPlay: true,
                loop: true,
                muted: true,
                playsInline: true,
                preload: "auto",
                style: {
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: open ? 0.8 : 0,
                    transition: "opacity 120ms linear",
                    zIndex: 0,
                    pointerEvents: "none"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                    src: "/focus/screen.mp4",
                    type: "video/mp4"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelPartEditor.tsx",
                    lineNumber: 1375,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelPartEditor.tsx",
                lineNumber: 1356,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: mountRef,
                style: {
                    position: "absolute",
                    inset: 0,
                    overflow: "hidden",
                    userSelect: "none",
                    zIndex: 1
                }
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelPartEditor.tsx",
                lineNumber: 1378,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    top: "15vh",
                    left: 0,
                    padding: 12,
                    pointerEvents: "auto",
                    zIndex: 2
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        gap: 12
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$ui$2f$ColorPalette$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                value: color,
                                onChange: setColor
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelPartEditor.tsx",
                                lineNumber: 1401,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    height: "5vh"
                                }
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelPartEditor.tsx",
                                lineNumber: 1403,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$ui$2f$ToolPalette$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                value: tool,
                                onChange: setTool
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelPartEditor.tsx",
                                lineNumber: 1405,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelPartEditor.tsx",
                        lineNumber: 1400,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelPartEditor.tsx",
                    lineNumber: 1399,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelPartEditor.tsx",
                lineNumber: 1389,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    top: 40,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 2,
                    width: "min(900px, 92vw)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 16,
                    pointerEvents: "none"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            color: "#00324c",
                            fontSize: 30,
                            lineHeight: 1,
                            textAlign: "center",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            userSelect: "none",
                            maxWidth: "80vw"
                        },
                        title: displayAssetName,
                        children: `> ${displayAssetName} <`
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelPartEditor.tsx",
                        lineNumber: 1425,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 16,
                            flexWrap: "wrap",
                            pointerEvents: "auto"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pix-icon",
                                onClick: isSnapshotting || !effectiveAssetId ? undefined : handleSnapshot,
                                style: {
                                    padding: "5px 8px",
                                    borderRadius: 5,
                                    background: "rgba(0, 50, 110, 0.5)",
                                    color: "white",
                                    fontSize: 19,
                                    userSelect: "none",
                                    cursor: isSnapshotting || !effectiveAssetId ? "default" : "pointer",
                                    opacity: isSnapshotting || !effectiveAssetId ? 0.6 : 1,
                                    whiteSpace: "nowrap"
                                },
                                children: "snapshot"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelPartEditor.tsx",
                                lineNumber: 1452,
                                columnNumber: 11
                            }, this),
                            (showOverwriteButton || showRemixButton) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    showOverwriteButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pix-icon",
                                        onClick: isSavingAsset ? undefined : handleOverwriteAsset,
                                        style: {
                                            padding: "5px 5px",
                                            borderRadius: 5,
                                            background: "rgba(0, 50, 110, 0.5)",
                                            color: "white",
                                            fontSize: 19,
                                            userSelect: "none",
                                            cursor: isSavingAsset ? "default" : "pointer",
                                            opacity: isSavingAsset ? 0.6 : 1,
                                            whiteSpace: "nowrap"
                                        },
                                        children: "overwrite"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelPartEditor.tsx",
                                        lineNumber: 1473,
                                        columnNumber: 17
                                    }, this),
                                    showRemixButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pix-icon",
                                        onClick: isSavingAsset ? undefined : handleRemixAsset,
                                        style: {
                                            padding: "5px 8px",
                                            borderRadius: 5,
                                            background: "rgba(0, 50, 110, 0.5)",
                                            color: "white",
                                            fontSize: 19,
                                            userSelect: "none",
                                            cursor: isSavingAsset ? "default" : "pointer",
                                            opacity: isSavingAsset ? 0.6 : 1,
                                            whiteSpace: "nowrap"
                                        },
                                        children: "remix"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelPartEditor.tsx",
                                        lineNumber: 1493,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelPartEditor.tsx",
                        lineNumber: 1442,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelPartEditor.tsx",
                lineNumber: 1410,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    left: "50%",
                    bottom: 50,
                    transform: "translateX(-50%)",
                    zIndex: 2,
                    pointerEvents: "auto"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pix-icon",
                    onClick: commitAndExit,
                    style: {
                        padding: "10px 14px",
                        borderRadius: 5,
                        background: "rgba(0, 50, 110, 0.5)",
                        color: "white",
                        fontSize: 20,
                        userSelect: "none",
                        cursor: "pointer",
                        whiteSpace: "nowrap"
                    },
                    children: "world mode"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelPartEditor.tsx",
                    lineNumber: 1526,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelPartEditor.tsx",
                lineNumber: 1516,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    padding: "15px 15px",
                    color: "black",
                    fontSize: 16,
                    lineHeight: 1.4,
                    pointerEvents: "none",
                    zIndex: 2
                }
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelPartEditor.tsx",
                lineNumber: 1544,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelPartEditor.tsx",
        lineNumber: 1344,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/src/components/VoxelEditor/VoxelEditor.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VoxelEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/audio/SoundProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$ui$2f$LoadingOverlay$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/ui/LoadingOverlay.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$VoxelWorldEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/VoxelWorldEditor.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$VoxelPartEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/VoxelPartEditor.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
// part editor toggle fade
const FADE_MS = 120;
// editor ambiance
const AMBIENCE_WORLD_VOL = 0.7;
const AMBIENCE_FOCUS_VOL = 0.4;
const AMBIENCE_GRASS_VOL = 0.5;
const AMBIENCE_WIND_VOL = 1;
const AMBIENCE_FADE_MS = 220;
const EMPTY_FOCUSED_SOURCE = {
    assetId: null,
    assetKind: null,
    overrideAssetId: null
};
function VoxelEditor(props) {
    const { initialWorldId = null } = props;
    // audio 
    const { unlock, play, startLoopAt, setLoopVolume, getTime, startLoop } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSound"])();
    const audio = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSoundLoading"])();
    // focus session state
    const [focusOpen, setFocusOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [focusedGroupId, setFocusedGroupId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // cross editor refs
    const requestAutosaveRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const worldRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const exitTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // loading
    const [worldReady, setWorldReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const audioReady = audio.ready;
    const audioProgress = audio.progress;
    const fullyReady = worldReady && audioReady;
    const progress = (worldReady ? 0.5 : 0) + (audioReady ? 0.5 : 0.5 * Math.max(0, Math.min(1, audioProgress)));
    // focused source state
    const [focusedSource, setFocusedSource] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(EMPTY_FOCUSED_SOURCE);
    // intro audio boot
    const introPlayedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (introPlayedRef.current) return;
        if (!audioReady) return;
        const run = async ()=>{
            await unlock();
            if (introPlayedRef.current) return;
            introPlayedRef.current = true;
            play("introNewWorld");
        };
        void run();
    }, [
        audioReady,
        play,
        unlock
    ]);
    // ambiance audio boot
    const ambienceStartedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (ambienceStartedRef.current) return;
        if (!audioReady) return;
        const startAmbience = async ()=>{
            await unlock();
            if (ambienceStartedRef.current) return;
            const t0 = getTime() + 0.06;
            startLoopAt("amb:world", "ambientWorld", {
                volume: AMBIENCE_WORLD_VOL
            }, t0);
            startLoopAt("amb:focus", "ambientFocus", {
                volume: 0.0
            }, t0);
            startLoop("amb:grass", "ambientGrass", {
                volume: AMBIENCE_GRASS_VOL
            });
            startLoop("amb:wind", "ambientWindIdle", {
                volume: AMBIENCE_WIND_VOL
            });
            ambienceStartedRef.current = true;
        };
        void startAmbience();
    }, [
        audioReady,
        unlock,
        startLoopAt,
        getTime,
        startLoop
    ]);
    // focus audio toggle
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!audioReady) return;
        setLoopVolume("amb:focus", focusOpen ? AMBIENCE_FOCUS_VOL : 0.0, AMBIENCE_FADE_MS);
    }, [
        audioReady,
        focusOpen,
        setLoopVolume
    ]);
    // timeout cleanup
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            if (exitTimeoutRef.current != null) {
                window.clearTimeout(exitTimeoutRef.current);
                exitTimeoutRef.current = null;
            }
        };
    }, []);
    // callbacks
    const onFocusGroup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((groupId)=>{
        if (exitTimeoutRef.current != null) {
            window.clearTimeout(exitTimeoutRef.current);
            exitTimeoutRef.current = null;
        }
        const src = worldRef.current?.getGroupSource(groupId) ?? null;
        setFocusedGroupId(groupId);
        setFocusedSource({
            assetId: src?.assetId ?? null,
            assetKind: src?.assetKind ?? null,
            overrideAssetId: src?.overrideAssetId ?? null
        });
        setFocusOpen(true);
    }, []);
    const onExitFocus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setFocusOpen(false);
        if (exitTimeoutRef.current != null) {
            window.clearTimeout(exitTimeoutRef.current);
        }
        exitTimeoutRef.current = window.setTimeout(()=>{
            setFocusedGroupId(null);
            setFocusedSource(EMPTY_FOCUSED_SOURCE);
            requestAutosaveRef.current?.({
                immediate: true,
                reason: "focus-exit"
            });
            exitTimeoutRef.current = null;
        }, FADE_MS);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "relative",
            width: "100%",
            height: "100%",
            backgroundColor: "#368fe4"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    inset: 0,
                    opacity: fullyReady ? 1 : 0,
                    transition: `opacity ${FADE_MS}ms linear`
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$VoxelWorldEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        initialWorldId: initialWorldId,
                        onFocusGroup: onFocusGroup,
                        focusOpen: focusOpen,
                        onWorldReady: (w)=>{
                            worldRef.current = w;
                            setWorldReady(true);
                        },
                        onRequestAutosaveRef: (fn)=>{
                            requestAutosaveRef.current = fn;
                        }
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelEditor.tsx",
                        lineNumber: 179,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$VoxelPartEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        open: focusOpen,
                        groupId: focusedGroupId,
                        sourceAssetId: focusedSource.assetId,
                        sourceAssetKind: focusedSource.assetKind,
                        overrideAssetId: focusedSource.overrideAssetId,
                        world: worldRef.current,
                        onExit: onExitFocus
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelEditor.tsx",
                        lineNumber: 192,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelEditor.tsx",
                lineNumber: 171,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$ui$2f$LoadingOverlay$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                show: !fullyReady,
                progress: progress,
                text: worldReady ? "loading audio…" : "loading world…",
                fadeMs: FADE_MS
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelEditor.tsx",
                lineNumber: 203,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/VoxelEditor/VoxelEditor.tsx",
        lineNumber: 170,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__203a0f20._.js.map