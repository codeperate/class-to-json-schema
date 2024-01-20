import { SchemaDecorators } from '../enum/decorator.js';
import { SchemaDecoratorFactory } from '../schema-decorator.js';
import { changeSchema } from '../utils/change-schema.js';

export function ExclusiveMinimum(minimum: number): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.ExclusiveMinimum,
        args: minimum,
        action: (args) => {
            changeSchema(args.schema, (s) => (s.exclusiveMinimum = minimum), args.option, args.propertyKey);
        },
    });
}
