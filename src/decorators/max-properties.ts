import { SchemaDecorators } from '../enum/decorator.js';
import { SchemaDecoratorFactory } from '../schema-decorator.js';
import { changeSchema } from '../utils/change-schema.js';
export function MaxProperties(maxProperties: number) {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.MaxProperties,
        args: maxProperties,
        action: (args) => {
            changeSchema(args.schema, (s) => (s.maxProperties = maxProperties), args.option, args.propertyKey);
        },
    });
}
