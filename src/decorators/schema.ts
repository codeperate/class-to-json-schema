import { JSONSchema7 } from 'json-schema';
import { SchemaDecorators } from '../enum/decorator';

import { SchemaDecoratorFactory } from '../schema-decorator';
import { changeSchema } from '../utils/change-schema';

export function Schema(partialSchema: JSONSchema7) {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.Required,
        args: partialSchema,
        action: (args) => {
            changeSchema(
                args.schema,
                (s) => {
                    Object.assign(s, partialSchema);
                },
                args.propertyKey,
            );
        },
    });
}
