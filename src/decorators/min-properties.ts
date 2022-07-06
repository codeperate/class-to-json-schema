import { SchemaDecorators } from '../enum/decorator';
import { SchemaDecoratorFactory } from '../schema-decorator';
import { changeSchema } from '../utils/change-schema';

export function MinProperties(minProperties: number): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.MinProperties,
        args: minProperties,
        action: (args) => {
            changeSchema(args.schema, (s) => (s.minProperties = minProperties), args.propertyKey);
        },
    });
}
