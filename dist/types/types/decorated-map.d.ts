import { JSONSchema } from '../class';
import { SchemaDecorators } from '../enum';
import { JsonSchemaOptions } from '../utils';
export declare type DecoratedContent = {
    type: SchemaDecorators;
    args: any;
    fn: (arg: any, schema: JSONSchema, propertyKey: string, jsonSchemaOptions: Partial<JsonSchemaOptions>) => void;
};
export declare type DecoratedMap = {
    [key: string]: DecoratedContent[];
};
export declare type Class<T = any> = new (...args: any[]) => T;
