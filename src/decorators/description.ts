import { SchemaDecorators } from "../enum";
import { decoratorMapper } from "../utils/decorator.utils";

export function Description(description: string): PropertyDecorator | ClassDecorator {
    return function (target, propertyKey?) {
        return decoratorMapper({
            target,
            parameters: description,
            propertyKey: propertyKey.toString(),
            schemaDecorator: SchemaDecorators.Description,
            fn:(title, schema,propertyKey,jsonSchemaOptions) => {
                title
                propertyKey
                jsonSchemaOptions
                return schema;
            }
        })
        
    };
}
