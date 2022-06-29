export const JSON_SCHEMA_KEY = Symbol('json-schema');
import { JSONSchema } from '../class/json-schema';
import { SchemaDecorators } from '../enum/decorator';
import { DecoratedMap } from '../types/decorated-map';
import { SpecTypes } from '../types/spec';
import { defaultConverters } from './defaultConverters';
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
    defaultConverter:Function;
    schema:JSONSchema
    arguments:T
}

interface JsonSchemaOptions {
    specTypes: SpecTypes;
    schemaRefPath: string;
    additionalConverters: {
        [schemaDecorator in SchemaDecorators]: (convertersOptions: ConvertersOptions) => JSONSchema;
    };
}



export function getJsonSchema(entity: any, jsonSchemaOptions: Partial<JsonSchemaOptions>) {
    const decoratedMap = Reflect.getMetadata(JSON_SCHEMA_KEY, entity) as DecoratedMap[];
    let schema: JSONSchema; //= Reflect.getMetadata(JSON_SCHEMA_KEY, entity)
    const attrs = Object.keys(entity);
    const meta = {}
    for (const attr of attrs) {
        for (const decorator of decoratedMap[attr]) {
            if (jsonSchemaOptions.additionalConverters) 
                jsonSchemaOptions.additionalConverters[decorator.type].defaultConverter(entity,meta,);
            else decorator.fn(decorator.args);
        }
    }
    // if (specTypes === SpecTypes.SWAGGER || specTypes === SpecTypes.OPENAPI) {
    //     schema = Reflect.getMetadata(JSON_SCHEMA_KEY, entity) as JSONSchema;
    //     const stringSchema = replaceAll(JSON.stringify(schema.toJSON()), '#/definitions', '#/components/schemas');
    //     schema = JSON.parse(stringSchema);
    // }
    return schema;
}
