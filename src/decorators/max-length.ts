import { getSchema } from "../utils/get-schema";

export function MaxLength(maxLength: number): PropertyDecorator {
    return function (target, propertyKey){
        let schema = getSchema(target,propertyKey);
        schema.maxLength = maxLength;
    };
}