import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function MultipleOf(multipleOf: number): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            schemaDecorator: SchemaDecorators.MultipleOf,
            fn: (multipleOf, schema,propertyKey) => {
                const schemaProperties = schema.properties[propertyKey];

                if(typeof schemaProperties==="boolean") return;
                schemaProperties.type === 'array'
                    ? (schemaProperties.items = { multipleOf: multipleOf, ...schemaProperties.items as object })
                    : (schemaProperties.multipleOf = multipleOf);
                return schema;
            },
        });
    };
}
