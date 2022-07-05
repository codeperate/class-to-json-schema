import { JSONSchema } from '../class';
import { SchemaDecorators } from '../enum';
import { JsonSchemaOptions } from '../utils';

export type DecoratedContent = {
    type: SchemaDecorators;
    args: any;
    fn: (arg: any, schema: JSONSchema, propertyKey: string, jsonSchemaOptions: Partial<JsonSchemaOptions>) => void;
};
export type DecoratedMap = {
    [key: string]: DecoratedContent[];
};
