import { JSONSchema7 } from 'json-schema';
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function Email(){
    return function(target,propertyKey){
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            fn: (anyOf, schema) => {
                (schema.properties[propertyKey.toString()] as JSONSchema7).format = 'email';
                return schema;
            },
            schemaDecorator: SchemaDecorators.AnyOf,
        });
    }
}
