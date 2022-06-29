import { JSONSchema7Definition } from "json-schema";
import { SchemaDecorators } from "../enum";
import { decoratorMapper } from "../utils/decorator.utils";

export function ExclusiveMinimum(minimum: number){
    return function (target, propertyKey){

        decoratorMapper(target, propertyKey, minimum, (minimum, schema)=>{schema.type === 'array' ? (schema.items = { minimum: minimum }) : (schema.minimum = minimum); return schema}, SchemaDecorators.ExclusiveMinimum)

    }
}
