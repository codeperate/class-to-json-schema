import { getSchema } from "../utils/get-schema"

export function Default(defaultValue: string | number | boolean | {}){
    return function (target,propertyKey){
        const schema = getSchema(target,propertyKey)
        schema.default = defaultValue;
    }
}
