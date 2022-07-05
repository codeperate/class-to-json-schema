import { SchemaDecorators } from '../enum';
import { changeSchema } from '../utils/change-schema';
import { decoratorMapper } from '../utils/decorator.utils';

export function MaxLength(maxLength: number): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: maxLength,
            fn: (maxLength, schema, propertyKey) => {
                changeSchema(schema,(s)=>{s.maxLength = maxLength},propertyKey)
            },
            schemaDecorator: SchemaDecorators.MaxLength,
        });
    };
}
