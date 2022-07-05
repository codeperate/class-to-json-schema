import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';
import { propertiesHelper } from '../utils/utils';

export function MinItems(minItems: number): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: minItems,
            fn: (minItems, schema,propertyKey,isAssignToObj) => {
                let schemaProperties = schema.properties[propertyKey];
                if(typeof schemaProperties==="boolean") return;
                propertiesHelper(schemaProperties,{minItems})
                return schema;
            },
            schemaDecorator: SchemaDecorators.MinItems,
        });
    };
}
