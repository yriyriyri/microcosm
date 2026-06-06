module.exports = [
"[project]/apps/web/src/materials/animatedHeightMist.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyAnimatedHeightMistToStandardMaterial",
    ()=>applyAnimatedHeightMistToStandardMaterial,
    "updateHeightMistMaterialTime",
    ()=>updateHeightMistMaterialTime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
;
function updateHeightMistMaterialTime(material, timeSeconds) {
    const mats = Array.isArray(material) ? material : [
        material
    ];
    for (const mat of mats){
        const uniforms = mat.userData?.__heightMistUniforms;
        if (uniforms?.uMistTime) {
            uniforms.uMistTime.value = timeSeconds;
        }
    }
}
function applyAnimatedHeightMistToStandardMaterial(material, { yBottom = -10, yTop = 5, maxOpacity = 0.3, color = 0xffffff, noiseScale = 0.02, noiseStrength = 0.65, noiseScroll = {
    x: 0.0,
    y: 0.02,
    z: 0.0
} } = {}) {
    const mistColor = color instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"] ? color.clone() : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"](color);
    const scroll = noiseScroll instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"] ? noiseScroll.clone() : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](noiseScroll.x, noiseScroll.y, noiseScroll.z);
    if (material.userData.__heightMistPatched) {
        material.userData.__heightMistUniforms.uMistYBottom.value = yBottom;
        material.userData.__heightMistUniforms.uMistYTop.value = yTop;
        material.userData.__heightMistUniforms.uMistMaxOpacity.value = maxOpacity;
        material.userData.__heightMistUniforms.uMistColor.value.copy(mistColor);
        material.userData.__heightMistUniforms.uMistNoiseScale.value = noiseScale;
        material.userData.__heightMistUniforms.uMistNoiseStrength.value = noiseStrength;
        material.userData.__heightMistUniforms.uMistNoiseScroll.value.copy(scroll);
        return;
    }
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
        },
        uMistTime: {
            value: 0
        },
        uMistNoiseScale: {
            value: noiseScale
        },
        uMistNoiseStrength: {
            value: noiseStrength
        },
        uMistNoiseScroll: {
            value: scroll
        }
    };
    material.userData.__heightMistPatched = true;
    material.userData.__heightMistUniforms = mistUniforms;
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
         uniform vec3 uMistColor;
         uniform float uMistTime;
         uniform float uMistNoiseScale;
         uniform float uMistNoiseStrength;
         uniform vec3 uMistNoiseScroll;

         float hash13(vec3 p) {
           p = fract(p * 0.1031);
           p += dot(p, p.yzx + 33.33);
           return fract((p.x + p.y) * p.z);
         }

         float valueNoise3D(vec3 p) {
           vec3 i = floor(p);
           vec3 f = fract(p);
           f = f * f * (3.0 - 2.0 * f);

           float n000 = hash13(i + vec3(0.0, 0.0, 0.0));
           float n100 = hash13(i + vec3(1.0, 0.0, 0.0));
           float n010 = hash13(i + vec3(0.0, 1.0, 0.0));
           float n110 = hash13(i + vec3(1.0, 1.0, 0.0));
           float n001 = hash13(i + vec3(0.0, 0.0, 1.0));
           float n101 = hash13(i + vec3(1.0, 0.0, 1.0));
           float n011 = hash13(i + vec3(0.0, 1.0, 1.0));
           float n111 = hash13(i + vec3(1.0, 1.0, 1.0));

           float nx00 = mix(n000, n100, f.x);
           float nx10 = mix(n010, n110, f.x);
           float nx01 = mix(n001, n101, f.x);
           float nx11 = mix(n011, n111, f.x);

           float nxy0 = mix(nx00, nx10, f.y);
           float nxy1 = mix(nx01, nx11, f.y);

           return mix(nxy0, nxy1, f.z);
         }

         float fbm3(vec3 p) {
           float value = 0.0;
           float amplitude = 0.5;
           for (int i = 0; i < 4; i++) {
             value += valueNoise3D(p) * amplitude;
             p *= 2.02;
             amplitude *= 0.5;
           }
           return value;
         }`).replace(`#include <dithering_fragment>`, `
         float mistHeight = clamp(
           1.0 - smoothstep(uMistYBottom, uMistYTop, vHeightMistWorldPosition.y),
           0.0,
           1.0
         );

         vec3 mistNoisePos =
           vHeightMistWorldPosition * uMistNoiseScale +
           uMistNoiseScroll * uMistTime;

         float noiseA = fbm3(mistNoisePos);
         float noiseB = fbm3(mistNoisePos * 1.9 + vec3(17.3, 9.2, 5.7));
         float noise = mix(noiseA, noiseB, 0.35);

         float densityMask = mix(1.0, noise, uMistNoiseStrength);

         float mistAlpha = mistHeight * densityMask * uMistMaxOpacity;

         gl_FragColor.rgb = mix(gl_FragColor.rgb, uMistColor, mistAlpha);

         #include <dithering_fragment>
        `);
    };
    material.needsUpdate = true;
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
"[project]/apps/web/src/services/authClient.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authClient",
    ()=>authClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$env$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/env.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Auth$2f$state$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/Auth/state.tsx [app-ssr] (ecmascript)");
;
;
;
const authClient = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$env$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VOXL_AUTH_API_URL"]
});
authClient.interceptors.request.use((config)=>{
    const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Auth$2f$state$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStoredAuthentication"])();
    if (auth.isAuthenticated && auth.accessToken) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }
    return config;
}, (error)=>Promise.reject(error));
authClient.interceptors.response.use((response)=>response, (error)=>{
    if (("TURBOPACK compile-time value", "undefined") !== "undefined" && error.response?.status === 401) //TURBOPACK unreachable
    ;
    return Promise.reject(error);
});
}),
"[project]/apps/web/src/services/user.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GetUserProfile",
    ()=>GetUserProfile,
    "ListUsers",
    ()=>ListUsers,
    "MakeUserAvatarUrl",
    ()=>MakeUserAvatarUrl,
    "UploadAvatar",
    ()=>UploadAvatar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$authClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/authClient.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$env$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/env.ts [app-ssr] (ecmascript)");
;
;
async function GetUserProfile(user_id) {
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$authClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authClient"].get(`/users/${user_id}/profile`);
    if (result.status == 200) {
        return result.data;
    }
    throw new Error(`get user profile for ${user_id} error: ${JSON.stringify(result.data)}`);
}
async function ListUsers() {
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$authClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authClient"].get(`/users`);
    if (result.status == 200) {
        return result.data;
    }
    throw new Error(`get users error: ${JSON.stringify(result.data)}`);
}
async function UploadAvatar(file) {
    const formData = new FormData();
    formData.append("file", file);
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$authClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authClient"].put(`/users/avatar`, formData);
    if (result.status == 200) {
        return;
    }
    throw new Error(`upload avatar error: ${JSON.stringify(result.data)}`);
}
function MakeUserAvatarUrl(user_id) {
    return `${__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$env$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VOXL_AUTH_API_URL"]}/users/${user_id}/avatar`;
}
}),
"[project]/apps/web/src/components/VoxelViewer/controllers/vehicleEffectsController.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createVehicleEffectsController",
    ()=>createVehicleEffectsController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
