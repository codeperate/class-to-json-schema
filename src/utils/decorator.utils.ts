import { JSONSchema } from '../class';
import { SchemaDecorators } from '../enum';
import { CLASS_DECORATEDMAP_KEY } from '../type';
import { JsonSchemaOptions } from './get-schema';
import { defaultStorage } from './schema-storage';

interface DecoratedMapper {
    target: any;
    propertyKey: string;
    parameters?: any;
    schemaDecorator: SchemaDecorators;
    fn: (arg: any, schema: JSONSchema, propertyKey: string, jsonSchemaOptions: Partial<JsonSchemaOptions>) => void;
}

export function decoratorMapper(decoratedMapper: Partial<DecoratedMapper>) {
    const { propertyKey, schemaDecorator, fn, parameters, target } = decoratedMapper;
    const t = propertyKey ? target.constructor : target;
    let key = propertyKey ? propertyKey : CLASS_DECORATEDMAP_KEY;
    let decoratedMap = propertyKey ? defaultStorage.getPropertyInfo(t) : defaultStorage.getClassInfo(t);
    if (!decoratedMap) decoratedMap = {};
    if (!decoratedMap[key]) decoratedMap[key] = [];
    decoratedMap[key].push({
        type: schemaDecorator,
        args: parameters,
        fn,
    });
    propertyKey ? defaultStorage.setPropertyInfo(t, decoratedMap) : defaultStorage.setClassInfo(t, decoratedMap);

    return decoratedMap;
}
