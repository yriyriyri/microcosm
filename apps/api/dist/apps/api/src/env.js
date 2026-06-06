"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_PATH = exports.DATA_DIR = exports.VOXL_WEB_ORIGIN = exports.VOXL_AUTH_API_URL = exports.VOXL_API_PORT = exports.REPO_ROOT = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
const CWD = process.cwd();
const WORKSPACE_SUFFIX = node_path_1.default.join("apps", "api");
exports.REPO_ROOT = CWD.endsWith(WORKSPACE_SUFFIX)
    ? node_path_1.default.resolve(CWD, "../..")
    : CWD;
exports.VOXL_API_PORT = Number(process.env.VOXL_API_PORT ?? "4001");
exports.VOXL_AUTH_API_URL = process.env.VOXL_AUTH_API_URL ?? "https://api.voxldev.world";
exports.VOXL_WEB_ORIGIN = process.env.VOXL_WEB_ORIGIN ?? "*";
exports.DATA_DIR = process.env.VOXL_API_DATA_DIR ?? node_path_1.default.join(exports.REPO_ROOT, "data", "api");
exports.DATABASE_PATH = process.env.VOXL_API_DATABASE_PATH ?? node_path_1.default.join(exports.DATA_DIR, "microcosm.sqlite");
(0, node_fs_1.mkdirSync)(exports.DATA_DIR, { recursive: true });
