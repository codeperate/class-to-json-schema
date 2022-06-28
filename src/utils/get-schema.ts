export const JSON_SCHEMA_KEY = Symbol('json-schema');
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
    let propertyType = Reflect.getMetadata('design:type', target, propertyKey);
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

export declare enum SpecTypes {
  JSON = "jsonschema",
  SWAGGER = "swagger2",
  OPENAPI = "openapi3"
}

export interface JsonSchemaOptions {
  specType?: SpecTypes;
  customKeys?: boolean;
  [key: string]: any;
}

export function getJsonSchema(entity:any, options?: JsonSchemaOptions){
  
   const schema = Reflect.getMetadata(JSON_SCHEMA_KEY, entity) as JSONSchema;
   return schema
}