import { SchemaDecorators } from '../enum/decorator.js';
import { SchemaDecoratorFactory } from '../schema-decorator.js';
import { changeSchema } from '../utils/change-schema.js';

export function Min(minimum: number): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.Min,
        args: minimum,
        action: (args) => {
            changeSchema(args.schema, (s) => (s.minimum = minimum), args.option, args.propertyKey);
        },
    });
}
