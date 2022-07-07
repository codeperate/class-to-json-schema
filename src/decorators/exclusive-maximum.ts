import { SchemaDecorators } from '../enum/decorator';
import { SchemaDecoratorFactory } from '../schema-decorator';
import { changeSchema } from '../utils/change-schema';

export function ExclusiveMaximum(maximum: number): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.ExclusiveMaximum,
        args: maximum,
        action: (args) => {
            changeSchema(args.schema, (s) => (s.exclusiveMaximum = maximum), args.propertyKey);
        },
    });
}
