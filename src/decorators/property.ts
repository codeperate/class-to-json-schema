import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';
import { classTransformer } from '../utils/transformer.utils';

export function Property(type?: any): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            parameters: type,
            propertyKey: propertyKey.toString(),
            schemaDecorator: SchemaDecorators.Property,
            fn: (type, schema, propertyKey,isAssignToObj,jsonSchemaOptions) => {
                let schemaProperties = schema.properties[propertyKey];
                if (typeof schemaProperties === 'boolean') return;
                type = type ? type : schemaProperties.type;
                const items = classTransformer({ type, specType: jsonSchemaOptions.specTypes, schemaRefPath: jsonSchemaOptions.schemaRefPath, isArray: schemaProperties.type === 'array' });
                schema.properties[propertyKey] = { ...schemaProperties, ...items };
                return schema;
            },
        });
    };
}
