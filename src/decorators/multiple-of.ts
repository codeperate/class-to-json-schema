import { JSONSchema7 } from 'json-schema';
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function MultipleOf(multipleOf: number): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            schemaDecorator: SchemaDecorators.MultipleOf,
            fn: (multipleOf, schema,propertyKey) => {
                const cv = schema.properties[propertyKey] as JSONSchema7;

                (schema.properties[propertyKey] as JSONSchema7).type === 'array'
                    ? ((schema.properties[propertyKey] as JSONSchema7).items = { multipleOf: multipleOf, ...cv.items as object })
                    : ((schema.properties[propertyKey] as JSONSchema7).multipleOf = multipleOf);
                return schema;
            },
        });
    };
}
