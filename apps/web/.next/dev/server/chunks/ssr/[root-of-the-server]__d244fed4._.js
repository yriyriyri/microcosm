module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/apps/web/src/components/Auth/state.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
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
const CLEAR = ()=>({
        type: "clear_authentication"
    });
const GET = ()=>{
    if ("TURBOPACK compile-time truthy", 1) return EMPTY_AUTH;
    //TURBOPACK unreachable
    ;
};
const Reducer = (data = EMPTY_AUTH, action)=>{
    switch(action.type){
        case "set_authentication":
            {
                const next = action.data ?? EMPTY_AUTH;
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
                return next;
            }
        case "clear_authentication":
            {
                const next = {
                    ...EMPTY_AUTH,
                    bootstrapped: true
                };
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
                return next;
            }
        default:
            return data;
    }
};
const Context = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createContext({
    data: EMPTY_AUTH,
    dispatch: ()=>{}
});
const Provider = ({ children })=>{
    const [data, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducer"])(Reducer, EMPTY_AUTH, GET);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            data,
            dispatch
        }), [
        data
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Context.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/Auth/state.tsx",
        lineNumber: 100,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
const clearAuthentication = ()=>{
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    const cleared = undefined;
};
const getStoredAuthentication = ()=>{
    return GET();
};
const useAuthState = ()=>{
    const { data, dispatch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(Context);
    const setAuth = (next)=>dispatch(SET(next));
    const clearAuth = ()=>dispatch(CLEAR());
    return {
        auth: data,
        me: data.me,
        setAuth,
        clearAuth
    };
};
}),
"[project]/apps/web/src/components/VoxelEditor/audio/SoundManager.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/apps/web/src/components/VoxelEditor/audio/SoundProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SoundProvider",
    ()=>SoundProvider,
    "useSound",
    ()=>useSound,
    "useSoundLoading",
    ()=>useSoundLoading
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/audio/SoundManager.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const Ctx = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
const LoadCtx = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
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
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        ready: false,
        progress: 0,
        text: "loading audio…"
    });
    const preloadOnceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const api = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return {
            play: (id, opts)=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sound"].play(id, opts),
            unlock: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sound"].unlock(),
            startLoop: (key, id, opts)=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sound"].startLoop(key, id, opts),
            stopLoop: (key, fadeMs)=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sound"].stopLoop(key, fadeMs),
            startLoopAt: (key, id, opts, startAtTime)=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sound"].startLoopAt(key, id, opts ?? {}, startAtTime),
            setLoopVolume: (key, target, fadeMs)=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sound"].setLoopVolume(key, target, fadeMs),
            getTime: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sound"].getTime(),
            click: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sound"].play("click", {
                    detune: (Math.random() - 0.5) * 60
                })
        };
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sound"].configure(SOUNDS);
        if (preloadOnceRef.current) return;
        preloadOnceRef.current = true;
        let cancelled = false;
        (async ()=>{
            const total = PRELOAD_IDS.length;
            let done = 0;
            setLoading({
                ready: false,
                progress: 0,
                text: `loading audio… (0/${total})`
            });
            for (const id of PRELOAD_IDS){
                if (cancelled) return;
                setLoading((s)=>({
                        ...s,
                        ready: false,
                        text: `loading audio: ${id} (${done}/${total})`
                    }));
                try {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sound"].preload(id);
                } catch (e) {
                    console.warn("[audio] preload failed:", id, e);
                }
                done++;
                const p = total ? done / total : 1;
                setLoading((s)=>({
                        ...s,
                        ready: p >= 1,
                        progress: p,
                        text: p >= 1 ? "audio ready" : `loading audio… (${done}/${total})`
                    }));
            }
            setLoading({
                ready: true,
                progress: 1,
                text: "audio ready"
            });
        })();
        return ()=>{
            cancelled = true;
        };
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const onFirst = ()=>void __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundManager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sound"].unlock();
        window.addEventListener("pointerdown", onFirst, {
            once: true,
            capture: true
        });
        window.addEventListener("keydown", onFirst, {
            once: true,
            capture: true
        });
        return ()=>{
            window.removeEventListener("pointerdown", onFirst, {
                capture: true
            });
            window.removeEventListener("keydown", onFirst, {
                capture: true
            });
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Ctx.Provider, {
        value: api,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LoadCtx.Provider, {
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
function useSound() {
    const v = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(Ctx);
    if (!v) throw new Error("useSound must be used within <SoundProvider>");
    return v;
}
function useSoundLoading() {
    const v = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LoadCtx);
    if (!v) throw new Error("useSoundLoading must be used within <SoundProvider>");
    return v;
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d244fed4._.js.map