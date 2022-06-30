import { JSONSchema7 } from 'json-schema';
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function MaxLength(maxLength: number): PropertyDecorator {
    return function (target, propertyKey){
        decoratorMapper(
            {target,
            propertyKey: propertyKey.toString(),
            parameters: maxLength,
            fn: (maxLength, schema) => {
                (schema.properties[propertyKey.toString()] as JSONSchema7).maxLength = maxLength;;
                return schema;
            },
            schemaDecorator: SchemaDecorators.MaxLength,}
        );

    };
}