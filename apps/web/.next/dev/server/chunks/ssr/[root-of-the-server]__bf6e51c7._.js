module.exports = [
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
"[project]/apps/web/src/services/auth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Login",
    ()=>Login,
    "Me",
    ()=>Me,
    "Register",
    ()=>Register
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$authClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/authClient.ts [app-ssr] (ecmascript)");
;
async function Login(username, password) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$authClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authClient"].post("/auth/login", {
        username,
        password
    });
}
async function Register(username, email, password) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$authClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authClient"].post("/auth/register", {
        username,
        email,
        password
    });
}
async function Me(accessToken) {
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$authClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authClient"].get("/auth/me", {
        headers: accessToken ? {
            Authorization: `Bearer ${accessToken}`
        } : undefined
    });
    if (result.status === 200) return result.data;
    throw new Error(`get me error: ${JSON.stringify(result.data)}`);
}
}),
"[project]/apps/web/src/components/Auth/LoginScreen.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LoginScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Auth$2f$state$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/Auth/state.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function LoginScreen() {
    const { auth, setAuth } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Auth$2f$state$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthState"])();
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("login");
    const [username, setUsername] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [confirmPassword, setConfirmPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [errorMessage, setErrorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const inputUsernameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inputEmailRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inputPasswordRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inputConfirmPasswordRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isSignup = mode === "signup";
    const finalizeAuthenticatedSession = async (accessToken)=>{
        const provisionalAuth = {
            ...auth,
            isAuthenticated: true,
            accessToken,
            me: null,
            bootstrapped: true
        };
        setAuth(provisionalAuth);
        try {
            const me = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Me"])(accessToken);
            setAuth({
                ...provisionalAuth,
                me
            });
        } catch  {
            setAuth(provisionalAuth);
        }
    };
    const handleUsernameKeyDown = (e)=>{
        if (e.key !== "Enter") return;
        e.preventDefault();
        if (isSignup) inputEmailRef.current?.focus();
        else inputPasswordRef.current?.focus();
    };
    const handleEmailKeyDown = (e)=>{
        if (e.key !== "Enter") return;
        e.preventDefault();
        inputPasswordRef.current?.focus();
    };
    const handlePasswordKeyDown = (e)=>{
        if (e.key !== "Enter") return;
        e.preventDefault();
        if (isSignup) inputConfirmPasswordRef.current?.focus();
        else handleSubmit(e);
    };
    const handleConfirmPasswordKeyDown = (e)=>{
        if (e.key !== "Enter") return;
        e.preventDefault();
        handleSubmit(e);
    };
    const switchMode = (nextMode)=>{
        if (isSubmitting) return;
        setMode(nextMode);
        setErrorMessage(null);
        setPassword("");
        setConfirmPassword("");
        if (nextMode === "login") setEmail("");
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        setErrorMessage(null);
        const trimmedUsername = username.trim();
        const trimmedEmail = email.trim();
        try {
            if (isSignup) {
                if (!trimmedUsername) {
                    setErrorMessage("you missed a spot");
                    inputUsernameRef.current?.focus();
                    return;
                }
                if (!trimmedEmail) {
                    setErrorMessage("you missed a spot");
                    inputEmailRef.current?.focus();
                    return;
                }
                if (!isValidEmail(trimmedEmail)) {
                    setErrorMessage("nice try :D");
                    inputEmailRef.current?.focus();
                    return;
                }
                if (!password) {
                    setErrorMessage("you missed a spot");
                    inputPasswordRef.current?.focus();
                    return;
                }
                if (password !== confirmPassword) {
                    setErrorMessage("i think you made a typo");
                    inputConfirmPasswordRef.current?.focus();
                    return;
                }
                try {
                    const registerResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Register"])(trimmedUsername, trimmedEmail, password);
                    if (registerResponse.status !== 200 && registerResponse.status !== 201) {
                        setErrorMessage("create user failed");
                        return;
                    }
                } catch (err) {
                    const message = err?.response?.data?.message;
                    if (message?.startsWith("user ") && message?.endsWith(" exist")) {
                        setErrorMessage("username already taken");
                        inputUsernameRef.current?.focus();
                        return;
                    }
                    if (message?.startsWith("email ") && message?.endsWith(" exist")) {
                        setErrorMessage("email already in use");
                        inputEmailRef.current?.focus();
                        return;
                    }
                    if (message === "send email error") {
                    // user still created, continue to login
                    } else {
                        setErrorMessage("create user failed");
                        return;
                    }
                }
                const loginResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Login"])(trimmedUsername, password);
                if (loginResponse.status === 200) {
                    const accessToken = loginResponse.data?.access_token ?? "";
                    await finalizeAuthenticatedSession(accessToken);
                } else {
                    setErrorMessage("created user but login failed");
                }
                return;
            }
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Login"])(trimmedUsername, password);
            if (response.status === 200) {
                const accessToken = response.data?.access_token ?? "";
                await finalizeAuthenticatedSession(accessToken);
            } else {
                setErrorMessage("login failed");
            }
        } catch (err) {
            if (err?.response?.status === 401) {
                setErrorMessage(isSignup ? "created user but login failed" : "invalid username or password");
            } else {
                setErrorMessage("unknown error");
            }
        } finally{
            setIsSubmitting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
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
            padding: 24
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
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
      `
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Auth/LoginScreen.tsx",
                lineNumber: 220,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: "100%",
                    maxWidth: 480,
                    display: "flex",
                    justifyContent: "center",
                    color: "#DBFAFF"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        ["--form-width"]: "280px",
                        ["--track"]: "0.06em"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            "aria-label": "VOXL logo",
                            style: {
                                display: "block",
                                width: 400,
                                maxWidth: "85vw",
                                height: "auto",
                                margin: "0 auto 50px",
                                animation: "loginLogoBob 2.1s linear infinite"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                viewBox: "0 0 117 30",
                                style: {
                                    display: "block",
                                    width: "100%",
                                    height: "auto",
                                    fill: "#DBFAFF",
                                    shapeRendering: "crispEdges"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                    shapeRendering: "crispEdges",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                            points: "84 5 85 5 85 8 84 8 84 10 83 10 83 11 82 11 82 12 81 12 81 13 80 13 80 14 79 14 79 16 80 16 80 17 81 17 81 18 82 18 82 19 83 19 83 20 84 20 84 22 85 22 85 25 84 25 84 26 83 26 83 27 79 27 79 26 77 26 77 25 75 25 75 24 74 24 74 23 72 23 72 22 71 22 71 23 69 23 69 24 68 24 68 25 66 25 66 26 64 26 64 27 60 27 60 26 59 26 59 25 58 25 58 22 59 22 59 20 60 20 60 19 61 19 61 18 62 18 62 17 63 17 63 16 64 16 64 14 63 14 63 13 62 13 62 12 61 12 61 11 60 11 60 10 59 10 59 8 58 8 58 5 59 5 59 4 60 4 60 3 64 3 64 4 66 4 66 5 68 5 68 6 69 6 69 7 71 7 71 8 72 8 72 7 74 7 74 6 75 6 75 5 77 5 77 4 79 4 79 3 83 3 83 4 84 4 84 5"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/Auth/LoginScreen.tsx",
                                            lineNumber: 277,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                            points: "115 19 115 24 114 24 114 25 113 25 113 26 111 26 111 27 90 27 90 26 89 26 89 25 88 25 88 5 89 5 89 4 90 4 90 3 97 3 97 4 98 4 98 5 99 5 99 16 111 16 111 17 113 17 113 18 114 18 114 19 115 19"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/Auth/LoginScreen.tsx",
                                            lineNumber: 278,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                            points: "26 5 27 5 27 9 26 9 26 11 25 11 25 13 24 13 24 15 23 15 23 17 22 17 22 19 21 19 21 21 20 21 20 23 19 23 19 25 18 25 18 26 17 26 17 27 12 27 12 26 11 26 11 25 10 25 10 23 9 23 9 21 8 21 8 19 7 19 7 17 6 17 6 15 5 15 5 13 4 13 4 11 3 11 3 9 2 9 2 5 3 5 3 4 4 4 4 3 9 3 9 4 10 4 10 5 11 5 11 6 13 6 13 7 16 7 16 6 18 6 18 5 19 5 19 4 20 4 20 3 25 3 25 4 26 4 26 5"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/Auth/LoginScreen.tsx",
                                            lineNumber: 279,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                            points: "55 5 56 5 56 25 55 25 55 26 54 26 54 27 31 27 31 26 30 26 30 25 29 25 29 5 30 5 30 4 31 4 31 3 54 3 54 4 55 4 55 5"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/Auth/LoginScreen.tsx",
                                            lineNumber: 280,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/Auth/LoginScreen.tsx",
                                    lineNumber: 276,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/Auth/LoginScreen.tsx",
                                lineNumber: 265,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/Auth/LoginScreen.tsx",
                            lineNumber: 254,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSubmit,
                            autoComplete: "on",
                            style: {
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 10,
                                width: "100%",
                                color: "#DBFAFF",
                                fontFamily: "var(--font-eagle), monospace"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 8,
                                        width: "var(--form-width)",
                                        margin: "6px auto 0"
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        ref: inputUsernameRef,
                                        type: "text",
                                        name: "username",
                                        autoComplete: "username",
                                        placeholder: "username",
                                        className: "voxl-login-input pix-input",
                                        value: username,
                                        maxLength: 24,
                                        disabled: isSubmitting,
                                        onChange: (e)=>setUsername(e.target.value),
                                        onKeyDown: handleUsernameKeyDown,
                                        style: {
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
                                            letterSpacing: "0.06em"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/Auth/LoginScreen.tsx",
                                        lineNumber: 308,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/Auth/LoginScreen.tsx",
                                    lineNumber: 298,
                                    columnNumber: 13
                                }, this),
                                isSignup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 8,
                                        width: "var(--form-width)",
                                        margin: "6px auto 0"
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        ref: inputEmailRef,
                                        type: "email",
                                        name: "email",
                                        autoComplete: "email",
                                        placeholder: "email",
                                        className: "voxl-login-input pix-input",
                                        value: email,
                                        disabled: isSubmitting,
                                        onChange: (e)=>setEmail(e.target.value),
                                        onKeyDown: handleEmailKeyDown,
                                        style: {
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
                                            letterSpacing: "0.06em"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/Auth/LoginScreen.tsx",
                                        lineNumber: 350,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/Auth/LoginScreen.tsx",
                                    lineNumber: 340,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 8,
                                        width: "var(--form-width)",
                                        margin: "6px auto 0"
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        ref: inputPasswordRef,
                                        type: "password",
                                        name: "password",
                                        autoComplete: isSignup ? "new-password" : "current-password",
                                        placeholder: "password",
                                        className: "voxl-login-input pix-input",
                                        value: password,
                                        disabled: isSubmitting,
                                        onChange: (e)=>setPassword(e.target.value),
                                        onKeyDown: handlePasswordKeyDown,
                                        style: {
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
                                            letterSpacing: "0.06em"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/Auth/LoginScreen.tsx",
                                        lineNumber: 391,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/Auth/LoginScreen.tsx",
                                    lineNumber: 381,
                                    columnNumber: 13
                                }, this),
                                isSignup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 8,
                                        width: "var(--form-width)",
                                        margin: "6px auto 0"
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        ref: inputConfirmPasswordRef,
                                        type: "password",
                                        name: "confirm-password",
                                        autoComplete: "new-password",
                                        placeholder: "confirm",
                                        className: "voxl-login-input pix-input",
                                        value: confirmPassword,
                                        disabled: isSubmitting,
                                        onChange: (e)=>setConfirmPassword(e.target.value),
                                        onKeyDown: handleConfirmPasswordKeyDown,
                                        style: {
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
                                            letterSpacing: "0.06em"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/Auth/LoginScreen.tsx",
                                        lineNumber: 432,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/Auth/LoginScreen.tsx",
                                    lineNumber: 422,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        minHeight: 20,
                                        color: "#DBFAFF",
                                        fontSize: "0.8em",
                                        width: "var(--form-width)",
                                        marginTop: 6,
                                        textAlign: "center"
                                    },
                                    children: errorMessage
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/Auth/LoginScreen.tsx",
                                    lineNumber: 463,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: "var(--form-width)",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 10,
                                        marginTop: 10,
                                        alignItems: "center"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "pix-icon",
                                            disabled: isSubmitting,
                                            style: {
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
                                                cursor: isSubmitting ? "default" : "pointer"
                                            },
                                            children: isSubmitting ? isSignup ? "creating..." : "logging in..." : "Lets Go !"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/Auth/LoginScreen.tsx",
                                            lineNumber: 486,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "pix-icon",
                                            onClick: ()=>switchMode(isSignup ? "login" : "signup"),
                                            disabled: isSubmitting,
                                            style: {
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
                                                cursor: isSubmitting ? "default" : "pointer"
                                            },
                                            children: isSignup ? "sign in" : "sign up"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/Auth/LoginScreen.tsx",
                                            lineNumber: 511,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/Auth/LoginScreen.tsx",
                                    lineNumber: 476,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/Auth/LoginScreen.tsx",
                            lineNumber: 285,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/Auth/LoginScreen.tsx",
                    lineNumber: 243,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Auth/LoginScreen.tsx",
                lineNumber: 234,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/Auth/LoginScreen.tsx",
        lineNumber: 205,
        columnNumber: 5
    }, this);
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
"[project]/apps/web/src/components/VoxelEditor/database/AssetDb.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "acquireMarketplaceAssetToLibrary",
    ()=>acquireMarketplaceAssetToLibrary,
    "createPrivateAsset",
    ()=>createPrivateAsset,
    "deleteAllAssets",
    ()=>deleteAllAssets,
    "deleteAsset",
    ()=>deleteAsset,
    "deleteAssetDatabase",
    ()=>deleteAssetDatabase,
    "exportAssetToFiles",
    ()=>exportAssetToFiles,
    "findAssetIdByName",
    ()=>findAssetIdByName,
    "forkAssetToPrivateDraft",
    ()=>forkAssetToPrivateDraft,
    "getAssetMeta",
    ()=>getAssetMeta,
    "getKv",
    ()=>getKv,
    "isAssetInLibrary",
    ()=>isAssetInLibrary,
    "listAssets",
    ()=>listAssets,
    "listLibraryAssets",
    ()=>listLibraryAssets,
    "listMarketplaceAssets",
    ()=>listMarketplaceAssets,
    "listPrivateAssets",
    ()=>listPrivateAssets,
    "listPublishedMarketplaceAssets",
    ()=>listPublishedMarketplaceAssets,
    "loadAsset",
    ()=>loadAsset,
    "loadAssetRecord",
    ()=>loadAssetRecord,
    "overwritePrivateAssetContent",
    ()=>overwritePrivateAssetContent,
    "publishAssetToMarketplace",
    ()=>publishAssetToMarketplace,
    "remixAssetFromSource",
    ()=>remixAssetFromSource,
    "renameAsset",
    ()=>renameAsset,
    "saveAsset",
    ()=>saveAsset,
    "saveAssetRecord",
    ()=>saveAssetRecord,
    "saveNonStructuralAssetProgress",
    ()=>saveNonStructuralAssetProgress,
    "setAssetLibraryMembership",
    ()=>setAssetLibraryMembership,
    "setKv",
    ()=>setKv,
    "updateAssetThumbnail",
    ()=>updateAssetThumbnail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$domain$2f$buildAssetCompiledRender$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/domain/buildAssetCompiledRender.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$voxel$2d$core$2f$src$2f$buildAssetCompiledRender$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/voxel-core/src/buildAssetCompiledRender.ts [app-ssr] (ecmascript)");
;
const DB_NAME = "voxel_editor_assets_db";
const DB_VERSION = 4;
const STORE_META = "asset_meta";
const STORE_DATA = "asset_data";
const STORE_KV = "kv";
function makeId() {
    const c = globalThis.crypto;
    if (c?.randomUUID) return c.randomUUID();
    return `id_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}
function openDb() {
    return new Promise((resolve, reject)=>{
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = ()=>{
            const db = req.result;
            if (!db.objectStoreNames.contains(STORE_META)) {
                db.createObjectStore(STORE_META, {
                    keyPath: "id"
                });
            }
            if (!db.objectStoreNames.contains(STORE_DATA)) {
                db.createObjectStore(STORE_DATA, {
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
        req.onerror = ()=>reject(req.error ?? new Error("Failed to open IndexedDB (assets)"));
    });
}
function normalizeName(name) {
    return name.trim().toLowerCase();
}
function txDone(tx) {
    return new Promise((resolve, reject)=>{
        tx.oncomplete = ()=>resolve();
        tx.onerror = ()=>reject(tx.error ?? new Error("IndexedDB transaction failed"));
        tx.onabort = ()=>reject(tx.error ?? new Error("IndexedDB transaction aborted"));
    });
}
function normalizeVisibility(visibility) {
    if (visibility === "system") return "marketplace";
    return visibility ?? "private";
}
function normalizeAssetMeta(meta) {
    const visibility = normalizeVisibility(meta.visibility);
    const isImmutable = meta.isImmutable ?? visibility === "marketplace";
    const inLibrary = meta.inLibrary ?? visibility === "private";
    return {
        ...meta,
        visibility,
        inLibrary,
        isPreset: meta.isPreset ?? false,
        thumbStorageKey: meta.thumbStorageKey ?? null,
        sourceAssetId: meta.sourceAssetId ?? null,
        linkedMarketplaceAssetId: meta.linkedMarketplaceAssetId ?? null,
        lineageAssetIds: Array.isArray(meta.lineageAssetIds) ? meta.lineageAssetIds : [],
        publishedFromAssetId: meta.publishedFromAssetId ?? null,
        isImmutable
    };
}
async function deleteAssetDatabase() {
    await new Promise((resolve, reject)=>{
        const openReq = indexedDB.open(DB_NAME);
        openReq.onsuccess = ()=>{
            const db = openReq.result;
            db.close();
            const deleteReq = indexedDB.deleteDatabase(DB_NAME);
            deleteReq.onsuccess = ()=>resolve();
            deleteReq.onerror = ()=>reject(deleteReq.error ?? new Error("Failed to delete asset database"));
            deleteReq.onblocked = ()=>reject(new Error("Asset database deletion blocked by an open connection"));
        };
        openReq.onerror = ()=>reject(openReq.error ?? new Error("Failed to open asset database for deletion"));
        openReq.onupgradeneeded = ()=>{
            try {
                openReq.transaction?.abort();
            } catch  {}
        };
    });
}
async function getKv(key) {
    const db = await openDb();
    return new Promise((resolve, reject)=>{
        const tx = db.transaction([
            STORE_KV
        ], "readonly");
        const req = tx.objectStore(STORE_KV).get(key);
        req.onsuccess = ()=>resolve(req.result?.value ?? null);
        req.onerror = ()=>reject(req.error ?? new Error("Failed to read kv"));
    });
}
async function setKv(key, value) {
    const db = await openDb();
    const tx = db.transaction([
        STORE_KV
    ], "readwrite");
    tx.objectStore(STORE_KV).put({
        key,
        value
    });
    await txDone(tx);
}
async function listAssets() {
    const db = await openDb();
    return new Promise((resolve, reject)=>{
        const tx = db.transaction([
            STORE_META
        ], "readonly");
        const store = tx.objectStore(STORE_META);
        const req = store.getAll();
        req.onsuccess = ()=>{
            const rows = (req.result ?? []).map(normalizeAssetMeta);
            rows.sort((a, b)=>b.updatedAt - a.updatedAt);
            resolve(rows);
        };
        req.onerror = ()=>reject(req.error ?? new Error("Failed to list assets"));
    });
}
async function findAssetIdByName(name) {
    const target = normalizeName(name);
    if (!target) return null;
    const metas = await listAssets();
    const hit = metas.find((m)=>normalizeName(m.name) === target);
    return hit?.id ?? null;
}
async function getAssetMeta(id) {
    const db = await openDb();
    return new Promise((resolve, reject)=>{
        const tx = db.transaction([
            STORE_META
        ], "readonly");
        const req = tx.objectStore(STORE_META).get(id);
        req.onsuccess = ()=>{
            const row = req.result ?? null;
            resolve(row ? normalizeAssetMeta(row) : null);
        };
        req.onerror = ()=>reject(req.error ?? new Error("Failed to read asset meta"));
    });
}
async function saveAsset(params) {
    const now = Date.now();
    const voxelCount = params.group.voxels.length | 0;
    const existingIdByName = params.id || params.forceNewId ? null : await findAssetIdByName(params.name).catch(()=>null);
    const id = params.id ?? existingIdByName ?? makeId();
    const existingMeta = await getAssetMeta(id).catch(()=>null);
    const nextVisibility = normalizeVisibility(params.visibility) ?? existingMeta?.visibility ?? "private";
    const nextImmutable = params.isImmutable ?? existingMeta?.isImmutable ?? nextVisibility === "marketplace";
    const nextInLibrary = params.inLibrary ?? existingMeta?.inLibrary ?? nextVisibility === "private";
    const meta = normalizeAssetMeta({
        id,
        name: params.name,
        createdAt: existingMeta?.createdAt ?? now,
        updatedAt: now,
        voxelCount,
        thumb: params.thumb ?? existingMeta?.thumb ?? null,
        thumbStorageKey: params.thumbStorageKey !== undefined ? params.thumbStorageKey : existingMeta?.thumbStorageKey ?? null,
        visibility: nextVisibility,
        inLibrary: nextInLibrary,
        isPreset: params.isPreset ?? existingMeta?.isPreset ?? false,
        sourceAssetId: params.sourceAssetId ?? existingMeta?.sourceAssetId ?? null,
        linkedMarketplaceAssetId: params.linkedMarketplaceAssetId ?? existingMeta?.linkedMarketplaceAssetId ?? null,
        lineageAssetIds: params.lineageAssetIds ?? existingMeta?.lineageAssetIds ?? [],
        publishedFromAssetId: params.publishedFromAssetId ?? existingMeta?.publishedFromAssetId ?? null,
        isImmutable: nextImmutable
    });
    const data = {
        id,
        group: params.group,
        compiledRender: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$voxel$2d$core$2f$src$2f$buildAssetCompiledRender$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildAssetCompiledRender"])(params.group)
    };
    return await saveAssetRecord({
        meta,
        group: data.group,
        compiledRender: data.compiledRender
    });
}
async function saveAssetRecord(record) {
    const db = await openDb();
    const meta = normalizeAssetMeta(record.meta);
    const data = {
        id: meta.id,
        group: record.group,
        compiledRender: record.compiledRender ?? null
    };
    const tx = db.transaction([
        STORE_META,
        STORE_DATA
    ], "readwrite");
    tx.objectStore(STORE_META).put(meta);
    tx.objectStore(STORE_DATA).put(data);
    await txDone(tx);
    return meta.id;
}
async function loadAssetRecord(id) {
    const db = await openDb();
    const meta = await getAssetMeta(id);
    if (!meta) return null;
    const data = await new Promise((resolve, reject)=>{
        const tx = db.transaction([
            STORE_DATA
        ], "readonly");
        const req = tx.objectStore(STORE_DATA).get(id);
        req.onsuccess = ()=>resolve(req.result ?? null);
        req.onerror = ()=>reject(req.error ?? new Error("Failed to read asset data"));
    });
    if (!data) return null;
    return {
        meta: normalizeAssetMeta(meta),
        group: data.group,
        compiledRender: data.compiledRender ?? null
    };
}
async function loadAsset(id) {
    return await loadAssetRecord(id);
}
async function deleteAsset(id) {
    const db = await openDb();
    const tx = db.transaction([
        STORE_META,
        STORE_DATA
    ], "readwrite");
    tx.objectStore(STORE_META).delete(id);
    tx.objectStore(STORE_DATA).delete(id);
    await txDone(tx);
}
async function deleteAllAssets() {
    const db = await openDb();
    const tx = db.transaction([
        STORE_META,
        STORE_DATA,
        STORE_KV
    ], "readwrite");
    tx.objectStore(STORE_META).clear();
    tx.objectStore(STORE_DATA).clear();
    tx.objectStore(STORE_KV).clear();
    await txDone(tx);
}
async function renameAsset(id, name) {
    const db = await openDb();
    const meta = await getAssetMeta(id);
    if (!meta) return;
    meta.name = name;
    meta.updatedAt = Date.now();
    const tx = db.transaction([
        STORE_META
    ], "readwrite");
    tx.objectStore(STORE_META).put(meta);
    await txDone(tx);
}
async function updateAssetThumbnail(params) {
    const db = await openDb();
    const meta = await getAssetMeta(params.assetId);
    if (!meta) throw new Error("Asset not found");
    const next = normalizeAssetMeta({
        ...meta,
        thumb: params.thumb,
        updatedAt: Date.now()
    });
    const tx = db.transaction([
        STORE_META
    ], "readwrite");
    tx.objectStore(STORE_META).put(next);
    await txDone(tx);
}
async function overwritePrivateAssetContent(params) {
    const loaded = await loadAsset(params.assetId);
    if (!loaded) throw new Error("Asset not found");
    const meta = normalizeAssetMeta(loaded.meta);
    if (meta.visibility !== "private" || meta.isImmutable) {
        throw new Error("Only mutable private assets can be overwritten");
    }
    if (meta.linkedMarketplaceAssetId) {
        throw new Error("Marketplace-linked assets cannot be structurally overwritten");
    }
    return await saveAsset({
        id: meta.id,
        name: meta.name,
        group: params.group,
        thumb: params.thumb ?? meta.thumb ?? null,
        thumbStorageKey: meta.thumbStorageKey ?? null,
        visibility: meta.visibility,
        inLibrary: meta.inLibrary ?? true,
        isPreset: meta.isPreset ?? false,
        sourceAssetId: meta.sourceAssetId ?? null,
        linkedMarketplaceAssetId: meta.linkedMarketplaceAssetId ?? null,
        lineageAssetIds: meta.lineageAssetIds ?? [],
        publishedFromAssetId: meta.publishedFromAssetId ?? null,
        isImmutable: false,
        forceNewId: false
    });
}
async function saveNonStructuralAssetProgress(params) {
    const loaded = await loadAsset(params.assetId);
    if (!loaded) throw new Error("Asset not found");
    const meta = normalizeAssetMeta(loaded.meta);
    if (meta.visibility !== "private" || meta.isImmutable) {
        throw new Error("Only mutable private assets can save local progress");
    }
    return await saveAsset({
        id: meta.id,
        name: meta.name,
        group: params.group,
        thumb: params.thumb ?? meta.thumb ?? null,
        thumbStorageKey: meta.thumbStorageKey ?? null,
        visibility: meta.visibility,
        inLibrary: meta.inLibrary ?? true,
        isPreset: meta.isPreset ?? false,
        sourceAssetId: meta.sourceAssetId ?? null,
        linkedMarketplaceAssetId: meta.linkedMarketplaceAssetId ?? null,
        lineageAssetIds: meta.lineageAssetIds ?? [],
        publishedFromAssetId: meta.publishedFromAssetId ?? null,
        isImmutable: false,
        forceNewId: false
    });
}
async function remixAssetFromSource(params) {
    return await saveAsset({
        name: params.name,
        group: params.group,
        thumb: params.thumb ?? null,
        thumbStorageKey: null,
        visibility: "private",
        inLibrary: true,
        isPreset: false,
        isImmutable: false,
        sourceAssetId: params.sourceAssetId ?? null,
        linkedMarketplaceAssetId: null,
        lineageAssetIds: params.lineageAssetIds ?? [],
        publishedFromAssetId: null,
        forceNewId: true
    });
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
    setTimeout(()=>URL.revokeObjectURL(url), 1000);
}
async function listLibraryAssets() {
    const all = await listAssets();
    return all.filter((a)=>{
        const meta = normalizeAssetMeta(a);
        return !!meta.inLibrary;
    });
}
async function listMarketplaceAssets() {
    const all = await listAssets();
    return all.filter((a)=>{
        const meta = normalizeAssetMeta(a);
        return meta.visibility === "marketplace";
    });
}
async function listPrivateAssets() {
    const all = await listAssets();
    return all.filter((a)=>{
        const meta = normalizeAssetMeta(a);
        return meta.visibility === "private";
    });
}
async function listPublishedMarketplaceAssets() {
    const all = await listAssets();
    return all.filter((a)=>{
        const meta = normalizeAssetMeta(a);
        return meta.visibility === "marketplace" && !meta.isPreset;
    });
}
async function setAssetLibraryMembership(id, inLibrary) {
    const db = await openDb();
    const meta = await getAssetMeta(id);
    if (!meta) return;
    const next = normalizeAssetMeta({
        ...meta,
        inLibrary,
        updatedAt: Date.now()
    });
    const tx = db.transaction([
        STORE_META
    ], "readwrite");
    tx.objectStore(STORE_META).put(next);
    await txDone(tx);
}
async function isAssetInLibrary(id) {
    const meta = await getAssetMeta(id);
    return !!meta?.inLibrary;
}
async function createPrivateAsset(params) {
    return await saveAsset({
        name: params.name,
        group: params.group,
        thumb: params.thumb ?? null,
        thumbStorageKey: null,
        visibility: "private",
        inLibrary: true,
        isImmutable: false,
        sourceAssetId: params.sourceAssetId ?? null,
        linkedMarketplaceAssetId: params.linkedMarketplaceAssetId ?? null,
        lineageAssetIds: params.lineageAssetIds ?? [],
        forceNewId: true
    });
}
async function publishAssetToMarketplace(assetId) {
    const loaded = await loadAsset(assetId);
    if (!loaded) throw new Error("Asset not found");
    const sourceMeta = normalizeAssetMeta(loaded.meta);
    return await saveAsset({
        name: loaded.meta.name,
        group: loaded.group,
        thumb: loaded.meta.thumb ?? null,
        thumbStorageKey: null,
        visibility: "marketplace",
        inLibrary: false,
        isImmutable: true,
        isPreset: false,
        linkedMarketplaceAssetId: null,
        lineageAssetIds: sourceMeta.lineageAssetIds ?? [],
        publishedFromAssetId: sourceMeta.id,
        forceNewId: true
    });
}
async function forkAssetToPrivateDraft(assetId, opts) {
    const loaded = await loadAsset(assetId);
    if (!loaded) throw new Error("Asset not found");
    const sourceMeta = normalizeAssetMeta(loaded.meta);
    const lineageAssetIds = [
        ...sourceMeta.lineageAssetIds ?? [],
        sourceMeta.id
    ].filter((v, i, arr)=>!!v && arr.indexOf(v) === i);
    return await saveAsset({
        name: opts?.name ?? loaded.meta.name,
        group: loaded.group,
        thumb: loaded.meta.thumb ?? null,
        thumbStorageKey: null,
        visibility: "private",
        inLibrary: opts?.addToLibrary ?? true,
        isImmutable: false,
        sourceAssetId: sourceMeta.id,
        linkedMarketplaceAssetId: null,
        lineageAssetIds,
        forceNewId: true
    });
}
async function acquireMarketplaceAssetToLibrary(assetId, opts) {
    const loaded = await loadAsset(assetId);
    if (!loaded) throw new Error("Asset not found");
    const sourceMeta = normalizeAssetMeta(loaded.meta);
    if (sourceMeta.visibility !== "marketplace") {
        throw new Error("Only marketplace assets can be acquired");
    }
    const existing = (await listAssets()).find((a)=>a.visibility === "private" && a.linkedMarketplaceAssetId === sourceMeta.id);
    if (existing) {
        await setAssetLibraryMembership(existing.id, true);
        return existing.id;
    }
    return await saveAsset({
        name: opts?.name ?? loaded.meta.name,
        group: loaded.group,
        thumb: loaded.meta.thumb ?? null,
        thumbStorageKey: null,
        visibility: "private",
        inLibrary: true,
        isImmutable: false,
        sourceAssetId: sourceMeta.id,
        linkedMarketplaceAssetId: sourceMeta.id,
        lineageAssetIds: [
            ...sourceMeta.lineageAssetIds ?? [],
            sourceMeta.id
        ].filter((v, i, arr)=>!!v && arr.indexOf(v) === i),
        publishedFromAssetId: null,
        forceNewId: true
    });
}
async function exportAssetToFiles(id) {
    const loaded = await loadAsset(id);
    if (!loaded) throw new Error("Asset not found");
    const { meta, group } = loaded;
    const base = safeSlug(meta.name);
    const jsonText = JSON.stringify(group, null, 2);
    const jsonBlob = new Blob([
        jsonText
    ], {
        type: "application/json"
    });
    downloadBlob(jsonBlob, `${base}.json`);
    if (meta.thumb) {
        const pngBlob = meta.thumb.type === "image/png" ? meta.thumb : new Blob([
            meta.thumb
        ], {
            type: "image/png"
        });
        downloadBlob(pngBlob, `${base}.png`);
    }
}
}),
"[project]/apps/web/src/components/VoxelEditor/database/LibraryDb.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteAllIslands",
    ()=>deleteAllIslands,
    "deleteIsland",
    ()=>deleteIsland,
    "deleteWorldDatabase",
    ()=>deleteWorldDatabase,
    "findIslandIdByName",
    ()=>findIslandIdByName,
    "getIslandMeta",
    ()=>getIslandMeta,
    "listIslands",
    ()=>listIslands,
    "loadIsland",
    ()=>loadIsland,
    "renameIsland",
    ()=>renameIsland,
    "saveIsland",
    ()=>saveIsland
]);
const DB_NAME = "voxel_editor_db";
const DB_VERSION = 4;
const STORE_META = "island_meta";
const STORE_DATA = "island_data";
function makeId() {
    const c = globalThis.crypto;
    if (c?.randomUUID) return c.randomUUID();
    return `id_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}
function openDb() {
    return new Promise((resolve, reject)=>{
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = ()=>{
            const db = req.result;
            if (!db.objectStoreNames.contains(STORE_META)) {
                db.createObjectStore(STORE_META, {
                    keyPath: "id"
                });
            }
            if (!db.objectStoreNames.contains(STORE_DATA)) {
                db.createObjectStore(STORE_DATA, {
                    keyPath: "id"
                });
            }
        };
        req.onsuccess = ()=>resolve(req.result);
        req.onerror = ()=>reject(req.error ?? new Error("Failed to open IndexedDB"));
    });
}
function normalizeName(name) {
    return name.trim().toLowerCase();
}
function txDone(tx) {
    return new Promise((resolve, reject)=>{
        tx.oncomplete = ()=>resolve();
        tx.onerror = ()=>reject(tx.error ?? new Error("IndexedDB transaction failed"));
        tx.onabort = ()=>reject(tx.error ?? new Error("IndexedDB transaction aborted"));
    });
}
async function deleteWorldDatabase() {
    await new Promise((resolve, reject)=>{
        const openReq = indexedDB.open(DB_NAME);
        openReq.onsuccess = ()=>{
            const db = openReq.result;
            db.close();
            const deleteReq = indexedDB.deleteDatabase(DB_NAME);
            deleteReq.onsuccess = ()=>resolve();
            deleteReq.onerror = ()=>reject(deleteReq.error ?? new Error("Failed to delete world database"));
            deleteReq.onblocked = ()=>reject(new Error("World database deletion blocked by an open connection"));
        };
        openReq.onerror = ()=>reject(openReq.error ?? new Error("Failed to open world database for deletion"));
        openReq.onupgradeneeded = ()=>{
            try {
                openReq.transaction?.abort();
            } catch  {}
        };
    });
}
async function deleteAllIslands() {
    const db = await openDb();
    const tx = db.transaction([
        STORE_META,
        STORE_DATA
    ], "readwrite");
    tx.objectStore(STORE_META).clear();
    tx.objectStore(STORE_DATA).clear();
    await txDone(tx);
}
async function findIslandIdByName(name) {
    const target = normalizeName(name);
    if (!target) return null;
    const metas = await listIslands();
    const hit = metas.find((m)=>normalizeName(m.name) === target);
    return hit?.id ?? null;
}
async function listIslands() {
    const db = await openDb();
    return new Promise((resolve, reject)=>{
        const tx = db.transaction([
            STORE_META
        ], "readonly");
        const store = tx.objectStore(STORE_META);
        const req = store.getAll();
        req.onsuccess = ()=>{
            const rows = req.result ?? [];
            rows.sort((a, b)=>b.updatedAt - a.updatedAt);
            resolve(rows);
        };
        req.onerror = ()=>reject(req.error ?? new Error("Failed to list islands"));
    });
}
async function saveIsland(params) {
    const db = await openDb();
    const now = Date.now();
    const existingIdByName = params.id ? null : await findIslandIdByName(params.name).catch(()=>null);
    const id = params.id ?? existingIdByName ?? makeId();
    const existingMeta = await getIslandMeta(id).catch(()=>null);
    const meta = {
        id,
        name: params.name,
        createdAt: existingMeta?.createdAt ?? now,
        updatedAt: now,
        instanceCount: params.data.instances.length,
        thumb: params.thumb ?? existingMeta?.thumb ?? null,
        thumbStorageKey: params.thumbStorageKey !== undefined ? params.thumbStorageKey : existingMeta?.thumbStorageKey ?? null
    };
    const data = {
        id,
        data: params.data
    };
    const tx = db.transaction([
        STORE_META,
        STORE_DATA
    ], "readwrite");
    tx.objectStore(STORE_META).put(meta);
    tx.objectStore(STORE_DATA).put(data);
    await txDone(tx);
    return id;
}
async function getIslandMeta(id) {
    const db = await openDb();
    return new Promise((resolve, reject)=>{
        const tx = db.transaction([
            STORE_META
        ], "readonly");
        const req = tx.objectStore(STORE_META).get(id);
        req.onsuccess = ()=>resolve(req.result ?? null);
        req.onerror = ()=>reject(req.error ?? new Error("Failed to read island meta"));
    });
}
async function loadIsland(id) {
    const db = await openDb();
    const meta = await getIslandMeta(id);
    if (!meta) return null;
    const dataRow = await new Promise((resolve, reject)=>{
        const tx = db.transaction([
            STORE_DATA
        ], "readonly");
        const req = tx.objectStore(STORE_DATA).get(id);
        req.onsuccess = ()=>resolve(req.result ?? null);
        req.onerror = ()=>reject(req.error ?? new Error("Failed to read island data"));
    });
    if (!dataRow) return null;
    return {
        meta,
        data: dataRow.data
    };
}
async function deleteIsland(id) {
    const db = await openDb();
    const tx = db.transaction([
        STORE_META,
        STORE_DATA
    ], "readwrite");
    tx.objectStore(STORE_META).delete(id);
    tx.objectStore(STORE_DATA).delete(id);
    await txDone(tx);
}
async function renameIsland(id, name) {
    const db = await openDb();
    const meta = await getIslandMeta(id);
    if (!meta) return;
    meta.name = name;
    meta.updatedAt = Date.now();
    const tx = db.transaction([
        STORE_META
    ], "readwrite");
    tx.objectStore(STORE_META).put(meta);
    await txDone(tx);
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
"[project]/apps/web/src/components/VoxelEditor/database/nukeEditorDatabases.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "nukeVoxelEditorDatabases",
    ()=>nukeVoxelEditorDatabases
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$database$2f$AssetDb$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/database/AssetDb.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$database$2f$LibraryDb$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/database/LibraryDb.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$ownedAssetCache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/repositories/ownedAssetCache.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$ownedWorldCache$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/repositories/ownedWorldCache.ts [app-ssr] (ecmascript)");
;
;
;
;
async function nukeVoxelEditorDatabases() {
    const assetOwner = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
    const worldOwner = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
    await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$database$2f$AssetDb$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteAssetDatabase"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$database$2f$LibraryDb$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteWorldDatabase"])(),
        ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : Promise.resolve(),
        ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : Promise.resolve()
    ]);
    try {
        localStorage.removeItem("voxbox:primaryWorldId");
        localStorage.removeItem("voxl:last-owned-asset-owner");
        localStorage.removeItem("voxl:last-owned-world-owner");
    } catch  {}
}
}),
"[project]/apps/web/src/components/VoxelEditor/database/AssetPresets.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ensurePresetAssetsInstalled",
    ()=>ensurePresetAssetsInstalled,
    "ensurePresetAssetsInstalledOnce",
    ()=>ensurePresetAssetsInstalledOnce
]);
async function ensurePresetAssetsInstalled(opts) {
    opts?.onProgress?.(1, {
        done: 1,
        total: 1
    });
}
function ensurePresetAssetsInstalledOnce(opts) {
    opts?.onProgress?.(1, {
        done: 1,
        total: 1
    });
    return Promise.resolve();
}
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
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
"[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AtlasContainer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function backgroundImageFromSeed(seed) {
    const backgrounds = [
        "/library/1.png",
        "/library/2.png",
        "/library/3.png",
        "/library/4.png"
    ];
    let hash = 0;
    for(let i = 0; i < seed.length; i++){
        hash = hash * 31 + seed.charCodeAt(i) >>> 0;
    }
    return backgrounds[hash % backgrounds.length];
}
function floaterVarsFromSeed(seed) {
    let hash = 0;
    for(let i = 0; i < seed.length; i++){
        hash = hash * 31 + seed.charCodeAt(i) >>> 0;
    }
    const ax = 6 + hash % 5;
    const ay = 5 + (hash >> 3) % 5;
    const dur = 5900 + (hash >> 6) % 2500;
    const delay = -((hash >> 10) % 1800);
    return {
        ["--floater-ax"]: `${ax}px`,
        ["--floater-ay"]: `${ay}px`,
        ["--floater-dur"]: `${dur}ms`,
        ["--floater-delay"]: `${delay}ms`
    };
}
function pfpFromUserId(userId) {
    const pfps = [
        "/pfp/1.png",
        "/pfp/2.png",
        "/pfp/3.png",
        "/pfp/4.png",
        "/pfp/5.png",
        "/pfp/6.png",
        "/pfp/7.png",
        "/pfp/8.png"
    ];
    let hash = 0;
    for(let i = 0; i < userId.length; i++){
        hash = hash * 31 + userId.charCodeAt(i) >>> 0;
    }
    return pfps[hash % pfps.length];
}
function parseVoxelCountFromFooter(footer) {
    const match = footer.match(/[\d,]+/);
    return match ? match[0] : "0";
}
function formatCreatedAt(createdAt) {
    if (!createdAt) return "unknown";
    const d = new Date(createdAt);
    if (Number.isNaN(d.getTime())) return "unknown";
    return d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}
function AtlasContainer(props) {
    const { title = "Untitled World", subtitle = "", meta = "", footer = "", publisherUserId = "", publisherUsername = "unknown user", createdAt = 0, assets = [], onClick, size = "small", gridGap = 0, expanded = false, overlayZ = 0, onToggleExpand } = props;
    const [overlayMounted, setOverlayMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(expanded);
    const [overlayVisible, setOverlayVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(expanded);
    const [contentMounted, setContentMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(expanded);
    const [contentVisible, setContentVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(expanded);
    const [thumbUrlsByAssetKey, setThumbUrlsByAssetKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const seed = `${title}|${subtitle}|${meta}|${footer}`;
    const bgImage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>backgroundImageFromSeed(seed), [
        seed
    ]);
    const floaterVars = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>floaterVarsFromSeed(seed), [
        seed
    ]);
    const publisherPfp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>pfpFromUserId(publisherUserId || publisherUsername), [
        publisherUserId,
        publisherUsername
    ]);
    const createdAtLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>formatCreatedAt(createdAt), [
        createdAt
    ]);
    const voxelCountLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>`${parseVoxelCountFromFooter(footer)} voxels`, [
        footer
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let raf1 = 0;
        let raf2 = 0;
        let timeoutShell = 0;
        let timeoutContentIn = 0;
        let timeoutContentOut = 0;
        const SHELL_MS = 220;
        const CONTENT_MS = 140;
        if (expanded) {
            setOverlayMounted(true);
            setContentMounted(true);
            setOverlayVisible(false);
            setContentVisible(false);
            raf1 = window.requestAnimationFrame(()=>{
                raf2 = window.requestAnimationFrame(()=>{
                    const el = document.getElementById(`atlas-overlay-${seed}`);
                    if (el) void el.getBoundingClientRect();
                    setOverlayVisible(true);
                    timeoutContentIn = window.setTimeout(()=>{
                        setContentVisible(true);
                    }, SHELL_MS);
                });
            });
        } else {
            setContentVisible(false);
            timeoutContentOut = window.setTimeout(()=>{
                setContentMounted(false);
                setOverlayVisible(false);
                timeoutShell = window.setTimeout(()=>{
                    setOverlayMounted(false);
                }, SHELL_MS);
            }, CONTENT_MS);
        }
        return ()=>{
            if (raf1) window.cancelAnimationFrame(raf1);
            if (raf2) window.cancelAnimationFrame(raf2);
            if (timeoutShell) window.clearTimeout(timeoutShell);
            if (timeoutContentIn) window.clearTimeout(timeoutContentIn);
            if (timeoutContentOut) window.clearTimeout(timeoutContentOut);
        };
    }, [
        expanded,
        seed
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        const urlsToRevoke = [];
        function loadThumbs() {
            if (!assets.length) {
                setThumbUrlsByAssetKey({});
                return;
            }
            const next = {};
            for (const asset of assets){
                if (!asset.thumb) continue;
                const url = URL.createObjectURL(asset.thumb);
                urlsToRevoke.push(url);
                next[asset.key] = url;
            }
            if (cancelled) {
                for (const url of urlsToRevoke)URL.revokeObjectURL(url);
                return;
            }
            setThumbUrlsByAssetKey(next);
        }
        loadThumbs();
        return ()=>{
            cancelled = true;
            for (const url of urlsToRevoke)URL.revokeObjectURL(url);
        };
    }, [
        assets
    ]);
    const cellClassName = size === "big" ? "pix-icon-large" : "pix-icon";
    const nameBoxHeight = size === "big" ? 42 : 34;
    const expandBoxSize = nameBoxHeight;
    const rowGap = 6;
    const fontSize = size === "big" ? 22 : 14;
    const borderRadius = 4;
    const nameWidth = "83%";
    const expandGap = 30;
    const expandVisualScale = 2.0;
    const collapsedWidth = "100%";
    const expandedWidth = `calc(200% + ${gridGap * 2}px)`;
    const overlayHeight = `calc(100% + ${gridGap}px)`;
    const profileWidth = "70%";
    const usernameFontSize = size === "big" ? 20 : 18;
    const metaFontSize = size === "big" ? 12 : 10;
    const closeIconScale = expandVisualScale;
    const assetTiles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!assets.length) {
            return [
                {
                    key: "empty",
                    assetId: "",
                    kind: "version",
                    name: "No assets",
                    count: 1,
                    thumb: null
                }
            ];
        }
        return assets;
    }, [
        assets
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "visible",
            userSelect: "none",
            zIndex: overlayZ > 0 ? 1000 + overlayZ : 0
        },
        children: [
            overlayMounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: `atlas-overlay-${seed}`,
                style: {
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: overlayVisible ? expandedWidth : collapsedWidth,
                    height: overlayHeight,
                    background: "#F4FCFF",
                    borderRadius: 6,
                    zIndex: 1,
                    pointerEvents: overlayVisible ? "auto" : "none",
                    opacity: overlayVisible ? 1 : 0,
                    transition: "width 220ms cubic-bezier(0.22, 1, 0.36, 1), opacity 120ms ease-out",
                    willChange: "width, opacity",
                    overflow: "hidden"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: "absolute",
                        left: `calc((100% - ${gridGap * 2}px) / 2)`,
                        top: 0,
                        width: `calc(50% + ${gridGap}px)`,
                        height: "100%",
                        paddingTop: 16,
                        paddingBottom: 16,
                        boxSizing: "border-box"
                    },
                    children: contentMounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: "100%",
                            height: "100%",
                            opacity: contentVisible ? 1 : 0,
                            transition: "opacity 140ms ease-out",
                            willChange: "opacity"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                gap: 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: "70%",
                                        height: "100%",
                                        background: "#E3F2F8",
                                        borderRadius: 6,
                                        display: "flex",
                                        flexDirection: "column",
                                        overflow: "hidden"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                height: "13%",
                                                minHeight: 0,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "var(--homepage-dark)",
                                                fontSize: 25,
                                                lineHeight: 1,
                                                flexShrink: 0
                                            },
                                            children: "assets"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                                            lineNumber: 327,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                height: "87%",
                                                minHeight: 0,
                                                flexShrink: 0,
                                                overflowY: "auto",
                                                overflowX: "hidden"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: "100%",
                                                    minHeight: "100%",
                                                    display: "grid",
                                                    gridTemplateColumns: "repeat(2, 1fr)",
                                                    gridAutoRows: "50%",
                                                    gap: 0
                                                },
                                                children: assetTiles.map((asset, i)=>{
                                                    const thumbUrl = asset.key ? thumbUrlsByAssetKey[asset.key] : "";
                                                    const assetCount = String(asset.count ?? 1);
                                                    const displayName = asset.name;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            width: "100%",
                                                            height: "100%",
                                                            boxSizing: "border-box",
                                                            overflow: "hidden",
                                                            position: "relative",
                                                            marginRight: "-20px",
                                                            marginTop: "-20px"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    position: "absolute",
                                                                    left: 8,
                                                                    top: "50%",
                                                                    transform: "translateY(-50%)",
                                                                    color: "var(--homepage-dark)",
                                                                    fontSize: 19,
                                                                    lineHeight: 1,
                                                                    whiteSpace: "nowrap",
                                                                    pointerEvents: "none",
                                                                    zIndex: 2
                                                                },
                                                                children: [
                                                                    "x",
                                                                    assetCount
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                                                                lineNumber: 382,
                                                                columnNumber: 31
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    position: "absolute",
                                                                    top: 0,
                                                                    right: 0,
                                                                    height: "100%",
                                                                    aspectRatio: "1 / 1",
                                                                    display: "flex",
                                                                    alignItems: "flex-end",
                                                                    justifyContent: "center"
                                                                },
                                                                children: [
                                                                    thumbUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                        src: thumbUrl,
                                                                        alt: asset.name,
                                                                        style: {
                                                                            position: "absolute",
                                                                            top: 0,
                                                                            right: 0,
                                                                            height: "100%",
                                                                            width: "auto",
                                                                            objectFit: "contain",
                                                                            imageRendering: "pixelated",
                                                                            display: "block"
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                                                                        lineNumber: 412,
                                                                        columnNumber: 35
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            position: "absolute",
                                                                            top: 10,
                                                                            right: 10,
                                                                            bottom: 16,
                                                                            left: 42,
                                                                            borderRadius: 4,
                                                                            background: "linear-gradient(180deg, rgba(227,242,248,0.15) 0%, rgba(195,222,233,0.65) 100%)",
                                                                            border: "1px solid rgba(32, 41, 61, 0.14)"
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                                                                        lineNumber: 427,
                                                                        columnNumber: 35
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            position: "relative",
                                                                            marginBottom: 0,
                                                                            maxWidth: "90%",
                                                                            color: "var(--homepage-dark)",
                                                                            fontSize: 12,
                                                                            lineHeight: 1,
                                                                            textAlign: "center",
                                                                            whiteSpace: "nowrap",
                                                                            overflow: "hidden",
                                                                            textOverflow: "ellipsis",
                                                                            pointerEvents: "none"
                                                                        },
                                                                        children: displayName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                                                                        lineNumber: 442,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                                                                lineNumber: 399,
                                                                columnNumber: 31
                                                            }, this)
                                                        ]
                                                    }, `${asset.key || asset.assetId || asset.name}-${i}`, true, {
                                                        fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                                                        lineNumber: 370,
                                                        columnNumber: 29
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                                                lineNumber: 352,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                                            lineNumber: 343,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                                    lineNumber: 316,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: "30%",
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "flex-start",
                                        paddingTop: 0,
                                        boxSizing: "border-box",
                                        position: "relative"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: profileWidth,
                                                marginTop: 2,
                                                aspectRatio: "1 / 1",
                                                border: "2px solid var(--homepage-dark)",
                                                boxSizing: "border-box",
                                                overflow: "hidden",
                                                flexShrink: 0
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: publisherPfp,
                                                alt: publisherUsername,
                                                style: {
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    imageRendering: "pixelated",
                                                    display: "block"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                                                lineNumber: 491,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                                            lineNumber: 480,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: profileWidth,
                                                marginTop: 8,
                                                color: "var(--homepage-dark)",
                                                textAlign: "center",
                                                lineHeight: 1.05,
                                                fontSize: usernameFontSize,
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis"
                                            },
                                            children: publisherUsername
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                                            lineNumber: 504,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: "100%",
                                                marginTop: 8,
                                                color: "rgba(32, 41, 61, 0.8)",
                                                textAlign: "center",
                                                lineHeight: 1.15,
                                                fontSize: metaFontSize,
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis"
                                            },
                                            children: [
                                                "created: ",
                                                createdAtLabel
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                                            lineNumber: 520,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: "100%",
                                                marginTop: 4,
                                                color: "rgba(32, 41, 61, 0.8)",
                                                textAlign: "center",
                                                lineHeight: 1.15,
                                                fontSize: metaFontSize,
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis"
                                            },
                                            children: voxelCountLabel
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                                            lineNumber: 536,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "pix-icon-small",
                                            type: "button",
                                            onClick: (e)=>{
                                                e.stopPropagation();
                                                onToggleExpand?.();
                                            },
                                            style: {
                                                appearance: "none",
                                                border: "none",
                                                background: "transparent",
                                                outline: "none",
                                                boxShadow: "none",
                                                WebkitTapHighlightColor: "transparent",
                                                marginTop: "auto",
                                                marginBottom: 15,
                                                width: expandBoxSize,
                                                height: expandBoxSize,
                                                padding: 0,
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                overflow: "visible",
                                                flexShrink: 0
                                            },
                                            "aria-label": "Close",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: "/library/delete.png",
                                                alt: "Close",
                                                style: {
                                                    width: `${closeIconScale * 100}%`,
                                                    height: `${closeIconScale * 100}%`,
                                                    objectFit: "contain",
                                                    imageRendering: "pixelated",
                                                    display: "block",
                                                    pointerEvents: "none"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                                                lineNumber: 580,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                                            lineNumber: 552,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                                    lineNumber: 467,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                            lineNumber: 308,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                        lineNumber: 299,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                    lineNumber: 286,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                lineNumber: 267,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: cellClassName,
                onClick: onClick,
                style: {
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    cursor: onClick ? "pointer" : "default",
                    overflow: "hidden",
                    zIndex: 2
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "floater",
                    style: floaterVars,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            imageRendering: "pixelated"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: "100%",
                                    height: "100%",
                                    backgroundImage: `url(${bgImage})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                    filter: overlayVisible ? "brightness(0.3)" : "brightness(1)",
                                    transition: "filter 180ms ease-out",
                                    willChange: "filter"
                                }
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                                lineNumber: 622,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: "absolute",
                                    inset: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    pointerEvents: "none",
                                    opacity: overlayVisible ? 1 : 0,
                                    transition: "opacity 180ms ease-out",
                                    willChange: "opacity",
                                    transform: "translateX(2%)"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/atlas/play.png",
                                    alt: "Play",
                                    style: {
                                        width: size === "big" ? "50%" : "45%",
                                        height: size === "big" ? "50%" : "43%",
                                        objectFit: "contain",
                                        display: "block"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                                    lineNumber: 650,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                                lineNumber: 636,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                        lineNumber: 614,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                    lineNumber: 613,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                lineNumber: 601,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: "100%",
                    marginTop: rowGap,
                    height: nameBoxHeight,
                    pointerEvents: "auto",
                    overflow: "visible",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: "relative",
                        width: nameWidth,
                        height: "100%",
                        overflow: "visible"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pix-icon",
                            style: {
                                position: "relative",
                                width: "100%",
                                height: "100%",
                                background: "var(--homepage-dark)",
                                borderRadius,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "2px 8px",
                                boxSizing: "border-box",
                                overflow: "visible",
                                zIndex: 3
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: "100%",
                                    color: "var(--homepage-light)",
                                    fontSize,
                                    lineHeight: 1.05,
                                    textAlign: "center",
                                    padding: "4px 6px",
                                    boxSizing: "border-box",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis"
                                },
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                                lineNumber: 705,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                            lineNumber: 688,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "pix-icon-small",
                            type: "button",
                            onClick: (e)=>{
                                e.stopPropagation();
                                onToggleExpand?.();
                            },
                            style: {
                                appearance: "none",
                                border: "none",
                                background: "transparent",
                                outline: "none",
                                boxShadow: "none",
                                WebkitTapHighlightColor: "transparent",
                                position: "absolute",
                                left: "100%",
                                top: 0,
                                marginLeft: expandGap,
                                width: expandBoxSize,
                                height: expandBoxSize,
                                padding: 0,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "visible",
                                zIndex: 0
                            },
                            "aria-label": "Expand",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/atlas/expand.png",
                                alt: "Expand",
                                style: {
                                    width: `${expandVisualScale * 100}%`,
                                    height: `${expandVisualScale * 100}%`,
                                    objectFit: "contain",
                                    imageRendering: "pixelated",
                                    display: "block",
                                    pointerEvents: "none"
                                }
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                                lineNumber: 753,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                            lineNumber: 723,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                    lineNumber: 680,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
                lineNumber: 665,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx",
        lineNumber: 256,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/src/components/Home/Atlas/Atlas.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Atlas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Home$2f$PackedGrid$2f$PackedGrid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/Home/PackedGrid/PackedGrid.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$publishedWorlds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/publishedWorlds.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$user$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/user.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/repositories/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedAssets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/versionedAssets.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$repositoryMedia$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/repositories/repositoryMedia.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Home$2f$GridContainers$2f$AtlasContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/Home/GridContainers/AtlasContainer.tsx [app-ssr] (ecmascript)");
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
const OVERLAY_CLOSE_MS = 220;
function Atlas() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [games, setGames] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [expandedWorldId, setExpandedWorldId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [closingWorldIds, setClosingWorldIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [overlayOrderById, setOverlayOrderById] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Map());
    const nextOverlayOrderRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(1);
    const closeTimeoutsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const atlasGridGap = 80;
    function bringOverlayToFront(worldId) {
        const nextOrder = nextOverlayOrderRef.current++;
        setOverlayOrderById((prev)=>{
            const next = new Map(prev);
            next.set(worldId, nextOrder);
            return next;
        });
    }
    function markClosing(worldId) {
        if (!worldId) return;
        setClosingWorldIds((prev)=>{
            const next = new Set(prev);
            next.add(worldId);
            return next;
        });
        const prevTimeout = closeTimeoutsRef.current.get(worldId);
        if (prevTimeout) {
            window.clearTimeout(prevTimeout);
        }
        const timeoutId = window.setTimeout(()=>{
            setClosingWorldIds((prev)=>{
                const next = new Set(prev);
                next.delete(worldId);
                return next;
            });
            setOverlayOrderById((prev)=>{
                const next = new Map(prev);
                next.delete(worldId);
                return next;
            });
            closeTimeoutsRef.current.delete(worldId);
        }, OVERLAY_CLOSE_MS);
        closeTimeoutsRef.current.set(worldId, timeoutId);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        async function load() {
            setLoading(true);
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$publishedWorlds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["listPublishedWorlds"])();
                const rows = Array.isArray(res?.worlds) ? res.worlds : [];
                const uniqueUserIds = Array.from(new Set(rows.map((r)=>r.publisherUserId).filter(Boolean)));
                const uniqueAssetRefs = Array.from(new Map(rows.flatMap((row)=>Array.isArray(row.groups) ? row.groups.map((group)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$publishedWorlds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPublishedWorldGroupAssetReference"])(group)).filter((value)=>!!value) : []).map((ref)=>[
                        ref.key,
                        ref
                    ])).values());
                const [userEntries, assetEntries] = await Promise.all([
                    Promise.all(uniqueUserIds.map(async (userId)=>{
                        try {
                            const profile = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$user$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GetUserProfile"])(userId);
                            return [
                                userId,
                                profile.username
                            ];
                        } catch (err) {
                            console.error("Failed to resolve username for user", userId, err);
                            return [
                                userId,
                                "unknown user"
                            ];
                        }
                    })),
                    Promise.all(uniqueAssetRefs.map(async (ref)=>{
                        try {
                            if (ref.kind === "listing") {
                                const meta = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].getAssetMeta(ref.id);
                                return [
                                    ref.key,
                                    {
                                        name: meta?.name ?? ref.id,
                                        thumb: meta?.thumb ?? null
                                    }
                                ];
                            }
                            const version = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$versionedAssets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAssetVersion"])(ref.id);
                            return [
                                ref.key,
                                {
                                    name: version?.name ?? ref.id,
                                    thumb: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$repositoryMedia$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dataUrlToBlob"])(version?.thumbStorageKey ?? null)
                                }
                            ];
                        } catch (err) {
                            console.error("Failed to resolve asset preview for published world asset", ref, err);
                            return [
                                ref.key,
                                {
                                    name: ref.id,
                                    thumb: null
                                }
                            ];
                        }
                    }))
                ]);
                if (cancelled) return;
                const usernameByUserId = new Map(userEntries);
                const assetPreviewByKey = new Map(assetEntries);
                const next = rows.map((row)=>{
                    const countByAssetKey = new Map();
                    for (const group of row.groups ?? []){
                        const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$publishedWorlds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPublishedWorldGroupAssetReference"])(group);
                        if (!ref) continue;
                        const existing = countByAssetKey.get(ref.key);
                        if (existing) {
                            existing.count += 1;
                        } else {
                            countByAssetKey.set(ref.key, {
                                ref,
                                count: 1
                            });
                        }
                    }
                    const assets = Array.from(countByAssetKey.values()).map(({ ref, count })=>{
                        const preview = assetPreviewByKey.get(ref.key);
                        return {
                            key: ref.key,
                            assetId: ref.id,
                            kind: ref.kind,
                            name: preview?.name ?? ref.id,
                            count,
                            thumb: preview?.thumb ?? null
                        };
                    });
                    return {
                        publishedWorldId: row.publishedWorldId,
                        publisherUserId: row.publisherUserId,
                        worldName: row.worldName || "Untitled World",
                        publisherUsername: usernameByUserId.get(row.publisherUserId) ?? "unknown user",
                        assets,
                        voxelCount: row.voxelCount ?? 0,
                        createdAt: row.createdAt ?? 0
                    };
                });
                setGames(next);
            } catch (err) {
                console.error("Failed to load published worlds", err);
                if (!cancelled) setGames([]);
            } finally{
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return ()=>{
            cancelled = true;
            for (const timeoutId of closeTimeoutsRef.current.values()){
                window.clearTimeout(timeoutId);
            }
            closeTimeoutsRef.current.clear();
        };
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const onKeyDown = (e)=>{
            if (e.key !== "Escape") return;
            if (!expandedWorldId) return;
            e.preventDefault();
            markClosing(expandedWorldId);
            setExpandedWorldId(null);
        };
        window.addEventListener("keydown", onKeyDown);
        return ()=>window.removeEventListener("keydown", onKeyDown);
    }, [
        expandedWorldId
    ]);
    const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return games.map((game)=>{
            const isExpanded = expandedWorldId === game.publishedWorldId;
            return {
                id: game.publishedWorldId,
                size: "small",
                content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Home$2f$GridContainers$2f$AtlasContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    size: "small",
                    gridGap: atlasGridGap,
                    expanded: isExpanded,
                    overlayZ: overlayOrderById.get(game.publishedWorldId) ?? 0,
                    onToggleExpand: ()=>{
                        bringOverlayToFront(game.publishedWorldId);
                        setExpandedWorldId((prev)=>{
                            if (prev === game.publishedWorldId) {
                                markClosing(game.publishedWorldId);
                                return null;
                            }
                            if (prev) {
                                markClosing(prev);
                            }
                            return game.publishedWorldId;
                        });
                    },
                    title: game.worldName,
                    subtitle: `by ${game.publisherUsername}`,
                    publisherUserId: game.publisherUserId,
                    publisherUsername: game.publisherUsername,
                    createdAt: game.createdAt,
                    assets: game.assets,
                    meta: game.assets.length ? game.assets.map((a)=>a.count > 1 ? `${a.name} x ${a.count}` : a.name).join(", ") : "No assets",
                    footer: `${game.voxelCount.toLocaleString()} voxels`,
                    onClick: ()=>{
                        router.push(`/games/${game.publishedWorldId}`);
                    }
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/Home/Atlas/Atlas.tsx",
                    lineNumber: 279,
                    columnNumber: 11
                }, this)
            };
        });
    }, [
        games,
        router,
        expandedWorldId,
        closingWorldIds,
        overlayOrderById
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "absolute",
            top: 52,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 20,
            pointerEvents: "auto",
            padding: 16,
            paddingTop: 20
        },
        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "pix-logo",
            style: {
                fontSize: 24,
                color: "var(--homepage-dark)",
                opacity: 0.9
            },
            children: "Loading worlds..."
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/Home/Atlas/Atlas.tsx",
            lineNumber: 339,
            columnNumber: 9
        }, this) : items.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Home$2f$PackedGrid$2f$PackedGrid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            items: items,
            gap: atlasGridGap,
            columns: 5
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/Home/Atlas/Atlas.tsx",
            lineNumber: 350,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "pix-logo",
            style: {
                fontSize: 24,
                color: "var(--homepage-dark)",
                opacity: 0.9
            },
            children: "No published worlds yet"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/Home/Atlas/Atlas.tsx",
            lineNumber: 352,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/Home/Atlas/Atlas.tsx",
        lineNumber: 325,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/src/components/Home/GridContainers/CreateNewContainer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CreateNewContainer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
