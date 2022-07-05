import { SchemaDecorators } from '../enum';
import { changeSchema } from '../utils/change-schema';
import { decoratorMapper } from '../utils/decorator.utils';

export function exclusiveMaximum(maximum: number): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: maximum,
            fn: (maximum, schema,propertyKey) => {
                changeSchema(schema,(s)=>{s.exclusiveMaximum=maximum},propertyKey)
            },
            schemaDecorator: SchemaDecorators.ExclusiveMaximum,
        });
    };
}
