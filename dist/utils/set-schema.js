"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSchemaByMetaType = exports.setSchema = void 0;
const utils_1 = require("./utils");
const JSON_SCHEMA_KEY = Symbol('json-schema');
function setSchema(target, schema) {
    Reflect.defineMetadata(JSON_SCHEMA_KEY, schema, target);
}
exports.setSchema = setSchema;
function setSchemaByMetaType(schema, property, propertyKey, setType) {
    let propertyType = property.name.toLowerCase();
    if (!schema)
        schema.type = 'object';
    if (!schema.properties)
        schema.properties = {};
    schema.properties[propertyKey] = {
        ...(!(0, utils_1.isClass)(property) && setType
            ? {
                type: propertyType,
            }
            : {}),
    };
    if (!schema.required)
        schema.required = [];
    if (!schema.required.includes(propertyKey))
        schema.required.push(propertyKey);
}
exports.setSchemaByMetaType = setSchemaByMetaType;
