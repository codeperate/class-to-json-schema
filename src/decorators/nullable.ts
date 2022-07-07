import { SchemaDecorators } from '../enum/decorator';
import { SchemaDecoratorFactory } from '../schema-decorator';
import { changeSchema } from '../utils/change-schema';

export function Nullable(): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.Nullable,
        args: null,
        action: (args) => {
            changeSchema(
                args.schema,
                (s) => {
                    if (!Array.isArray(s.type)) s.type = [s.type];
                    s.type.push('null');
                },
                args.propertyKey,
            );
        },
    });
}
