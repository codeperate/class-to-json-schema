import { SchemaDecorators } from '../enum/decorator';
import { SchemaDecoratorFactory } from '../schema-decorator';
import { changeSchema } from '../utils/change-schema';

export function MaxLength(maxLength: number): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.MaxLength,
        args: maxLength,
        action: (args) => {
            changeSchema(args.schema, (s) => (s.maxLength = maxLength), args.option, args.propertyKey);
        },
    });
}
