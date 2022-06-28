import { JSONSchema7Type } from "json-schema";
import { getSchema } from "../utils/get-schema";

export function Enum(...enumValues: (JSONSchema7Type | any)[] ) {
    return function(target,propertyKey){
        const schema = getSchema(target,propertyKey)
        schema.enum = enumValues
    }
}
