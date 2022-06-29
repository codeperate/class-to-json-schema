import "reflect-metadata";
import { SchemaDecorators } from "../enum";
import { decoratorMapper } from "../utils/decorator.utils";
import { getSchema } from "../utils/get-schema";
export function Required(): PropertyDecorator {
  return function (target, propertyKey) {
    decoratorMapper({target,propertyKey:propertyKey.toString(),schemaDecorator:SchemaDecorators.Required,fn:(args,schema)=>{
      schema.required.push(propertyKey.toString())
      return schema
    }})    
  };
}
