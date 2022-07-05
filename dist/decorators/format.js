"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonFormatTypes = exports.Format = void 0;
const enum_1 = require("../enum");
const decorator_utils_1 = require("../utils/decorator.utils");
function Format(format) {
    return function (target, propertyKey) {
        (0, decorator_utils_1.decoratorMapper)({
            target,
            propertyKey,
            parameters: format,
            fn: (format, schema, propertyKey) => {
                const schemaProperties = schema.properties[propertyKey];
                if (typeof schemaProperties === 'boolean')
                    return;
                //  if (!schemaProperties.type || schemaProperties.type === 'object') schemaProperties.type = 'string';
                // schemaProperties.type === 'array' ? (schemaProperties.items = { format: format, ...(schemaProperties.items as object) }) : (schemaProperties.format = format);
                schemaProperties.type === 'array'
                    ? (schemaProperties.items = { format: format, ...schemaProperties.items })
                    : ((schemaProperties.format = format), (schemaProperties.type = 'string'));
                return schema;
                // changeSchema(schema,(s)=>{s.format=format},propertyKey)
            },
            schemaDecorator: enum_1.SchemaDecorators.Format,
        });
    };
}
exports.Format = Format;
var JsonFormatTypes;
(function (JsonFormatTypes) {
    JsonFormatTypes["DATE_TIME"] = "date-time";
    JsonFormatTypes["DATE"] = "date";
    JsonFormatTypes["TIME"] = "time";
    JsonFormatTypes["EMAIL"] = "email";
    JsonFormatTypes["HOSTNAME"] = "hostname";
    JsonFormatTypes["IPV4"] = "ipv4";
    JsonFormatTypes["IPV6"] = "ipv6";
    JsonFormatTypes["URI"] = "uri";
    JsonFormatTypes["URL"] = "url";
    JsonFormatTypes["URI_REF"] = "uri-reference";
    JsonFormatTypes["URI_TEMPLATE"] = "uri-template";
    JsonFormatTypes["JSON_POINTER"] = "json-pointer";
    JsonFormatTypes["RELATIVE_JSON_POINTER"] = "relative-json-pointer";
    JsonFormatTypes["UUID"] = "uuid";
    JsonFormatTypes["REGEX"] = "regex";
})(JsonFormatTypes = exports.JsonFormatTypes || (exports.JsonFormatTypes = {}));
