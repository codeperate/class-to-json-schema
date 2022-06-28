import { getSchema } from "../utils/get-schema";

export function MinItems(minItems: number): PropertyDecorator {
    return function (target, propertyKey) {
        let schema = getSchema(target,propertyKey);
        schema.minItems = minItems;
    }
}