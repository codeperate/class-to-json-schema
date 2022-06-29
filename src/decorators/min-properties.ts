import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function MinProperties(minProperties: number): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: minProperties,
            fn: (minProperties, schema) => {
                schema.minProperties = minProperties;
                return schema;
            },
            schemaDecorator: SchemaDecorators.MinProperties,
        });

       
    };
}
