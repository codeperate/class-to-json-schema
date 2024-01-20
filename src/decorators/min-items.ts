import { SchemaDecorators } from '../enum/decorator.js';
import { SchemaDecoratorFactory } from '../schema-decorator.js';
import { changeSchema } from '../utils/change-schema.js';

export function MinItems(minItems: number): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.MinItems,
        args: minItems,
        action: (args) => {
            changeSchema(args.schema, (s) => (s.minItems = minItems), args.option, args.propertyKey);
        },
    });
}
