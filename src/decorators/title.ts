import { getSchema } from "../utils/get-schema"

export function Title(title: string){
    return function (target,propertyKey){
        const schema = getSchema(target,propertyKey)
    }
}