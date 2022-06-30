import { JSONSchema7, JSONSchema7Definition } from 'json-schema';
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function AnyOf(...anyOf: JSONSchema7Definition[]): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: anyOf,
            fn: (anyOf, schema,propertyKey) => {
                (schema.properties[propertyKey.toString()] as JSONSchema7).anyOf = anyOf;
                return schema;
            },
            schemaDecorator: SchemaDecorators.AnyOf,
        });
    };
}
