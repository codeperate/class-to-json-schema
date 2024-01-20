import { SchemaDecorators } from '../enum/decorator.js';
import { SchemaDecoratorFactory } from '../schema-decorator.js';
import { changeSchema } from '../utils/change-schema.js';

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
