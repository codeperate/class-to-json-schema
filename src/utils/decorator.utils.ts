import { JSONSchema } from '../class';
import { SchemaDecorators } from '../enum';
import { DecoratedMap } from '../types/decorated-map';
import { JSON_CLASS_KEY, JSON_SCHEMA_KEY } from './get-schema';

interface DecoratedMapper {
    target: object;
    propertyKey: string;
    parameters?: any;
    schemaDecorator: SchemaDecorators;
    fn: (arg: any, schema: JSONSchema,propertyKey:string) => void;
}

export function decoratorMapper(decoratedMapper: Partial<DecoratedMapper>) {
    const { propertyKey, schemaDecorator, fn, parameters,target } = decoratedMapper;
    let decoratedMap: DecoratedMap = Reflect.getMetadata((propertyKey)? JSON_SCHEMA_KEY : JSON_CLASS_KEY, target.constructor);
    if (!decoratedMap) decoratedMap = {  };
    if(!decoratedMap[propertyKey]) decoratedMap[propertyKey]=[]
    
    decoratedMap[propertyKey].push({
        type: schemaDecorator,
        args: parameters,
        fn,
    });
    Reflect.defineMetadata((propertyKey)? JSON_SCHEMA_KEY : JSON_CLASS_KEY,decoratedMap,target.constructor)
    return decoratedMap;
}
