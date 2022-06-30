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
                const cv = schema.properties[propertyKey] as JSONSchema7;
                console.log(!cv);
                
                if(!cv) (schema.properties[propertyKey]as JSONSchema7).items = {}
                console.log((schema.properties[propertyKey] as JSONSchema7).items);
                // if (cv.type === 'array') schema.properties[propertyKey].items['maxLength'] = maxLength;
                // else (schema.properties[propertyKey] as JSONSchema7).maxLength = maxLength;
                return schema;
            },
            schemaDecorator: SchemaDecorators.MaxLength,
        });
    };
}
