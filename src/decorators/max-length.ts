import { SchemaDecorators } from '../enum/decorator.js';
import { SchemaDecoratorFactory } from '../schema-decorator.js';
import { changeSchema } from '../utils/change-schema.js';

export function MaxLength(maxLength: number): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.MaxLength,
        args: maxLength,
        action: (args) => {
            changeSchema(args.schema, (s) => (s.maxLength = maxLength), args.option, args.propertyKey);
        },
    });
}
