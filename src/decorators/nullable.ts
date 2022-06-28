import { JSONSchema7TypeName } from 'json-schema';
import { getSchema } from '../utils/get-schema';

export function Nullable(type: JSONSchema7TypeName | any, ...types: (JSONSchema7TypeName | any)[]): PropertyDecorator {
    return function (target, propertyKey) {
        let schema = getSchema(target, propertyKey);

        if (type) {
            schema.type = [type, null];
        } else {
            schema.type = types.concat(null);
        }
    };
}
