import { SchemaDecorators } from '../enum/decorator.js';

import { SchemaDecoratorFactory } from '../schema-decorator.js';

export function Optional(): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.Optional,
        args: null,
        action: (args) => {
            if (args.schema.required) args.schema.required = args.schema.required.filter((r) => r !== args.propertyKey);
        },
    });
}
