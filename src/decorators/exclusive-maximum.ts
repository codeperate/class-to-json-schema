import { SchemaDecorators } from '../enum/decorator.js';
import { SchemaDecoratorFactory } from '../schema-decorator.js';
import { changeSchema } from '../utils/change-schema.js';

export function ExclusiveMaximum(maximum: number): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.ExclusiveMaximum,
        args: maximum,
        action: (args) => {
            changeSchema(args.schema, (s) => (s.exclusiveMaximum = maximum), args.option, args.propertyKey);
        },
    });
}
