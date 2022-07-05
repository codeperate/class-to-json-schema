export const JSON_SCHEMA_KEY = Symbol('json-schema');
export const JSON_CLASS_KEY = Symbol('json-class');
import { JSONSchema7 } from 'json-schema';
// import { Collection } from '@mikro-orm/core';
import { JSONSchema } from '../class/json-schema';
import { SchemaDecorators } from '../enum/decorator';
import { DecoratedMap } from '../types/decorated-map';
import { SpecTypes } from '../types/spec-type';
import { setSchemaByMetaType } from './set-schema';

export function getSchema(target: object, propertyKey?: string | symbol) {
    const schema = Reflect.getMetadata(JSON_SCHEMA_KEY, target) as JSONSchema;
    return schema;
}

export function getSchemaMetaType(target: { new (...args: any[]) }, propertyKey?: string): Function {
    return Reflect.getMetadata('design:type', new target(), propertyKey) as Function;
}

export interface ConvertersOptions<T = any> {
    target: object;
    meta: any;
    schema: JSONSchema;
    arguments: T;
    defaultConverter: Function;
}

export interface JsonSchemaOptions {
    specTypes: SpecTypes;
    schemaRefPath: string;
    additionalConverters: {
        [schemaDecorator in SchemaDecorators]: (convertersOptions: Partial<ConvertersOptions>) => JSONSchema;
    };
}

export function getJsonSchema(entity: any, jsonSchemaOptions: Partial<JsonSchemaOptions>) {
    let decoratedMaps: DecoratedMap = Reflect.getMetadata(JSON_SCHEMA_KEY, entity);
    let classDecoratedMaps = Reflect.getMetadata(JSON_CLASS_KEY, entity);
    let schema: JSONSchema = new JSONSchema();
    let meta: any = {};

    for (const propertyKey of Object.keys(decoratedMaps)) {
        const metaType = getSchemaMetaType(entity, propertyKey);
        let decorators = decoratedMaps[propertyKey];
        const collectionIdx = decoratedMaps[propertyKey].findIndex((e) => e.type === 'CollectionOf');
        setSchemaByMetaType(schema, metaType, propertyKey, collectionIdx === -1);
        if (collectionIdx !== -1) {
            const schemaProperties = schema.properties[propertyKey] as JSONSchema7;
            const upperDecrators = decorators.slice(collectionIdx, decorators.length);
            for (const upperDecrator of upperDecrators.reverse()) {
                if (upperDecrator.type === 'CollectionOf') {
                    schemaProperties.type = 'array';
                    if (!schemaProperties.items) schemaProperties.items = {};
                }
                if (jsonSchemaOptions.additionalConverters?.[upperDecrator.type]) {
                    jsonSchemaOptions.additionalConverters[upperDecrator.type]({
                        target: entity,
                        schema: schema,
                        meta: meta,
                        arguments: upperDecrator.args,
                    });
                } else upperDecrator.fn(upperDecrator.args, schema, propertyKey, jsonSchemaOptions);
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
            } else decorated.fn(decorated.args, schema, propertyKey, jsonSchemaOptions);
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
                } else decorated.fn(decorated.args, schema, undefined, jsonSchemaOptions);
            }
        }
    }
    return schema;
}
