import { SchemaDecorators } from '../enum/decorator';

import { SchemaDecoratorFactory } from '../schema-decorator';
import { changeSchema } from '../utils/change-schema';

export function Optional(): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.Optional,
        args: null,
        action: (args) => {
            changeSchema(
                args.schema,
                () => {
                    if (args.schema.required) args.schema.required = args.schema.required.filter((r) => r === args.propertyKey);
                },
                args.propertyKey,
            );
        },
    });
}
