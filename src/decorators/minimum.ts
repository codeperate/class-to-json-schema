import { JSONSchema7 } from 'json-schema';
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function Minimum(minimum: number): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: minimum,
            fn: (minimum, schema,propertyKey) => {
                const cv = schema.properties[propertyKey] as JSONSchema7;

                (schema.properties[propertyKey] as JSONSchema7).type === 'array'
                    ? ((schema.properties[propertyKey] as JSONSchema7).items = { minimum: minimum, ...cv.items as object })
                    : ((schema.properties[propertyKey] as JSONSchema7).minimum = minimum);
                return schema;
            },
            schemaDecorator: SchemaDecorators.Minimum,
        });
    };
}
