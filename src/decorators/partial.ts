import { getSchema } from "../utils/get-schema";

export function Partial(): ParameterDecorator {
    return function (target, propertyKey, parameterIndex) {
        let schema = getSchema(target, propertyKey);
        if (schema.required.includes(propertyKey.toString()))schema.required.slice(parameterIndex, 0);
    }
}