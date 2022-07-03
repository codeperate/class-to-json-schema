"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJsonSchema = exports.getSchemaMetaType = exports.getSchema = exports.JSON_SCHEMA_KEY = void 0;
exports.JSON_SCHEMA_KEY = Symbol('json-schema');
// import { Collection } from '@mikro-orm/core';
const json_schema_1 = require("../class/json-schema");
const spec_type_1 = require("../types/spec-type");
const set_schema_1 = require("./set-schema");
const utils_1 = require("./utils");
function getSchema(target, propertyKey) {
    const schema = Reflect.getMetadata(exports.JSON_SCHEMA_KEY, target);
    return schema;
}
exports.getSchema = getSchema;
function getSchemaMetaType(target, propertyKey) {
    return Reflect.getMetadata('design:type', new target(), propertyKey);
}
exports.getSchemaMetaType = getSchemaMetaType;
function getJsonSchema(entity, jsonSchemaOptions) {
    let decoratedMaps = Reflect.getMetadata(exports.JSON_SCHEMA_KEY, entity);
    let schema = new json_schema_1.JSONSchema();
    let meta = {};
    for (const propertyKey of Object.keys(decoratedMaps)) {
        const metaType = getSchemaMetaType(entity, propertyKey);
        const isClassType = (0, utils_1.isClass)(metaType);
        (0, set_schema_1.setSchemaByMetaType)(schema, metaType, isClassType, propertyKey);
        if (!isClassType) {
            for (const decorated of decoratedMaps[propertyKey]) {
                if (jsonSchemaOptions.additionalConverters?.[decorated.type]) {
                    jsonSchemaOptions.additionalConverters[decorated.type]({
                        target: entity,
                        schema: schema,
                        meta: meta,
                        arguments: decorated.args,
                    });
                }
                else
                    decorated.fn(decorated.args, schema, propertyKey);
            }
        }
    }
    if (jsonSchemaOptions.specTypes === spec_type_1.SpecTypes.SWAGGER || jsonSchemaOptions.specTypes === spec_type_1.SpecTypes.OPENAPI) {
        const stringSchema = (0, utils_1.replaceAll)(JSON.stringify(schema.toJSON()), '#/definitions', '#/components/schemas');
        schema = new json_schema_1.JSONSchema(JSON.parse(stringSchema));
    }
    return schema;
}
exports.getJsonSchema = getJsonSchema;
