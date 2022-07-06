import { SchemaDecorators } from '../enum/decorator';
import { SchemaDecoratorFactory } from '../schema-decorator';
import { changeSchema } from '../utils/change-schema';

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
                args.propertyKey,
            );
        },
    });
}
