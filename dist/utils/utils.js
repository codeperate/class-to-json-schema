"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceAll = exports.isClass = void 0;
function isClass(func) {
    return typeof func === 'function' && /^class\s/.test(Function.prototype.toString.call(func));
}
exports.isClass = isClass;
function replaceAll(src, find, replace) {
    return src.replace(new RegExp(find, 'g'), replace);
}
exports.replaceAll = replaceAll;
