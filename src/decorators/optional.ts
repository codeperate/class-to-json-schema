import { JSONSchema7 } from 'json-schema';
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function Optional(): PropertyDecorator | ParameterDecorator {
    return function (target, propertyKey, parameterIndex) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            schemaDecorator: SchemaDecorators.Optional,
            fn: (arg, schema,propertyKey) => {
                if ((schema.properties[propertyKey] as JSONSchema7).required.includes(propertyKey))
                    (schema.properties[propertyKey] as JSONSchema7).required.slice(parameterIndex, 0);
                return schema;
            },
        });
    };
}
