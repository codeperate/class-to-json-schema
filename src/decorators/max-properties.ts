import { getSchema } from "../utils/get-schema";

export function MaxProperties(maxProperties: number) {
    return function (target, propertyKey) {
        let schema = getSchema(target,propertyKey);
        schema.maxProperties = maxProperties;
    }
};
