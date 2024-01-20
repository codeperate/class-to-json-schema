import { SchemaDecorators } from '../enum/decorator.js';
import { SchemaDecoratorFactory } from '../schema-decorator.js';
import { changeSchema } from '../utils/change-schema.js';

export function MaxItems(maxItems: number): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.MaxItems,
        args: maxItems,
        action: (args) => {
            changeSchema(args.schema, (s) => (s.maxItems = maxItems), args.option, args.propertyKey);
        },
    });
}
