import { JSONSchema7 } from 'json-schema';
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function ExclusiveMinimum(minimum: number) {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey,
            parameters: minimum,
            fn: (minimum, schema,propertyKey) => {
                (schema.properties[propertyKey] as JSONSchema7).type === 'array'
                    ? ((schema.properties[propertyKey] as JSONSchema7).items = { minimum: minimum })
                    : ((schema.properties[propertyKey] as JSONSchema7).minimum = minimum);
                return schema;
            },
            schemaDecorator: SchemaDecorators.ExclusiveMinimum,
        });
    };
}
