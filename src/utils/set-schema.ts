import { JSONSchema7TypeName } from 'json-schema';
import { JSONSchema } from '../class';
import { isClass } from './utils';

const JSON_SCHEMA_KEY = Symbol('json-schema');

export function setSchema(target: object, schema: Object): void {
    Reflect.defineMetadata(JSON_SCHEMA_KEY, schema, target);
}

export function setSchemaByMetaType(schema: JSONSchema, property: Function, propertyKey: string, setType: boolean) {
    let propertyType = property.name.toLowerCase();
    if (!schema) schema.type = 'object';
    if (!schema.properties) schema.properties = {};
    schema.properties[propertyKey] = {
        ...(!isClass(property) && setType
            ? {
                  type: propertyType as JSONSchema7TypeName,
              }
            : {}),
    };
    if (!schema.required) schema.required = [];
    if (!schema.required.includes(propertyKey)) schema.required.push(propertyKey);
}
