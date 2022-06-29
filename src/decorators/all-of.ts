import { JSONSchema7Definition } from "json-schema";
import { SchemaDecorators } from "../enum";
import { ConvertersOptions, getSchema, JSON_SCHEMA_KEY } from "../utils/get-schema";

export function AllOf(...allOf: JSONSchema7Definition[]){
    return function (target,propertyKey){
        
        const decoratedMap=Reflect.getMetadata(JSON_SCHEMA_KEY,target)
        if(!decoratedMap[propertyKey]) decoratedMap[propertyKey]=[];
        decoratedMap[propertyKey].push({
            type:SchemaDecorators.AllOf,
            args:allOf,
            fn:(args,schema)=>{
                schema.allOf=args;
            }
        })
    }
}
