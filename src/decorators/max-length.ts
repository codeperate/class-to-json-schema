import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';
import { propertiesHelper } from '../utils/utils';

export function MaxLength(maxLength: number): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: maxLength,
            fn: (maxLength, schema, propertyKey) => {
                const schemaProperties = schema.properties[propertyKey];
                if(typeof schemaProperties==="boolean") return;
                // if (!schemaProperties) schemaProperties.items = {};
                // if (schemaProperties.type === 'array') schemaProperties.items = { maxLength: maxLength, ...(schemaProperties.items as any) };
                // else schemaProperties.maxLength = maxLength;
                propertiesHelper(schemaProperties,{maxLength})
                return schema;
            },
            schemaDecorator: SchemaDecorators.MaxLength,
        });
    };
}
