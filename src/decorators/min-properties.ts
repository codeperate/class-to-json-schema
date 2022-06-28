import { getSchema } from "../utils/get-schema";

export function MinProperties(minProperties: number): PropertyDecorator {
    return function (target, propertyKey) {
      let schema = getSchema(target,propertyKey);
      schema.minProperties = minProperties;
    };
  }
  