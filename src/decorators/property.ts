import { getSchema } from "../utils/get-schema";

export function Property(type?: any){
   return function (target, propertyKey){
    const schema = getSchema(target,propertyKey)
    schema.properties = {...schema.properties,[propertyKey]:{type}}
   }
}
