import { JSONSchema7Definition } from 'json-schema';
import { SchemaDecorators } from '../enum/decorator.js';
import { SchemaDecoratorFactory } from '../schema-decorator.js';
import { changeSchema } from '../utils/change-schema.js';

export function AnyOf(...anyOf: JSONSchema7Definition[]): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.AnyOf,
        args: anyOf,
        action: ({ schema, propertyKey, option }) => {
            changeSchema(schema, (s) => (s.anyOf = anyOf), option, propertyKey);
        },
    });
}
