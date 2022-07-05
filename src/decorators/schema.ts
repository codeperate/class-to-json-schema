import { JSONSchema7 } from 'json-schema';
import { decoratorMapper } from '../utils';

export function Schema(partialSchema: JSONSchema7) {
    return function (target) {
        decoratorMapper({
            target,
            parameters: partialSchema,
            fn: (partialSchema, schema) => {
                Object.assign(schema, partialSchema);
            },
        });
    };
}
