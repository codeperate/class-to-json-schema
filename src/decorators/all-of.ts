import { JSONSchema7Definition } from 'json-schema';
import { SchemaDecorators } from '../enum/decorator';

import { SchemaDecoratorFactory } from '../schema-decorator';
import { changeSchema } from '../utils/change-schema';

export function AllOf(...allOf: JSONSchema7Definition[]) {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.AllOf,
        args: allOf,
        action: ({ schema, propertyKey }) => {
            changeSchema(schema, (s) => (s.allOf = allOf), propertyKey);
        },
    });
}
