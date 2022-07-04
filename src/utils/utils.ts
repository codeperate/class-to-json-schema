import { Class, SpecTypes } from '../types';

export function isClass(func) {
    return typeof func === 'function' && /^class\s/.test(Function.prototype.toString.call(func));
}

export function replaceAll(src: string, find: string, replace: string) {
    return src.replace(new RegExp(find, 'g'), replace);
}

export function typeTransformer(type: typeof Number | typeof String | typeof Boolean | typeof Object | Class, specType: SpecTypes, schemaRefPath: String): Object {
    let t = type.name.toLowerCase()
    if (isClass(type)) {
        if (schemaRefPath) return { items: {$ref:`${schemaRefPath}/${t}`} };
        if (specType === SpecTypes.SWAGGER || specType === SpecTypes.OPENAPI) return { items: {$ref:`#/components/schemas/${t}`} };
        return { items: {$ref:`#/definitions/${t}`} };
    }
    return { items: {type:t} };
}
