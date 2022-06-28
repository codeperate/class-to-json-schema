import { getSchema } from "../utils/get-schema"

export function Email(){
    return function(target,propertyKey){
        const schema = getSchema(target,propertyKey)
        schema.format = 'email'
    }
}
