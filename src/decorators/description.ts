import { SchemaDecorators } from '../enum/decorator.js';
import { SchemaDecoratorFactory } from '../schema-decorator.js';
import { changeSchema } from '../utils/change-schema.js';

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
