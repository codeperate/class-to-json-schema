import { SchemaDecorators } from '../enum/decorator';
import { SchemaDecoratorFactory } from '../schema-decorator';
import { changeSchema } from '../utils/change-schema';

export function Title(title: string) {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.Title,
        args: title,
        action: (args) => {
            changeSchema(
                args.schema,
                (s) => {
                    s.title = title;
                },
                args.option,
                args.propertyKey,
            );
        },
    });
}
