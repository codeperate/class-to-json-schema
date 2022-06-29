import { JSONSchema7Definition } from "json-schema";
import { SchemaDecorators } from "../enum";
import { decoratorMapper } from "../utils/decorator.utils";


export function Any(...types: (JSONSchema7TypeName | any)[]): PropertyDecorator {
    return function (target,propertyKey){
        //decoratorMapper(target, propertyKey, types, (types, schema)=>{schema.type = types; return schema}, SchemaDecorators.AllOf)
    }
}
