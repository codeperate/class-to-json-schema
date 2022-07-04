import { JSONSchema7TypeName } from 'json-schema';
import { SchemaDecorators } from '../enum';
import { Class } from '../types';
import { decoratorMapper } from '../utils/decorator.utils';

export function CollectionOf(type: typeof Number | typeof String | typeof Boolean | Class): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            parameters: type,
            propertyKey: propertyKey.toString(),
            fn: (type: typeof Number | typeof String | typeof Boolean | Class, schema, propertyKey) => {
                let schemaProperties = schema.properties[propertyKey];

                if (typeof schemaProperties === 'boolean') return;
                if (schemaProperties.type === 'array') {
                    let t = type.name.toLowerCase() as JSONSchema7TypeName;
                    schemaProperties = { type: 'array', items: { type: t, ...(schemaProperties.items as object) } };
                }
                return schema;
            },
            schemaDecorator: SchemaDecorators.CollectionOf,
        });
    };
}
