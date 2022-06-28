import { JSONSchema7Definition } from "json-schema";
import { getSchema } from "../utils/get-schema";

export function AllOf(...allOf: JSONSchema7Definition[]){
    return function (target,propertyKey){
        const schema = getSchema(target,propertyKey)
        schema.allOf = allOf;
    }
}
