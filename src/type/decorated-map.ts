import { JSONSchema } from '../class';
import { SchemaDecorators } from '../enum';
import { JsonSchemaOptions } from '../utils';
export const CLASS_DECORATEDMAP_KEY = Symbol('CLASS_DECORATEDMAP_KEY');
export type DecoratedContent = {
    type: SchemaDecorators;
    args: any;
    fn: (arg: any, schema: JSONSchema, propertyKey: string, jsonSchemaOptions: Partial<JsonSchemaOptions>) => void;
};
export type DecoratedMap =
    | {
          [key: string]: DecoratedContent[];
      }
    | {
          [CLASS_DECORATEDMAP_KEY]: DecoratedContent[];
      };
