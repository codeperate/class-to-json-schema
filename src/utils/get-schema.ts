export const JSON_SCHEMA_KEY = Symbol('json-schema');
import { JSONSchema7 } from 'json-schema';
import { JSONSchema } from '../class/json-schema';
import { setSchema } from './set-schema';
export function getSchema(target: object, propertyKey?: string | symbol) {
    const schema = Reflect.getMetadata(JSON_SCHEMA_KEY, target) as JSONSchema;
    if (!schema) {
        const _schema = getSchemaByMetaType(target, propertyKey);
        setSchema(target, _schema);
        return _schema;
    }
    return schema;
}

export function getSchemaByMetaType(target: object, propertyKey?: string | symbol): JSONSchema {
    const propertyType = Reflect.getMetadata('design:type', target, propertyKey);
    const schema = new JSONSchema({
        type: 'object',
        properties: {
            [propertyKey]: {
                type: propertyType,
            },
        },
    });
    Reflect.defineMetadata(JSON_SCHEMA_KEY, schema, target);
    return schema;
}

export function getJsonSchema(){
  
}