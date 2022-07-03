"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinLength = void 0;
const enum_1 = require("../enum");
const decorator_utils_1 = require("../utils/decorator.utils");
function MinLength(minLength) {
    return function (target, propertyKey) {
        (0, decorator_utils_1.decoratorMapper)({ target,
            propertyKey: propertyKey.toString(),
            parameters: minLength,
            fn: (minLength, schema, propertyKey) => {
                let schemaProperties = schema.properties[propertyKey];
                if (typeof schemaProperties === "boolean")
                    return;
                schemaProperties.type === 'array'
                    ? schemaProperties.items = { minLength: minLength, ...schemaProperties.items }
                    : schemaProperties.minLength = minLength;
                return schema;
            },
            schemaDecorator: enum_1.SchemaDecorators.MinLength, });
    };
}
exports.MinLength = MinLength;
