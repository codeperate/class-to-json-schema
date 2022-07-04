import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function Enum(enumValues: any): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: enumValues,
            fn: (enumValues, schema, propertyKey) => {
                let schemaProperties = schema.properties[propertyKey];
                if (typeof schemaProperties === 'boolean') return;
                schemaProperties.enum = Object.values(enumValues);
                return schema;
            },
            schemaDecorator: SchemaDecorators.Enum,
        });
    };
}
