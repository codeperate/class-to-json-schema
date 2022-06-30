import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function Partial(): ParameterDecorator {
    return function (target, propertyKey, parameterIndex) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            schemaDecorator: SchemaDecorators.Partial,
            fn: (arg, schema, propertyKey) => {
                if (schema.required.includes(propertyKey)) schema.required.slice(parameterIndex, 0);
                return schema;
            },
        });
    };
}
