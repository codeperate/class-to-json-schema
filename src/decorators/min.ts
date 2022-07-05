import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';
import { propertiesHelper } from '../utils/utils';

export function Min(minimum: number): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: minimum,
            fn: (minimum, schema,propertyKey,isAssignToObj) => {
                const schemaProperties = schema.properties[propertyKey];
                if(typeof schemaProperties==="boolean") return;
                propertiesHelper(schemaProperties,{minimum})
                return schema;
            },
            schemaDecorator: SchemaDecorators.Min,
        });
    };
}
