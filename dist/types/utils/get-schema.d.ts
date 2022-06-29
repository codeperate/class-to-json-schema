export declare const JSON_SCHEMA_KEY: unique symbol;
import { JSONSchema } from '../class/json-schema';
import { SchemaDecorators } from '../enum/decorator';
import { SpecTypes } from '../types/spec-type';
export declare function getSchema(target: object, propertyKey?: string | symbol): JSONSchema<any>;
export declare function setSchemaByMetaType(schema: JSONSchema, target: object, propertyKey?: string): void;
export interface ConvertersOptions<T = any> {
    target: object;
    meta: any;
    schema: JSONSchema;
    arguments: T;
    defaultConverter: Function;
}
interface JsonSchemaOptions {
    specTypes: SpecTypes;
    schemaRefPath: string;
    additionalConverters: {
        [schemaDecorator in SchemaDecorators]: (convertersOptions: Partial<ConvertersOptions>) => JSONSchema;
    };
}
export declare function getJsonSchema(entity: any, jsonSchemaOptions: Partial<JsonSchemaOptions>): JSONSchema<any>;
export {};