function CreateNewContainer(props) {
    const { onClick, size = "small", disabled = false } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: size === "big" ? "pix-icon-large" : "pix-icon",
        onClick: disabled ? undefined : onClick,
        style: {
            width: "100%",
            height: "100%",
            borderRadius: 0,
            cursor: disabled ? "default" : onClick ? "pointer" : "default",
            position: "relative",
            userSelect: "none",
            overflow: "hidden",
            opacity: disabled ? 0.7 : 1
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "floater",
            style: {
                position: "absolute",
                inset: 0,
                ["--floater-ax"]: "8px",
                ["--floater-ay"]: "6px",
                ["--floater-dur"]: "6800ms",
                ["--floater-delay"]: "-700ms",
                pointerEvents: "none"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "relative",
                    width: "100%",
                    height: "100%"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "absolute",
                            inset: 0,
                            backgroundImage: "url('/library/createnew.png')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            imageRendering: "pixelated"
                        }
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/Home/GridContainers/CreateNewContainer.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                            width: size === "big" ? "24%" : "28%",
                            height: size === "big" ? "24%" : "28%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 1
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/library/create.png",
                            alt: "",
                            style: {
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                imageRendering: "pixelated",
                                display: "block"
                            }
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/Home/GridContainers/CreateNewContainer.tsx",
                            lineNumber: 77,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/Home/GridContainers/CreateNewContainer.tsx",
                        lineNumber: 63,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/Home/GridContainers/CreateNewContainer.tsx",
                lineNumber: 44,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/Home/GridContainers/CreateNewContainer.tsx",
            lineNumber: 32,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/Home/GridContainers/CreateNewContainer.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/src/components/Home/GridContainers/LibraryContainer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LibraryContainer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function backgroundImageFromWorldId(worldId) {
    const backgrounds = [
        "/library/1.png",
        "/library/2.png",
        "/library/3.png",
        "/library/4.png"
    ];
    let hash = 0;
    for(let i = 0; i < worldId.length; i++){
        hash = hash * 31 + worldId.charCodeAt(i) >>> 0;
    }
    return backgrounds[hash % backgrounds.length];
}
function floaterVarsFromWorldId(worldId) {
    let hash = 0;
    for(let i = 0; i < worldId.length; i++){
        hash = hash * 31 + worldId.charCodeAt(i) >>> 0;
    }
    const ax = 6 + hash % 5; // 6..10
    const ay = 5 + (hash >> 3) % 5; // 5..9
    const dur = 5900 + (hash >> 6) % 2500; // 5900..8399
    const delay = -((hash >> 10) % 1800); // -0..-1799
    return {
        ["--floater-ax"]: `${ax}px`,
        ["--floater-ay"]: `${ay}px`,
        ["--floater-dur"]: `${dur}ms`,
        ["--floater-delay"]: `${delay}ms`
    };
}
function LibraryContainer(props) {
    const { worldId, size = "small", isBusy = false, isRenaming = false, draftName, onOpen, onDelete, onRenameChange, onRenameFocus, onRenameBlur, onRenameKeyDown } = props;
    const bgImage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>backgroundImageFromWorldId(worldId), [
        worldId
    ]);
    const floaterVars = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>floaterVarsFromWorldId(worldId), [
        worldId
    ]);
    const cellClassName = size === "big" ? "pix-icon-large" : "pix-icon";
    const nameBoxHeight = size === "big" ? 36 : 30;
    const deleteBoxSize = nameBoxHeight;
    const rowGap = 6;
    const fontSize = size === "big" ? 17 : 14;
    const borderRadius = 4;
    const nameWidth = "90%";
    const deleteGap = 14;
    const deleteVisualScale = 1.6;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "visible",
            userSelect: "none",
            opacity: isBusy ? 0.8 : 1
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: cellClassName,
                onClick: isBusy ? undefined : onOpen,
                style: {
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    cursor: isBusy ? "default" : onOpen ? "pointer" : "default",
                    overflow: "hidden"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "floater",
                    style: floaterVars,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: "100%",
                            height: "100%",
                            backgroundImage: `url(${bgImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            imageRendering: "pixelated"
                        }
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/Home/GridContainers/LibraryContainer.tsx",
                        lineNumber: 108,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/Home/GridContainers/LibraryContainer.tsx",
                    lineNumber: 104,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Home/GridContainers/LibraryContainer.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: "100%",
                    marginTop: rowGap,
                    height: nameBoxHeight,
                    pointerEvents: "auto",
                    overflow: "visible",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                },
                onClick: (e)=>e.stopPropagation(),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: "relative",
                        width: nameWidth,
                        height: "100%",
                        overflow: "visible"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pix-icon",
                            style: {
                                position: "relative",
                                width: "100%",
                                height: "100%",
                                background: "var(--homepage-dark)",
                                borderRadius,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "2px 8px",
                                boxSizing: "border-box",
                                overflow: "visible"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: draftName,
                                disabled: isBusy,
                                onChange: (e)=>onRenameChange(e.target.value),
                                onFocus: (e)=>{
                                    e.stopPropagation();
                                    onRenameFocus?.();
                                },
                                onBlur: ()=>{
                                    onRenameBlur?.();
                                },
                                onClick: (e)=>{
                                    e.stopPropagation();
                                },
                                onMouseDown: (e)=>{
                                    e.stopPropagation();
                                },
                                onKeyDown: (e)=>{
                                    onRenameKeyDown?.(e);
                                    e.stopPropagation();
                                },
                                spellCheck: false,
                                style: {
                                    width: "100%",
                                    color: "var(--homepage-light)",
                                    fontSize,
                                    lineHeight: 1.05,
                                    textAlign: "center",
                                    background: isRenaming ? "rgba(255,255,255,0.08)" : "transparent",
                                    border: isRenaming ? "1px solid rgba(234,243,254,0.35)" : "1px solid transparent",
                                    borderRadius: 3,
                                    outline: "none",
                                    padding: "4px 6px",
                                    pointerEvents: "auto",
                                    boxSizing: "border-box"
                                }
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/Home/GridContainers/LibraryContainer.tsx",
                                lineNumber: 162,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/Home/GridContainers/LibraryContainer.tsx",
                            lineNumber: 146,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "pix-icon-small",
                            disabled: isBusy,
                            onClick: onDelete,
                            style: {
                                appearance: "none",
                                border: "none",
                                background: "transparent",
                                position: "absolute",
                                left: "100%",
                                top: 0,
                                marginLeft: deleteGap,
                                width: deleteBoxSize,
                                height: deleteBoxSize,
                                padding: 0,
                                cursor: isBusy ? "default" : "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "visible"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/library/delete.png",
                                alt: "Delete",
                                style: {
                                    width: `${deleteVisualScale * 100}%`,
                                    height: `${deleteVisualScale * 100}%`,
                                    objectFit: "contain",
                                    imageRendering: "pixelated",
                                    display: "block",
                                    pointerEvents: "none"
                                }
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/Home/GridContainers/LibraryContainer.tsx",
                                lineNumber: 225,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/Home/GridContainers/LibraryContainer.tsx",
                            lineNumber: 203,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/Home/GridContainers/LibraryContainer.tsx",
                    lineNumber: 138,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Home/GridContainers/LibraryContainer.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/Home/GridContainers/LibraryContainer.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/src/components/Home/Library/Library.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Library
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Home$2f$PackedGrid$2f$PackedGrid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/Home/PackedGrid/PackedGrid.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Home$2f$GridContainers$2f$CreateNewContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/Home/GridContainers/CreateNewContainer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Home$2f$GridContainers$2f$LibraryContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/Home/GridContainers/LibraryContainer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/repositories/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/audio/SoundProvider.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
const PRIMARY_WORLD_ID_KEY = "voxbox:primaryWorldId";
function setPrimaryWorldId(id) {
    try {
        localStorage.setItem(PRIMARY_WORLD_ID_KEY, id);
    } catch  {}
}
function Library() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { click } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSound"])();
    const [worlds, setWorlds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [busyId, setBusyId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [renamingId, setRenamingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [draftNames, setDraftNames] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [isCreateHovered, setIsCreateHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const createTooltipRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    async function refresh() {
        const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["worldRepository"].listWorlds();
        setWorlds(rows);
        setDraftNames((prev)=>{
            const next = {
                ...prev
            };
            for (const row of rows){
                if (next[row.id] == null) next[row.id] = row.name;
            }
            return next;
        });
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        refresh().catch(console.error);
    }, []);
    async function handleCreateNew() {
        if (busyId) return;
        try {
            setBusyId("__create_new__");
            const id = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["worldRepository"].saveWorld({
                name: "My Voxbox",
                data: {
                    instances: []
                },
                thumb: null
            });
            setPrimaryWorldId(id);
            router.push(`/editor/${encodeURIComponent(id)}`);
        } catch (err) {
            console.error("Failed to create world", err);
        } finally{
            setBusyId(null);
        }
    }
    function handleOpenWorld(worldId) {
        if (busyId) return;
        setPrimaryWorldId(worldId);
        router.push(`/editor/${encodeURIComponent(worldId)}`);
    }
    async function commitRename(world) {
        const nextName = (draftNames[world.id] ?? world.name).trim();
        setRenamingId(null);
        if (!nextName || nextName === world.name) {
            setDraftNames((prev)=>({
                    ...prev,
                    [world.id]: world.name
                }));
            return;
        }
        try {
            setBusyId(world.id);
            await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["worldRepository"].renameWorld(world.id, nextName);
            await refresh();
        } catch (err) {
            console.error("Failed to rename world", err);
            setDraftNames((prev)=>({
                    ...prev,
                    [world.id]: world.name
                }));
        } finally{
            setBusyId(null);
        }
    }
    async function handleDelete(world) {
        if (busyId) return;
        if (!confirm(`Delete "${world.name}"?`)) return;
        try {
            setBusyId(world.id);
            await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["worldRepository"].deleteWorld(world.id);
            await refresh();
        } catch (err) {
            console.error("Failed to delete world", err);
        } finally{
            setBusyId(null);
        }
    }
    const gridItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return worlds.map((world)=>({
                id: world.id,
                size: "small",
                content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Home$2f$GridContainers$2f$LibraryContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    worldId: world.id,
                    name: world.name,
                    size: "small",
                    isBusy: busyId === world.id,
                    isRenaming: renamingId === world.id,
                    draftName: draftNames[world.id] ?? world.name,
                    onOpen: ()=>{
                        click();
                        handleOpenWorld(world.id);
                    },
                    onDelete: ()=>{
                        click();
                        void handleDelete(world);
                    },
                    onRenameChange: (value)=>setDraftNames((prev)=>({
                                ...prev,
                                [world.id]: value
                            })),
                    onRenameFocus: ()=>setRenamingId(world.id),
                    onRenameBlur: ()=>{
                        void commitRename(world);
                    },
                    onRenameKeyDown: (e)=>{
                        if (e.key === "Enter") {
                            e.currentTarget.blur();
                        }
                        if (e.key === "Escape") {
                            setDraftNames((prev)=>({
                                    ...prev,
                                    [world.id]: world.name
                                }));
                            setRenamingId(null);
                            e.currentTarget.blur();
                        }
                    }
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/Home/Library/Library.tsx",
                    lineNumber: 114,
                    columnNumber: 9
                }, this)
            }));
    }, [
        worlds,
        busyId,
        renamingId,
        draftNames,
        click
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "absolute",
            top: 52,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 20,
            pointerEvents: "auto",
            padding: 16,
            paddingTop: 20
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: createTooltipRef,
                style: {
                    position: "fixed",
                    left: 0,
                    top: 0,
                    background: "var(--homepage-dark)",
                    color: "var(--homepage-light)",
                    borderRadius: 4,
                    padding: "8px 10px",
                    fontSize: 14,
                    lineHeight: 1,
                    pointerEvents: "none",
                    zIndex: 999,
                    whiteSpace: "nowrap",
                    opacity: isCreateHovered ? 1 : 0,
                    transform: isCreateHovered ? "translate3d(0, 0, 0) scale(1)" : "translate3d(0, 0, 0) scale(0.86)",
                    transformOrigin: "top left",
                    transition: "opacity 140ms ease, transform 140ms ease",
                    willChange: "transform, opacity"
                },
                children: "new world!"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Home/Library/Library.tsx",
                lineNumber: 171,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    gap: 60,
                    alignItems: "stretch"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: "0 0 20%",
                            minWidth: 0,
                            height: "100%"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: "100%",
                                aspectRatio: "1 / 1"
                            },
                            onMouseEnter: ()=>setIsCreateHovered(true),
                            onMouseLeave: ()=>setIsCreateHovered(false),
                            onMouseMove: (e)=>{
                                const el = createTooltipRef.current;
                                if (!el) return;
                                el.style.left = `${e.clientX + 16}px`;
                                el.style.top = `${e.clientY + 16}px`;
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Home$2f$GridContainers$2f$CreateNewContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                label: busyId === "__create_new__" ? "Creating..." : "Create New",
                                size: "big",
                                disabled: busyId !== null,
                                onClick: ()=>{
                                    click();
                                    void handleCreateNew();
                                }
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/Home/Library/Library.tsx",
                                lineNumber: 228,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/Home/Library/Library.tsx",
                            lineNumber: 214,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/Home/Library/Library.tsx",
                        lineNumber: 207,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: "1 1 80%",
                            minWidth: 0,
                            height: "100%"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Home$2f$PackedGrid$2f$PackedGrid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            items: gridItems,
                            gap: 70,
                            columns: 5
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/Home/Library/Library.tsx",
                            lineNumber: 247,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/Home/Library/Library.tsx",
                        lineNumber: 240,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/Home/Library/Library.tsx",
                lineNumber: 198,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/Home/Library/Library.tsx",
        lineNumber: 158,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/src/components/Home/GridContainers/MarketplaceContainer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MarketplaceContainer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function getThemeFromId(id, opts) {
    const palette = [
        {
            key: "paris",
            colors: [
                "#F75050",
                "#B72828"
            ],
            weight: 2
        },
        {
            key: "dune",
            colors: [
                "#FE9501",
                "#CC5B0D"
            ],
            weight: 2
        },
        {
            key: "sky",
            colors: [
                "#3790E0",
                "#1C57BD"
            ],
            weight: 4
        },
        {
            key: "maya",
            colors: [
                "#BE1062",
                "#962535"
            ],
            weight: 1
        },
        {
            key: "pink",
            colors: [
                "#EF87B7",
                "#D36397"
            ],
            weight: 1
        },
        {
            key: "green",
            colors: [
                "#04C48C",
                "#00A071"
            ],
            weight: 1
        },
        {
            key: "purple",
            colors: [
                "#BA90E3",
                "#8F68B5"
            ],
            weight: 1
        }
    ];
    if (opts?.forceTheme) {
        const forced = palette.find((p)=>p.key === opts.forceTheme);
        if (forced) {
            const [top, bottom] = forced.colors;
            return {
                top,
                bottom,
                gradient: `linear-gradient(to bottom, ${top} 0%, ${bottom} 100%)`
            };
        }
    }
    const weightedPalette = [];
    for (const entry of palette){
        for(let i = 0; i < entry.weight; i++)weightedPalette.push(entry.colors);
    }
    let hash = 0;
    for(let i = 0; i < id.length; i++){
        hash = hash * 31 + id.charCodeAt(i) >>> 0;
    }
    const [top, bottom] = weightedPalette[hash % weightedPalette.length];
    return {
        top,
        bottom,
        gradient: `linear-gradient(to bottom, ${top} 0%, ${bottom} 100%)`
    };
}
function getCreatorFromId(id) {
    const creators = [
        {
            username: "bkvoxel",
            pfp: "/pfp/1.png",
            weight: 4
        },
        {
            username: "voxoking",
            pfp: "/pfp/2.png",
            weight: 2
        },
        {
            username: "maxatrillion",
            pfp: "/pfp/3.png",
            weight: 2
        },
        {
            username: "skyBoxer",
            pfp: "/pfp/4.png",
            weight: 3
        },
        {
            username: "T4ZM1N",
            pfp: "/pfp/5.png",
            weight: 1
        },
        {
            username: "3EAU",
            pfp: "/pfp/6.png",
            weight: 1
        },
        {
            username: "_money_",
            pfp: "/pfp/7.png",
            weight: 1
        },
        {
            username: "yriyriyri",
            pfp: "/pfp/8.png",
            weight: 1
        }
    ];
    const weightedCreators = [];
    for (const creator of creators){
        for(let i = 0; i < creator.weight; i++){
            weightedCreators.push({
                username: creator.username,
                pfp: creator.pfp
            });
        }
    }
    let hash = 0;
    for(let i = 0; i < id.length; i++){
        hash = hash * 31 + id.charCodeAt(i) >>> 0;
    }
    return weightedCreators[hash % weightedCreators.length];
}
function hexToRgba(hex, alpha) {
    const clean = hex.replace("#", "");
    const value = clean.length === 3 ? clean.split("").map((c)=>c + c).join("") : clean;
    const r = parseInt(value.slice(0, 2), 16);
    const g = parseInt(value.slice(2, 4), 16);
    const b = parseInt(value.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
function parseVoxelCount(meta) {
    const digits = meta.replace(/,/g, "").match(/\d+/);
    return digits ? parseInt(digits[0], 10) : 0;
}
function buildTimeFromVoxelCount(voxelCount) {
    if (voxelCount <= 250) return "15 minute build time";
    if (voxelCount <= 700) return "30 minute build time";
    if (voxelCount <= 1400) return "45 minute build time";
    return "60 minute build time";
}
function priceFromVoxelCount(voxelCount) {
    if (voxelCount <= 250) return 100;
    if (voxelCount <= 700) return 250;
    if (voxelCount <= 1400) return 500;
    return 1000;
}
function MarketplaceContainer(props) {
    const { assetId, thumbBlob = null, size = "small", title = "voxbox", meta = "", alreadyOwned = false, isBusy = false, onBuy, forceTheme } = props;
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>getThemeFromId(assetId, {
            forceTheme
        }), [
        assetId,
        forceTheme
    ]);
    const creator = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>getCreatorFromId(assetId), [
        assetId
    ]);
    const [thumbUrl, setThumbUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!thumbBlob) {
            setThumbUrl(null);
            return;
        }
        const url = URL.createObjectURL(thumbBlob);
        setThumbUrl(url);
        return ()=>{
            URL.revokeObjectURL(url);
        };
    }, [
        thumbBlob
    ]);
    const voxelCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>parseVoxelCount(meta), [
        meta
    ]);
    const buildTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>buildTimeFromVoxelCount(voxelCount), [
        voxelCount
    ]);
    const price = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>priceFromVoxelCount(voxelCount), [
        voxelCount
    ]);
    const titleSize = size === "big" ? 23 : 15;
    const metaSize = size === "big" ? 11 : 9;
    const bottomBandHeight = size === "big" ? "20%" : "25%";
    const sidePadding = size === "big" ? 14 : 10;
    const statIconSize = size === "big" ? 14 : 12;
    const userIconSize = size === "big" ? 13 : 11;
    const creatorBlockHeight = "90%";
    const pfpStroke = 2;
    const pfpOuterSize = size === "big" ? 56 : 36;
    const buttonHeight = size === "big" ? "50%" : "60%";
    const buttonStroke = 2;
    const priceOpacity = alreadyOwned ? 0.42 : 1;
    const ownedMarkOpacity = alreadyOwned ? 0.6 : 1;
    const priceFontSize = size === "big" ? 18 : 14;
    const byteSize = size === "big" ? 22 : 16;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: size === "big" ? "pix-icon-large" : "pix-icon",
        style: {
            position: "relative",
            width: "100%",
            height: "100%",
            background: theme.gradient,
            borderRadius: 0,
            color: "rgba(255,255,255,0.96)",
            userSelect: "none",
            overflow: "hidden",
            padding: size === "big" ? 14 : 10,
            boxSizing: "border-box"
        },
        children: [
            thumbUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    zIndex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: size === "big" ? 18 : 14
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: thumbUrl,
                    alt: "",
                    style: {
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        opacity: 0.95,
                        filter: "drop-shadow(0 8px 14px rgba(255,0,0,0.1))",
                        transform: size === "small" ? "scale(0.7)" : "scale(1)",
                        transformOrigin: "center center"
                    }
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/Home/GridContainers/MarketplaceContainer.tsx",
                    lineNumber: 207,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Home/GridContainers/MarketplaceContainer.tsx",
                lineNumber: 195,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: bottomBandHeight,
                    background: hexToRgba(theme.top, 0.3),
                    pointerEvents: "none",
                    zIndex: 0
                }
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Home/GridContainers/MarketplaceContainer.tsx",
                lineNumber: 223,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "relative",
                    zIndex: 1,
                    minWidth: 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: titleSize,
                            lineHeight: 1.02,
                            marginBottom: 6,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                        },
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/Home/GridContainers/MarketplaceContainer.tsx",
                        lineNumber: 243,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 4
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    fontSize: metaSize,
                                    opacity: 0.86,
                                    lineHeight: 1.2,
                                    minWidth: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap"
                                        },
                                        children: meta
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/Home/GridContainers/MarketplaceContainer.tsx",
                                        lineNumber: 274,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: "/marketplace/voxel.png",
                                        alt: "",
                                        style: {
                                            width: statIconSize,
                                            height: statIconSize,
                                            objectFit: "contain",
                                            imageRendering: "pixelated",
                                            flexShrink: 0,
                                            opacity: 0.86
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/Home/GridContainers/MarketplaceContainer.tsx",
                                        lineNumber: 283,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/Home/GridContainers/MarketplaceContainer.tsx",
                                lineNumber: 263,
                                columnNumber: 11
                            }, this),
                            size === "big" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    fontSize: metaSize,
                                    opacity: 0.86,
                                    lineHeight: 1.2,
                                    minWidth: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap"
                                        },
                                        children: buildTime
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/Home/GridContainers/MarketplaceContainer.tsx",
                                        lineNumber: 309,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: "/marketplace/hourglass.png",
                                        alt: "",
                                        style: {
                                            width: statIconSize,
                                            height: statIconSize,
                                            objectFit: "contain",
                                            imageRendering: "pixelated",
                                            flexShrink: 0,
                                            opacity: 0.86
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/Home/GridContainers/MarketplaceContainer.tsx",
                                        lineNumber: 318,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/Home/GridContainers/MarketplaceContainer.tsx",
                                lineNumber: 298,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/Home/GridContainers/MarketplaceContainer.tsx",
                        lineNumber: 256,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/Home/GridContainers/MarketplaceContainer.tsx",
                lineNumber: 236,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    left: sidePadding,
                    right: sidePadding,
                    bottom: 0,
                    height: bottomBandHeight,
                    zIndex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            height: creatorBlockHeight,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            minWidth: 0
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                minWidth: 0,
                                height: "100%"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        height: pfpOuterSize,
                                        aspectRatio: "1 / 1",
                                        background: "#ffffff",
                                        padding: pfpStroke,
                                        flexShrink: 0,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxSizing: "border-box"
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: creator.pfp,
                                        alt: creator.username,
                                        style: {
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            imageRendering: "pixelated",
                                            display: "block"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/Home/GridContainers/MarketplaceContainer.tsx",
                                        lineNumber: 380,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/Home/GridContainers/MarketplaceContainer.tsx",
                                    lineNumber: 367,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        minWidth: 0,
                                        height: "100%"
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 2,
                                            minWidth: 0
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: "/marketplace/user.png",
                                                alt: "",
                                                style: {
                                                    width: userIconSize,
                                                    height: userIconSize,
                                                    objectFit: "contain",
                                                    imageRendering: "pixelated",
                                                    flexShrink: 0,
                                                    opacity: 1
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/Home/GridContainers/MarketplaceContainer.tsx",
                                                lineNumber: 410,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: metaSize,
                                                    color: "#ffffff",
                                                    lineHeight: 1,
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis"
                                                },
                                                children: creator.username
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/Home/GridContainers/MarketplaceContainer.tsx",
                                                lineNumber: 422,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/components/Home/GridContainers/MarketplaceContainer.tsx",
                                        lineNumber: 401,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/Home/GridContainers/MarketplaceContainer.tsx",
                                    lineNumber: 392,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/Home/GridContainers/MarketplaceContainer.tsx",
                            lineNumber: 358,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/Home/GridContainers/MarketplaceContainer.tsx",
                        lineNumber: 349,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 8,
                            flexShrink: 0,
                            height: "100%",
                            alignItems: "center"
                        },
                        onClick: (e)=>e.stopPropagation(),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "pix-input",
                            disabled: isBusy || alreadyOwned,
                            onClick: alreadyOwned ? undefined : onBuy,
                            style: {
                                appearance: "none",
                                border: `${buttonStroke}px solid rgba(255,255,255,${ownedMarkOpacity})`,
                                background: "rgba(255,255,255,0.08)",
                                color: "white",
                                borderRadius: 0,
                                height: buttonHeight,
                                padding: size === "big" ? "0 10px" : "0 8px",
                                cursor: isBusy || alreadyOwned ? "default" : "pointer",
                                opacity: isBusy ? 0.7 : 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxSizing: "border-box"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: "relative",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    opacity: priceOpacity,
                                    lineHeight: 1
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: priceFontSize,
                                            color: "#ffffff",
                                            whiteSpace: "nowrap"
                                        },
                                        children: price
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/Home/GridContainers/MarketplaceContainer.tsx",
                                        lineNumber: 479,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: "/marketplace/byte.png",
                                        alt: "",
                                        style: {
                                            width: byteSize,
                                            height: byteSize,
                                            objectFit: "contain",
                                            imageRendering: "pixelated",
                                            flexShrink: 0,
                                            display: "block"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/Home/GridContainers/MarketplaceContainer.tsx",
                                        lineNumber: 489,
                                        columnNumber: 15
                                    }, this),
                                    alreadyOwned && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: "absolute",
                                            left: -2,
                                            right: -2,
                                            top: "50%",
                                            height: 4,
                                            background: `rgba(255,255,255)`,
                                            transform: "translateY(-50%)",
                                            pointerEvents: "none"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/Home/GridContainers/MarketplaceContainer.tsx",
                                        lineNumber: 503,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/Home/GridContainers/MarketplaceContainer.tsx",
                                lineNumber: 469,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/Home/GridContainers/MarketplaceContainer.tsx",
                            lineNumber: 449,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/Home/GridContainers/MarketplaceContainer.tsx",
                        lineNumber: 439,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/Home/GridContainers/MarketplaceContainer.tsx",
                lineNumber: 335,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/Home/GridContainers/MarketplaceContainer.tsx",
        lineNumber: 179,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/src/components/Home/Marketplace/Marketplace.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Marketplace
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Home$2f$PackedGrid$2f$PackedGrid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/Home/PackedGrid/PackedGrid.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Home$2f$GridContainers$2f$MarketplaceContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/Home/GridContainers/MarketplaceContainer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/repositories/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/audio/SoundProvider.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function Marketplace() {
    const { click } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSound"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [marketplaceAssets, setMarketplaceAssets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [ownedByMarketplaceId, setOwnedByMarketplaceId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Map());
    const [busyAssetId, setBusyAssetId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    async function refresh() {
        setLoading(true);
        try {
            const [marketRows, privateRows] = await Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].listMarketplaceAssets(),
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].listPrivateAssets()
            ]);
            const nextOwned = new Map();
            for (const asset of privateRows){
                const linkedMarketplaceAssetId = asset.linkedMarketplaceAssetId ?? null;
                if (!linkedMarketplaceAssetId) continue;
                const existing = nextOwned.get(linkedMarketplaceAssetId);
                if (existing) {
                    existing.count += 1;
                    existing.privateAssetIds.push(asset.id);
                } else {
                    nextOwned.set(linkedMarketplaceAssetId, {
                        count: 1,
                        privateAssetIds: [
                            asset.id
                        ]
                    });
                }
            }
            setMarketplaceAssets(marketRows);
            setOwnedByMarketplaceId(nextOwned);
        } finally{
            setLoading(false);
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        void refresh();
    }, []);
    async function onBuy(marketplaceAssetId) {
        if (busyAssetId) return;
        if (ownedByMarketplaceId.has(marketplaceAssetId)) return;
        try {
            setBusyAssetId(marketplaceAssetId);
            click();
            const newPrivateAssetId = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$repositories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assetRepository"].acquireMarketplaceAssetToLibrary(marketplaceAssetId);
            setOwnedByMarketplaceId((prev)=>{
                const next = new Map(prev);
                next.set(marketplaceAssetId, {
                    count: 1,
                    privateAssetIds: [
                        newPrivateAssetId
                    ]
                });
                return next;
            });
        } catch (err) {
            console.error("Failed to acquire marketplace asset", err);
        } finally{
            setBusyAssetId(null);
        }
    }
    const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return marketplaceAssets.map((asset, index)=>{
            const owned = ownedByMarketplaceId.get(asset.id);
            const alreadyOwned = !!owned;
            const size = asset.voxelCount > 1000 ? "big" : "small";
            return {
                id: asset.id,
                size,
                content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Home$2f$GridContainers$2f$MarketplaceContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    assetId: asset.id,
                    forceTheme: index === 0 ? "sky" : undefined,
                    thumbBlob: asset.thumb ?? null,
                    size: size,
                    title: asset.name,
                    subtitle: "by bkvoxel",
                    meta: `${asset.voxelCount.toLocaleString()} voxels`,
                    footer: alreadyOwned ? "Owned" : "Available to buy",
                    isBusy: busyAssetId === asset.id,
                    alreadyOwned: alreadyOwned,
                    onBuy: ()=>void onBuy(asset.id)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/Home/Marketplace/Marketplace.tsx",
                    lineNumber: 97,
                    columnNumber: 11
                }, this)
            };
        });
    }, [
        marketplaceAssets,
        ownedByMarketplaceId,
        busyAssetId
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "absolute",
            top: 30,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 20,
            pointerEvents: "auto",
            paddingTop: 30,
            paddingLeft: 4,
            paddingRight: 4
        },
        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "pix-logo",
            style: {
                fontSize: 24,
                color: "#DBFAFF",
                opacity: 0.9
            },
            children: "Loading marketplace..."
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/Home/Marketplace/Marketplace.tsx",
            lineNumber: 131,
            columnNumber: 9
        }, this) : items.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                position: "relative",
                width: "100%",
                height: "100%"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Home$2f$PackedGrid$2f$PackedGrid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                items: items,
                columns: 7
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Home/Marketplace/Marketplace.tsx",
                lineNumber: 149,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/Home/Marketplace/Marketplace.tsx",
            lineNumber: 142,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "pix-logo",
            style: {
                fontSize: 24,
                color: "#DBFAFF",
                opacity: 0.9
            },
            children: "No marketplace assets"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/Home/Marketplace/Marketplace.tsx",
            lineNumber: 180,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/Home/Marketplace/Marketplace.tsx",
        lineNumber: 116,
        columnNumber: 5
    }, this);
}
}),
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
"[project]/apps/web/src/app/HomeClient.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomeClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Auth$2f$LoginScreen$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/Auth/LoginScreen.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Auth$2f$state$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/Auth/state.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$database$2f$nukeEditorDatabases$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/database/nukeEditorDatabases.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$database$2f$AssetPresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/database/AssetPresets.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/audio/SoundProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Home$2f$Atlas$2f$Atlas$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/Home/Atlas/Atlas.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Home$2f$Library$2f$Library$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/Home/Library/Library.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Home$2f$Marketplace$2f$Marketplace$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/Home/Marketplace/Marketplace.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$ui$2f$LoadingOverlay$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/VoxelEditor/ui/LoadingOverlay.tsx [app-ssr] (ecmascript)");
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
const STATIC_IMAGE_PATHS = [
    "/pfp/1.png",
    "/pfp/2.png",
    "/pfp/3.png",
    "/pfp/4.png",
    "/pfp/5.png",
    "/pfp/6.png",
    "/pfp/7.png",
    "/pfp/8.png",
    "/library/1.png",
    "/library/2.png",
    "/library/3.png",
    "/library/4.png",
    "/library/createnew.png",
    "/library/create.png",
    "/library/delete.png",
    "/atlas/expand.png",
    "/atlas/play.png",
    "/marketplace/byte.png",
    "/marketplace/hourglass.png",
    "/marketplace/user.png",
    "/marketplace/voxel.png"
];
const STATIC_VIDEO_PATHS = [
    "/focus/screen.mp4"
];
function preloadImage(src) {
    return new Promise((resolve)=>{
        const img = new Image();
        img.decoding = "async";
        img.onload = ()=>resolve();
        img.onerror = ()=>resolve();
        img.src = src;
    });
}
function preloadVideo(src) {
    return new Promise((resolve)=>{
        const video = document.createElement("video");
        let done = false;
        const finish = ()=>{
            if (done) return;
            done = true;
            video.onloadeddata = null;
            video.oncanplay = null;
            video.onerror = null;
            resolve();
        };
        video.preload = "auto";
        video.muted = true;
        video.playsInline = true;
        video.onloadeddata = finish;
        video.oncanplay = finish;
        video.onerror = finish;
        video.src = src;
        video.load();
        window.setTimeout(finish, 2500);
    });
}
async function preloadStaticHomeAssets(onStatus) {
    onStatus?.("preloading interface…");
    await Promise.all([
        ...STATIC_IMAGE_PATHS.map((src)=>preloadImage(src)),
        ...STATIC_VIDEO_PATHS.map((src)=>preloadVideo(src))
    ]);
}
function HomeClientInner() {
    const { auth, setAuth, clearAuth } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Auth$2f$state$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthState"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [presetsReady, setPresetsReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [presetProgress, setPresetProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [loadingText, setLoadingText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("booting…");
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("library");
    const { click } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$audio$2f$SoundProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSound"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        async function boot() {
            setPresetsReady(false);
            setPresetProgress(0);
            if (!auth.accessToken) {
                if (!cancelled) {
                    setAuth({
                        ...auth,
                        bootstrapped: true,
                        isAuthenticated: false,
                        me: null
                    });
                    setLoading(false);
                }
                return;
            }
            setLoading(true);
            try {
                const me = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Me"])();
                if (cancelled) return;
                setAuth({
                    ...auth,
                    isAuthenticated: true,
                    me,
                    bootstrapped: true
                });
                setLoadingText("loading presets…");
                setPresetProgress(0);
                await Promise.all([
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$database$2f$AssetPresets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ensurePresetAssetsInstalledOnce"])({
                        onProgress: (p, info)=>{
                            if (cancelled) return;
                            setPresetProgress(p);
                            if (info?.name) {
                                setLoadingText(`installing: ${info.name}`);
                            } else if (info?.done != null && info?.total != null) {
                                setLoadingText(`installing presets… (${info.done}/${info.total})`);
                            } else {
                                setLoadingText("installing presets…");
                            }
                        }
                    }),
                    preloadStaticHomeAssets()
                ]);
                if (cancelled) return;
                setPresetProgress(1);
                setLoadingText("finalizing…");
                setPresetsReady(true);
            } catch (e) {
                console.error("Home boot failed", e);
                if (cancelled) return;
                clearAuth();
            } finally{
                if (!cancelled) setLoading(false);
            }
        }
        boot();
        return ()=>{
            cancelled = true;
        };
    }, [
        auth.accessToken
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    }, [
        auth,
        clearAuth
    ]);
    const showBootOverlay = loading || !auth.bootstrapped || auth.isAuthenticated && !presetsReady;
    if (showBootOverlay) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            style: {
                width: "100vw",
                height: "100vh",
                position: "relative",
                overflow: "hidden",
                backgroundColor: "#368fe4",
                backgroundImage: "url('/world/bg.png')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                backgroundSize: "cover"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$VoxelEditor$2f$ui$2f$LoadingOverlay$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                show: true,
                progress: auth.isAuthenticated ? presetProgress : 0,
                text: auth.isAuthenticated ? loadingText : "booting…",
                fadeMs: 120
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/HomeClient.tsx",
                lineNumber: 225,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/src/app/HomeClient.tsx",
            lineNumber: 212,
            columnNumber: 7
        }, this);
    }
    if (!auth.isAuthenticated) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Auth$2f$LoginScreen$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/apps/web/src/app/HomeClient.tsx",
            lineNumber: 236,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: {
            width: "100vw",
            height: "100vh",
            position: "relative",
            overflow: "hidden",
            backgroundColor: "#DBFAFF"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
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
                    pointerEvents: "none",
                    zIndex: 0,
                    transform: "scale(1.01)",
                    transformOrigin: "center center"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                    src: "/focus/screen.mp4",
                    type: "video/mp4"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/app/HomeClient.tsx",
                    lineNumber: 267,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/HomeClient.tsx",
                lineNumber: 249,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    inset: 0,
                    zIndex: 1
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 52,
                            zIndex: 90,
                            pointerEvents: "none"
                        }
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/HomeClient.tsx",
                        lineNumber: 277,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "absolute",
                            top: 20,
                            right: 24,
                            zIndex: 100,
                            display: "flex",
                            gap: 30,
                            alignItems: "center",
                            pointerEvents: "auto"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "pix-icon",
                                onClick: ()=>{
                                    click();
                                    setTab("games");
                                },
                                style: {
                                    color: "#20293D",
                                    cursor: "pointer",
                                    opacity: tab === "games" ? 1 : 0.75,
                                    userSelect: "none",
                                    fontSize: 28,
                                    overflow: "visible"
                                },
                                children: "Atlas"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/HomeClient.tsx",
                                lineNumber: 301,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "pix-icon",
                                onClick: ()=>{
                                    click();
                                    setTab("library");
                                },
                                style: {
                                    color: "#20293D",
                                    cursor: "pointer",
                                    opacity: tab === "library" ? 1 : 0.75,
                                    userSelect: "none",
                                    fontSize: 28,
                                    overflow: "visible"
                                },
                                children: "Library"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/HomeClient.tsx",
                                lineNumber: 319,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "pix-icon",
                                onClick: ()=>{
                                    click();
                                    setTab("marketplace");
                                },
                                style: {
                                    color: "#20293D",
                                    cursor: "pointer",
                                    opacity: tab === "marketplace" ? 1 : 0.75,
                                    userSelect: "none",
                                    fontSize: 28,
                                    overflow: "visible"
                                },
                                children: "Marketplace"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/HomeClient.tsx",
                                lineNumber: 337,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/app/HomeClient.tsx",
                        lineNumber: 289,
                        columnNumber: 9
                    }, this),
                    tab === "marketplace" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Home$2f$Marketplace$2f$Marketplace$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/apps/web/src/app/HomeClient.tsx",
                        lineNumber: 356,
                        columnNumber: 35
                    }, this),
                    tab === "library" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Home$2f$Library$2f$Library$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/apps/web/src/app/HomeClient.tsx",
                        lineNumber: 357,
                        columnNumber: 31
                    }, this),
                    tab === "games" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Home$2f$Atlas$2f$Atlas$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/apps/web/src/app/HomeClient.tsx",
                        lineNumber: 358,
                        columnNumber: 29
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/HomeClient.tsx",
                lineNumber: 270,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/app/HomeClient.tsx",
        lineNumber: 240,
        columnNumber: 5
    }, this);
}
function HomeClient() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(HomeClientInner, {}, void 0, false, {
        fileName: "[project]/apps/web/src/app/HomeClient.tsx",
        lineNumber: 365,
        columnNumber: 10
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__bf6e51c7._.js.map