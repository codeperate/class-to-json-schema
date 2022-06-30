import { JSONSchema7 } from "json-schema";
import { SchemaDecorators } from "../enum";
import { decoratorMapper } from "../utils/decorator.utils";

export function Pattern(pattern: string | RegExp):PropertyDecorator {
    return function(target,propertyKey){
        decoratorMapper({
            target,
            parameters: pattern,
            propertyKey: propertyKey.toString(),
            schemaDecorator: SchemaDecorators.Pattern,
            fn: (pattern, schema,propertyKey) => {
                (schema.properties[propertyKey] as JSONSchema7).pattern = pattern.toString()
                return schema;
            },
        });        
    }
}
