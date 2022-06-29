import { JSONSchema7Definition } from "json-schema";
import { SchemaDecorators } from "../enum";
import { decoratorMapper } from "../utils/decorator.utils";

export function Format(format: JsonFormatTypes) {
    return function(target,propertyKey){
        decoratorMapper(target, propertyKey, format, (format, schema)=>{schema.format = format; return schema}, SchemaDecorators.Format)
    }
}

export enum JsonFormatTypes {
    DATE_TIME = "date-time",
    DATE = "date",
    TIME = "time",
    EMAIL = "email",
    HOSTNAME = "hostname",
    IPV4 = "ipv4",
    IPV6 = "ipv6",
    URI = "uri",
    URL = "url",
    URI_REF = "uri-reference",
    URI_TEMPLATE = "uri-template",
    JSON_POINTER = "json-pointer",
    RELATIVE_JSON_POINTER = "relative-json-pointer",
    UUID = "uuid",
    REGEX = "regex"
}