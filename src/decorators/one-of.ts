import { JSONSchema7Definition } from "json-schema";
import { SchemaDecorators } from "../enum";
import { changeSchema } from "../utils/change-schema";
import { decoratorMapper } from "../utils/decorator.utils";

export function OneOf(...oneOf: JSONSchema7Definition[]): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
          target,
          propertyKey: propertyKey.toString(),
          schemaDecorator: SchemaDecorators.OneOf,
          fn: (oneOf, schema,propertyKey) => {
            changeSchema(schema,(s)=>{s.oneOf=oneOf},propertyKey)
          },
        });
      };
}