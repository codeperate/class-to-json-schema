import { JSONSchema7, JSONSchema7TypeName } from 'json-schema';

export function isClass(func) {
    return typeof func === 'function' && /^class\s/.test(Function.prototype.toString.call(func));
}

export function replaceAll(src: string, find: string, replace: string) {
    return src.replace(new RegExp(find, 'g'), replace);
}

export function addType(s: JSONSchema7, type: JSONSchema7TypeName) {
    if (s.type == null) s.type = type;
    else if (Array.isArray(s.type)) s.type.push(type);
    else s.type = [s.type, type];
}
