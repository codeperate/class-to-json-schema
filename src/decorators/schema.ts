import { JSONSchema7 } from 'json-schema';
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils';
import { changeSchema } from '../utils/change-schema';

export function Schema(partialSchema: JSONSchema7) {
    return function (target, propertyKey?) {
        decoratorMapper({
            target,
            propertyKey,
            parameters: partialSchema,
            fn: (partialSchema, schema) => {
                changeSchema(
                    schema,
                    (s) => {
                        Object.assign(s, partialSchema);
                    },
                    propertyKey,
                );
            },
            schemaDecorator: SchemaDecorators.Schema,
        });
    };
}
