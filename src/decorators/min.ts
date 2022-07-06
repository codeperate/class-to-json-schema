import { SchemaDecorators } from '../enum/decorator';
import { SchemaDecoratorFactory } from '../schema-decorator';
import { changeSchema } from '../utils/change-schema';

export function Min(minimum: number): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.Min,
        args: minimum,
        action: (args) => {
            changeSchema(args.schema, (s) => (s.minimum = minimum), args.propertyKey);
        },
    });
}
