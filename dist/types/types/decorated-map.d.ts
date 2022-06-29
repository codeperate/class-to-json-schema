import { JSONSchema } from '../class';
import { SchemaDecorators } from '../enum';
export declare type DecoratedContent = {
    type: SchemaDecorators;
    args: any;
    fn: (arg: any, schema: JSONSchema) => void;
};
export declare type DecoratedMap = {
    [key: string]: DecoratedContent[];
};
