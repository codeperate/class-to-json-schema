import { SchemaDecorators } from '../enum/decorator.js';
import { SchemaDecoratorFactory } from '../schema-decorator.js';
import { changeSchema } from '../utils/change-schema.js';

export function MinProperties(minProperties: number): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.MinProperties,
        args: minProperties,
        action: (args) => {
            changeSchema(args.schema, (s) => (s.minProperties = minProperties), args.option, args.propertyKey);
        },
    });
}
