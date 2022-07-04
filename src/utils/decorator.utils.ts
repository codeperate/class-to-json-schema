import { JSONSchema } from '../class';
import { SchemaDecorators } from '../enum';
import { DecoratedMap } from '../types/decorated-map';
import { JsonSchemaOptions, JSON_SCHEMA_KEY } from './get-schema';

interface DecoratedMapper {
    target: object;
    propertyKey: string;
    parameters?: any;
    schemaDecorator: SchemaDecorators;
    fn: (arg: any, schema: JSONSchema,propertyKey:string,jsonSchemaOptions:Partial<JsonSchemaOptions>) => void;
}

export function decoratorMapper(decoratedMapper: Partial<DecoratedMapper>) {
    const { propertyKey, schemaDecorator, fn, parameters,target } = decoratedMapper;
    let decoratedMap: DecoratedMap = Reflect.getMetadata(JSON_SCHEMA_KEY, target.constructor);
    if (!decoratedMap) decoratedMap = {  };
    if(!decoratedMap[propertyKey]) decoratedMap[propertyKey]=[]
    decoratedMap[propertyKey].push({
        type: schemaDecorator,
        args: parameters,
        fn,
    });
    Reflect.defineMetadata(JSON_SCHEMA_KEY,decoratedMap,target.constructor)
    return decoratedMap;
}
