import { getSchema } from "../utils/get-schema";

export function Maximum(maximum: number): PropertyDecorator{
    return function (target, propertyKey){
        let schema = getSchema(target, propertyKey);
        schema.maximum = maximum;
    }
}
