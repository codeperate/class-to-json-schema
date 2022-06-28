import { getSchema } from "../utils/get-schema";

export function Minimum(minimum: number): PropertyDecorator {
    return function (target, propertyKey){
        let schema = getSchema(target, propertyKey);
        schema.minimum = minimum;
    }
        
}
