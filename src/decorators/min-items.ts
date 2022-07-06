import { SchemaDecorators } from '../enum/decorator';
import { SchemaDecoratorFactory } from '../schema-decorator';
import { changeSchema } from '../utils/change-schema';

export function MinItems(minItems: number): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.MinItems,
        args: minItems,
        action: (args) => {
            changeSchema(args.schema, (s) => (s.minItems = minItems), args.propertyKey);
        },
    });
}
