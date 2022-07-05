"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJsonSchema = exports.getSchemaMetaType = exports.getSchema = exports.JSON_CLASS_KEY = exports.JSON_SCHEMA_KEY = void 0;
exports.JSON_SCHEMA_KEY = Symbol('json-schema');
exports.JSON_CLASS_KEY = Symbol('json-class');
// import { Collection } from '@mikro-orm/core';
const json_schema_1 = require("../class/json-schema");
const set_schema_1 = require("./set-schema");
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
    let classDecoratedMaps = Reflect.getMetadata(exports.JSON_CLASS_KEY, entity);
    let schema = new json_schema_1.JSONSchema();
    let meta = {};
    for (const propertyKey of Object.keys(decoratedMaps)) {
        const metaType = getSchemaMetaType(entity, propertyKey);
        let decorators = decoratedMaps[propertyKey];
        const collectionIdx = decoratedMaps[propertyKey].findIndex((e) => e.type === 'CollectionOf');
        (0, set_schema_1.setSchemaByMetaType)(schema, metaType, propertyKey, collectionIdx === -1);
        if (collectionIdx !== -1) {
            const schemaProperties = schema.properties[propertyKey];
            const upperDecrators = decorators.slice(collectionIdx, decorators.length);
            for (const upperDecrator of upperDecrators.reverse()) {
                if (upperDecrator.type === 'CollectionOf') {
                    schemaProperties.type = 'array';
                    if (!schemaProperties.items)
                        schemaProperties.items = {};
                }
                if (jsonSchemaOptions.additionalConverters?.[upperDecrator.type]) {
                    jsonSchemaOptions.additionalConverters[upperDecrator.type]({
                        target: entity,
                        schema: schema,
                        meta: meta,
                        arguments: upperDecrator.args,
                    });
                }
                else
                    upperDecrator.fn(upperDecrator.args, schema, propertyKey, jsonSchemaOptions);
            }
            decorators = decorators.splice(0, collectionIdx);
        }
        for (const decorated of decorators) {
            if (jsonSchemaOptions.additionalConverters?.[decorated.type]) {
                jsonSchemaOptions.additionalConverters[decorated.type]({
                    target: entity,
                    schema: schema,
                    meta: meta,
                    arguments: decorated.args,
                });
            }
            else
                decorated.fn(decorated.args, schema, propertyKey, jsonSchemaOptions);
        }
    }
    if (classDecoratedMaps) {
        for (const classKey of Object.keys(classDecoratedMaps)) {
            for (const decorated of classDecoratedMaps[classKey]) {
                if (jsonSchemaOptions.additionalConverters?.[decorated.type]) {
                    jsonSchemaOptions.additionalConverters[decorated.type]({
                        target: entity,
                        schema: schema,
                        meta: meta,
                        arguments: decorated.args,
                    });
                }
                else
                    decorated.fn(decorated.args, schema, undefined, jsonSchemaOptions);
            }
        }
    }
    return schema;
}
exports.getJsonSchema = getJsonSchema;
