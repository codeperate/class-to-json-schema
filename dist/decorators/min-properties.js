"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinProperties = void 0;
const enum_1 = require("../enum");
const decorator_utils_1 = require("../utils/decorator.utils");
function MinProperties(minProperties) {
    return function (target, propertyKey) {
        (0, decorator_utils_1.decoratorMapper)({
            target,
            propertyKey: propertyKey.toString(),
            parameters: minProperties,
            fn: (minProperties, schema, propertyKey) => {
                let schemaProperties = schema.properties[propertyKey];
                if (typeof schemaProperties === "boolean")
                    return;
                schemaProperties.minProperties = minProperties;
                return schema;
            },
            schemaDecorator: enum_1.SchemaDecorators.MinProperties,
        });
    };
}
exports.MinProperties = MinProperties;
