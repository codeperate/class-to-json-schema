import { JSONSchema7Definition } from "json-schema";
import { getSchema } from "../utils/get-schema";

export function OneOf(...oneOf: JSONSchema7Definition[]){
    return function (target, propertyKey) {
        let schema = getSchema(target,propertyKey);
        
      };
}