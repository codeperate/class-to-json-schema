import { JSONSchema7TypeName } from 'json-schema';
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function Nullable(type: JSONSchema7TypeName | any, ...types: (JSONSchema7TypeName | any)[]): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            schemaDecorator: SchemaDecorators.Nullable,
            fn: (args, schema) => {
                if (type) {
                    schema.type = [type, null];
                } else {
                    schema.type = types.concat(null);
                }
                args = type;
                return schema;
            },
        });
    };
}
