import { JSONSchema7, JSONSchema7TypeName } from 'json-schema';
import { decoratorMapper } from '../utils/decorator.utils';

export function CollectionOf(type: any): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            parameters: type,
            propertyKey: propertyKey.toString(),
            fn: (type, schema, propertyKey) => {
                const cv = schema.properties[propertyKey] as JSONSchema7;
                if (cv.type === 'array') {
                    const t = (type as Function).name.toLowerCase() as JSONSchema7TypeName;
                    schema.properties[propertyKey] = { type: 'array', items: { type: t } };
                }
                return schema;
            },
        });
    };
}
