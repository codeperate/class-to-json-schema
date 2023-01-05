import { SchemaDecorators } from '../enum/decorator';
import { SchemaDecoratorFactory } from '../schema-decorator';
import { changeSchema } from '../utils/change-schema';

export function MaxItems(maxItems: number): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.MaxItems,
        args: maxItems,
        action: (args) => {
            changeSchema(args.schema, (s) => (s.maxItems = maxItems), args.option, args.propertyKey);
        },
    });
}
