import { SchemaDecorators } from '../enum/decorator';
import { SchemaDecoratorFactory } from '../schema-decorator';
import { changeSchema } from '../utils/change-schema';
import { addType } from '../utils/utils';

export function Integer(): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.Integer,
        args: null,
        action: (args) => {
            changeSchema(args.schema, (s) => addType(s, 'integer'), args.option, args.propertyKey);
        },
    });
}
