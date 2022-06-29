export declare const JSON_SCHEMA_KEY: unique symbol;
import { JSONSchema } from '../class/json-schema';
import { SchemaDecorators } from '../enum/decorator';
import { SpecTypes } from '../types/spec';
export declare function getSchema(target: object, propertyKey?: string | symbol): JSONSchema<any>;
export declare function getSchemaByMetaType(target: object, propertyKey?: string | symbol): JSONSchema;
export interface ConvertersOptions {
    target: object;
    meta: any;
    defaultConverter: Function;
    schema: JSONSchema;
}
interface JsonSchemaOptions {
    specTypes: SpecTypes;
    schemaRefPath: string;
    additionalConverters: {
        [schemaDecorator in SchemaDecorators]: (convertersOptions: ConvertersOptions) => JSONSchema;
    };
}
export declare function getJsonSchema(entity: any, jsonSchemaOptions: Partial<JsonSchemaOptions>): JSONSchema<any>;
export {};
