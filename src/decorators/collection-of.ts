import { SchemaDecorators } from '../enum';
import { Class } from '../types';
import { decoratorMapper } from '../utils/decorator.utils';
import { typeTransformer } from '../utils/utils';

export function CollectionOf(type: typeof Number | typeof String | typeof Boolean | typeof Object | Class): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            parameters: type,
            propertyKey: propertyKey.toString(),
            schemaDecorator:SchemaDecorators.CollectionOf,
            fn: (type: typeof Number | typeof String | typeof Boolean | Class, schema, propertyKey,jsonSchemaOptions) => {
                let schemaProperties = schema.properties[propertyKey];
                if (typeof schemaProperties === 'boolean') return;
                jsonSchemaOptions.schemaRefPath
                if (schemaProperties.type === 'array') {
                    const items = typeTransformer(type,jsonSchemaOptions.specTypes,jsonSchemaOptions.schemaRefPath)
                    schema.properties[propertyKey] = { type: 'array', ...items };
                }
                return schema;
            },
        });
    };
}
