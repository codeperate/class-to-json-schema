import { SchemaDecorators } from '../enum/decorator';
import { SchemaDecoratorFactory } from '../schema-decorator';
import { changeSchema } from '../utils/change-schema';

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
