import { JSONSchema7Definition } from 'json-schema';
import { SchemaDecorators } from '../enum/decorator.js';

import { SchemaDecoratorFactory } from '../schema-decorator.js';
import { changeSchema } from '../utils/change-schema.js';

export function AllOf(...allOf: JSONSchema7Definition[]) {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.AllOf,
        args: allOf,
        action: ({ schema, propertyKey, option }) => {
            changeSchema(schema, (s) => (s.allOf = allOf), option, propertyKey);
        },
    });
}
