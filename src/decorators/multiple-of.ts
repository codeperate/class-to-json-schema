import { getSchema } from "../utils/get-schema";

export function MultipleOf(multipleOf: number): PropertyDecorator {
    return function (target, propertyKey) {
      let schema = getSchema(target,propertyKey);
      schema.type === 'array' ? (schema.items = { multipleOf: multipleOf }) : (schema.multipleOf = multipleOf);
    };
  }
  