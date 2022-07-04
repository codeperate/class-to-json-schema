import { SchemaDecorators } from "../enum";
import { decoratorMapper } from "../utils/decorator.utils";

export function Description(description: string){
    return function (target, propertyKey?) {
        decoratorMapper({
            target,
            propertyKey: propertyKey?.toString(),
            parameters: description,
            fn: (description, schema, propertyKey?) => {
                if (!propertyKey) {
                    schema.description = description;
                } else {
                    const schemaProperties = schema.properties[propertyKey];
                    if (typeof schemaProperties === 'boolean') return;
                    if (!schemaProperties) schemaProperties.items = {};
                    schemaProperties.description = description;
                }
                return schema;
            },
            schemaDecorator: SchemaDecorators.Title,
        });
    };
}
