import { JSONSchema } from '../class';
import { SchemaDecorators } from '../enum';
import { Class, DecoratedMap } from '../types/decorated-map';
import { JsonSchemaOptions, JSON_SCHEMA_KEY, JSON_CLASS_KEY } from './get-schema';

interface DecoratedMapper {
    target: object;
    propertyKey: string;
    parameters?: any;
    schemaDecorator: SchemaDecorators;
    fn: (arg: any, schema: JSONSchema, propertyKey: string,isAssignToObj:boolean,jsonSchemaOptions: Partial<JsonSchemaOptions>) => void;
}

export function decoratorMapper(decoratedMapper: Partial<DecoratedMapper>) {
    const { propertyKey, schemaDecorator, fn, parameters, target } = decoratedMapper;
    const t = propertyKey ? target.constructor : target;
    let key = propertyKey ? propertyKey : (target as Class).name.toLowerCase()
    let decoratedMap: DecoratedMap = Reflect.getMetadata(propertyKey ? JSON_SCHEMA_KEY : JSON_CLASS_KEY, t);
    if (!decoratedMap) decoratedMap = {};
    if (!decoratedMap[key]) decoratedMap[key] = [];
    decoratedMap[key].push({
        type: schemaDecorator,
        args: parameters,
        fn,
    });
    Reflect.defineMetadata(propertyKey ? JSON_SCHEMA_KEY : JSON_CLASS_KEY, decoratedMap, t);
    return decoratedMap;
}
