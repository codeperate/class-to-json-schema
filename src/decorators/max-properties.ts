import { SchemaDecorators } from '../enum/decorator';
import { SchemaDecoratorFactory } from '../schema-decorator';
import { changeSchema } from '../utils/change-schema';
export function MaxProperties(maxProperties: number) {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.MaxProperties,
        args: maxProperties,
        action: (args) => {
            changeSchema(args.schema, (s) => (s.maxProperties = maxProperties), args.option, args.propertyKey);
        },
    });
}
