import { SchemaDecorators } from "../enum";
import { decoratorMapper } from "../utils/decorator.utils";

export function Pattern(pattern: string | RegExp):PropertyDecorator {
    return function(target,propertyKey){
        decoratorMapper({
            target,
            parameters: pattern,
            propertyKey: propertyKey.toString(),
            schemaDecorator: SchemaDecorators.Pattern,
            fn: (args, schema) => {
                args = pattern;
                schema.pattern = pattern.toString()
                return schema;
            },
        });        
    }
}
