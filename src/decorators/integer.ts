import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function Integer(): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            fn: (schema) => {
                schema.type === 'array' ? (schema.items = { type: 'integer' }) : (schema.type = 'integer');
                return schema;
            },
            schemaDecorator: SchemaDecorators.Integer,
        });
    };
}
