"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxLength = void 0;
const enum_1 = require("../enum");
const decorator_utils_1 = require("../utils/decorator.utils");
function MaxLength(maxLength) {
    return function (target, propertyKey) {
        (0, decorator_utils_1.decoratorMapper)({
            target,
            propertyKey: propertyKey.toString(),
            parameters: maxLength,
            fn: (maxLength, schema, propertyKey) => {
                const schemaProperties = schema.properties[propertyKey];
                if (typeof schemaProperties === "boolean")
                    return;
                if (!schemaProperties)
                    schemaProperties.items = {};
                if (schemaProperties.type === 'array')
                    schemaProperties.items = { maxLength: maxLength, ...schemaProperties.items };
                else
                    schemaProperties.maxLength = maxLength;
                return schema;
            },
            schemaDecorator: enum_1.SchemaDecorators.MaxLength,
        });
    };
}
exports.MaxLength = MaxLength;
