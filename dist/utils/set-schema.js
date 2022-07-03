"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSchemaByMetaType = exports.setSchema = void 0;
const JSON_SCHEMA_KEY = Symbol('json-schema');
function setSchema(target, schema) {
    Reflect.defineMetadata(JSON_SCHEMA_KEY, schema, target);
}
exports.setSchema = setSchema;
function setSchemaByMetaType(schema, property, isClassType, propertyKey) {
    let propertyType = property.name.toLowerCase();
    if (!schema)
        schema.type = 'object';
    if (!schema.properties)
        schema.properties = {};
    schema.properties[propertyKey] = {
        ...(isClassType
            ? {
                $ref: `#/definitions/${property.name}`,
            }
            : {
                type: propertyType,
                ...(propertyKey === 'array'
                    ? {
                        items: {},
                    }
                    : {}),
            }),
    };
    if (!schema.required)
        schema.required = [];
    if (!schema.required.includes(propertyKey))
        schema.required.push(propertyKey);
}
exports.setSchemaByMetaType = setSchemaByMetaType;
