import { JSONSchema7Definition } from 'json-schema';
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function Max(maximum: number): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: maximum,
            fn: (maximum, schema) => {
                schema.type === 'array' ? 
                (schema.items = { maximum: maximum }) : (schema.maximum = maximum);
                return schema;
            },
            schemaDecorator: SchemaDecorators.Max,
        });

    };
}
