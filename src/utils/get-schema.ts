export const JSON_SCHEMA_KEY = Symbol('json-schema');
import { JSONSchema7TypeName } from 'json-schema';
import { JSONSchema } from '../class/json-schema';
import { SchemaDecorators } from '../enum/decorator';
import { DecoratedMap } from '../types/decorated-map';
import { SpecTypes } from '../types/spec-type';

export function getSchema(target: object, propertyKey?: string | symbol) {
    const schema = Reflect.getMetadata(JSON_SCHEMA_KEY, target) as JSONSchema;
    // if (!schema) {
    //     //  const _schema = getSchemaByMetaType(target, propertyKey);
    //     //  setSchema(target, _schema);
    //     //  return _schema;
    // }
    return schema;
}

export function setSchemaByMetaType(schema: JSONSchema, target: { new (...args: any[]) }, propertyKey?: string) {
    let propertyType = (Reflect.getMetadata('design:type', new target(), propertyKey).name as String).toLowerCase();
    if (!schema) schema.type = 'object';
    if (!schema.properties) schema.properties = {};
    schema.properties[propertyKey] = {
        type: propertyType as JSONSchema7TypeName,
        ...(propertyKey === 'array')?{
            items:{}
        }:{}
    };
    
    if(!schema.required) schema.required = []
    schema.required.push(propertyKey)
}

// function replaceAll(src: string, find: string, replace: string) {
//     return src.replace(new RegExp(find, 'g'), replace);
// }

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
        setSchemaByMetaType(schema, entity, propertyKey);
        for (const decorated of decoratedMaps[propertyKey]) {
            if (jsonSchemaOptions.additionalConverters?.[decorated.type]) {
                jsonSchemaOptions.additionalConverters[decorated.type]({
                    target: entity,
                    schema: schema,
                    meta: meta,
                    arguments: decorated.args,
                });
            } else decorated.fn(decorated.args, schema,propertyKey);
        }
    }
    // if (jsonSchemaOptions.specTypes === SpecTypes.SWAGGER || jsonSchemaOptions.specTypes === SpecTypes.OPENAPI) {
    //     const stringSchema = replaceAll(JSON.stringify(schema.toJSON()), '#/definitions', '#/components/schemas');
    //     schema = JSON.parse(stringSchema);
    // }
    console.log(schema.toJSON());
    console.log(schema.properties['fingers']);
    
    return schema;
}
