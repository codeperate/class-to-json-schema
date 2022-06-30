import { JSONSchema7 } from 'json-schema';
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function MinLength(minLength: number): PropertyDecorator {
    return function (target, propertyKey){
        decoratorMapper(
            {target,
            propertyKey: propertyKey.toString(),
            parameters: minLength,
            fn: (minLength, schema,propertyKey) => {
                const cv = schema.properties[propertyKey] as JSONSchema7

                cv.type === 'array'
                    ?(schema.properties[propertyKey] as JSONSchema7).items = { minLength: minLength, ...cv.items as object}
                    :(schema.properties[propertyKey] as JSONSchema7).minLength = minLength;
                return schema;
            },
            schemaDecorator: SchemaDecorators.MinLength,}
        );

    };
}