import { getSchema } from "../utils/get-schema";

export function MinLength(minLength: number): PropertyDecorator {
    return function (target, propertyKey){
        let schema = getSchema(target,propertyKey);
        schema.minLength = minLength;
    };
}