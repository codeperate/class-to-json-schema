import { JSONSchema7 } from 'json-schema';
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function Pattern(pattern: string | RegExp): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            parameters: pattern,
            propertyKey: propertyKey.toString(),
            schemaDecorator: SchemaDecorators.Pattern,
            fn: (pattern, schema, propertyKey) => {
                const cv = schema.properties[propertyKey] as JSONSchema7;

                cv.type === 'array'
                    ? ((schema.properties[propertyKey] as JSONSchema7).items = { pattern: pattern.tostring(), ...(cv.items as object) })
                    : ((schema.properties[propertyKey] as JSONSchema7).pattern = pattern.toString());
                return schema;
            },
        });
    };
}
