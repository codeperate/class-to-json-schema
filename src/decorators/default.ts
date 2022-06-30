import { JSONSchema7 } from 'json-schema';
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function Default(defaultValue: string | number | boolean | {}){
    return function (target,propertyKey){
        decoratorMapper({
            target,
            parameters: defaultValue,
            propertyKey: propertyKey.toString(),
            fn: (defaultValue, schema,propertyKey) => {
                (schema.properties[propertyKey] as JSONSchema7).default = defaultValue;
                return schema;
            },
            schemaDecorator: SchemaDecorators.Default,
        });
    }
}
