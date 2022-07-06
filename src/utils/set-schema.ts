import { JSONSchema } from '../class';
import { JsonSchemaOptions } from './get-schema';
import { narrowSchema } from './narrow-schema.utils';
import { classTransformer } from './transformer.utils';

export function setSchemaByMetaType(schema: JSONSchema, property: any, propertyKey: string, jsonSchemaOptions: Partial<JsonSchemaOptions>) {
    let propertyType = property.name;
    propertyType = propertyType.charAt(0).toLowerCase() + propertyType.slice(1);
    if (!schema) schema.type = 'object';
    // if (!schema.properties) schema.properties = {};
    if (!schema.required) schema.required = [];
    if (!schema.required.includes(propertyKey)) schema.required.push(propertyKey);
    //if (propertyKey) schema.properties[propertyKey] = {};
    if (propertyType === 'array') return;
    if(schema.properties[propertyKey]['$ref']) return
    const tmp = classTransformer({
        type: property,
        schemaRefPath: jsonSchemaOptions.schemaRefPath,
    });
    schema.properties[propertyKey] = { ...(tmp as object),...narrowSchema(schema.properties[propertyKey]) };
}
