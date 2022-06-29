import { JSONSchema } from "../class";
import { SchemaDecorators } from "../enum";
import { DecoratedMap } from "../types/decorated-map";
import { JSON_SCHEMA_KEY } from "./get-schema";

export function decoratorMapper(target,propertyKey,parameters,fn:(arg:any,schema:JSONSchema)=>void,schemaDecorator:SchemaDecorators){
    const decoratedMap:DecoratedMap=Reflect.getMetadata(JSON_SCHEMA_KEY,target)
    if(!decoratedMap[propertyKey]) decoratedMap[propertyKey]=[];
    decoratedMap[propertyKey].push({
        type:schemaDecorator,
        args:parameters,
        fn:fn
    })
    return decoratedMap
}