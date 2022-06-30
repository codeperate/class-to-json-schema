import { JSONSchema7 } from 'json-schema';
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function Maximum(maximum: number): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: maximum,
            fn: (maximum, schema) => {
                (schema.properties[propertyKey.toString()] as JSONSchema7).type === 'array'
                    ? ((schema.properties[propertyKey.toString()] as JSONSchema7).items = { maximum: maximum })
                    : ((schema.properties[propertyKey.toString()] as JSONSchema7).maximum = maximum);
                return schema;
            },
            schemaDecorator: SchemaDecorators.Maximum,
        });
    };
}
