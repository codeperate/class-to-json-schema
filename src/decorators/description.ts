import { SchemaDecorators } from '../enum/decorator';
import { SchemaDecoratorFactory } from '../schema-decorator';
import { changeSchema } from '../utils/change-schema';

export function Description(description: string) {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.Default,
        args: description,
        action: (args) => {
            changeSchema(
                args.schema,
                (s) => {
                    s.description = description;
                },
                args.option,
                args.propertyKey,
            );
        },
    });
}
