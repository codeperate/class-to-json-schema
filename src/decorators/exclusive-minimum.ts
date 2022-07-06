import { SchemaDecorators } from '../enum/decorator';
import { SchemaDecoratorFactory } from '../schema-decorator';
import { changeSchema } from '../utils/change-schema';

export function ExclusiveMinimum(minimum: number): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.ExclusiveMinimum,
        args: minimum,
        action: (args) => {
            changeSchema(args.schema, (s) => (s.exclusiveMinimum = minimum), args.propertyKey);
        },
    });
}
