import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function MultipleOf(multipleOf: number): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            schemaDecorator: SchemaDecorators.MultipleOf,
            fn: (multipleOf, schema) => {
                schema.type === 'array' ? (schema.items = { multipleOf: multipleOf }) : (schema.multipleOf = multipleOf);
                return schema;
            },
        });
    };
}
