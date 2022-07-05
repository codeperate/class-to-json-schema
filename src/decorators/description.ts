import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';
import { propertiesHelper } from '../utils/utils';

export function Description(description: any) {
    return function (target, propertyKey?) {
        decoratorMapper({
            target,
            propertyKey: propertyKey?.toString(),
            parameters: description,
            fn: (description, schema, propertyKey,isAssignToObj) => {
                if (!propertyKey) {
                    schema.description = description;
                } else {
                    const schemaProperties = schema.properties[propertyKey];
                    if(typeof schemaProperties==="boolean") return;
                    propertiesHelper(schemaProperties,{description})
                }
                return schema;
            },
            schemaDecorator: SchemaDecorators.Description,
        });
    };
}
