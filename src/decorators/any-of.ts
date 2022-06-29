import { JSONSchema7Definition } from "json-schema";
import { SchemaDecorators } from "../enum";
import { decoratorMapper } from "../utils/decorator.utils";


export function AnyOf(...anyOf: JSONSchema7Definition[]):PropertyDecorator {
    return function (target,propertyKey){
        decoratorMapper(target, propertyKey, anyOf, (anyOf, schema)=>{schema.anyOf=anyOf; return schema}, SchemaDecorators.anyOf)

    }
}
