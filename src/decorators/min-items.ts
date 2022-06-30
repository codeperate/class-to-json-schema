import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function MinItems(minItems: number): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: minItems,
            fn: (minItems, schema,propertyKey) => {
                let schemaProperties = schema.properties[propertyKey];
                if(typeof schemaProperties==="boolean") return;
                schemaProperties.minItems = minItems;
                return schema;
            },
            schemaDecorator: SchemaDecorators.MinItems,
        });
    };
}
