import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function MinLength(minLength: number): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: minLength,
            fn: (minLength, schema, propertyKey) => {
                let schemaProperties = schema.properties[propertyKey];
                if (typeof schemaProperties === 'boolean') return;
                schemaProperties.type === 'array' ? (schemaProperties.items = { minLength: minLength, ...(schemaProperties.items as object) }) : (schemaProperties.minLength = minLength);
                return schema;
            },
            schemaDecorator: SchemaDecorators.MinLength,
        });
    };
}
