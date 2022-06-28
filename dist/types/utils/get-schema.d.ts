export declare const JSON_SCHEMA_KEY: unique symbol;
import { JSONSchema } from '../class/json-schema';
import { SpecTypes } from '../types/spec';
export declare function getSchema(target: object, propertyKey?: string | symbol): JSONSchema<any>;
export declare function getSchemaByMetaType(target: object, propertyKey?: string | symbol): JSONSchema;
export declare function getJsonSchema(entity: any, specTypes?: SpecTypes): JSONSchema<any>;
