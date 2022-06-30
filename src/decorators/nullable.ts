import { JSONSchema7, JSONSchema7TypeName } from 'json-schema';
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function Nullable(type: JSONSchema7TypeName | any, ...types: (JSONSchema7TypeName | any)[]): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            parameters:type,
            propertyKey: propertyKey.toString(),
            schemaDecorator: SchemaDecorators.Nullable,
            fn: (type, schema) => {
                if (type) {
                    (schema.properties[propertyKey.toString()] as JSONSchema7).type = [type, null];
                } else {
                    (schema.properties[propertyKey.toString()] as JSONSchema7).type = types.concat(null);
                }
                return schema;
            },
        });
    };
}