;
const CONTRAIL_LIFE_IDLE = 0.11;
const CONTRAIL_LIFE_DRIVE = 0.34;
const CONTRAIL_LIFE_BOOST = 0.48;
const CONTRAIL_LIFE_HANDBRAKE = 0.44;
const CONTRAIL_WIDTH_IDLE = 2.0;
const CONTRAIL_WIDTH_DRIVE = 3.0;
const CONTRAIL_WIDTH_BOOST = 5.0;
const CONTRAIL_WIDTH_HANDBRAKE = 4.6;
const CONTRAIL_MIN_SPEED_FOR_DRIVE = 8;
const CONTRAIL_MIN_SPEED_FOR_BOOST = 45;
const CONTRAIL_MAX_POINTS = 28;
const CONTRAIL_MIN_POINT_DISTANCE = 0.8;
const CONTRAIL_LAUNCH_SPEED = 1000;
const CONTRAIL_DRAG = 0.992;
const CONTRAIL_UP_LIFT = 0.28;
const CONTRAIL_HEAD_OPACITY = 1.0;
const CONTRAIL_TAIL_FADE_EXPONENT = 3.2;
const CONTRAIL_MODE_SPUTTER_DURATION = 1.0;
const CONTRAIL_IDLE_SPUTTER_DURATION = 0.55;
const CONTRAIL_DRIFT_SPUTTER_STRENGTH = 0.45;
const CONTRAIL_MODE_SPUTTER_STRENGTH = 0.55;
const CONTRAIL_IDLE_SPUTTER_STRENGTH = 0.75;
const CONTRAIL_SPUTTER_FREQ_A = 30;
const CONTRAIL_SPUTTER_FREQ_B = 51;
const CONTRAIL_SPUTTER_WIDTH_FLICKER = 0.28;
const CONTRAIL_LIFE_BOOST_FADE = 0.26;
const CONTRAIL_WIDTH_BOOST_FADE = 3.8;
const CONTRAIL_BOOST_FADE_DURATION = 3.8;
const SPARK_MAX_PARTICLES = 240;
const SPARK_EMIT_RATE = 120.0;
const SPARK_MIN_SPEED = 14;
const SPARK_BANK_DEADZONE = 0.06;
const SPARK_LIFE_MIN = 0.16;
const SPARK_LIFE_MAX = 0.42;
const SPARK_SCALE_MIN = 1.4;
const SPARK_SCALE_MAX = 4.8;
const SPARK_END_SCALE_MULT = 0.35;
const SPARK_OPACITY_MIN = 0.75;
const SPARK_OPACITY_MAX = 1.0;
const SPARK_SIDE_SPEED_MIN = 18;
const SPARK_SIDE_SPEED_MAX = 42;
const SPARK_BACK_SPEED_MIN = 10;
const SPARK_BACK_SPEED_MAX = 26;
const SPARK_UP_SPEED_MIN = 5;
const SPARK_UP_SPEED_MAX = 15;
const SPARK_GRAVITY_MIN = 42;
const SPARK_GRAVITY_MAX = 78;
const SPARK_DRAG = 0.982;
const SPARK_COLOR = 0xff7a00;
const VEHICLE_ANCHORS = {
    preset_car: {
        engineVentStrips: [
            [
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](-15.5, 8.7, 5.3),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](-15.5, 11.1, 5.3),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](-15.5, 13.5, 5.3)
            ],
            [
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](15.5, 8.7, 5.3),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](15.5, 11.1, 5.3),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](15.5, 13.5, 5.3)
            ]
        ],
        leftSparkLine: [
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](-15.9, 1.2, -10.8),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](-15.9, 1.2, 10.8)
        ],
        rightSparkLine: [
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](15.9, 1.2, -10.8),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](15.9, 1.2, 10.8)
        ]
    },
    "preset_mini-hovercraft": {
        engineVentStrips: [
            [
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](-10.9, 6.4, 9.3),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](-10.9, 8.2, 9.3),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](-10.9, 10.0, 9.3)
            ],
            [
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](10.9, 6.4, 9.3),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](10.9, 8.2, 9.3),
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](10.9, 10.0, 9.3)
            ]
        ],
        leftSparkLine: [
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](-11.4, 1.0, -7.8),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](-11.4, 1.0, 8.4)
        ],
        rightSparkLine: [
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](11.4, 1.0, -7.8),
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](11.4, 1.0, 8.4)
        ]
    }
};
function getVehiclePreset(vehicleRoot) {
    if (!vehicleRoot) return null;
    const assetId = vehicleRoot.userData?.latestMarketplaceAssetId;
    if (typeof assetId !== "string") return null;
    return VEHICLE_ANCHORS[assetId] ?? null;
}
function getForwardWorld(vehicleRoot) {
    const q = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Quaternion"]();
    vehicleRoot.getWorldQuaternion(q);
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 1).applyQuaternion(q).normalize();
}
function getUpWorld(vehicleRoot) {
    const q = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Quaternion"]();
    vehicleRoot.getWorldQuaternion(q);
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0).applyQuaternion(q).normalize();
}
function getRightWorld(vehicleRoot) {
    const q = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Quaternion"]();
    vehicleRoot.getWorldQuaternion(q);
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](1, 0, 0).applyQuaternion(q).normalize();
}
function modeWidth(mode) {
    if (mode === "boost") return CONTRAIL_WIDTH_BOOST;
    if (mode === "boostFade") return CONTRAIL_WIDTH_BOOST_FADE;
    if (mode === "handbrake") return CONTRAIL_WIDTH_HANDBRAKE;
    if (mode === "drive") return CONTRAIL_WIDTH_DRIVE;
    return CONTRAIL_WIDTH_IDLE;
}
function modeLife(mode) {
    if (mode === "boost") return CONTRAIL_LIFE_BOOST;
    if (mode === "boostFade") return CONTRAIL_LIFE_BOOST_FADE;
    if (mode === "handbrake") return CONTRAIL_LIFE_HANDBRAKE;
    if (mode === "drive") return CONTRAIL_LIFE_DRIVE;
    return CONTRAIL_LIFE_IDLE;
}
function createContrailMaterial() {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
        transparent: true,
        depthWrite: false,
        depthTest: true,
        side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DoubleSide"],
        toneMapped: false,
        uniforms: {
            uColor: {
                value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"](0xffffff)
            }
        },
        vertexShader: `
      attribute float aAlpha;
      varying float vAlpha;

      void main() {
        vAlpha = aAlpha;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
        fragmentShader: `
      uniform vec3 uColor;
      varying float vAlpha;

      void main() {
        gl_FragColor = vec4(uColor, vAlpha);
      }
    `
    });
}
function makeContrailStrip(sourceLocal) {
    const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"]();
    const maxVerts = (CONTRAIL_MAX_POINTS - 1) * 6;
    const positions = new Float32Array(maxVerts * 3);
    const alphas = new Float32Array(maxVerts);
    geometry.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](positions, 3));
    geometry.setAttribute("aAlpha", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](alphas, 1));
    geometry.setDrawRange(0, 0);
    const material = createContrailMaterial();
    const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](geometry, material);
    mesh.frustumCulled = false;
    mesh.renderOrder = 920;
    return {
        root: mesh,
        geometry,
        material,
        points: [],
        sourceLocal: sourceLocal.clone(),
        width: CONTRAIL_WIDTH_IDLE
    };
}
function writeStripGeometry(strip, camera, headOpacity, life) {
    const pts = strip.points;
    const posAttr = strip.geometry.getAttribute("position");
    const alphaAttr = strip.geometry.getAttribute("aAlpha");
    if (pts.length < 2) {
        strip.geometry.setDrawRange(0, 0);
        posAttr.needsUpdate = true;
        alphaAttr.needsUpdate = true;
        return;
    }
    let v = 0;
    let triVerts = 0;
    for(let i = 0; i < pts.length - 1; i += 1){
        const a = pts[i];
        const b = pts[i + 1];
        const tangent = b.position.clone().sub(a.position);
        if (tangent.lengthSq() < 1e-6) continue;
        tangent.normalize();
        const upHint = a.up.clone().add(b.up).normalize();
        let side = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]().crossVectors(upHint, tangent);
        if (side.lengthSq() < 1e-6) {
            const center = a.position.clone().add(b.position).multiplyScalar(0.5);
            const toCamera = camera.position.clone().sub(center).normalize();
            side = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]().crossVectors(toCamera, tangent);
        }
        if (side.lengthSq() < 1e-6) continue;
        side.normalize();
        const halfW = strip.width * 0.5;
        const aL = a.position.clone().addScaledVector(side, halfW);
        const aR = a.position.clone().addScaledVector(side, -halfW);
        const bL = b.position.clone().addScaledVector(side, halfW);
        const bR = b.position.clone().addScaledVector(side, -halfW);
        const alphaA = headOpacity * Math.pow(Math.max(0, 1 - a.age / life), CONTRAIL_TAIL_FADE_EXPONENT);
        const alphaB = headOpacity * Math.pow(Math.max(0, 1 - b.age / life), CONTRAIL_TAIL_FADE_EXPONENT);
        const verts = [
            [
                aL,
                alphaA
            ],
            [
                aR,
                alphaA
            ],
            [
                bL,
                alphaB
            ],
            [
                aR,
                alphaA
            ],
            [
                bR,
                alphaB
            ],
            [
                bL,
                alphaB
            ]
        ];
        for (const [p, alpha] of verts){
            posAttr.setXYZ(v, p.x, p.y, p.z);
            alphaAttr.setX(v, alpha);
            v += 1;
        }
        triVerts += 6;
    }
    strip.geometry.setDrawRange(0, triVerts);
    posAttr.needsUpdate = true;
    alphaAttr.needsUpdate = true;
}
function createSparkMaterial(texture) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SpriteMaterial"]({
        map: texture,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        depthTest: true,
        color: SPARK_COLOR,
        blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdditiveBlending"],
        toneMapped: false
    });
}
function createVehicleEffectsController(params) {
    const { scene, camera, sparkTexturePath = "/player/orangespark.png" } = params;
    const root = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
    root.name = "vehicle-effects-root";
    scene.add(root);
    let strips = [];
    let activeVehicleKey = null;
    let time = 0;
    let currentMode = "idle";
    let previousMode = "idle";
    let modeTransitionTimer = 0;
    let idleSputterTimer = 0;
    let boostFadeTimer = 0;
    const sparkTexture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TextureLoader"]().load(sparkTexturePath);
    sparkTexture.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
    sparkTexture.minFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NearestFilter"];
    sparkTexture.magFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NearestFilter"];
    sparkTexture.generateMipmaps = false;
    sparkTexture.needsUpdate = true;
    const sparksRoot = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
    sparksRoot.name = "vehicle-sparks-root";
    root.add(sparksRoot);
    const sparks = [];
    for(let i = 0; i < SPARK_MAX_PARTICLES; i += 1){
        const sprite = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sprite"](createSparkMaterial(sparkTexture));
        sprite.visible = false;
        sprite.renderOrder = 1100;
        sparksRoot.add(sprite);
        sparks.push({
            sprite,
            velocity: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](),
            age: 0,
            life: 1,
            active: false,
            gravity: 60,
            startScale: 1,
            endScale: 1,
            startOpacity: 1
        });
    }
    let sparkEmitCarry = 0;
    function allocSpark() {
        for (const s of sparks){
            if (!s.active) return s;
        }
        return null;
    }
    function emitSpark(params) {
        const s = allocSpark();
        if (!s) return;
        s.active = true;
        s.age = 0;
        s.life = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].lerp(SPARK_LIFE_MIN, SPARK_LIFE_MAX, Math.random());
        s.gravity = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].lerp(SPARK_GRAVITY_MIN, SPARK_GRAVITY_MAX, Math.random());
        s.startScale = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].lerp(SPARK_SCALE_MIN, SPARK_SCALE_MAX, Math.random());
        s.endScale = s.startScale * SPARK_END_SCALE_MULT;
        s.startOpacity = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].lerp(SPARK_OPACITY_MIN, SPARK_OPACITY_MAX, Math.random());
        s.sprite.visible = true;
        s.sprite.position.copy(params.worldPos);
        s.sprite.scale.setScalar(s.startScale);
        const outwardSpeed = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].lerp(SPARK_SIDE_SPEED_MIN, SPARK_SIDE_SPEED_MAX, Math.random());
        const backwardSpeed = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].lerp(SPARK_BACK_SPEED_MIN, SPARK_BACK_SPEED_MAX, Math.random());
        const upSpeed = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].lerp(SPARK_UP_SPEED_MIN, SPARK_UP_SPEED_MAX, Math.random());
        s.velocity.copy(params.outwardDir).multiplyScalar(outwardSpeed).addScaledVector(params.backwardDir, backwardSpeed).addScaledVector(params.upDir, upSpeed);
        const mat = s.sprite.material;
        mat.color.setHex(SPARK_COLOR);
        mat.opacity = s.startOpacity;
    }
    function rebuildForVehicle(vehicleRoot) {
        for (const strip of strips){
            root.remove(strip.root);
            strip.geometry.dispose();
            strip.material.dispose();
        }
        strips = [];
        activeVehicleKey = null;
        const preset = getVehiclePreset(vehicleRoot);
        if (!vehicleRoot || !preset) return;
        activeVehicleKey = String(vehicleRoot.userData?.latestMarketplaceAssetId ?? "");
        for (const engine of preset.engineVentStrips){
            for (const vent of engine){
                const strip = makeContrailStrip(vent);
                strips.push(strip);
                root.add(strip.root);
            }
        }
    }
    function reset() {
        modeTransitionTimer = 0;
        idleSputterTimer = 0;
        currentMode = "idle";
        previousMode = "idle";
        sparkEmitCarry = 0;
        boostFadeTimer = 0;
        for (const strip of strips){
            strip.points.length = 0;
            strip.geometry.setDrawRange(0, 0);
        }
        for (const s of sparks){
            s.active = false;
            s.sprite.visible = false;
        }
    }
    function update(dt, driveState, moveState) {
        time += dt;
        const vehicleRoot = driveState.vehicleRoot;
        const preset = getVehiclePreset(vehicleRoot);
        const vehicleKey = vehicleRoot && typeof vehicleRoot.userData?.latestMarketplaceAssetId === "string" ? vehicleRoot.userData.latestMarketplaceAssetId : null;
        for (const s of sparks){
            if (!s.active) continue;
            s.age += dt;
            if (s.age >= s.life) {
                s.active = false;
                s.sprite.visible = false;
                continue;
            }
            s.velocity.multiplyScalar(Math.pow(SPARK_DRAG, dt * 60));
            s.velocity.y -= s.gravity * dt;
            s.sprite.position.addScaledVector(s.velocity, dt);
            const t = s.age / s.life;
            const scale = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].lerp(s.startScale, s.endScale, t);
            s.sprite.scale.setScalar(scale);
            const mat = s.sprite.material;
            mat.opacity = s.startOpacity * (1 - t);
        }
        if (!vehicleRoot || !preset || !vehicleKey) {
            reset();
            return;
        }
        if (vehicleKey !== activeVehicleKey || strips.length === 0) {
            rebuildForVehicle(vehicleRoot);
        }
        const speed = Math.abs(driveState.speed);
        const handbrakeActive = !!moveState.backward && speed >= CONTRAIL_MIN_SPEED_FOR_DRIVE;
        const boosting = !!moveState.boost && !!moveState.forward && speed >= CONTRAIL_MIN_SPEED_FOR_BOOST;
        const drifting = !!moveState.backward && (moveState.left ? 1 : 0) + (moveState.right ? 1 : 0) > 0;
        const rawNextMode = boosting ? "boost" : handbrakeActive ? "handbrake" : "idle";
        const nextMode = currentMode === "boost" && rawNextMode === "idle" ? "boostFade" : rawNextMode;
        if (nextMode !== currentMode) {
            previousMode = currentMode;
            currentMode = nextMode;
            modeTransitionTimer = CONTRAIL_MODE_SPUTTER_DURATION;
            if (nextMode === "idle") {
                idleSputterTimer = CONTRAIL_IDLE_SPUTTER_DURATION;
            }
            if (nextMode === "boostFade") {
                boostFadeTimer = CONTRAIL_BOOST_FADE_DURATION;
            }
        }
        modeTransitionTimer = Math.max(0, modeTransitionTimer - dt);
        idleSputterTimer = Math.max(0, idleSputterTimer - dt);
        boostFadeTimer = Math.max(0, boostFadeTimer - dt);
        if (currentMode === "boostFade" && boostFadeTimer <= 0) {
            previousMode = currentMode;
            currentMode = "idle";
            idleSputterTimer = CONTRAIL_IDLE_SPUTTER_DURATION;
            modeTransitionTimer = CONTRAIL_MODE_SPUTTER_DURATION;
        }
        let life = modeLife(currentMode);
        let width = modeWidth(currentMode);
        let headOpacity = CONTRAIL_HEAD_OPACITY;
        if (currentMode === "boostFade") {
            const fadeT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].clamp(boostFadeTimer / CONTRAIL_BOOST_FADE_DURATION, 0, 1);
            life = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].lerp(CONTRAIL_LIFE_IDLE, life, fadeT);
        }
        if (modeTransitionTimer > 0) {
            const t = 1 - modeTransitionTimer / CONTRAIL_MODE_SPUTTER_DURATION;
            width = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].lerp(modeWidth(previousMode), modeWidth(currentMode), t);
        }
        const sputterBase = Math.sin(time * CONTRAIL_SPUTTER_FREQ_A) * 0.5 + Math.sin(time * CONTRAIL_SPUTTER_FREQ_B) * 0.5;
        let sputterStrength = 0;
        if (modeTransitionTimer > 0) sputterStrength += CONTRAIL_MODE_SPUTTER_STRENGTH;
        if (idleSputterTimer > 0) {
            sputterStrength += CONTRAIL_IDLE_SPUTTER_STRENGTH * (idleSputterTimer / CONTRAIL_IDLE_SPUTTER_DURATION);
        }
        if (drifting) sputterStrength += CONTRAIL_DRIFT_SPUTTER_STRENGTH;
        if (currentMode === "boostFade") sputterStrength += 0.35;
        sputterStrength = Math.min(1, sputterStrength);
        const gate = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].clamp(1 - Math.max(0, sputterBase) * sputterStrength, 0, 1);
        width *= 1 + sputterBase * sputterStrength * CONTRAIL_SPUTTER_WIDTH_FLICKER;
        headOpacity *= gate;
        if (currentMode === "boostFade") {
            const fadeT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].clamp(boostFadeTimer / CONTRAIL_BOOST_FADE_DURATION, 0, 1);
            headOpacity *= fadeT;
            width = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].lerp(CONTRAIL_WIDTH_IDLE, width, fadeT);
        }
        const forward = getForwardWorld(vehicleRoot);
        const backward = forward.clone().multiplyScalar(-1);
        const up = getUpWorld(vehicleRoot);
        for(let s = 0; s < strips.length; s += 1){
            const strip = strips[s];
            strip.width = width;
            for(let i = strip.points.length - 1; i >= 0; i -= 1){
                const p = strip.points[i];
                p.age += dt;
                if (p.age >= life) {
                    strip.points.splice(i, 1);
                    continue;
                }
                p.position.addScaledVector(p.velocity, dt);
                p.velocity.multiplyScalar(Math.pow(CONTRAIL_DRAG, dt * 60));
                p.velocity.addScaledVector(up, CONTRAIL_UP_LIFT * dt);
            }
            const sourceWorld = vehicleRoot.localToWorld(strip.sourceLocal.clone());
            const stripPhase = s * 0.37;
            const stripPulse = Math.sin(time * CONTRAIL_SPUTTER_FREQ_A + stripPhase) * 0.5 + Math.sin(time * CONTRAIL_SPUTTER_FREQ_B + stripPhase) * 0.5;
            const stripGate = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].clamp(1 - Math.max(0, stripPulse) * sputterStrength, 0, 1);
            const shouldEmit = currentMode !== "idle" && (currentMode === "boost" || currentMode === "handbrake" ? true : stripGate > 0.18);
            if (shouldEmit) {
                const last = strip.points[strip.points.length - 1];
                if (!last || last.position.distanceToSquared(sourceWorld) >= CONTRAIL_MIN_POINT_DISTANCE * CONTRAIL_MIN_POINT_DISTANCE) {
                    strip.points.push({
                        position: sourceWorld,
                        velocity: backward.clone().multiplyScalar(CONTRAIL_LAUNCH_SPEED),
                        up: up.clone(),
                        age: 0
                    });
                }
            }
            if (strip.points.length > CONTRAIL_MAX_POINTS) {
                strip.points.splice(0, strip.points.length - CONTRAIL_MAX_POINTS);
            }
            writeStripGeometry(strip, camera, headOpacity * stripGate, life);
        }
        const sparksHandbrakeActive = !!moveState.backward && speed >= SPARK_MIN_SPEED;
        if (!sparksHandbrakeActive) {
            sparkEmitCarry = 0;
            return;
        }
        const rightDir = getRightWorld(vehicleRoot);
        const upDir = getUpWorld(vehicleRoot);
        const backwardDir = getForwardWorld(vehicleRoot).multiplyScalar(-1);
        const bank = driveState.visualBank;
        const emitLeft = bank > SPARK_BANK_DEADZONE ? true : Math.abs(bank) <= SPARK_BANK_DEADZONE;
        const emitRight = bank < -SPARK_BANK_DEADZONE ? true : Math.abs(bank) <= SPARK_BANK_DEADZONE;
        sparkEmitCarry += SPARK_EMIT_RATE * dt;
        while(sparkEmitCarry >= 1){
            sparkEmitCarry -= 1;
            if (emitLeft) {
                const [lineStart, lineEnd] = preset.leftSparkLine;
                const localPos = lineStart.clone().lerp(lineEnd, Math.random());
                const worldPos = vehicleRoot.localToWorld(localPos);
                emitSpark({
                    worldPos,
                    outwardDir: rightDir.clone().multiplyScalar(-1),
                    backwardDir,
                    upDir
                });
            }
            if (emitRight) {
                const [lineStart, lineEnd] = preset.rightSparkLine;
                const localPos = lineStart.clone().lerp(lineEnd, Math.random());
                const worldPos = vehicleRoot.localToWorld(localPos);
                emitSpark({
                    worldPos,
                    outwardDir: rightDir.clone(),
                    backwardDir,
                    upDir
                });
            }
        }
    }
    function dispose() {
        for (const strip of strips){
            root.remove(strip.root);
            strip.geometry.dispose();
            strip.material.dispose();
        }
        strips = [];
        for (const s of sparks){
            const mat = s.sprite.material;
            mat.dispose();
            sparksRoot.remove(s.sprite);
        }
        sparkTexture.dispose();
        scene.remove(root);
    }
    return {
        update,
        reset,
        dispose
    };
}
}),
"[project]/apps/web/src/components/VoxelViewer/controllers/fpsController.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createFpsMoveState",
    ()=>createFpsMoveState,
    "createFpsState",
    ()=>createFpsState,
    "enterFpsMode",
    ()=>enterFpsMode,
    "exitFpsMode",
    ()=>exitFpsMode,
    "handleFpsKeyDown",
    ()=>handleFpsKeyDown,
    "handleFpsKeyUp",
    ()=>handleFpsKeyUp,
    "handleFpsPointerMove",
    ()=>handleFpsPointerMove,
    "updateFpsCamera",
    ()=>updateFpsCamera
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
;
const FPS_LOOK_SPEED = 0.0022;
const FPS_MAX_PITCH = Math.PI / 2 - 0.01;
const FPS_MOVE_SPEED = 28;
const FPS_GRAVITY = -42;
const FPS_EYE_HEIGHT = 17;
const FPS_FLOOR_Y = 0;
const FPS_JUMP_VELOCITY = 18;
const FPS_FOV = 75;
function createFpsMoveState() {
    return {
        forward: false,
        backward: false,
        left: false,
        right: false
    };
}
function createFpsState() {
    return {
        active: false,
        yaw: 0,
        pitch: 0,
        position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](),
        velocityY: 0,
        grounded: false
    };
}
function handleFpsKeyDown(e, moveState, fpsState, isActive) {
    if (!isActive) return;
    if (e.repeat) return;
    if (e.code === "KeyW") moveState.forward = true;
    if (e.code === "KeyS") moveState.backward = true;
    if (e.code === "KeyA") moveState.left = true;
    if (e.code === "KeyD") moveState.right = true;
    if (e.code === "Space" && fpsState.grounded) {
        fpsState.velocityY = FPS_JUMP_VELOCITY;
        fpsState.grounded = false;
        e.preventDefault();
    }
}
function handleFpsKeyUp(e, moveState) {
    if (e.code === "KeyW") moveState.forward = false;
    if (e.code === "KeyS") moveState.backward = false;
    if (e.code === "KeyA") moveState.left = false;
    if (e.code === "KeyD") moveState.right = false;
}
function handleFpsPointerMove(e, fpsState) {
    if (!fpsState.active) return;
    fpsState.yaw -= e.movementX * FPS_LOOK_SPEED;
    fpsState.pitch -= e.movementY * FPS_LOOK_SPEED;
    fpsState.pitch = Math.max(-FPS_MAX_PITCH, Math.min(FPS_MAX_PITCH, fpsState.pitch));
}
function updateFpsCamera(params) {
    const { dt, camera, fpsState, moveState } = params;
    const yaw = fpsState.yaw;
    const forward = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](-Math.sin(yaw), 0, -Math.cos(yaw));
    const right = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](Math.cos(yaw), 0, -Math.sin(yaw));
    const move = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]();
    if (moveState.forward) move.add(forward);
    if (moveState.backward) move.sub(forward);
    if (moveState.right) move.add(right);
    if (moveState.left) move.sub(right);
    if (move.lengthSq() > 0) {
        move.normalize().multiplyScalar(FPS_MOVE_SPEED * dt);
        fpsState.position.add(move);
    }
    fpsState.velocityY += FPS_GRAVITY * dt;
    fpsState.position.y += fpsState.velocityY * dt;
    if (fpsState.position.y < FPS_FLOOR_Y + FPS_EYE_HEIGHT) {
        fpsState.position.y = FPS_FLOOR_Y + FPS_EYE_HEIGHT;
        fpsState.velocityY = 0;
        fpsState.grounded = true;
    } else {
        fpsState.grounded = false;
    }
    camera.fov = FPS_FOV;
    camera.updateProjectionMatrix();
    camera.position.copy(fpsState.position);
    camera.rotation.set(fpsState.pitch, fpsState.yaw, 0, "YXZ");
}
function enterFpsMode(params) {
    const { camera, renderer, fpsState } = params;
    fpsState.position.set(0, FPS_FLOOR_Y + FPS_EYE_HEIGHT, 0);
    fpsState.velocityY = 0;
    fpsState.grounded = true;
    fpsState.yaw = 0;
    fpsState.pitch = 0;
    camera.fov = FPS_FOV;
    camera.updateProjectionMatrix();
    camera.position.copy(fpsState.position);
    camera.rotation.set(0, 0, 0, "YXZ");
    renderer.domElement.requestPointerLock?.();
}
function exitFpsMode(params) {
    const { renderer, fpsState, moveState, camera } = params;
    fpsState.active = false;
    moveState.forward = false;
    moveState.backward = false;
    moveState.left = false;
    moveState.right = false;
    if (camera) {
        camera.fov = 40;
        camera.updateProjectionMatrix();
    }
    if (document.pointerLockElement === renderer.domElement) {
        document.exitPointerLock();
    }
}
}),
"[project]/apps/web/src/components/VoxelViewer/controllers/cameraShakeController.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createCameraShakeState",
    ()=>createCameraShakeState,
    "resetCameraShake",
    ()=>resetCameraShake,
    "setSustainCameraShake",
    ()=>setSustainCameraShake,
    "triggerCameraShake",
    ()=>triggerCameraShake,
    "updateCameraShake",
    ()=>updateCameraShake
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
;
const SHAKE_PRESETS = {
    small: {
        amplitude: 0.18,
        frequency: 58,
        rollAmplitude: 0.0018
    },
    medium: {
        amplitude: 0.42,
        frequency: 86,
        rollAmplitude: 0.0035
    },
    heavy: {
        amplitude: 0.82,
        frequency: 122,
        rollAmplitude: 0.006
    }
};
const SHAKE_SUSTAIN_LERP = 14.0;
const SHAKE_IMPULSE_DECAY = 10.5;
function createCameraShakeState() {
    return {
        time: 0,
        impulseAmplitude: 0,
        impulseFrequency: SHAKE_PRESETS.small.frequency,
        impulseRollAmplitude: 0,
        sustainAmplitude: 0,
        sustainFrequency: SHAKE_PRESETS.small.frequency,
        sustainRollAmplitude: 0,
        currentSustainAmplitude: 0,
        currentSustainRollAmplitude: 0
    };
}
function resetCameraShake(state) {
    state.time = 0;
    state.impulseAmplitude = 0;
    state.impulseFrequency = SHAKE_PRESETS.small.frequency;
    state.impulseRollAmplitude = 0;
    state.sustainAmplitude = 0;
    state.sustainFrequency = SHAKE_PRESETS.small.frequency;
    state.sustainRollAmplitude = 0;
    state.currentSustainAmplitude = 0;
    state.currentSustainRollAmplitude = 0;
}
function triggerCameraShake(state, kind) {
    const preset = SHAKE_PRESETS[kind];
    state.impulseAmplitude = Math.max(state.impulseAmplitude, preset.amplitude);
    state.impulseFrequency = preset.frequency;
    state.impulseRollAmplitude = Math.max(state.impulseRollAmplitude, preset.rollAmplitude);
}
function setSustainCameraShake(state, kind) {
    if (!kind) {
        state.sustainAmplitude = 0;
        state.sustainRollAmplitude = 0;
        return;
    }
    const preset = SHAKE_PRESETS[kind];
    state.sustainAmplitude = preset.amplitude;
    state.sustainFrequency = preset.frequency;
    state.sustainRollAmplitude = preset.rollAmplitude;
}
function updateCameraShake(state, dt) {
    state.time += dt;
    const sustainAlpha = 1 - Math.exp(-SHAKE_SUSTAIN_LERP * dt);
    state.currentSustainAmplitude = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].lerp(state.currentSustainAmplitude, state.sustainAmplitude, sustainAlpha);
    state.currentSustainRollAmplitude = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].lerp(state.currentSustainRollAmplitude, state.sustainRollAmplitude, sustainAlpha);
    const decay = Math.exp(-SHAKE_IMPULSE_DECAY * dt);
    state.impulseAmplitude *= decay;
    state.impulseRollAmplitude *= decay;
    const amp = state.currentSustainAmplitude + state.impulseAmplitude;
    const fx = Math.sin(state.time * (state.sustainFrequency * 1.0 + 0.0)) * 0.55 + Math.sin(state.time * (state.impulseFrequency * 1.18 + 19.0)) * 0.45;
    const fy = Math.sin(state.time * (state.sustainFrequency * 1.42 + 27.0)) * 0.6 + Math.sin(state.time * (state.impulseFrequency * 1.63 + 9.0)) * 0.4;
    const fz = Math.sin(state.time * (state.sustainFrequency * 1.16 + 15.0)) * 0.5 + Math.sin(state.time * (state.impulseFrequency * 1.87 + 33.0)) * 0.5;
    const rollAmp = state.currentSustainRollAmplitude + state.impulseRollAmplitude;
    const roll = Math.sin(state.time * 48.0 + 2.7) * rollAmp + Math.sin(state.time * 73.0 + 0.9) * rollAmp * 0.45;
    return {
        positionOffset: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](fx * amp, fy * amp * 0.55, fz * amp * 0.24),
        rollOffset: roll
    };
}
}),
"[project]/apps/web/src/components/VoxelViewer/controllers/vehicleController.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createDriveMoveState",
    ()=>createDriveMoveState,
    "createDriveState",
    ()=>createDriveState,
    "enterDriveMode",
    ()=>enterDriveMode,
    "exitDriveMode",
    ()=>exitDriveMode,
    "handleDriveKeyDown",
    ()=>handleDriveKeyDown,
    "handleDriveKeyUp",
    ()=>handleDriveKeyUp,
    "updateDriveCamera",
    ()=>updateDriveCamera
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelViewer$2f$controllers$2f$cameraShakeController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelViewer/controllers/cameraShakeController.ts [app-ssr] (ecmascript)");
;
;
const DRIVE_ACCEL = 70;
const DRIVE_COAST_DRAG = 0.994;
const DRIVE_MAX_DRIVE_SPEED = 110;
const DRIVE_MAX_FORWARD_SPEED = 300;
const DRIVE_TURN_SPEED = 0.6;
const DRIVE_CAMERA_HEIGHT = 24;
const DRIVE_CAMERA_DISTANCE = 70;
const DRIVE_CAMERA_SPEED_DISTANCE = 34;
const DRIVE_CAMERA_LERP = 5.5;
const DRIVE_CAMERA_LOOK_LERP = 6.5;
const DRIVE_FOV = 82;
const DRIVE_MIN_DRIFT_SPEED = 90;
const DRIVE_MAX_DRIFT_ANGLE = Math.PI / 5;
const DRIVE_HANDBRAKE_MAX_DRIFT_ANGLE = Math.PI / 2.9;
const DRIVE_DRIFT_BUILD_RESPONSE = 1.5;
const DRIVE_DRIFT_RETURN_RESPONSE = 2.5;
const DRIVE_HANDBRAKE_DRIFT_BUILD_RESPONSE = 2.8;
const DRIVE_HANDBRAKE_STEER_CONTROL = 0.4;
const DRIVE_HANDBRAKE_SPEED_DRAG = 0.999;
const DRIVE_HANDBRAKE_SPEED_GAIN = 17.0;
const DRIVE_FLY_SPEED = 80;
const DRIVE_BOOST_MULTIPLIER = 1.7;
const DRIVE_NORMAL_STEER_CONTROL = 1.5;
const DRIVE_BOOST_STEER_CONTROL = 1.0;
const DRIVE_NORMAL_STEER_SPEED_FALLOFF = 0.2;
const DRIVE_BOOST_STEER_SPEED_FALLOFF = 0.4;
const DRIVE_BOOST_ACCEL_MULTIPLIER = 1.5;
const DRIVE_BOOST_OVERSPEED_DRAG = 0.9965;
const DRIVE_NORMAL_OVERSPEED_DRAG = 0.992;
const DRIVE_VISUAL_STEER_ANGLE = Math.PI / 7;
const DRIVE_VISUAL_BANK_ANGLE = Math.PI / 5;
const DRIVE_HANDBRAKE_VISUAL_BANK_ANGLE = Math.PI / 3;
const DRIVE_NORMAL_VISUAL_STEER_MULTIPLIER = 0.7;
const DRIVE_BOOST_VISUAL_STEER_MULTIPLIER = 1.2;
const DRIVE_HANDBRAKE_VISUAL_STEER_MULTIPLIER = 0.82;
const DRIVE_BOOST_VISUAL_BANK_MULTIPLIER = 1.18;
const DRIVE_NORMAL_VISUAL_RESPONSE = 1.0;
const DRIVE_BOOST_VISUAL_RESPONSE = 1.5;
const DRIVE_HANDBRAKE_VISUAL_RESPONSE = 1.1;
const DRIVE_VERTICAL_RESPONSE = 5.5;
const DRIVE_BOOST_RESPONSE = 3.2;
const DRIVE_CAMERA_PULLBACK_EXPONENT = 5.0;
const DRIVE_DRIFT_SPEED_REFERENCE = DRIVE_MAX_DRIVE_SPEED * DRIVE_BOOST_MULTIPLIER;
const DRIVE_HANDBRAKE_BOOST_HOLD = 1.0;
function createDriveMoveState() {
    return {
        forward: false,
        backward: false,
        left: false,
        right: false,
        up: false,
        down: false,
        boost: false,
        barrelRollLeft: false,
        barrelRollRight: false
    };
}
function createDriveState() {
    return {
        active: false,
        vehicleRoot: null,
        speed: 0,
        yaw: 0,
        driftAngle: 0,
        followOffsetLocal: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](),
        velocity: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](),
        lookTarget: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](),
        visualSteerYaw: 0,
        visualBank: 0,
        verticalSpeed: 0,
        boostFactor: 1,
        wasBoosting: false,
        wasHandbraking: false,
        cameraShake: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelViewer$2f$controllers$2f$cameraShakeController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createCameraShakeState"])(),
        barrelRollActive: false,
        barrelRollDir: 0,
        barrelRollTime: 0,
        barrelRollDuration: 2.2,
        barrelRollVisual: 0
    };
}
function handleDriveKeyDown(e, moveState, isActive) {
    if (!isActive) return;
    if (e.repeat) return;
    if (e.code === "KeyW") moveState.forward = true;
    if (e.code === "KeyS") moveState.backward = true;
    if (e.code === "KeyA") moveState.left = true;
    if (e.code === "KeyD") moveState.right = true;
    if (e.code === "Space") {
        moveState.up = true;
        e.preventDefault();
    }
    if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
        moveState.boost = true;
    }
    if (e.code === "KeyL") {
        moveState.barrelRollLeft = true;
    }
    if (e.code === "KeyK") {
        moveState.barrelRollRight = true;
    }
    if (e.code === "Enter" || e.code === "KeyQ") {
        moveState.down = true;
    }
}
function handleDriveKeyUp(e, moveState) {
    if (e.code === "KeyW") moveState.forward = false;
    if (e.code === "KeyS") moveState.backward = false;
    if (e.code === "KeyA") moveState.left = false;
    if (e.code === "KeyD") moveState.right = false;
    if (e.code === "Space") moveState.up = false;
    if (e.code === "ShiftLeft" || e.code === "ShiftRight") moveState.boost = false;
    if (e.code === "KeyK") moveState.barrelRollLeft = false;
    if (e.code === "KeyL") moveState.barrelRollRight = false;
    if (e.code === "Enter" || e.code === "KeyQ") moveState.down = false;
}
function enterDriveMode(params) {
    const { camera, vehicleRoot, driveState } = params;
    vehicleRoot.updateMatrixWorld(true);
    const box = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(vehicleRoot);
    const centerWorld = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]();
    box.getCenter(centerWorld);
    const centerLocal = vehicleRoot.worldToLocal(centerWorld.clone());
    driveState.active = true;
    driveState.vehicleRoot = vehicleRoot;
    driveState.speed = 0;
    driveState.yaw = vehicleRoot.rotation.y;
    driveState.visualSteerYaw = 0;
    driveState.visualBank = 0;
    driveState.driftAngle = 0;
    driveState.verticalSpeed = 0;
    driveState.boostFactor = 1;
    driveState.followOffsetLocal.copy(centerLocal);
    driveState.velocity.set(0, 0, 0);
    driveState.lookTarget.copy(centerWorld);
    driveState.wasBoosting = false;
    driveState.wasHandbraking = false;
    driveState.barrelRollActive = false;
    driveState.barrelRollDir = 0;
    driveState.barrelRollTime = 0;
    driveState.barrelRollVisual = 0;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelViewer$2f$controllers$2f$cameraShakeController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resetCameraShake"])(driveState.cameraShake);
    camera.fov = DRIVE_FOV;
    camera.updateProjectionMatrix();
}
function exitDriveMode(params) {
    const { camera, driveState, moveState } = params;
    driveState.active = false;
    driveState.vehicleRoot = null;
    driveState.speed = 0;
    driveState.yaw = 0;
    driveState.visualSteerYaw = 0;
    driveState.visualBank = 0;
    driveState.driftAngle = 0;
    driveState.verticalSpeed = 0;
    driveState.boostFactor = 1;
    driveState.followOffsetLocal.set(0, 0, 0);
    driveState.velocity.set(0, 0, 0);
    moveState.forward = false;
    moveState.backward = false;
    moveState.left = false;
    moveState.right = false;
    moveState.up = false;
    moveState.down = false;
    moveState.boost = false;
    moveState.barrelRollLeft = false;
    moveState.barrelRollRight = false;
    driveState.wasBoosting = false;
    driveState.wasHandbraking = false;
    driveState.barrelRollActive = false;
    driveState.barrelRollDir = 0;
    driveState.barrelRollTime = 0;
    driveState.barrelRollVisual = 0;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelViewer$2f$controllers$2f$cameraShakeController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resetCameraShake"])(driveState.cameraShake);
    if (camera) {
        camera.fov = 40;
        camera.updateProjectionMatrix();
    }
}
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}
function moveToward(current, target, maxDelta) {
    if (current < target) return Math.min(current + maxDelta, target);
    if (current > target) return Math.max(current - maxDelta, target);
    return current;
}
function easeOutCubic(t) {
    const x = 1 - t;
    return 1 - x * x * x;
}
function triggerBarrelRoll(driveState, dir) {
    driveState.barrelRollActive = true;
    driveState.barrelRollDir = dir;
    driveState.barrelRollTime = 0;
}
function updateDriveCamera(params) {
    const { dt, camera, driveState, moveState } = params;
    const vehicleRoot = driveState.vehicleRoot;
    if (!vehicleRoot) return;
    const steerInput = (moveState.left ? 1 : 0) + (moveState.right ? -1 : 0);
    const throttleInput = moveState.forward ? 1 : 0;
    const handbrake = moveState.backward;
    const boosting = moveState.boost && !handbrake;
    if (moveState.barrelRollLeft) {
        triggerBarrelRoll(driveState, 1);
        moveState.barrelRollLeft = false;
    }
    if (moveState.barrelRollRight) {
        triggerBarrelRoll(driveState, -1);
        moveState.barrelRollRight = false;
    }
    const wasBoosting = driveState.wasBoosting;
    const wasHandbraking = driveState.wasHandbraking;
    const enteredBoost = boosting && !wasBoosting && !wasHandbraking;
    const enteredHandbrake = handbrake && !wasHandbraking;
    const enteredHandbrakeFromBoost = enteredHandbrake && wasBoosting;
    if (enteredBoost) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelViewer$2f$controllers$2f$cameraShakeController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["triggerCameraShake"])(driveState.cameraShake, "medium");
    }
    if (enteredHandbrakeFromBoost) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelViewer$2f$controllers$2f$cameraShakeController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["triggerCameraShake"])(driveState.cameraShake, "heavy");
    } else if (enteredHandbrake) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelViewer$2f$controllers$2f$cameraShakeController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["triggerCameraShake"])(driveState.cameraShake, "medium");
    }
    if (handbrake) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelViewer$2f$controllers$2f$cameraShakeController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSustainCameraShake"])(driveState.cameraShake, "medium");
    } else if (boosting) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelViewer$2f$controllers$2f$cameraShakeController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSustainCameraShake"])(driveState.cameraShake, "small");
    } else {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelViewer$2f$controllers$2f$cameraShakeController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSustainCameraShake"])(driveState.cameraShake, null);
    }
    const targetBoostFactor = boosting ? DRIVE_BOOST_MULTIPLIER : handbrake ? Math.max(driveState.boostFactor, DRIVE_HANDBRAKE_BOOST_HOLD) : 1;
    const boostAlpha = 1 - Math.exp(-DRIVE_BOOST_RESPONSE * dt);
    driveState.boostFactor = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].lerp(driveState.boostFactor, targetBoostFactor, boostAlpha);
    const driveSpeedCap = DRIVE_MAX_DRIVE_SPEED * driveState.boostFactor;
    const hardSpeedCap = DRIVE_MAX_FORWARD_SPEED;
    const preSpeed01 = clamp(driveState.speed / DRIVE_DRIFT_SPEED_REFERENCE, 0, 1);
    let steerControl = DRIVE_NORMAL_STEER_CONTROL;
    let steerSpeedFalloff = DRIVE_NORMAL_STEER_SPEED_FALLOFF;
    if (boosting) {
        steerControl = DRIVE_BOOST_STEER_CONTROL;
        steerSpeedFalloff = DRIVE_BOOST_STEER_SPEED_FALLOFF;
    }
    if (handbrake) {
        steerControl = DRIVE_HANDBRAKE_STEER_CONTROL;
        steerSpeedFalloff = 0.15;
    }
    const steerScale = 1 - preSpeed01 * steerSpeedFalloff;
    if (steerInput !== 0 && Math.abs(driveState.speed) > 0.1) {
        driveState.yaw += steerInput * DRIVE_TURN_SPEED * steerControl * Math.max(0.18, steerScale) * dt;
    }
    if (throttleInput > 0) {
        const accelMultiplier = boosting ? DRIVE_BOOST_ACCEL_MULTIPLIER : 1;
        driveState.speed += DRIVE_ACCEL * accelMultiplier * dt;
    } else {
        driveState.speed *= handbrake ? DRIVE_HANDBRAKE_SPEED_DRAG : DRIVE_COAST_DRAG;
        if (Math.abs(driveState.speed) < 0.02) driveState.speed = 0;
    }
    const isActivelyHandbrakeDrifting = handbrake && steerInput !== 0 && driveState.speed >= DRIVE_MIN_DRIFT_SPEED;
    if (isActivelyHandbrakeDrifting) {
        driveState.speed += DRIVE_HANDBRAKE_SPEED_GAIN * dt;
    }
    if (driveState.speed > driveSpeedCap) {
        driveState.speed *= boosting ? DRIVE_BOOST_OVERSPEED_DRAG : handbrake ? 0.9994 : DRIVE_NORMAL_OVERSPEED_DRAG;
    }
    driveState.speed = clamp(driveState.speed, 0, hardSpeedCap);
    const speedAbs = Math.abs(driveState.speed);
    const speed01 = clamp(speedAbs / DRIVE_MAX_FORWARD_SPEED, 0, 1);
    const driftSpeed01 = clamp(speedAbs / DRIVE_DRIFT_SPEED_REFERENCE, 0, 1);
    let targetDriftAngle = 0;
    if (speedAbs >= DRIVE_MIN_DRIFT_SPEED) {
        const maxDrift = handbrake ? DRIVE_HANDBRAKE_MAX_DRIFT_ANGLE : DRIVE_MAX_DRIFT_ANGLE;
        targetDriftAngle = -steerInput * maxDrift * driftSpeed01;
    }
    const driftResponse = handbrake ? DRIVE_HANDBRAKE_DRIFT_BUILD_RESPONSE : steerInput !== 0 ? DRIVE_DRIFT_BUILD_RESPONSE : DRIVE_DRIFT_RETURN_RESPONSE;
    driveState.driftAngle = moveToward(driveState.driftAngle, targetDriftAngle, driftResponse * dt);
    const moveYaw = driveState.yaw + driveState.driftAngle;
    const moveDir = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](Math.sin(moveYaw), 0, Math.cos(moveYaw)).normalize();
    driveState.velocity.copy(moveDir).multiplyScalar(driveState.speed);
    vehicleRoot.position.addScaledVector(driveState.velocity, dt);
    const verticalInput = (moveState.up ? 1 : 0) - (moveState.down ? 1 : 0);
    const targetVerticalSpeed = verticalInput * DRIVE_FLY_SPEED;
    const verticalAlpha = 1 - Math.exp(-DRIVE_VERTICAL_RESPONSE * dt);
    driveState.verticalSpeed = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].lerp(driveState.verticalSpeed, targetVerticalSpeed, verticalAlpha);
    vehicleRoot.position.y += driveState.verticalSpeed * dt;
    const visualSteerMultiplier = handbrake ? DRIVE_HANDBRAKE_VISUAL_STEER_MULTIPLIER : boosting ? DRIVE_BOOST_VISUAL_STEER_MULTIPLIER : DRIVE_NORMAL_VISUAL_STEER_MULTIPLIER;
    const visualTurnTarget = steerInput * DRIVE_VISUAL_STEER_ANGLE * visualSteerMultiplier * driftSpeed01 - driveState.driftAngle * 0.35;
    const visualBankBase = handbrake ? DRIVE_HANDBRAKE_VISUAL_BANK_ANGLE : DRIVE_VISUAL_BANK_ANGLE * (boosting ? DRIVE_BOOST_VISUAL_BANK_MULTIPLIER : 1.0);
    const visualBankTarget = -steerInput * visualBankBase * driftSpeed01;
    const visualResponse = handbrake ? DRIVE_HANDBRAKE_VISUAL_RESPONSE : boosting ? DRIVE_BOOST_VISUAL_RESPONSE : DRIVE_NORMAL_VISUAL_RESPONSE;
    const visualAlpha = 1 - Math.exp(-visualResponse * dt);
    driveState.visualSteerYaw = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].lerp(driveState.visualSteerYaw, visualTurnTarget, visualAlpha);
    driveState.visualBank = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].lerp(driveState.visualBank, visualBankTarget, visualAlpha);
    if (driveState.barrelRollActive) {
        driveState.barrelRollTime += dt;
        const t = clamp(driveState.barrelRollTime / driveState.barrelRollDuration, 0, 1);
        driveState.barrelRollVisual = driveState.barrelRollDir * easeOutCubic(t) * Math.PI * 2;
        if (t >= 1) {
            driveState.barrelRollActive = false;
            driveState.barrelRollDir = 0;
            driveState.barrelRollTime = 0;
            driveState.barrelRollVisual = 0;
        }
    }
    vehicleRoot.rotation.set(0, driveState.yaw + driveState.visualSteerYaw, driveState.visualBank + driveState.barrelRollVisual);
    vehicleRoot.updateMatrixWorld(true);
    const targetWorld = vehicleRoot.localToWorld(driveState.followOffsetLocal.clone());
    const pullbackT = Math.pow(speed01, DRIVE_CAMERA_PULLBACK_EXPONENT);
    const dynamicDistance = DRIVE_CAMERA_DISTANCE + DRIVE_CAMERA_SPEED_DISTANCE * pullbackT;
    const forwardDir = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](Math.sin(driveState.yaw), 0, Math.cos(driveState.yaw)).normalize();
    const backDir = forwardDir.clone().multiplyScalar(-dynamicDistance);
    const desiredCamPos = targetWorld.clone().add(backDir).add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](0, DRIVE_CAMERA_HEIGHT, 0));
    const camAlpha = 1 - Math.exp(-DRIVE_CAMERA_LERP * dt);
    camera.position.lerp(desiredCamPos, camAlpha);
    const desiredLookTarget = targetWorld.clone().add(forwardDir.clone().multiplyScalar(10 + 28 * speed01));
    const lookAlpha = 1 - Math.exp(-DRIVE_CAMERA_LOOK_LERP * dt);
    driveState.lookTarget.lerp(desiredLookTarget, lookAlpha);
    const shake = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelViewer$2f$controllers$2f$cameraShakeController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateCameraShake"])(driveState.cameraShake, dt);
    const camForward = driveState.lookTarget.clone().sub(camera.position).normalize();
    const camRight = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]().crossVectors(camForward, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0)).normalize();
    const camUp = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]().crossVectors(camRight, camForward).normalize();
    camera.position.addScaledVector(camRight, shake.positionOffset.x).addScaledVector(camUp, shake.positionOffset.y).addScaledVector(camForward, shake.positionOffset.z);
    const shakenLookTarget = driveState.lookTarget.clone().addScaledVector(camRight, shake.positionOffset.x * 0.35).addScaledVector(camUp, shake.positionOffset.y * 0.2);
    camera.lookAt(shakenLookTarget);
    camera.rotateZ(shake.rollOffset);
    driveState.wasBoosting = boosting;
    driveState.wasHandbraking = handbrake;
}
}),
"[project]/apps/web/src/components/VoxelViewer/VoxelViewer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VoxelViewer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$controls$2f$OrbitControls$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/controls/OrbitControls.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$GLTFLoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/loaders/GLTFLoader.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$DRACOLoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/loaders/DRACOLoader.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$utils$2f$SkeletonUtils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/utils/SkeletonUtils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$RGBELoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/loaders/RGBELoader.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$materials$2f$animatedHeightMist$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/materials/animatedHeightMist.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$publishedWorlds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/publishedWorlds.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$user$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/user.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelViewer$2f$controllers$2f$vehicleEffectsController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelViewer/controllers/vehicleEffectsController.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelViewer$2f$controllers$2f$fpsController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelViewer/controllers/fpsController.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelViewer$2f$controllers$2f$vehicleController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelViewer/controllers/vehicleController.ts [app-ssr] (ecmascript)");
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
const TEMP_WORLD_SCALE = 1.0;
const JEFF_TARGET_HEIGHT = 10;
const JEFF_Y_OFFSET = -5.0;
const JEFF_ROT_Y = Math.PI / 2;
const PLAY_SKY_RADIUS_0 = 9000;
const PLAY_SKY_RADIUS_1 = 8500;
const PLAY_SKY_RADIUS_2 = 8000;
const PLAY_SKY_RADIUS_3 = 7500;
const PLAY_SKY_SEGMENTS_W = 512;
const PLAY_SKY_SEGMENTS_H = 220;
const PLAY_SKY_ROT_SPEED_1 = 0.005;
const PLAY_SKY_ROT_SPEED_2 = 0.01;
const PLAY_SKY_ROT_SPEED_3 = 0.018;
const CLOUD_LIGHT_START_Y = 125;
const CLOUD_LIGHT_FULL_Y = 450;
const CLOUD_LIGHT_MAX_INTENSITY = 25.0;
const VIEWER_MIST_Y_BOTTOM = -200;
const VIEWER_MIST_Y_TOP = 200;
const VIEWER_MIST_MAX_OPACITY = 0.7;
const VIEWER_MIST_COLOR = 0xffffff;
const SHARED_MIST_NOISE_SCALE = 0.01;
const SHARED_MIST_NOISE_STRENGTH = 0.5;
const SHARED_MIST_NOISE_SCROLL = {
    x: 0.5,
    y: 0.012,
    z: 0.004
};
const ISLAND_MIST_Y_BOTTOM = -40;
const ISLAND_MIST_Y_TOP = 10;
const ISLAND_MIST_MAX_OPACITY = 0.60;
const DRIVABLE_MARKETPLACE_IDS = new Set([
    "preset_car",
    "preset_mini-hovercraft"
]);
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
function quarterTurnsToEuler(rotation) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Euler"]((rotation?.x ?? 0) * Math.PI / 2, (rotation?.y ?? 0) * Math.PI / 2, (rotation?.z ?? 0) * Math.PI / 2, "XYZ");
}
function disposeObject3D(root) {
    if (!root) return;
    root.traverse((obj)=>{
        const mesh = obj;
        if (!mesh.isMesh) return;
        mesh.geometry?.dispose();
        if (Array.isArray(mesh.material)) {
            for (const m of mesh.material){
                const mm = m;
                mm.map?.dispose?.();
                mm.dispose();
            }
        } else {
            const mm = mesh.material;
            mm.map?.dispose?.();
            mm.dispose();
        }
    });
}
function VoxelViewer(props) {
    const { publishedWorldId } = props;
    const mountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rendererRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sceneRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cameraRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const controlsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const islandRootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const publishedWorldRootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const playSkyRootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const playSkyCloud1Ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const playSkyCloud2Ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const playSkyCloud3Ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const playSkyWarm1Ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const playSkyWarm2Ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const playSkyWarm3Ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const envRTRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const jeffTemplateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const jeffInstanceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const vehicleEffectsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const jeffClipsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const jeffMixerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const jeffFinishHandlerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const raycasterRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Raycaster"]());
    const hoveredVehicleRootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hoveredVehicleBoxRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const moveStateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelViewer$2f$controllers$2f$fpsController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createFpsMoveState"])());
    const fpStateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelViewer$2f$controllers$2f$fpsController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createFpsState"])());
    const driveMoveStateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelViewer$2f$controllers$2f$vehicleController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createDriveMoveState"])());
    const driveStateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelViewer$2f$controllers$2f$vehicleController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createDriveState"])());
    const worldBoundsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const playModeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [loadError, setLoadError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [worldName, setWorldName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [authorName, setAuthorName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [playMode, setPlayMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [driveMode, setDriveMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    function snapTo(value, step) {
        return Math.round(value / step) * step;
    }
    function clearHoveredVehicleBox() {
        const scene = sceneRef.current;
        const helper = hoveredVehicleBoxRef.current;
        if (!scene || !helper) return;
        scene.remove(helper);
        helper.material.dispose();
        hoveredVehicleBoxRef.current = null;
    }
    function setHoveredVehicleBoxFor(root) {
        const scene = sceneRef.current;
        if (!scene) return;
        clearHoveredVehicleBox();
        hoveredVehicleRootRef.current = root;
        if (!root) return;
        const box = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(root);
        const helper = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box3Helper"](box, 0xc7ecff);
        helper.renderOrder = 9999;
        scene.add(helper);
        hoveredVehicleBoxRef.current = helper;
    }
    function detachJeff() {
        const inst = jeffInstanceRef.current;
        if (inst) {
            inst.parent?.remove(inst);
            jeffInstanceRef.current = null;
        }
        if (jeffMixerRef.current && jeffFinishHandlerRef.current) {
            jeffMixerRef.current.removeEventListener("finished", jeffFinishHandlerRef.current);
            jeffFinishHandlerRef.current = null;
        }
        if (jeffMixerRef.current) {
            jeffMixerRef.current.stopAllAction();
            jeffMixerRef.current = null;
        }
    }
    function attachJeffToVehicle(vehicleRoot) {
        const template = jeffTemplateRef.current;
        if (!template) return;
        detachJeff();
        vehicleRoot.updateMatrixWorld(true);
        const vehicleBox = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(vehicleRoot);
        const vehicleCenterWorld = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]();
        vehicleBox.getCenter(vehicleCenterWorld);
        const vehicleTopCenterWorld = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](vehicleCenterWorld.x, vehicleBox.max.y, vehicleCenterWorld.z);
        const attachLocal = vehicleRoot.worldToLocal(vehicleTopCenterWorld.clone());
        const cloned = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$utils$2f$SkeletonUtils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clone"])(template);
        cloned.name = "jeff-rider";
        const rawBox = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(cloned);
        const rawSize = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]();
        const rawCenter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]();
        rawBox.getSize(rawSize);
        rawBox.getCenter(rawCenter);
        const rawHeight = Math.max(rawSize.y, 0.0001);
        const uniformScale = JEFF_TARGET_HEIGHT / rawHeight;
        cloned.scale.setScalar(uniformScale);
        cloned.updateMatrixWorld(true);
        const scaledBox = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(cloned);
        const scaledSize = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]();
        const scaledCenter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]();
        scaledBox.getSize(scaledSize);
        scaledBox.getCenter(scaledCenter);
        cloned.position.set(attachLocal.x - scaledCenter.x, attachLocal.y - (scaledCenter.y - scaledSize.y * 0.5) + JEFF_Y_OFFSET, attachLocal.z - scaledCenter.z);
        cloned.rotation.set(0, JEFF_ROT_Y, 0);
        cloned.traverse((obj)=>{
            const mesh = obj;
            if (!mesh.isMesh) return;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            const applyTo = (mat)=>{
                const m = mat;
                if (!("roughness" in m)) return;
                const clonedMat = m.clone();
                clonedMat.roughness = 0.9;
                clonedMat.metalness = 0.02;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$materials$2f$animatedHeightMist$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["applyAnimatedHeightMistToStandardMaterial"])(clonedMat, {
                    yBottom: VIEWER_MIST_Y_BOTTOM,
                    yTop: VIEWER_MIST_Y_TOP,
                    maxOpacity: VIEWER_MIST_MAX_OPACITY,
                    color: VIEWER_MIST_COLOR,
                    noiseScale: SHARED_MIST_NOISE_SCALE,
                    noiseStrength: SHARED_MIST_NOISE_STRENGTH,
                    noiseScroll: SHARED_MIST_NOISE_SCROLL
                });
                clonedMat.needsUpdate = true;
                return clonedMat;
            };
            if (Array.isArray(mesh.material)) {
                mesh.material = mesh.material.map((mat)=>applyTo(mat) ?? mat);
            } else {
                mesh.material = applyTo(mesh.material) ?? mesh.material;
            }
        });
        vehicleRoot.add(cloned);
        jeffInstanceRef.current = cloned;
        if (jeffClipsRef.current.length > 0) {
            const mixer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimationMixer"](cloned);
            jeffMixerRef.current = mixer;
            const enterClip = jeffClipsRef.current[0] ?? null;
            const loopClip = jeffClipsRef.current[2] ?? jeffClipsRef.current[0] ?? null;
            if (enterClip) {
                const enterAction = mixer.clipAction(enterClip);
                enterAction.reset();
                enterAction.setLoop(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoopOnce"], 1);
                enterAction.clampWhenFinished = true;
                enterAction.play();
                const onFinished = (e)=>{
                    if (e.action !== enterAction) return;
                    mixer.removeEventListener("finished", onFinished);
                    jeffFinishHandlerRef.current = null;
                    if (!loopClip) return;
                    const loopAction = mixer.clipAction(loopClip);
                    loopAction.reset();
                    loopAction.setLoop(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoopRepeat"], Infinity);
                    loopAction.clampWhenFinished = false;
                    loopAction.play();
                };
                mixer.addEventListener("finished", onFinished);
                jeffFinishHandlerRef.current = onFinished;
            }
        }
    }
    function findVehicleRootFromObject(obj) {
        let cur = obj;
        while(cur){
            const latestMarketplaceAssetId = cur.userData?.latestMarketplaceAssetId;
            if (typeof latestMarketplaceAssetId === "string" && DRIVABLE_MARKETPLACE_IDS.has(latestMarketplaceAssetId)) {
                return cur;
            }
            cur = cur.parent;
        }
        return null;
    }
    function updateVehicleHover() {
        const camera = cameraRef.current;
        const root = publishedWorldRootRef.current;
        if (!camera || !root) {
            setHoveredVehicleBoxFor(null);
            return;
        }
        const raycaster = raycasterRef.current;
        raycaster.setFromCamera(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"](0, 0), camera);
        const hits = raycaster.intersectObject(root, true);
        const hitRoot = hits.length > 0 ? findVehicleRootFromObject(hits[0].object) : null;
        if (hitRoot !== hoveredVehicleRootRef.current) {
            setHoveredVehicleBoxFor(hitRoot);
        } else if (hoveredVehicleBoxRef.current && hitRoot) {
            hoveredVehicleBoxRef.current.box.setFromObject(hitRoot);
        }
    }
    function syncPlaySkyLayerRotation(layer) {
        const cloud = layer === 1 ? playSkyCloud1Ref.current : layer === 2 ? playSkyCloud2Ref.current : playSkyCloud3Ref.current;
        const warm = layer === 1 ? playSkyWarm1Ref.current : layer === 2 ? playSkyWarm2Ref.current : playSkyWarm3Ref.current;
        if (!cloud || !warm) return;
        warm.rotation.y = cloud.rotation.y;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        playModeRef.current = playMode;
        if (playSkyRootRef.current) {
            playSkyRootRef.current.visible = playMode;
        }
    }, [
        playMode
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const mount = mountRef.current;
        if (!mount) return;
        const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Scene"]();
        sceneRef.current = scene;
        scene.background = null;
        const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PerspectiveCamera"](40, mount.clientWidth / mount.clientHeight, 0.1, 200000);
        camera.position.set(172.557, 77.391, 184.354);
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
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PCFSoftShadowMap"];
        renderer.toneMapping = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NeutralToneMapping"];
        renderer.toneMappingExposure = 1.0;
        renderer.outputColorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
        mount.appendChild(renderer.domElement);
        const ambient = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AmbientLight"](0xffffff, 1.5);
        scene.add(ambient);
        const cloudSun = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DirectionalLight"](0xffcc88, 0);
        cloudSun.position.set(300, 1800, -900);
        cloudSun.target.position.set(0, 200, 0);
        cloudSun.castShadow = true;
        cloudSun.shadow.bias = -0.00005;
        cloudSun.shadow.normalBias = 0.005;
        cloudSun.shadow.mapSize.set(4096, 4096);
        cloudSun.shadow.camera.left = -280;
        cloudSun.shadow.camera.right = 280;
        cloudSun.shadow.camera.top = 280;
        cloudSun.shadow.camera.bottom = -280;
        cloudSun.shadow.camera.near = 50;
        cloudSun.shadow.camera.far = 2600;
        scene.add(cloudSun.target);
        scene.add(cloudSun);
        const cloudWarmHemi = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HemisphereLight"](0xffd6a0, 0x8aa0b8, 0);
        scene.add(cloudWarmHemi);
        const hemi = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HemisphereLight"](0xdff4ff, 0x6fa0c8, 3.0);
        scene.add(hemi);
        const dir = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DirectionalLight"](0xfdfbd3, 2.0);
        dir.castShadow = true;
        dir.shadow.bias = -0.00005;
        dir.shadow.normalBias = 0.005;
        dir.shadow.mapSize.set(4096, 4096);
        dir.shadow.camera.left = -280;
        dir.shadow.camera.right = 280;
        dir.shadow.camera.top = 280;
        dir.shadow.camera.bottom = -280;
        dir.shadow.camera.near = 50;
        dir.shadow.camera.far = 2600;
        dir.position.setFromSphericalCoords(250, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].degToRad(60), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].degToRad(30));
        dir.target.position.set(0, 0, 50);
        scene.add(dir.target);
        scene.add(dir);
        const cloudSunOffset = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](300, 1800, -900);
        const dirOffset = dir.position.clone().sub(dir.target.position);
        const controls = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$controls$2f$OrbitControls$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrbitControls"](camera, renderer.domElement);
        controls.enableDamping = true;
        controls.target.set(0, 0, 0);
        controls.update();
        camera.lookAt(controls.target);
        controlsRef.current = controls;
        const hdriLoader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$loaders$2f$RGBELoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RGBELoader"]();
        hdriLoader.load("/world/DayInTheClouds1K.hdr", (texture)=>{
            const pmrem = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PMREMGenerator"](renderer);
            const rt = pmrem.fromEquirectangular(texture);
            texture.dispose();
            pmrem.dispose();
            scene.environment = rt.texture;
            scene.environment.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
            envRTRef.current = rt;
        }, undefined, (err)=>console.error("Failed to load HDRI /world/DayInTheClouds1K.hdr", err));
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
                    m.roughness = 0.9;
                    m.metalness = 0.02;
                    if (scene.environment) {
                        m.envMap = scene.environment;
                    }
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$materials$2f$animatedHeightMist$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["applyAnimatedHeightMistToStandardMaterial"])(m, {
                        yBottom: ISLAND_MIST_Y_BOTTOM,
                        yTop: ISLAND_MIST_Y_TOP,
                        maxOpacity: ISLAND_MIST_MAX_OPACITY,
                        color: VIEWER_MIST_COLOR,
                        noiseScale: SHARED_MIST_NOISE_SCALE,
                        noiseStrength: SHARED_MIST_NOISE_STRENGTH,
                        noiseScroll: SHARED_MIST_NOISE_SCROLL
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
        gltfLoader.load("/player/Jeff.glb", (gltf)=>{
            const root = gltf.scene;
            root.name = "jeff-template";
            root.visible = true;
            root.traverse((obj)=>{
                const mesh = obj;
                if (!mesh.isMesh) return;
                mesh.castShadow = true;
                mesh.receiveShadow = true;
            });
            jeffTemplateRef.current = root;
            jeffClipsRef.current = gltf.animations ?? [];
        }, undefined, (err)=>{
            console.error("Failed to load /player/Jeff.glb", err);
        });
        const publishedWorldRoot = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
        publishedWorldRoot.name = "published-world-root";
        scene.add(publishedWorldRoot);
        publishedWorldRootRef.current = publishedWorldRoot;
        const playSkyRoot = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
        playSkyRoot.name = "play-sky-root";
        playSkyRoot.visible = false;
        scene.add(playSkyRoot);
        playSkyRootRef.current = playSkyRoot;
        const texLoader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TextureLoader"]();
        const setupSkyTexture = (tex)=>{
            tex.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
            tex.wrapS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RepeatWrapping"];
            tex.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ClampToEdgeWrapping"];
            tex.minFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NearestFilter"];
            tex.magFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NearestFilter"];
            tex.generateMipmaps = false;
            tex.needsUpdate = true;
        };
        texLoader.load("/player/skybox0.png", (texture)=>{
            setupSkyTexture(texture);
            const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](PLAY_SKY_RADIUS_0, PLAY_SKY_SEGMENTS_W, PLAY_SKY_SEGMENTS_H);
            const material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                map: texture,
                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BackSide"],
                transparent: false,
                depthWrite: false,
                fog: false
            });
            const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](geometry, material);
            mesh.name = "play-sky-0";
            mesh.rotation.y = 0;
            playSkyRoot.add(mesh);
        });
        texLoader.load("/player/skybox1.png", (texture)=>{
            setupSkyTexture(texture);
            const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](PLAY_SKY_RADIUS_1, PLAY_SKY_SEGMENTS_W, PLAY_SKY_SEGMENTS_H);
            const material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                map: texture,
                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BackSide"],
                transparent: true,
                depthWrite: false,
                fog: false
            });
            const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](geometry, material);
            mesh.name = "play-sky-1";
            mesh.rotation.y = 160;
            playSkyRoot.add(mesh);
            playSkyCloud1Ref.current = mesh;
            syncPlaySkyLayerRotation(1);
        });
        texLoader.load("/player/skybox1-warm.png", (texture)=>{
            setupSkyTexture(texture);
            const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](PLAY_SKY_RADIUS_1, PLAY_SKY_SEGMENTS_W, PLAY_SKY_SEGMENTS_H);
            const material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                map: texture,
                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BackSide"],
                transparent: true,
                depthWrite: false,
                fog: false,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NormalBlending"],
                opacity: 0,
                toneMapped: false
            });
            const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](geometry, material);
            mesh.name = "play-sky-1-warm";
            mesh.rotation.y = 160;
            playSkyRoot.add(mesh);
            playSkyWarm1Ref.current = mesh;
            syncPlaySkyLayerRotation(1);
        });
        texLoader.load("/player/skybox2.png", (texture)=>{
            setupSkyTexture(texture);
            const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](PLAY_SKY_RADIUS_2, PLAY_SKY_SEGMENTS_W, PLAY_SKY_SEGMENTS_H);
            const material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                map: texture,
                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BackSide"],
                transparent: true,
                depthWrite: false,
                fog: false
            });
            const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](geometry, material);
            mesh.name = "play-sky-2";
            mesh.rotation.y = 0;
            playSkyRoot.add(mesh);
            playSkyCloud2Ref.current = mesh;
            syncPlaySkyLayerRotation(2);
        });
        texLoader.load("/player/skybox2-warm.png", (texture)=>{
            setupSkyTexture(texture);
            const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](PLAY_SKY_RADIUS_2, PLAY_SKY_SEGMENTS_W, PLAY_SKY_SEGMENTS_H);
            const material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                map: texture,
                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BackSide"],
                transparent: true,
                depthWrite: false,
                fog: false,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NormalBlending"],
                opacity: 0,
                toneMapped: false
            });
            const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](geometry, material);
            mesh.name = "play-sky-2-warm";
            mesh.rotation.y = 0;
            playSkyRoot.add(mesh);
            playSkyWarm2Ref.current = mesh;
            syncPlaySkyLayerRotation(2);
        });
        texLoader.load("/player/skybox3.png", (texture)=>{
            setupSkyTexture(texture);
            const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](PLAY_SKY_RADIUS_3, PLAY_SKY_SEGMENTS_W, PLAY_SKY_SEGMENTS_H);
            const material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                map: texture,
                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BackSide"],
                transparent: true,
                depthWrite: false,
                fog: false
            });
            const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](geometry, material);
            mesh.name = "play-sky-3";
            mesh.rotation.y = 0;
            playSkyRoot.add(mesh);
            playSkyCloud3Ref.current = mesh;
            syncPlaySkyLayerRotation(3);
        });
        texLoader.load("/player/skybox3-warm.png", (texture)=>{
            setupSkyTexture(texture);
            const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](PLAY_SKY_RADIUS_3, PLAY_SKY_SEGMENTS_W, PLAY_SKY_SEGMENTS_H);
            const material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                map: texture,
                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BackSide"],
                transparent: true,
                depthWrite: false,
                fog: false,
                toneMapped: false,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NormalBlending"],
                opacity: 0
            });
            const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](geometry, material);
            mesh.name = "play-sky-3-warm";
            mesh.rotation.y = 0;
            playSkyRoot.add(mesh);
            playSkyWarm3Ref.current = mesh;
            syncPlaySkyLayerRotation(3);
        });
        const onResize = ()=>{
            const w = mount.clientWidth;
            const h = mount.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };
        vehicleEffectsRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelViewer$2f$controllers$2f$vehicleEffectsController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createVehicleEffectsController"])({
            scene,
            camera
        });
        window.addEventListener("resize", onResize);
        const onKeyDown = (e)=>{
            if (driveStateRef.current.active) {
                if (e.code === "KeyE") {
                    const renderer = rendererRef.current;
                    const activeCamera = cameraRef.current;
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelViewer$2f$controllers$2f$vehicleController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["exitDriveMode"])({
                        camera: activeCamera,
                        driveState: driveStateRef.current,
                        moveState: driveMoveStateRef.current
                    });
                    detachJeff();
                    setDriveMode(false);
                    if (renderer) {
                        renderer.domElement.requestPointerLock?.();
                    }
                    fpStateRef.current.active = true;
                    e.preventDefault();
                    return;
                }
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelViewer$2f$controllers$2f$vehicleController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["handleDriveKeyDown"])(e, driveMoveStateRef.current, true);
                return;
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelViewer$2f$controllers$2f$fpsController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["handleFpsKeyDown"])(e, moveStateRef.current, fpStateRef.current, fpStateRef.current.active);
            if (e.code === "KeyE" && playModeRef.current && fpStateRef.current.active && hoveredVehicleRootRef.current) {
                const activeCamera = cameraRef.current;
                const renderer = rendererRef.current;
                if (!activeCamera || !renderer) return;
                const vehicleRoot = hoveredVehicleRootRef.current;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelViewer$2f$controllers$2f$vehicleController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["enterDriveMode"])({
                    camera: activeCamera,
                    vehicleRoot,
                    driveState: driveStateRef.current
                });
                attachJeffToVehicle(vehicleRoot);
                setDriveMode(true);
                fpStateRef.current.active = false;
                if (document.pointerLockElement === renderer.domElement) {
                    document.exitPointerLock();
                }
                clearHoveredVehicleBox();
                hoveredVehicleRootRef.current = null;
                e.preventDefault();
            }
        };
        const onKeyUp = (e)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelViewer$2f$controllers$2f$fpsController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["handleFpsKeyUp"])(e, moveStateRef.current);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelViewer$2f$controllers$2f$vehicleController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["handleDriveKeyUp"])(e, driveMoveStateRef.current);
        };
        const onPointerMove = (e)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelViewer$2f$controllers$2f$fpsController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["handleFpsPointerMove"])(e, fpStateRef.current);
        };
        const onPointerLockChange = ()=>{
            const locked = document.pointerLockElement === renderer.domElement;
            fpStateRef.current.active = locked && playModeRef.current;
        };
        const onMouseDown = ()=>{
            if (!playModeRef.current) return;
            if (driveStateRef.current.active) return;
            if (document.pointerLockElement === renderer.domElement) return;
            renderer.domElement.requestPointerLock?.();
        };
        document.addEventListener("pointerlockchange", onPointerLockChange);
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);
        window.addEventListener("pointermove", onPointerMove);
        renderer.domElement.addEventListener("mousedown", onMouseDown);
        let lastMs = performance.now();
        let raf = 0;
        const tick = ()=>{
            raf = requestAnimationFrame(tick);
            const now = performance.now();
            const dt = Math.min(0.05, (now - lastMs) / 1000);
            lastMs = now;
            const timeSeconds = now * 0.001;
            scene.traverse((obj)=>{
                const mesh = obj;
                if (!mesh.isMesh) return;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$materials$2f$animatedHeightMist$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateHeightMistMaterialTime"])(mesh.material, timeSeconds);
            });
            if (playModeRef.current) {
                if (playSkyCloud1Ref.current) {
                    playSkyCloud1Ref.current.rotation.y += PLAY_SKY_ROT_SPEED_1 * dt;
                    syncPlaySkyLayerRotation(1);
                }
                if (playSkyCloud2Ref.current) {
                    playSkyCloud2Ref.current.rotation.y += PLAY_SKY_ROT_SPEED_2 * dt;
                    syncPlaySkyLayerRotation(2);
                }
                if (playSkyCloud3Ref.current) {
                    playSkyCloud3Ref.current.rotation.y += PLAY_SKY_ROT_SPEED_3 * dt;
                    syncPlaySkyLayerRotation(3);
                }
            }
            if (cloudSun) {
                let probeY = camera.position.y;
                if (driveStateRef.current.active && driveStateRef.current.vehicleRoot) {
                    probeY = driveStateRef.current.vehicleRoot.position.y;
                }
                const t = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].clamp((probeY - CLOUD_LIGHT_START_Y) / (CLOUD_LIGHT_FULL_Y - CLOUD_LIGHT_START_Y), 0, 1);
                const eased = t * t * (3 - 2 * t);
                if (playSkyWarm1Ref.current) {
                    const mat = playSkyWarm1Ref.current.material;
                    mat.opacity = eased * 0.2;
                }
                if (playSkyWarm2Ref.current) {
                    const mat = playSkyWarm2Ref.current.material;
                    mat.opacity = eased * 0.1;
                }
                if (playSkyWarm3Ref.current) {
                    const mat = playSkyWarm3Ref.current.material;
                    mat.opacity = eased * 0.2;
                }
                cloudWarmHemi.intensity = eased * 8.2;
                cloudSun.intensity = eased * CLOUD_LIGHT_MAX_INTENSITY;
                hemi.intensity = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].lerp(3.0, 2.0, eased);
                renderer.toneMappingExposure = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MathUtils"].lerp(1.0, 1.12, eased);
            }
            const SHADOW_SNAP = 8;
            let shadowFocus = camera.position;
            if (driveStateRef.current.active && driveStateRef.current.vehicleRoot) {
                shadowFocus = driveStateRef.current.vehicleRoot.position;
            }
            const sx = snapTo(shadowFocus.x, SHADOW_SNAP);
            const sy = snapTo(shadowFocus.y, SHADOW_SNAP);
            const sz = snapTo(shadowFocus.z, SHADOW_SNAP);
            cloudSun.target.position.set(sx, sy, sz);
            cloudSun.position.copy(cloudSun.target.position).add(cloudSunOffset);
            cloudSun.target.updateMatrixWorld();
            dir.target.position.set(sx, sy, sz);
            dir.position.copy(dir.target.position).add(dirOffset);
            dir.target.updateMatrixWorld();
            if (jeffMixerRef.current) {
                jeffMixerRef.current.update(dt);
            }
            if (driveStateRef.current.active) {
                const activeCamera = cameraRef.current;
                if (activeCamera) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelViewer$2f$controllers$2f$vehicleController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateDriveCamera"])({
                        dt,
                        camera: activeCamera,
                        driveState: driveStateRef.current,
                        moveState: driveMoveStateRef.current
                    });
                }
            } else if (fpStateRef.current.active) {
                const activeCamera = cameraRef.current;
                if (activeCamera) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelViewer$2f$controllers$2f$fpsController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateFpsCamera"])({
                        dt,
                        camera: activeCamera,
                        fpsState: fpStateRef.current,
                        moveState: moveStateRef.current
                    });
                    if (playModeRef.current) {
                        updateVehicleHover();
                    }
                }
            } else {
                if (!playModeRef.current) {
                    clearHoveredVehicleBox();
                }
                controls.update();
            }
            vehicleEffectsRef.current?.update(dt, driveStateRef.current, driveMoveStateRef.current);
            renderer.render(scene, camera);
        };
        tick();
        return ()=>{
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", onResize);
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("keyup", onKeyUp);
            window.removeEventListener("pointermove", onPointerMove);
            document.removeEventListener("pointerlockchange", onPointerLockChange);
            renderer.domElement.removeEventListener("mousedown", onMouseDown);
            if (document.pointerLockElement === renderer.domElement) {
                document.exitPointerLock();
            }
            detachJeff();
            if (jeffMixerRef.current) {
                jeffMixerRef.current.stopAllAction();
                jeffMixerRef.current = null;
            }
            jeffClipsRef.current = [];
            clearHoveredVehicleBox();
            hoveredVehicleRootRef.current = null;
            if (publishedWorldRootRef.current) {
                disposeObject3D(publishedWorldRootRef.current);
                scene.remove(publishedWorldRootRef.current);
                publishedWorldRootRef.current = null;
            }
            if (playSkyRootRef.current) {
                disposeObject3D(playSkyRootRef.current);
                scene.remove(playSkyRootRef.current);
                playSkyRootRef.current = null;
                playSkyCloud1Ref.current = null;
                playSkyCloud2Ref.current = null;
                playSkyCloud3Ref.current = null;
                playSkyWarm1Ref.current = null;
                playSkyWarm2Ref.current = null;
                playSkyWarm3Ref.current = null;
            }
            if (vehicleEffectsRef.current) {
                vehicleEffectsRef.current.dispose();
                vehicleEffectsRef.current = null;
            }
            if (islandRootRef.current) {
                disposeObject3D(islandRootRef.current);
                scene.remove(islandRootRef.current);
                islandRootRef.current = null;
            }
            scene.environment = null;
            if (envRTRef.current) {
                envRTRef.current.dispose();
                envRTRef.current = null;
            }
            if (jeffTemplateRef.current) {
                disposeObject3D(jeffTemplateRef.current);
                jeffTemplateRef.current = null;
            }
            dracoLoader.dispose();
            controls.dispose();
            controlsRef.current = null;
            cameraRef.current = null;
            sceneRef.current = null;
            if (renderer.domElement.parentElement === mount) {
                mount.removeChild(renderer.domElement);
            }
            renderer.dispose();
            rendererRef.current = null;
        };
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        async function loadPublishedWorld() {
            const root = publishedWorldRootRef.current;
            const controls = controlsRef.current;
            const camera = cameraRef.current;
            if (!root || !controls || !camera) return;
            if (!publishedWorldId) return;
            setLoadError(null);
            setWorldName("");
            setAuthorName("");
            setPlayMode(false);
            setDriveMode(false);
            worldBoundsRef.current = null;
            clearHoveredVehicleBox();
            hoveredVehicleRootRef.current = null;
            detachJeff();
            driveStateRef.current.active = false;
            driveStateRef.current.vehicleRoot = null;
            driveStateRef.current.speed = 0;
            driveMoveStateRef.current.forward = false;
            driveMoveStateRef.current.backward = false;
            driveMoveStateRef.current.left = false;
            driveMoveStateRef.current.right = false;
            vehicleEffectsRef.current?.reset();
            disposeObject3D(root);
            root.clear();
            try {
                const world = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$publishedWorlds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPublishedWorld"])(publishedWorldId);
                if (cancelled) return;
                if (!world) {
                    setLoadError("Published world not found.");
                    return;
                }
                setWorldName(world.worldName || "Untitled World");
                try {
                    const profile = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$user$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GetUserProfile"])(world.publisherUserId);
                    if (!cancelled) {
                        setAuthorName(profile.username || "unknown user");
                    }
                } catch (err) {
                    console.error("Failed to resolve viewer author name", err);
                    if (!cancelled) {
                        setAuthorName("unknown user");
                    }
                }
                let minX = Infinity;
                let minY = Infinity;
                let minZ = Infinity;
                let maxX = -Infinity;
                let maxY = -Infinity;
                let maxZ = -Infinity;
                for (const group of world.groups){
                    const groupRoot = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
                    groupRoot.name = `published-group:${group.groupId}`;
                    const latestMarketplaceAssetId = group.latestMarketplaceAssetId ?? null;
                    const isVehicle = latestMarketplaceAssetId === "preset_car" || latestMarketplaceAssetId === "preset_mini-hovercraft";
                    const yOffset = isVehicle ? 0 : 20;
                    groupRoot.position.set(group.position.x, group.position.y + yOffset, group.position.z);
                    const euler = quarterTurnsToEuler(group.rotation);
                    groupRoot.rotation.set(euler.x, euler.y, euler.z);
                    groupRoot.scale.setScalar(TEMP_WORLD_SCALE);
                    let meshParent = groupRoot;
                    let driveRoot = null;
                    let visualRoot = null;
                    let localMinX = Infinity;
                    let localMinY = Infinity;
                    let localMinZ = Infinity;
                    let localMaxX = -Infinity;
                    let localMaxY = -Infinity;
                    let localMaxZ = -Infinity;
                    if (isVehicle) {
                        driveRoot = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
                        driveRoot.name = `vehicle-drive-root:${group.groupId}`;
                        driveRoot.userData.latestMarketplaceAssetId = latestMarketplaceAssetId;
                        visualRoot = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
                        visualRoot.name = `vehicle-visual-root:${group.groupId}`;
                        driveRoot.add(visualRoot);
                        groupRoot.add(driveRoot);
                        meshParent = visualRoot;
                    } else {
                        groupRoot.userData.latestMarketplaceAssetId = latestMarketplaceAssetId;
                    }
                    for (const surface of group.surfaces){
                        const positions = surface.positions;
                        for(let i = 0; i < positions.length; i += 3){
                            const x = positions[i];
                            const y = positions[i + 1];
                            const z = positions[i + 2];
                            if (x < localMinX) localMinX = x;
                            if (y < localMinY) localMinY = y;
                            if (z < localMinZ) localMinZ = z;
                            if (x > localMaxX) localMaxX = x;
                            if (y > localMaxY) localMaxY = y;
                            if (z > localMaxZ) localMaxZ = z;
                        }
                        const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"]();
                        geometry.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](surface.positions, 3));
                        geometry.setAttribute("normal", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](surface.normals, 3));
                        geometry.setIndex(surface.indices);
                        geometry.computeBoundingSphere();
                        const material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                            color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"](surface.color),
                            transparent: surface.isBlueprint,
                            opacity: surface.isBlueprint ? 0.4 : 0.78,
                            roughness: 0.9,
                            metalness: 0.02
                        });
                        if (sceneRef.current?.environment) {
                            material.envMap = sceneRef.current.environment;
                        }
                        if (surface.isBlueprint) {
                            material.depthWrite = false;
                        }
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$materials$2f$animatedHeightMist$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["applyAnimatedHeightMistToStandardMaterial"])(material, {
                            yBottom: VIEWER_MIST_Y_BOTTOM,
                            yTop: VIEWER_MIST_Y_TOP,
                            maxOpacity: VIEWER_MIST_MAX_OPACITY,
                            color: VIEWER_MIST_COLOR,
                            noiseScale: SHARED_MIST_NOISE_SCALE,
                            noiseStrength: SHARED_MIST_NOISE_STRENGTH,
                            noiseScroll: SHARED_MIST_NOISE_SCROLL
                        });
                        material.needsUpdate = true;
                        const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](geometry, material);
                        mesh.castShadow = !surface.isBlueprint;
                        mesh.receiveShadow = true;
                        mesh.renderOrder = surface.isBlueprint ? 1 : 0;
                        meshParent.add(mesh);
                    }
                    if (isVehicle && driveRoot && visualRoot && Number.isFinite(localMinX) && Number.isFinite(localMinY) && Number.isFinite(localMinZ)) {
                        const pivotLocal = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]((localMinX + localMaxX) * 0.5, localMinY, localMinZ);
                        driveRoot.position.copy(pivotLocal);
                        visualRoot.position.copy(pivotLocal).multiplyScalar(-1);
                    }
                    root.add(groupRoot);
                    if (group.bounds) {
                        minX = Math.min(minX, group.bounds.min.x * TEMP_WORLD_SCALE);
                        minY = Math.min(minY, group.bounds.min.y * TEMP_WORLD_SCALE);
                        minZ = Math.min(minZ, group.bounds.min.z * TEMP_WORLD_SCALE);
                        maxX = Math.max(maxX, group.bounds.max.x * TEMP_WORLD_SCALE);
                        maxY = Math.max(maxY, group.bounds.max.y * TEMP_WORLD_SCALE);
                        maxZ = Math.max(maxZ, group.bounds.max.z * TEMP_WORLD_SCALE);
                    }
                }
                if (Number.isFinite(minX)) {
                    worldBoundsRef.current = {
                        minX,
                        minY,
                        minZ,
                        maxX,
                        maxY,
                        maxZ
                    };
                    recenterCameraOnBounds({
                        minX,
                        minY,
                        minZ,
                        maxX,
                        maxY,
                        maxZ,
                        controls,
                        camera
                    });
                }
            } catch (err) {
                console.error("Failed to load published world", err);
                if (!cancelled) {
                    setLoadError("Failed to load published world.");
                }
            }
        }
        loadPublishedWorld();
        return ()=>{
            cancelled = true;
        };
    }, [
        publishedWorldId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const controls = controlsRef.current;
        const camera = cameraRef.current;
        const renderer = rendererRef.current;
        const playSkyRoot = playSkyRootRef.current;
        if (!controls || !camera || !renderer) return;
        if (!playMode) {
            controls.enabled = true;
            if (playSkyRoot) playSkyRoot.visible = false;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelViewer$2f$controllers$2f$vehicleController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["exitDriveMode"])({
                camera,
                driveState: driveStateRef.current,
                moveState: driveMoveStateRef.current
            });
            detachJeff();
            setDriveMode(false);
            vehicleEffectsRef.current?.reset();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelViewer$2f$controllers$2f$fpsController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["exitFpsMode"])({
                renderer,
                fpsState: fpStateRef.current,
                moveState: moveStateRef.current,
                camera
            });
            clearHoveredVehicleBox();
            hoveredVehicleRootRef.current = null;
            const bounds = worldBoundsRef.current;
            if (bounds) {
                recenterCameraOnBounds({
                    ...bounds,
                    controls,
                    camera
                });
            }
            return;
        }
        const bounds = worldBoundsRef.current;
        if (!bounds) return;
        controls.enabled = false;
        if (playSkyRoot) playSkyRoot.visible = true;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelViewer$2f$controllers$2f$fpsController$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["enterFpsMode"])({
            camera,
            renderer,
            fpsState: fpStateRef.current,
            bounds
        });
    }, [
        playMode
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            userSelect: "none",
            backgroundImage: playMode ? "none" : `url('/world/bg.png')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover"
        },
        className: "jsx-4c740da27598db54",
        children: [
            !playMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": true,
                className: "jsx-4c740da27598db54" + " " + "clouds",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: "/world/bgc.png",
                        alt: "",
                        className: "jsx-4c740da27598db54" + " " + "cloud cloudBg"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/VoxelViewer/VoxelViewer.tsx",
                        lineNumber: 1461,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: "/world/mgc.png",
                        alt: "",
                        className: "jsx-4c740da27598db54" + " " + "cloud cloudMg"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/VoxelViewer/VoxelViewer.tsx",
                        lineNumber: 1462,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: "/world/fgc.png",
                        alt: "",
                        className: "jsx-4c740da27598db54" + " " + "cloud cloudFg"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/VoxelViewer/VoxelViewer.tsx",
                        lineNumber: 1463,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/VoxelViewer/VoxelViewer.tsx",
                lineNumber: 1460,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: mountRef,
                style: {
                    position: "absolute",
                    inset: 0,
                    overflow: "hidden",
                    zIndex: 10,
                    cursor: playMode ? "crosshair" : "default"
                },
                className: "jsx-4c740da27598db54"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/VoxelViewer/VoxelViewer.tsx",
                lineNumber: 1467,
                columnNumber: 7
            }, this),
            !playMode && !loadError && (worldName || authorName) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    top: 60,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 30,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 20,
                    pointerEvents: "auto",
                    textAlign: "center",
                    color: "#DBFAFF"
                },
                className: "jsx-4c740da27598db54",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 45,
                            lineHeight: 1.05,
                            letterSpacing: "0.1em",
                            maxWidth: "80vw",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        },
                        className: "jsx-4c740da27598db54",
                        children: worldName
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/VoxelViewer/VoxelViewer.tsx",
                        lineNumber: 1495,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 24,
                            opacity: 0.72,
                            maxWidth: "80vw",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        },
                        className: "jsx-4c740da27598db54",
                        children: authorName ? `by ${authorName}` : ""
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/VoxelViewer/VoxelViewer.tsx",
                        lineNumber: 1509,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: ()=>{
                            setPlayMode(true);
                        },
                        style: {
                            marginTop: 8,
                            fontSize: 30,
                            color: "#DBFAFF",
                            userSelect: "none"
                        },
                        className: "jsx-4c740da27598db54" + " " + "pix-icon",
                        children: "Let's Go!"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/VoxelViewer/VoxelViewer.tsx",
                        lineNumber: 1522,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/VoxelViewer/VoxelViewer.tsx",
                lineNumber: 1479,
                columnNumber: 9
            }, this),
            playMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    !driveMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 40,
                            pointerEvents: "none",
                            color: "#DBFAFF",
                            fontSize: 20,
                            opacity: 0.9
                        },
                        className: "jsx-4c740da27598db54",
                        children: "+"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/VoxelViewer/VoxelViewer.tsx",
                        lineNumber: 1542,
                        columnNumber: 13
                    }, this),
                    !driveMode && hoveredVehicleRootRef.current && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "absolute",
                            left: "50%",
                            bottom: 48,
                            transform: "translateX(-50%)",
                            zIndex: 40,
                            pointerEvents: "none",
                            color: "#DBFAFF",
                            fontSize: 20,
                            opacity: 0.9
                        },
                        className: "jsx-4c740da27598db54",
                        children: "Press E to enter"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/VoxelViewer/VoxelViewer.tsx",
                        lineNumber: 1560,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true),
            loadError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    inset: 0,
                    zIndex: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    pointerEvents: "none"
                },
                className: "jsx-4c740da27598db54",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: "rgba(0,0,0,0.55)",
                        color: "white",
                        padding: "12px 16px",
                        borderRadius: 6,
                        fontSize: 16
                    },
                    className: "jsx-4c740da27598db54",
                    children: loadError
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/VoxelViewer/VoxelViewer.tsx",
                    lineNumber: 1591,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/VoxelViewer/VoxelViewer.tsx",
                lineNumber: 1580,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "4c740da27598db54",
                children: ".clouds.jsx-4c740da27598db54{z-index:5;pointer-events:none;position:absolute;inset:0;overflow:hidden}.cloud.jsx-4c740da27598db54{object-fit:cover;width:200%;height:200%;image-rendering:pixelated;image-rendering:crisp-edges;will-change:transform;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.cloudBg.jsx-4c740da27598db54{animation:18s ease-in-out infinite cloudSineBg}.cloudMg.jsx-4c740da27598db54{animation:14s ease-in-out infinite cloudSineMg}.cloudFg.jsx-4c740da27598db54{animation:12s ease-in-out infinite cloudSineFg}@keyframes cloudSineBg{0%{transform:translate(-50.2%,-50%)}50%{transform:translate(-49.8%,-50%)}to{transform:translate(-50.2%,-50%)}}@keyframes cloudSineMg{0%{transform:translate(-49.7%,-49.95%)}50%{transform:translate(-50.3%,-50.05%)}to{transform:translate(-49.7%,-49.95%)}}@keyframes cloudSineFg{0%{transform:translate(-50.4%,-50.075%)}50%{transform:translate(-49.6%,-49.925%)}to{transform:translate(-50.4%,-50.075%)}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/VoxelViewer/VoxelViewer.tsx",
        lineNumber: 1446,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d9b86926._.js.map