import { ClassOrAbstractClass } from '../type/class';
import { isClass } from './utils';

export interface TransformerType {
    type: typeof Number | typeof String | typeof Boolean | typeof Object | ClassOrAbstractClass;
    schemaRefPath: String;
}

export function classTransformer(transformerType: TransformerType): Object {
    const { type, schemaRefPath } = transformerType;
    let t = (type as Function)?.name;
    if (type.prototype === Date.prototype) t = 'string';
    if (t) t = t.charAt(0).toLowerCase() + t.slice(1);
    if (isClass(type)) return { $ref: `${schemaRefPath}${t.charAt(0).toUpperCase() + t.slice(1)}` };
    return { type: t };
}
