"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enum = void 0;
const enum_1 = require("../enum");
const decorator_utils_1 = require("../utils/decorator.utils");
function Enum(...enumValues) {
    return function (target, propertyKey) {
        (0, decorator_utils_1.decoratorMapper)({
            target,
            propertyKey: propertyKey.toString(),
            parameters: enumValues,
            fn: (enumValues, schema, propertyKey) => {
                let schemaProperties = schema.properties[propertyKey];
                if (typeof schemaProperties === "boolean")
                    return;
                schemaProperties.enum = enumValues;
                return schema;
            },
            schemaDecorator: enum_1.SchemaDecorators.AnyOf,
        });
    };
}
exports.Enum = Enum;
