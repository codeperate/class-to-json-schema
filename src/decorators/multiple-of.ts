import { SchemaDecorators } from '../enum/decorator';
import { SchemaDecoratorFactory } from '../schema-decorator';
import { changeSchema } from '../utils/change-schema';

export function MultipleOf(multipleOf: number): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.MultipleOf,
        args: multipleOf,
        action: (args) => {
            changeSchema(args.schema, (s) => (s.multipleOf = multipleOf), args.propertyKey);
        },
    });
}
