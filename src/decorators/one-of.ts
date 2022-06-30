import { JSONSchema7, JSONSchema7Definition } from "json-schema";
import { SchemaDecorators } from "../enum";
import { decoratorMapper } from "../utils/decorator.utils";

export function OneOf(...oneOf: JSONSchema7Definition[]): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
          target,
          propertyKey: propertyKey.toString(),
          schemaDecorator: SchemaDecorators.OneOf,
          fn: (oneOf, schema) => {
            (schema.properties[propertyKey.toString()] as JSONSchema7).oneOf = oneOf;
            return schema;
          },
        });
      };
}