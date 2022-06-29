import { JSONSchema } from '../class';
import { SchemaDecorators } from '../enum';
import { DecoratedMap } from '../types/decorated-map';
interface DecoratedMapper {
    target: object;
    propertyKey: string;
    parameters: any;
    schemaDecorator: SchemaDecorators;
    fn: (arg: any, schema: JSONSchema) => void;
}
export declare function decoratorMapper(decoratedMapper: DecoratedMapper): DecoratedMap;
export {};
