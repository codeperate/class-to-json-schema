const JSON_SCHEMA_KEY = Symbol("json-schema");
import { JSONSchema7 } from "json-schema";
import { JSONSchema } from "../class/json-schema";
export function getSchema(target: object, propertyKey?: string) {
  let schema = Reflect.getMetadata(JSON_SCHEMA_KEY, target) as
    | JSONSchema
    | undefined;
  if (!schema) schema = new JSONSchema();
}
