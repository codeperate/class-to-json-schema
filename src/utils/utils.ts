import { JSONSchema7 } from 'json-schema';

export function isClass(func) {
    return typeof func === 'function' && /^class\s/.test(Function.prototype.toString.call(func));
}

export function replaceAll(src: string, find: string, replace: string) {
    return src.replace(new RegExp(find, 'g'), replace);
}

export function propertiesHelper(schemaProperties: JSONSchema7, obj:{[key in string]: string}) {
    const k = Object.keys(obj)[0]
    if (schemaProperties.type === 'array') {
        schemaProperties.items = { ...(schemaProperties.items as object), ...obj };
    } else schemaProperties[k] = obj[k]
    return schemaProperties;
}
