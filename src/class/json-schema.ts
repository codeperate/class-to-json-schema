import { JSONSchema7 } from "json-schema";
export class JSONSchema {
  public schema: JSONSchema7;
  constructor(schema: JSONSchema7 = {}) {
    this.schema = schema;
  }
  pick() {}
  omit() {}
}
