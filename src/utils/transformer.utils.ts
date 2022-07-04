import { Class, SpecTypes } from '../types';
import { isClass } from './utils';

export interface TransformerType {
    type: typeof Number | typeof String | typeof Boolean | typeof Object | String | Class;
    specType: SpecTypes;
    schemaRefPath: String;
    isArray: boolean;
}

export function classTransformer(transformerType: TransformerType): Object {
    const { type, specType, schemaRefPath, isArray } = transformerType;
    let t = (type as Function)?.name?.toLowerCase();
    if (isClass(type)) {
        if (schemaRefPath) return objectToSchema(isArray, true, `${schemaRefPath}/${t}`);
        if (specType === SpecTypes.SWAGGER || specType === SpecTypes.OPENAPI) return objectToSchema(isArray, true, `#/components/schemas/${t}`);
        return objectToSchema(isArray, true, `#/definitions/${t}`);
    }
    if (typeof type === 'string') return objectToSchema(isArray, false, type);
    return objectToSchema(isArray, false, t);
}

export function objectToSchema(isArray: boolean, isRef: boolean, name: string) {
    if (isArray) return { type: 'array', items: { ...(isRef ? { $ref: name } : { type: name }) } };
    return { ...(isRef ? { $ref: name } : { type: name }) };
}
