import { JSONSchema7 } from 'json-schema';
import { SchemaDecorators } from '../enum/decorator.js';

import { SchemaDecoratorFactory } from '../schema-decorator.js';
import { changeSchema } from '../utils/change-schema.js';
export function Schema(partialSchema: object);
export function Schema(partialSchema: JSONSchema7) {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.Schema,
        args: partialSchema,
        action: (args) => {
            changeSchema(
                args.schema,
                (s) => {
                    Object.assign(s, partialSchema);
                },
                args.option,
                args.propertyKey,
            );
        },
    });
}
