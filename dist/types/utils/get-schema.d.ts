export declare const JSON_SCHEMA_KEY: unique symbol;
import { JSONSchema } from '../class/json-schema';
export declare function getSchema(target: object, propertyKey?: string | symbol): JSONSchema<any>;
export declare function getSchemaByMetaType(target: object, propertyKey?: string | symbol): JSONSchema;
export declare enum SpecTypes {
    JSON = "jsonschema",
    SWAGGER = "swagger2",
    OPENAPI = "openapi3"
}
export declare function getJsonSchema(entity: any, specTypes?: SpecTypes): JSONSchema<any>;
