import "reflect-metadata";
import { getSchema } from "../utils/get-schema";
export function Required(): PropertyDecorator {
  return function (target, propertyKey) {
    let schema = getSchema(target,propertyKey);
    schema.required.push(propertyKey.toString())
  };
}
