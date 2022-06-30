import { JSONSchema7 } from 'json-schema';
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function MinItems(minItems: number): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: minItems,
            fn: (minItems, schema,propertyKey) => {
                (schema.properties[propertyKey] as JSONSchema7).minItems = minItems;
                return schema;
            },
            schemaDecorator: SchemaDecorators.MinItems,
        });
    };
}
