export const JSON_SCHEMA_KEY = Symbol('json-schema');
import { JSONSchema } from '../class/json-schema';
import { SchemaDecorators } from '../enum/decorator';
import { DecoratedMap } from '../types/decorated-map';
import { SpecTypes } from '../types/spec';
import { setSchema } from './set-schema';
export function getSchema(target: object, propertyKey?: string | symbol) {
    const schema = Reflect.getMetadata(JSON_SCHEMA_KEY, target) as JSONSchema;
    if (!schema) {
        const _schema = getSchemaByMetaType(target, propertyKey);
        setSchema(target, _schema);
        return _schema;
    }
    return schema;
}

export function getSchemaByMetaType(target: object, propertyKey?: string | symbol): JSONSchema {
    let propertyType = Reflect.getMetadata('design:type', target, propertyKey);
    const schema = new JSONSchema({
        type: 'object',
        properties: {
            [propertyKey]: {
                type: propertyType,
            },
        },
    });
    Reflect.defineMetadata(JSON_SCHEMA_KEY, schema, target);
    return schema;
}

// function replaceAll(src: string, find: string, replace: string) {
//     return src.replace(new RegExp(find, 'g'), replace);
// }

export interface ConvertersOptions<T=any> {
    target:object;
    meta:any;
    schema:JSONSchema
    arguments:T;
    defaultConverter:Function;
}

interface JsonSchemaOptions {
    specTypes: SpecTypes;
    schemaRefPath: string;
    additionalConverters: {
        [schemaDecorator in SchemaDecorators]: (convertersOptions: Partial<ConvertersOptions>) => JSONSchema;
    };
}

export function getJsonSchema(entity: any, jsonSchemaOptions: Partial<JsonSchemaOptions>) {
    let decoratedMaps:DecoratedMap = Reflect.getMetadata(JSON_SCHEMA_KEY, entity)
    let schema: JSONSchema; //= Reflect.getMetadata(JSON_SCHEMA_KEY, entity)
    const attrs = Object.keys(entity);
    let meta:any = {}
    
    for (const attr of attrs) {
        for (const decoratedMap of decoratedMaps[attr]) {
            if (jsonSchemaOptions.additionalConverters?.[decoratedMap.type]) 
            {
                jsonSchemaOptions.additionalConverters[decoratedMap.type]({
                    target: entity,
                    schema: schema,
                    meta: meta,
                    arguments: decoratedMap.args
                })
            }
            else decoratedMap.fn(decoratedMap.args,schema); 
        }
    }
    // if (specTypes === SpecTypes.SWAGGER || specTypes === SpecTypes.OPENAPI) {
    //     schema = Reflect.getMetadata(JSON_SCHEMA_KEY, entity) as JSONSchema;
    //     const stringSchema = replaceAll(JSON.stringify(schema.toJSON()), '#/definitions', '#/components/schemas');
    //     schema = JSON.parse(stringSchema);
    // }
    return schema;
}
