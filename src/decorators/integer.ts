import { SchemaDecorators } from '../enum/decorator.js';
import { SchemaDecoratorFactory } from '../schema-decorator.js';
import { changeSchema } from '../utils/change-schema.js';
import { replaceType } from '../utils/utils.js';

export function Integer(): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.Integer,
        args: null,
        action: (args) => {
            changeSchema(args.schema, (s) => replaceType(s, 'number', 'integer'), args.option, args.propertyKey);
        },
    });
}
