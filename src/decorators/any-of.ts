import { JSONSchema7Definition } from "json-schema";
import { getSchema } from "../utils/get-schema";


export function AnyOf(...anyOf: JSONSchema7Definition[]):PropertyDecorator {
    return function (target,propertyKey){
        const schema = getSchema(target,propertyKey)
        schema.anyOf = anyOf;
    }
}
