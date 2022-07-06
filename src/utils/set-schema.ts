import { JSONSchema7TypeName } from 'json-schema';
import { JSONSchema } from '../class';
import { JsonSchemaOptions } from './get-schema';
import { isCustomClass } from './is-custom-class';
import { classTransformer } from './transformer.utils';
import { isClass } from './utils';

export function setSchemaByMetaType(schema: JSONSchema, property: any, propertyKey: string, jsonSchemaOptions: Partial<JsonSchemaOptions>) {
    let propertyType = property.name;
    if (!isCustomClass(property.prototype)) propertyType = property.name.toLowerCase();
    if (property.prototype === Date.prototype) propertyType = 'string';
    if (!schema) schema.type = 'object';
    if (!schema.properties) schema.properties = {};
    if (!schema.required) schema.required = [];
    if (!schema.required.includes(propertyKey)) schema.required.push(propertyKey);
    if (propertyKey) schema.properties[propertyKey] = {};
    if (propertyType === 'array') return;
    if (!isClass(property)) {
        schema.properties[propertyKey] = { type: propertyType as JSONSchema7TypeName };
        return;
    }
    const tmp = classTransformer({
        type: property,
        specType: jsonSchemaOptions.specTypes,
        schemaRefPath: undefined,
        isArray: false,
    });
    schema.properties[propertyKey] = { ...(tmp as object) };
}
