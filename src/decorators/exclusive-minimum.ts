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
                const cv = schema.properties[propertyKey] as JSONSchema7;

                cv.type === 'array'
                    ? ((schema.properties[propertyKey] as JSONSchema7).items = { minimum: minimum, ...cv.items as object })
                    : ((schema.properties[propertyKey] as JSONSchema7).minimum = minimum);
                return schema;
            },
            schemaDecorator: SchemaDecorators.ExclusiveMinimum,
        });
    };
}
