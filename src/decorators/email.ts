import { SchemaDecorators } from '../enum/decorator.js';
import { SchemaDecoratorFactory } from '../schema-decorator.js';
import { changeSchema } from '../utils/change-schema.js';

export function Email(): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.Email,
        args: null,
        action: (args) => {
            changeSchema(
                args.schema,
                (s) => {
                    s.format = 'email';
                },
                args.option,
                args.propertyKey,
            );
        },
    });
}
