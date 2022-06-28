const JSON_SCHEMA_KEY = Symbol('json-schema');

export function setSchema(target: object, schema:Object):void{
    Reflect.defineMetadata(JSON_SCHEMA_KEY, schema, target);
}