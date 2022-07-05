import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';
import { propertiesHelper } from '../utils/utils';

export function Max(maximum: number): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: maximum,
            fn: (maximum, schema,propertyKey,isAssignToObj) => {
                let schemaProperties = schema.properties[propertyKey];
                if(typeof schemaProperties==="boolean") return;
                propertiesHelper(schemaProperties,{maximum})
                return schema;
            },
            schemaDecorator: SchemaDecorators.Max,
        });
    };
}
