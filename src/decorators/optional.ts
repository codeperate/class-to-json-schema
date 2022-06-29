import { getSchema } from "../utils/get-schema";

export function Optional(): PropertyDecorator | ParameterDecorator {
    return function (target, propertyKey) {
        let schema = getSchema(target, propertyKey);
        const res = schema.required.indexOf(propertyKey); 
        if (schema.required.includes(propertyKey))schema.required.slice(res, 0);
    }
}
