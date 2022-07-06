export function isCustomClass(obj: Function) {
    return [Object.prototype, Number.prototype, String.prototype, Boolean.prototype, Array.prototype, Function.prototype, Date.prototype].every(
        p => p !== obj.prototype,
    );
}
