import { getSchema } from '../utils/get-schema';

export function Minimum(minimum: number): PropertyDecorator {
    return function (target, propertyKey) {
        let schema = getSchema(target, propertyKey);

        schema.type === 'array' ? (schema.items = { minimum: minimum }) : (schema.minimum = minimum);
    };
}
