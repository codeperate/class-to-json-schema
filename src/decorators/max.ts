import { SchemaDecorators } from '../enum/decorator';
import { SchemaDecoratorFactory } from '../schema-decorator';
import { changeSchema } from '../utils/change-schema';

export function Max(maximum: number): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.Max,
        args: maximum,
        action: (args) => {
            changeSchema(args.schema, (s) => (s.maximum = maximum), args.option, args.propertyKey);
        },
    });
}
