import { SchemaDecorators } from '../enum/decorator.js';
import { SchemaDecoratorFactory } from '../schema-decorator.js';
import { changeSchema } from '../utils/change-schema.js';

export function Max(maximum: number): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.Max,
        args: maximum,
        action: (args) => {
            changeSchema(args.schema, (s) => (s.maximum = maximum), args.option, args.propertyKey);
        },
    });
}
