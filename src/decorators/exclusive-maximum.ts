import { JSONSchema7 } from 'json-schema';
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function exclusiveMaximum(maximum: number): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: maximum,
            fn: (maximum, schema,propertyKey) => {
                const cv = schema.properties[propertyKey] as JSONSchema7;
                cv.type === 'array'
                    ? ((schema.properties[propertyKey] as JSONSchema7).items = { maximum: maximum, ...cv.items as object })
                    : ((schema.properties[propertyKey] as JSONSchema7).maximum = maximum);
                return schema;
            },
            schemaDecorator: SchemaDecorators.ExclusiveMaximum,
        });
    };
}
