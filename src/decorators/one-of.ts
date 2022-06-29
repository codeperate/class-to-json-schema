import { JSONSchema7Definition } from "json-schema";
import { SchemaDecorators } from "../enum";
import { decoratorMapper } from "../utils/decorator.utils";
import { getSchema } from "../utils/get-schema";

export function OneOf(...oneOf: JSONSchema7Definition[]): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
          target,
          propertyKey: propertyKey.toString(),
          schemaDecorator: SchemaDecorators.OneOf,
          fn: (oneOf, schema) => {
            schema.oneOf = oneOf;
            return schema;
          },
        });
      };
}