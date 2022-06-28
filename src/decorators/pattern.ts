import { getSchema } from "../utils/get-schema"

export function Pattern(pattern: string | RegExp):PropertyDecorator {
    return function(target,propertyKey){
        let schema = getSchema(target,propertyKey);
        schema.pattern = pattern.toString()
    }
}
