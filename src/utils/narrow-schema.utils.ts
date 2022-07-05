import { JSONSchema7, JSONSchema7Definition } from "json-schema";

export function narrowSchema(schema:JSONSchema7Definition):JSONSchema7{
    if(typeof schema==='object') return schema;
    else return {};
}