import { JSONSchema7 } from 'json-schema';
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function MaxLength(maxLength: number): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: maxLength,
            fn: (maxLength, schema, propertyKey) => {
                const cs = schema.properties[propertyKey] as JSONSchema7;
                if (!cs) (schema.properties[propertyKey] as JSONSchema7).items = {};
                if (cs.type === 'array') (schema.properties[propertyKey] as JSONSchema7).items = { maxLength: maxLength, ...(cs.items as any) };
                else (schema.properties[propertyKey] as JSONSchema7).maxLength = maxLength;
                return schema;
            },
            schemaDecorator: SchemaDecorators.MaxLength,
        });
    };
}
