import { SchemaDecorators } from '../enum';
import { changeSchema } from '../utils/change-schema';
import { decoratorMapper } from '../utils/decorator.utils';

export function ExclusiveMinimum(minimum: number): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: minimum,
            fn: (minimum, schema,propertyKey) => {
                changeSchema(schema,(s)=>{s.exclusiveMinimum = minimum},propertyKey)
            },
            schemaDecorator: SchemaDecorators.ExclusiveMinimum,
        });
    };
}
