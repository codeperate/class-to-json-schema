import { SchemaDecorators } from '../enum/decorator.js';
import { SchemaDecoratorFactory } from '../schema-decorator.js';
import { changeSchema } from '../utils/change-schema.js';

export function Pattern(pattern: string | RegExp): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.Pattern,
        args: pattern,
        action: (args) => {
            changeSchema(
                args.schema,
                (s) => {
                    pattern instanceof RegExp ? (s.pattern = pattern.source) : (s.pattern = pattern);
                },
                args.option,
                args.propertyKey,
            );
        },
    });
}
