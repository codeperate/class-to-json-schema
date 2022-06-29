import { JSONSchema7Definition } from 'json-schema';
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function Minimum(minimum: number): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: minimum,
            fn: (minimum, schema) => {
                schema.type === 'array' ? (schema.items = { minimum: minimum }) : (schema.minimum = minimum);
                return schema;
            },
            schemaDecorator: SchemaDecorators.Minimum,
        });
    };
}
