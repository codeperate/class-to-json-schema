export const JSON_SCHEMA_KEY = Symbol('json-schema');

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

// export function getClassMetaType(target: { new (...args: any[]) }): Function {
//     console.log(Reflect.getMetadata('design:type', target));
    
    
//     return Reflect.getMetadata('design:type', new target()) ;
// }


// export function getClassMetaType(target:Class){
//     const meta = Reflect.getMetadata('design:paramtypes', target) 
//     return meta
// }

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
    let schema: JSONSchema = new JSONSchema();
    let meta: any = {};
    console.log( Reflect.getMetadata(JSON_SCHEMA_KEY, entity));
    

    for (const propertyKey of Object.keys(decoratedMaps)) {
        const metaType = getSchemaMetaType(entity, propertyKey);

        setSchemaByMetaType(schema, metaType, propertyKey);
        const collectionIdx = decoratedMaps[propertyKey].findIndex((e) => e.type === 'CollectionOf');
        if (collectionIdx !== -1) {
            const { args } = decoratedMaps[propertyKey][collectionIdx];
            schema.properties[propertyKey] = { type: 'array' };
            decoratedMaps[propertyKey][collectionIdx].fn(args, schema, propertyKey, jsonSchemaOptions);
            decoratedMaps[propertyKey].splice(collectionIdx, 1);
        }
        for (const decorated of decoratedMaps[propertyKey]) {
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

    // if (jsonSchemaOptions.specTypes === SpecTypes.SWAGGER || jsonSchemaOptions.specTypes === SpecTypes.OPENAPI) {
    //     const stringSchema = replaceAll(JSON.stringify(schema.toJSON()), '#/definitions', '#/components/schemas');
    //     schema = new JSONSchema(JSON.parse(stringSchema))
    // }
    return schema;
}
