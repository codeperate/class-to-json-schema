import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';
import { propertiesHelper } from '../utils/utils';

export function MinProperties(minProperties: number): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: minProperties,
            fn: (minProperties, schema, propertyKey) => {
                let schemaProperties = schema.properties[propertyKey]
                if(typeof schemaProperties==="boolean") return;
                propertiesHelper(schemaProperties,{minProperties})
                return schema;
            },
            schemaDecorator: SchemaDecorators.MinProperties,
        });

       
    };
}
