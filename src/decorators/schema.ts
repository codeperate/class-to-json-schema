import { deepAssign } from '@codeperate/utils';
import { JSONSchema7 } from 'json-schema';
import { SchemaDecorators } from '../enum/decorator';

import { SchemaDecoratorFactory } from '../schema-decorator';
import { changeSchema } from '../utils/change-schema';

export function Schema(partialSchema: JSONSchema7) {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.Schema,
        args: partialSchema,
        action: (args) => {
            changeSchema(
                args.schema,
                (s) => {
                    s = deepAssign(s, partialSchema);
                },
                args.propertyKey,
            );
        },
    });
}
