import { JSONSchema7, JSONSchema7TypeName } from 'json-schema';

export function isClass(func) {
    return typeof func === 'function' && /^class\s/.test(Function.prototype.toString.call(func));
}

export function replaceAll(src: string, find: string, replace: string) {
    return src.replace(new RegExp(find, 'g'), replace);
}

export function addType(s: JSONSchema7, type: JSONSchema7TypeName) {
    if (s.type == null) s.type = type;
    else if (Array.isArray(s.type) && !s.type.find((t) => t == type)) s.type.push(type);
    else if (!Array.isArray(s.type) && s.type != type) s.type = [s.type, type];
}
export function replaceType(s: JSONSchema7, fromType: JSONSchema7TypeName, toType: JSONSchema7TypeName) {
    if (Array.isArray(s.type)) s.type = s.type.map((t) => (t == fromType ? toType : t));
    else s.type = toType;
}
export function setType(s: JSONSchema7, type: JSONSchema7TypeName) {
    if (s.type == null) s.type = type;
    let isNullable = false;
    if (s.type == 'null') isNullable = true;
    else if (Array.isArray(s.type) && s.type.includes('null')) isNullable = true;
    if (isNullable) s.type = [type, 'null'];
    else s.type = type;
}
