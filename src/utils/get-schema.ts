export const JSON_SCHEMA_KEY = Symbol('json-schema');
export const JSON_CLASS_KEY = Symbol('json-class');
// import { Collection } from '@mikro-orm/core';
import { JSONSchema } from '../class/json-schema';
import { SchemaDecorators } from '../enum/decorator';
import { DecoratedMap } from '../type/decorated-map';
import { SpecTypes } from '../type/spec-type';
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
export interface defaultConverterArgs {
    schema: JSONSchema;
    metaType: Function;
    propertyKey?: string;
    jsonSchemaOptions: Partial<JsonSchemaOptions>;
}

export interface JsonSchemaOptions {
    specTypes: SpecTypes;
    schemaRefPath: string;
    additionalConverters: {
        [schemaDecorator in SchemaDecorators]?: (convertersOptions: Partial<ConvertersOptions>) => JSONSchema;
    };
    defaultMetaConverter?: (args: defaultConverterArgs) => void;
}

export function getJsonSchema(entity: any, jsonSchemaOptions: Partial<JsonSchemaOptions>) {
    let decoratedMaps: DecoratedMap = Reflect.getMetadata(JSON_SCHEMA_KEY, entity);
    let classDecoratedMaps = Reflect.getMetadata(JSON_CLASS_KEY, entity);
    let schema: JSONSchema = new JSONSchema();
    let meta: any = {};

    for (const propertyKey of Object.keys(decoratedMaps)) {
        const metaType = getSchemaMetaType(entity, propertyKey);
        let decorators = decoratedMaps[propertyKey];
        setSchemaByMetaType(schema, metaType, propertyKey, jsonSchemaOptions);
        jsonSchemaOptions?.defaultMetaConverter?.({ schema, metaType, propertyKey, jsonSchemaOptions });
        for (const decorated of decorators.reverse()) {
            if (jsonSchemaOptions.additionalConverters?.[decorated.type]) {
                jsonSchemaOptions.additionalConverters[decorated.type]({
                    target: entity,
                    schema: schema,
                    meta: meta,
                    arguments: decorated.args,
                    defaultConverter: () => decorated.fn(decorated.args, schema, propertyKey, jsonSchemaOptions),
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
