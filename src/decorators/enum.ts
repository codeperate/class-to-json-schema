import { SchemaDecorators } from '../enum/decorator';
import { SchemaDecoratorFactory } from '../schema-decorator';
import { changeSchema } from '../utils/change-schema';

export function Enum(enumValues: any): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.Enum,
        args: null,
        action: (args) => {
            changeSchema(
                args.schema,
                (s) => {
                    s.enum = Object.values(enumValues);
                },
                args.propertyKey,
            );
        },
    });
}
