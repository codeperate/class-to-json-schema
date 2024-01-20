import { SchemaDecorators } from '../enum/decorator.js';
import { SchemaDecoratorFactory } from '../schema-decorator.js';
import { changeSchema } from '../utils/change-schema.js';

export function MultipleOf(multipleOf: number): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.MultipleOf,
        args: multipleOf,
        action: (args) => {
            changeSchema(args.schema, (s) => (s.multipleOf = multipleOf), args.option, args.propertyKey);
        },
    });
}
