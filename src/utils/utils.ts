
export function isClass(func) {
    return typeof func === 'function' && /^class\s/.test(Function.prototype.toString.call(func));
}

export function replaceAll(src: string, find: string, replace: string) {
    return src.replace(new RegExp(find, 'g'), replace);
}

