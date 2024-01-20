import { SchemaDecorators } from '../enum/decorator.js';
import { SchemaDecoratorFactory } from '../schema-decorator.js';
import { changeSchema } from '../utils/change-schema.js';

export function MinLength(minLength: number): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.MinLength,
        args: minLength,
        action: (args) => {
            changeSchema(args.schema, (s) => (s.minLength = minLength), args.option, args.propertyKey);
        },
    });
}
