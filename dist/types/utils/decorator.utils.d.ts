import { JSONSchema } from '../class';
import { SchemaDecorators } from '../enum';
import { DecoratedMap } from '../types/decorated-map';
import { JsonSchemaOptions } from './get-schema';
interface DecoratedMapper {
    target: object;
    propertyKey: string;
    parameters?: any;
    schemaDecorator: SchemaDecorators;
    fn: (arg: any, schema: JSONSchema, propertyKey: string, jsonSchemaOptions: Partial<JsonSchemaOptions>) => void;
}
export declare function decoratorMapper(decoratedMapper: Partial<DecoratedMapper>): DecoratedMap;
export {};
