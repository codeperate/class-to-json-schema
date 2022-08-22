import { SchemaDecorators } from '../enum/decorator';
import { SchemaDecoratorFactory } from '../schema-decorator';
import { changeSchema } from '../utils/change-schema';

export function Default(defaultValue: string | number | boolean | {}) {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.Default,
        args: defaultValue,
        action: (args) => {
            changeSchema(
                args.schema,
                (s) => {
                    s.default = defaultValue;
                },
                args.option,
                args.propertyKey,
            );
        },
    });
}
