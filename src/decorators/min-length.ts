import { SchemaDecorators } from '../enum/decorator';
import { SchemaDecoratorFactory } from '../schema-decorator';
import { changeSchema } from '../utils/change-schema';

export function MinLength(minLength: number): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.MinLength,
        args: minLength,
        action: (args) => {
            changeSchema(args.schema, (s) => (s.minLength = minLength), args.option, args.propertyKey);
        },
    });
}
