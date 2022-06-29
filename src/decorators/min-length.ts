import { JSONSchema7Definition } from 'json-schema';
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function MinLength(minLength: number): PropertyDecorator {
    return function (target, propertyKey){
        decoratorMapper(
            {target,
            propertyKey: propertyKey.toString(),
            parameters: minLength,
            fn: (minLength, schema) => {
                schema.minLength = minLength;
                return schema;
            },
            schemaDecorator: SchemaDecorators.MinLength,}
        );

    };
}