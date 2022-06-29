import { JSONSchema7Definition } from "json-schema";
import { SchemaDecorators } from "../enum";
import { decoratorMapper } from "../utils/decorator.utils";

export function OneOf(...oneOf: JSONSchema7Definition[]): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
          target,
          propertyKey: propertyKey.toString(),
          schemaDecorator: SchemaDecorators.OneOf,
          fn: (args, schema) => {
            args = oneOf
            schema.oneOf = oneOf;
            return schema;
          },
        });
      };
}