export const JSON_SCHEMA_KEY = Symbol('json-schema');
import { JSONSchema7TypeName } from 'json-schema';
import { JSONSchema } from '../class/json-schema';
import { SchemaDecorators } from '../enum/decorator';
import { DecoratedMap } from '../types/decorated-map';
import { SpecTypes } from '../types/spec-type';

export function getSchema(target: object, propertyKey?: string | symbol) {
    const schema = Reflect.getMetadata(JSON_SCHEMA_KEY, target) as JSONSchema;
    return schema;
}

function isClass(func) {
    return typeof func === 'function' && /^class\s/.test(Function.prototype.toString.call(func));
}

export function getSchemaMetaType(target: { new (...args: any[]) }, propertyKey?: string): Function {
    return Reflect.getMetadata('design:type', new target(), propertyKey) as Function;
}

export function setSchemaByMetaType(schema: JSONSchema, property: Function, isClassType: Boolean, propertyKey?: string) {
    let propertyType = (property.name as String).toLowerCase();
    if (!schema) schema.type = 'object';
    if (!schema.properties) schema.properties = {};
    schema.properties[propertyKey] = {
        ...(isClassType
            ? {
                  $ref: `#/definitions/${property.name}`,
              }
            : {
                  type: propertyType as JSONSchema7TypeName,
                  ...(propertyKey === 'array'
                      ? {
                            items: {},
                        }
                      : {}),
              }),
    };
    if (!schema.required) schema.required = [];
    schema.required.push(propertyKey);
}

function replaceAll(src: string, find: string, replace: string) {
    return src.replace(new RegExp(find, 'g'), replace);
}

export interface ConvertersOptions<T = any> {
    target: object;
    meta: any;
    schema: JSONSchema;
    arguments: T;
    defaultConverter: Function;
}

interface JsonSchemaOptions {
    specTypes: SpecTypes;
    schemaRefPath: string;
    additionalConverters: {
        [schemaDecorator in SchemaDecorators]: (convertersOptions: Partial<ConvertersOptions>) => JSONSchema;
    };
}

export function getJsonSchema(entity: any, jsonSchemaOptions: Partial<JsonSchemaOptions>) {
    let decoratedMaps: DecoratedMap = Reflect.getMetadata(JSON_SCHEMA_KEY, entity);
    let schema: JSONSchema = new JSONSchema();
    let meta: any = {};
    for (const propertyKey of Object.keys(decoratedMaps)) {
        const metaType = getSchemaMetaType(entity, propertyKey);
        const isClassType = isClass(metaType);
        setSchemaByMetaType(schema, metaType, isClassType, propertyKey);
        if (!isClassType)
            for (const decorated of decoratedMaps[propertyKey]) {
                if (jsonSchemaOptions.additionalConverters?.[decorated.type]) {
                    jsonSchemaOptions.additionalConverters[decorated.type]({
                        target: entity,
                        schema: schema,
                        meta: meta,
                        arguments: decorated.args,
                    });
                } else decorated.fn(decorated.args, schema, propertyKey);
            }
    }

    if (jsonSchemaOptions.specTypes === SpecTypes.SWAGGER || jsonSchemaOptions.specTypes === SpecTypes.OPENAPI) {
        const stringSchema = replaceAll(JSON.stringify(schema.toJSON()), '#/definitions', '#/components/schemas');
        schema = new JSONSchema(JSON.parse(stringSchema))
    }

    return schema;
}
