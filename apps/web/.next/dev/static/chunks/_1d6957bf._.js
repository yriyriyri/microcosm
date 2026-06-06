(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/web/src/components/Auth/state.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CLEAR",
    ()=>CLEAR,
    "Context",
    ()=>Context,
    "GET",
    ()=>GET,
    "Provider",
    ()=>Provider,
    "Reducer",
    ()=>Reducer,
    "SET",
    ()=>SET,
    "clearAuthentication",
    ()=>clearAuthentication,
    "getStoredAuthentication",
    ()=>getStoredAuthentication,
    "storageKey",
    ()=>storageKey,
    "useAuthState",
    ()=>useAuthState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const storageKey = "voxl-mini-auth";
const EMPTY_AUTH = {
    isAuthenticated: false,
    accessToken: "",
    me: null,
    bootstrapped: false
};
const SET = (data)=>({
        type: "set_authentication",
        data
    });
_c = SET;
const CLEAR = ()=>({
        type: "clear_authentication"
    });
_c1 = CLEAR;
const GET = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const storage = localStorage.getItem(storageKey);
        if (!storage) return EMPTY_AUTH;
        const parsed = JSON.parse(storage);
        return {
            isAuthenticated: parsed.isAuthenticated ?? false,
            accessToken: parsed.accessToken ?? "",
            me: parsed.me ?? null,
            bootstrapped: parsed.bootstrapped ?? false
        };
    } catch  {
        return EMPTY_AUTH;
    }
};
_c2 = GET;
const Reducer = (data = EMPTY_AUTH, action)=>{
    switch(action.type){
        case "set_authentication":
            {
                const next = action.data ?? EMPTY_AUTH;
                if ("TURBOPACK compile-time truthy", 1) {
                    localStorage.setItem(storageKey, JSON.stringify(next));
                }
                return next;
            }
        case "clear_authentication":
            {
                const next = {
                    ...EMPTY_AUTH,
                    bootstrapped: true
                };
                if ("TURBOPACK compile-time truthy", 1) {
                    localStorage.setItem(storageKey, JSON.stringify(next));
                }
                return next;
            }
        default:
            return data;
    }
};
_c3 = Reducer;
const Context = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createContext({
    data: EMPTY_AUTH,
    dispatch: ()=>{}
});
const Provider = ({ children })=>{
    _s();
    const [data, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducer"])(Reducer, EMPTY_AUTH, GET);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Provider.useMemo[value]": ()=>({
                data,
                dispatch
            })
    }["Provider.useMemo[value]"], [
        data
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Context.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/Auth/state.tsx",
        lineNumber: 100,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Provider, "kc0TyZmbUrFQ+3dsoXhw64V4n8s=");
_c4 = Provider;
const clearAuthentication = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const cleared = {
        ...EMPTY_AUTH,
        bootstrapped: true
    };
    localStorage.setItem(storageKey, JSON.stringify(cleared));
};
const getStoredAuthentication = ()=>{
    return GET();
};
const useAuthState = ()=>{
    _s1();
    const { data, dispatch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(Context);
    const setAuth = (next)=>dispatch(SET(next));
    const clearAuth = ()=>dispatch(CLEAR());
    return {
        auth: data,
        me: data.me,
        setAuth,
        clearAuth
    };
};
_s1(useAuthState, "u1Wyv5LQ4WIhOvcjeGjdBzbywRs=");
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "SET");
__turbopack_context__.k.register(_c1, "CLEAR");
__turbopack_context__.k.register(_c2, "GET");
__turbopack_context__.k.register(_c3, "Reducer");
__turbopack_context__.k.register(_c4, "Provider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/VoxelEditor/audio/SoundManager.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SoundManager",
    ()=>SoundManager,
    "sound",
    ()=>sound
]);
"use client";
class SoundManager {
    ctx = null;
    master = null;
    defs = new Map();
    buffers = new Map();
    loading = new Map();
    activeCount = new Map();
    unlocked = false;
    lastVariantIndex = new Map();
    loops = new Map();
    configure(defs) {
        this.defs.clear();
        for (const [id, def] of Object.entries(defs))this.defs.set(id, def);
    }
    getTime() {
        return this.ctx?.currentTime ?? 0;
    }
    async unlock() {
        if (this.unlocked) return;
        if (!this.ctx) {
            const Ctx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new Ctx();
            this.master = this.ctx.createGain();
            this.master.gain.value = 1.0;
            this.master.connect(this.ctx.destination);
        }
        if (this.ctx.state === "suspended") {
            try {
                await this.ctx.resume();
            } catch  {}
        }
        try {
            const b = this.ctx.createBuffer(1, 1, this.ctx.sampleRate);
            const src = this.ctx.createBufferSource();
            src.buffer = b;
            const g = this.ctx.createGain();
            g.gain.value = 0;
            src.connect(g);
            g.connect(this.master);
            src.start();
        } catch  {}
        this.unlocked = true;
    }
    setMasterVolume(v) {
        if (!this.master) return;
        this.master.gain.value = Math.max(0, Math.min(1, v));
    }
    ensureCtx() {
        if (this.ctx && this.master) return true;
        const Ctx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new Ctx();
        this.master = this.ctx.createGain();
        this.master.gain.value = 1.0;
        this.master.connect(this.ctx.destination);
        return true;
    }
    async loadBuffer(bufferKey, url) {
        if (this.buffers.has(bufferKey)) return;
        const existing = this.loading.get(bufferKey);
        if (existing) return existing;
        const p = (async ()=>{
            this.ensureCtx();
            const res = await fetch(url);
            const arr = await res.arrayBuffer();
            const buf = await this.ctx.decodeAudioData(arr);
            this.buffers.set(bufferKey, buf);
        })().finally(()=>this.loading.delete(bufferKey));
        this.loading.set(bufferKey, p);
        return p;
    }
    async preload(id) {
        const def = this.defs.get(id);
        if (!def) return;
        if (def.kind === "variants") {
            await Promise.all(def.urls.map((url, idx)=>this.loadBuffer(`${id}#${idx}`, url)));
            return;
        }
        await this.loadBuffer(id, def.url);
    }
    pickVariantIndex(id, def) {
        const n = def.urls.length;
        if (n <= 1) return 0;
        const last = this.lastVariantIndex.get(id);
        let idx = Math.floor(Math.random() * n);
        if (def.noImmediateRepeat && last != null && n > 1) {
            if (idx === last) idx = (idx + 1 + Math.floor(Math.random() * (n - 1))) % n;
        }
        this.lastVariantIndex.set(id, idx);
        return idx;
    }
    play(id, opts = {}) {
        const def = this.defs.get(id);
        if (!def) return;
        this.ensureCtx();
        if (!this.ctx || !this.master) return;
        const maxC = opts.maxConcurrent ?? def.maxConcurrent ?? 8;
        const cur = this.activeCount.get(id) ?? 0;
        if (cur >= maxC) return;
        let bufferKey = id;
        let url = null;
        let defaultVol = def.defaultVolume ?? 1;
        if (def.kind === "variants") {
            const idx = this.pickVariantIndex(id, def);
            bufferKey = `${id}#${idx}`;
            url = def.urls[idx] ?? null;
        } else {
            url = def.url;
        }
        if (!this.buffers.has(bufferKey)) {
            if (url) void this.loadBuffer(bufferKey, url);
            return;
        }
        const src = this.ctx.createBufferSource();
        src.buffer = this.buffers.get(bufferKey);
        if (opts.rate != null) src.playbackRate.value = opts.rate;
        if (opts.detune != null) src.detune.value = opts.detune;
        const gain = this.ctx.createGain();
        const vol = defaultVol * (opts.volume ?? 1);
        gain.gain.value = Math.max(0, Math.min(1, vol));
        src.connect(gain);
        gain.connect(this.master);
        this.activeCount.set(id, cur + 1);
        src.onended = ()=>{
            const next = (this.activeCount.get(id) ?? 1) - 1;
            this.activeCount.set(id, Math.max(0, next));
            try {
                gain.disconnect();
            } catch  {}
            try {
                src.disconnect();
            } catch  {}
        };
        try {
            src.start();
        } catch  {}
    }
    startLoop(key, id, opts = {}) {
        const def = this.defs.get(id);
        if (!def) return;
        this.ensureCtx();
        if (!this.ctx || !this.master) return;
        if (this.loops.has(key)) return;
        let bufferKey = id;
        let url = null;
        const defaultVol = def.defaultVolume ?? 1;
        if (def.kind === "variants") {
            bufferKey = `${id}#0`;
            url = def.urls?.[0] ?? null;
        } else {
            url = def.url ?? null;
        }
        if (!this.buffers.has(bufferKey)) {
            if (url) void this.loadBuffer(bufferKey, url);
            return;
        }
        const src = this.ctx.createBufferSource();
        src.buffer = this.buffers.get(bufferKey);
        src.loop = true;
        if (opts.rate != null) src.playbackRate.value = opts.rate;
        if (opts.detune != null) src.detune.value = opts.detune;
        const gain = this.ctx.createGain();
        const vol = defaultVol * (opts.volume ?? 1);
        gain.gain.value = Math.max(0, Math.min(1, vol));
        src.connect(gain);
        gain.connect(this.master);
        this.loops.set(key, {
            src,
            gain,
            id
        });
        try {
            src.start();
        } catch  {}
    }
    stopLoop(key, fadeMs = 60) {
        const loop = this.loops.get(key);
        if (!loop || !this.ctx) return;
        this.loops.delete(key);
        const now = this.ctx.currentTime;
        const g = loop.gain.gain;
        try {
            g.cancelScheduledValues(now);
            g.setValueAtTime(g.value, now);
            g.linearRampToValueAtTime(0, now + fadeMs / 1000);
        } catch  {}
        const stopAt = now + fadeMs / 1000 + 0.01;
        try {
            loop.src.stop(stopAt);
        } catch  {}
        loop.src.onended = ()=>{
            try {
                loop.gain.disconnect();
            } catch  {}
            try {
                loop.src.disconnect();
            } catch  {}
        };
    }
    startLoopAt(key, id, opts = {}, startAtTime) {
        const def = this.defs.get(id);
        if (!def) return;
        this.ensureCtx();
        if (!this.ctx || !this.master) return;
        if (this.loops.has(key)) return;
        let bufferKey = id;
        let url = null;
        const defaultVol = def.defaultVolume ?? 1;
        if (def.kind === "variants") {
            bufferKey = `${id}#0`;
            url = def.urls?.[0] ?? null;
        } else {
            url = def.url ?? null;
        }
        if (!this.buffers.has(bufferKey)) {
            if (url) void this.loadBuffer(bufferKey, url);
            return;
        }
        const src = this.ctx.createBufferSource();
        src.buffer = this.buffers.get(bufferKey);
        src.loop = true;
        if (opts.rate != null) src.playbackRate.value = opts.rate;
        if (opts.detune != null) src.detune.value = opts.detune;
        const gain = this.ctx.createGain();
        const vol = defaultVol * (opts.volume ?? 1);
        gain.gain.value = Math.max(0, Math.min(1, vol));
        src.connect(gain);
        gain.connect(this.master);
        this.loops.set(key, {
            src,
            gain,
            id
        });
        try {
            src.start(startAtTime);
        } catch  {}
    }
    setLoopVolume(key, target, fadeMs = 120) {
        const loop = this.loops.get(key);
        if (!loop || !this.ctx) return;
        const now = this.ctx.currentTime;
        const g = loop.gain.gain;
        const t = Math.max(0, Math.min(1, target));
        const dur = Math.max(0, fadeMs) / 1000;
        try {
            g.cancelScheduledValues(now);
            g.setValueAtTime(g.value, now);
            if (dur <= 0) {
                g.setValueAtTime(t, now);
            } else {
                g.linearRampToValueAtTime(t, now + dur);
            }
        } catch  {}
    }
}
const sound = new SoundManager();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/VoxelEditor/audio/SoundProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SoundProvider",
    ()=>SoundProvider,
    "useSound",
    ()=>useSound,
    "useSoundLoading",
    ()=>useSoundLoading
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/audio/SoundManager.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
const Ctx = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const LoadCtx = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const SOUNDS = {
    click: {
        kind: "oneshot",
        url: "/audio/S_Clicks/EquipBodyMinusWoosh.wav",
        defaultVolume: 0.8,
        maxConcurrent: 6
    },
    placeVoxel: {
        kind: "variants",
        urls: [
            "/audio/S_PlaceVoxel/S_PlaceVoxel_Gen5_1.wav",
            "/audio/S_PlaceVoxel/S_PlaceVoxel_Gen5_2.wav",
            "/audio/S_PlaceVoxel/S_PlaceVoxel_Gen5_3.wav",
            "/audio/S_PlaceVoxel/S_PlaceVoxel_Gen5_4.wav"
        ],
        defaultVolume: 0.9,
        maxConcurrent: 10,
        noImmediateRepeat: true
    },
    deleteVoxel: {
        kind: "oneshot",
        url: "/audio/S_DeleteVoxel/S_DeleteVoxel.wav",
        defaultVolume: 0.75,
        maxConcurrent: 10
    },
    colorPick: {
        kind: "oneshot",
        url: "/audio/S_ColourPicker/S_ColourPicker_Gen2.wav",
        defaultVolume: 0.9,
        maxConcurrent: 12
    },
    extrudeStart: {
        kind: "oneshot",
        url: "/audio/S_ExtrudeVoxel/S_ExtrudeStart.wav",
        defaultVolume: 0.9,
        maxConcurrent: 6
    },
    extrudeLoop: {
        kind: "oneshot",
        url: "/audio/S_ExtrudeVoxel/S_GlitchLoop2.wav",
        defaultVolume: 0.55,
        maxConcurrent: 1
    },
    extrudeEnd: {
        kind: "oneshot",
        url: "/audio/S_ExtrudeVoxel/S_ExtrudeEnd5_2.wav",
        defaultVolume: 0.9,
        maxConcurrent: 6
    },
    placePart: {
        kind: "oneshot",
        url: "/audio/S_PlacePart/S_WristUI_Finish.wav",
        defaultVolume: 0.9,
        maxConcurrent: 6
    },
    deletePart: {
        kind: "oneshot",
        url: "/audio/S_DeletePart/S_WristUI_Finish_Gen2.wav",
        defaultVolume: 0.9,
        maxConcurrent: 6
    },
    whoosh: {
        kind: "oneshot",
        url: "/audio/S_Whoosh/S_FreeManipulation.wav",
        defaultVolume: 0.5,
        maxConcurrent: 3
    },
    ambientWorld: {
        kind: "oneshot",
        url: "/audio/S_Ambiance/S_AmbientWorld.wav",
        defaultVolume: 0.3,
        maxConcurrent: 1
    },
    ambientFocus: {
        kind: "oneshot",
        url: "/audio/S_Ambiance/S_AmbientFocus.wav",
        defaultVolume: 0.3,
        maxConcurrent: 1
    },
    ambientGrass: {
        kind: "oneshot",
        url: "/audio/S_Ambiance/S_Grass.wav",
        defaultVolume: 1.0,
        maxConcurrent: 1
    },
    ambientWindIdle: {
        kind: "oneshot",
        url: "/audio/S_Ambiance/S_WindIdle.wav",
        defaultVolume: 1.0,
        maxConcurrent: 1
    },
    introNewWorld: {
        kind: "oneshot",
        url: "/audio/S_Intro/S_NewWorldUnlocked3.wav",
        defaultVolume: 0.2,
        maxConcurrent: 1
    }
};
const PRELOAD_IDS = [
    "introNewWorld",
    "ambientWorld",
    "ambientFocus",
    "ambientGrass",
    "ambientWindIdle",
    "click",
    "whoosh",
    "placeVoxel",
    "deleteVoxel",
    "placePart",
    "deletePart",
    "colorPick",
    "extrudeStart",
    "extrudeLoop",
    "extrudeEnd"
];
function SoundProvider(props) {
    _s();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        ready: false,
        progress: 0,
        text: "loading audio…"
    });
    const preloadOnceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const api = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SoundProvider.useMemo[api]": ()=>{
            return {
                play: ({
                    "SoundProvider.useMemo[api]": (id, opts)=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].play(id, opts)
                })["SoundProvider.useMemo[api]"],
                unlock: ({
                    "SoundProvider.useMemo[api]": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].unlock()
                })["SoundProvider.useMemo[api]"],
                startLoop: ({
                    "SoundProvider.useMemo[api]": (key, id, opts)=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].startLoop(key, id, opts)
                })["SoundProvider.useMemo[api]"],
                stopLoop: ({
                    "SoundProvider.useMemo[api]": (key, fadeMs)=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].stopLoop(key, fadeMs)
                })["SoundProvider.useMemo[api]"],
                startLoopAt: ({
                    "SoundProvider.useMemo[api]": (key, id, opts, startAtTime)=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].startLoopAt(key, id, opts ?? {}, startAtTime)
                })["SoundProvider.useMemo[api]"],
                setLoopVolume: ({
                    "SoundProvider.useMemo[api]": (key, target, fadeMs)=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].setLoopVolume(key, target, fadeMs)
                })["SoundProvider.useMemo[api]"],
                getTime: ({
                    "SoundProvider.useMemo[api]": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].getTime()
                })["SoundProvider.useMemo[api]"],
                click: ({
                    "SoundProvider.useMemo[api]": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].play("click", {
                            detune: (Math.random() - 0.5) * 60
                        })
                })["SoundProvider.useMemo[api]"]
            };
        }
    }["SoundProvider.useMemo[api]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SoundProvider.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].configure(SOUNDS);
            if (preloadOnceRef.current) return;
            preloadOnceRef.current = true;
            let cancelled = false;
            ({
                "SoundProvider.useEffect": async ()=>{
                    const total = PRELOAD_IDS.length;
                    let done = 0;
                    setLoading({
                        ready: false,
                        progress: 0,
                        text: `loading audio… (0/${total})`
                    });
                    for (const id of PRELOAD_IDS){
                        if (cancelled) return;
                        setLoading({
                            "SoundProvider.useEffect": (s)=>({
                                    ...s,
                                    ready: false,
                                    text: `loading audio: ${id} (${done}/${total})`
                                })
                        }["SoundProvider.useEffect"]);
                        try {
                            await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].preload(id);
                        } catch (e) {
                            console.warn("[audio] preload failed:", id, e);
                        }
                        done++;
                        const p = total ? done / total : 1;
                        setLoading({
                            "SoundProvider.useEffect": (s)=>({
                                    ...s,
                                    ready: p >= 1,
                                    progress: p,
                                    text: p >= 1 ? "audio ready" : `loading audio… (${done}/${total})`
                                })
                        }["SoundProvider.useEffect"]);
                    }
                    setLoading({
                        ready: true,
                        progress: 1,
                        text: "audio ready"
                    });
                }
            })["SoundProvider.useEffect"]();
            return ({
                "SoundProvider.useEffect": ()=>{
                    cancelled = true;
                }
            })["SoundProvider.useEffect"];
        }
    }["SoundProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SoundProvider.useEffect": ()=>{
            const onFirst = {
                "SoundProvider.useEffect.onFirst": ()=>void __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sound"].unlock()
            }["SoundProvider.useEffect.onFirst"];
            window.addEventListener("pointerdown", onFirst, {
                once: true,
                capture: true
            });
            window.addEventListener("keydown", onFirst, {
                once: true,
                capture: true
            });
            return ({
                "SoundProvider.useEffect": ()=>{
                    window.removeEventListener("pointerdown", onFirst, {
                        capture: true
                    });
                    window.removeEventListener("keydown", onFirst, {
                        capture: true
                    });
                }
            })["SoundProvider.useEffect"];
        }
    }["SoundProvider.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Ctx.Provider, {
        value: api,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LoadCtx.Provider, {
            value: loading,
            children: props.children
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/VoxelEditor/audio/SoundProvider.tsx",
            lineNumber: 225,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/VoxelEditor/audio/SoundProvider.tsx",
        lineNumber: 224,
        columnNumber: 5
    }, this);
}
_s(SoundProvider, "Pb691yHx6vvePDHzuOK7/3Egh+M=");
_c = SoundProvider;
function useSound() {
    _s1();
    const v = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(Ctx);
    if (!v) throw new Error("useSound must be used within <SoundProvider>");
    return v;
}
_s1(useSound, "vseRKStixtRCAgA7lJDFgCF8qLI=");
function useSoundLoading() {
    _s2();
    const v = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LoadCtx);
    if (!v) throw new Error("useSoundLoading must be used within <SoundProvider>");
    return v;
}
_s2(useSoundLoading, "vseRKStixtRCAgA7lJDFgCF8qLI=");
var _c;
__turbopack_context__.k.register(_c, "SoundProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=_1d6957bf._.js.map