import { getSchema } from "../utils/get-schema";

export function ExclusiveMaximum(maximum: number): PropertyDecorator{
    return function (target, propertyKey){
        let schema = getSchema(target, propertyKey);
        schema.maximum = maximum;
    }
}
