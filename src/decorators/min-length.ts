import { SchemaDecorators } from '../enum';
import { changeSchema } from '../utils/change-schema';
import { decoratorMapper } from '../utils/decorator.utils';

export function MinLength(minLength: number): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: minLength,
            fn: (minLength, schema, propertyKey) => {
                changeSchema(schema,(s)=>{s.minLength=minLength},propertyKey)
            },
            schemaDecorator: SchemaDecorators.MinLength,
        });
    };
}
