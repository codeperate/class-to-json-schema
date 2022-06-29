import { JSONSchema } from '../class';
import { SchemaDecorators } from '../enum';
import { DecoratedMap } from '../types/decorated-map';
import { JSON_SCHEMA_KEY } from './get-schema';

interface DecoratedMapper {
    target:object;
    propertyKey:string;
    parameters:any;
    schemaDecorator: SchemaDecorators;
    fn: (arg: any, schema: JSONSchema) => void;
}

export function decoratorMapper(decoratedMapper:DecoratedMapper) {
    const decoratedMap: DecoratedMap = Reflect.getMetadata(JSON_SCHEMA_KEY, decoratedMapper.target);
    if (!decoratedMap[decoratedMapper.propertyKey]) decoratedMap[decoratedMapper.propertyKey] = [];
    decoratedMap[decoratedMapper.propertyKey].push({
        type: decoratedMapper.schemaDecorator,
        args: decoratedMapper.parameters,
        fn: decoratedMapper.fn,
    });
    return decoratedMap;
}
