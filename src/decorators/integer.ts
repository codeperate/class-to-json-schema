import { JSONSchema7 } from 'json-schema';
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function Integer(): PropertyDecorator {
    return function (target, propertyKey: string) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            fn: (arg, schema,propertyKey) => {
                (schema.properties[propertyKey] as JSONSchema7).type === 'array'
                    ? ((schema.properties[propertyKey] as JSONSchema7).items = { type: 'integer' })
                    : ((schema.properties[propertyKey] as JSONSchema7).type = 'integer');
                return schema;
            },
            schemaDecorator: SchemaDecorators.Integer,
        });
    };
}
