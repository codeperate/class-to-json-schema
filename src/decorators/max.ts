import { getSchema } from '../utils/get-schema';

export function Max(maximum: number): PropertyDecorator {
    return function (target, propertyKey) {
        let schema = getSchema(target, propertyKey);

        schema.type === 'array' ? (schema.items = { maximum: maximum }) : (schema.maximum = maximum);
    };
}
