import { JSONSchema7Definition } from "json-schema";
import { SchemaDecorators } from "../enum";
import { decoratorMapper } from "../utils/decorator.utils";

export function OneOf(...oneOf: JSONSchema7Definition[]): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
          target,
          propertyKey: propertyKey.toString(),
          schemaDecorator: SchemaDecorators.OneOf,
          fn: (oneOf, schema,propertyKey) => {
            let schemaProperties = schema.properties[propertyKey];

            if(typeof schemaProperties==="boolean") return;
            schemaProperties.oneOf = oneOf;
            return schema;
          },
        });
      };
}