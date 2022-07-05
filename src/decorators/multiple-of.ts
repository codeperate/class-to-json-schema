import { SchemaDecorators } from '../enum';
import { changeSchema } from '../utils/change-schema';
import { decoratorMapper } from '../utils/decorator.utils';

export function MultipleOf(multipleOf: number): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            parameters: multipleOf,
            propertyKey: propertyKey.toString(),
            schemaDecorator: SchemaDecorators.MultipleOf,
            fn: (multipleOf, schema,propertyKey) => {
                changeSchema(schema,(s)=>{s.multipleOf=multipleOf},propertyKey)
            },
        });
    };
}
