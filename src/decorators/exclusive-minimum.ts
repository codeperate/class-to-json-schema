import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function ExclusiveMinimum(minimum: number) {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey,
            parameters: minimum,
            fn: (minimum, schema,propertyKey) => {
                const schemaProperties = schema.properties[propertyKey];

                if(typeof schemaProperties==="boolean") return;
                schemaProperties.type === 'array'
                    ? (schemaProperties.items = { minimum: minimum, ...schemaProperties.items as object })
                    : (schemaProperties.minimum = minimum);
                return schema;
            },
            schemaDecorator: SchemaDecorators.ExclusiveMinimum,
        });
    };
}
