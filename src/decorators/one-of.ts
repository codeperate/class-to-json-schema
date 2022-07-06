import { JSONSchema7Definition } from 'json-schema';
import { SchemaDecorators } from '../enum/decorator';

import { SchemaDecoratorFactory } from '../schema-decorator';
import { changeSchema } from '../utils/change-schema';

export function OneOf(...oneOf: JSONSchema7Definition[]): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.OneOf,
        args: oneOf,
        action: (args) => {
            changeSchema(args.schema, (s) => (s.oneOf = oneOf), args.propertyKey);
        },
    });
}
