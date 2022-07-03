"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneOf = void 0;
const enum_1 = require("../enum");
const decorator_utils_1 = require("../utils/decorator.utils");
function OneOf(...oneOf) {
    return function (target, propertyKey) {
        (0, decorator_utils_1.decoratorMapper)({
            target,
            propertyKey: propertyKey.toString(),
            schemaDecorator: enum_1.SchemaDecorators.OneOf,
            fn: (oneOf, schema, propertyKey) => {
                let schemaProperties = schema.properties[propertyKey];
                if (typeof schemaProperties === "boolean")
                    return;
                schemaProperties.oneOf = oneOf;
                return schema;
            },
        });
    };
}
exports.OneOf = OneOf;
