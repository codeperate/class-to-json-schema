import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function Property(type?: any) {
    return function (target, propertyKey) {
        console.log(target);
        
        decoratorMapper({
            target,
            parameters: type,
            propertyKey: propertyKey.toString(),
            schemaDecorator: SchemaDecorators.Property,
            fn: (type, schema) => {
                schema.properties = { ...schema.properties, [propertyKey]: { type: type } };
                return schema;
            },
        });
    };
}
