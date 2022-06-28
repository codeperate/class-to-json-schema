import { getSchema } from "../utils/get-schema";

export function ExclusiveMinimum(minimum: number){
    return function (target, propertyKey){
        let schema = getSchema(target, propertyKey);
        schema.minimum = minimum;
    }
}
