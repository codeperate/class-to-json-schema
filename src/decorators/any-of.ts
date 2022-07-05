import {  JSONSchema7Definition } from 'json-schema';
import { SchemaDecorators } from '../enum';
import { changeSchema } from '../utils/change-schema';
import { decoratorMapper } from '../utils/decorator.utils';

export function AnyOf(...anyOf: JSONSchema7Definition[]): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: anyOf,
            fn: (anyOf, schema,propertyKey) => {
                changeSchema(schema,(s)=>{s.anyOf=anyOf},propertyKey)
            },
            schemaDecorator: SchemaDecorators.AnyOf,
        });
    };
}
