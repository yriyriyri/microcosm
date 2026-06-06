"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyOf = keyOf;
exports.add = add;
exports.isSame = isSame;
function keyOf(coord) {
    return `${coord.x},${coord.y},${coord.z}`;
}
function add(a, b) {
    return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}
function isSame(a, b) {
    return a.x === b.x && a.y === b.y && a.z === b.z;
}
