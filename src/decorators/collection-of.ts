import { SchemaDecorators } from '../enum';
import { Class } from '../types';
import { decoratorMapper } from '../utils/decorator.utils';
import { classTransformer } from '../utils/transformer.utils';

export function CollectionOf(type: typeof Number | typeof String | typeof Boolean | typeof Object | Class): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            parameters: type,
            propertyKey: propertyKey.toString(),
            schemaDecorator: SchemaDecorators.CollectionOf,
            fn: (type: typeof Number | typeof String | typeof Boolean | Class, schema, propertyKey, isAssignToObj,jsonSchemaOptions) => {
                let schemaProperties = schema.properties[propertyKey];
                if (typeof schemaProperties === 'boolean') return;
                const items = classTransformer({ type, specType: jsonSchemaOptions.specTypes, schemaRefPath: jsonSchemaOptions.schemaRefPath, isArray: schemaProperties.type === 'array' });
                schema.properties[propertyKey] = { ...schemaProperties, ...items };
                return schema;
            },
        });
    };
}
