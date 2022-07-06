import { JSONSchema7Definition } from 'json-schema';
import { SchemaDecorators } from '../enum/decorator';
import { SchemaDecoratorFactory } from '../schema-decorator';
import { changeSchema } from '../utils/change-schema';

export function AnyOf(...anyOf: JSONSchema7Definition[]): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.AnyOf,
        args: anyOf,
        action: ({ schema, propertyKey }) => {
            changeSchema(schema, (s) => (s.anyOf = anyOf), propertyKey);
        },
    });
}
