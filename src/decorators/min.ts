import { getSchema } from '../utils/get-schema';

export function Min(minimum: number): PropertyDecorator {
    return function (target, propertyKey) {
        let schema = getSchema(target, propertyKey);

        schema.type === 'array' ? (schema.items = { minimum: minimum }) : (schema.minimum = minimum);
    };
}
