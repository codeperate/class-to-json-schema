import { JSONSchema7 } from 'json-schema';
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function Min(minimum: number): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: minimum,
            fn: (minimum, schema,propertyKey) => {
                schema.properties[propertyKey] === 'array'
                    ? ((schema.properties[propertyKey] as JSONSchema7).items = { minimum: minimum })
                    : ((schema.properties[propertyKey] as JSONSchema7).minimum = minimum);
                return schema;
            },
            schemaDecorator: SchemaDecorators.Min,
        });
    };
}
