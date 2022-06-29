import { JSONSchema7Definition } from 'json-schema';
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function MaxProperties(maxProperties: number) {
    return function (target, propertyKey) {
        decoratorMapper(
            {target,
            propertyKey,
            parameters: maxProperties,
            fn: (maxProperties, schema) => {
                schema.maxProperties = maxProperties;
                return schema;
            },
            schemaDecorator: SchemaDecorators.MaxProperties,}
        );


    }
};
