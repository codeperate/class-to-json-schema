// import { getSchema } from "../utils/get-schema"

import { SchemaDecorators } from "../enum";
import { decoratorMapper } from "../utils"

//read class and class entity

export function Title(title: string): PropertyDecorator{
    return function (target,propertyKey){
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: title,
            fn: (title, schema, propertyKey) => {
                let schemaProperties = schema.properties[propertyKey];
                if (typeof schemaProperties==="boolean") return;
                if (!schemaProperties) schemaProperties.items = {};
                schemaProperties.title = title;
                
                
                // schema.title = title;
                return schema;
            },
            schemaDecorator: SchemaDecorators.Title,
        })

        
    }
}