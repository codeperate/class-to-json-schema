import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function exclusiveMaximum(maximum: number): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: maximum,
            fn: (maximum, schema,propertyKey) => {
                let schemaProperties = schema.properties[propertyKey];

                if(typeof schemaProperties==="boolean") return;
                schemaProperties.type === 'array'
                    ? (schemaProperties.items = { maximum: maximum, ...schemaProperties.items as object })
                    : (schemaProperties.maximum = maximum);
                return schema;
            },
            schemaDecorator: SchemaDecorators.ExclusiveMaximum,
        });
    };
}
