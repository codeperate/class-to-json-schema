import { SchemaDecorators } from '../enum/decorator.js';
import { SchemaDecoratorFactory } from '../schema-decorator.js';
import { changeSchema } from '../utils/change-schema.js';

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
