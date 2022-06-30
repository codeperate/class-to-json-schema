import { JSONSchema7, JSONSchema7TypeName } from 'json-schema';
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function Nullable(type?: JSONSchema7TypeName | any): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            parameters: type,
            propertyKey: propertyKey.toString(),
            schemaDecorator: SchemaDecorators.Nullable,
            fn: (type, schema,propertyKey) => {
                type = !type ? null : ((type as Function)?.name.toLowerCase() as JSONSchema7TypeName);
                let _type = (schema.properties[propertyKey] as JSONSchema7).type;
                (schema.properties[propertyKey] as JSONSchema7).type = Array.isArray(_type) ? (_type.includes(type) ? _type : [..._type, type]) : [_type, type];
                return schema;
            },
        });
    };
}
