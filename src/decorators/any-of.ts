import {  JSONSchema7Definition } from 'json-schema';
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function AnyOf(...anyOf: JSONSchema7Definition[]): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: anyOf,
            fn: (anyOf, schema,propertyKey) => {
                let schemaProperties = schema.properties[propertyKey];

                if (typeof schemaProperties === 'boolean') return;
                schemaProperties.anyOf = anyOf;
                return schema;
            },
            schemaDecorator: SchemaDecorators.AnyOf,
        });
    };
}
