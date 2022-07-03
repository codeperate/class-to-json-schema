"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Minimum = void 0;
const enum_1 = require("../enum");
const decorator_utils_1 = require("../utils/decorator.utils");
function Minimum(minimum) {
    return function (target, propertyKey) {
        (0, decorator_utils_1.decoratorMapper)({
            target,
            propertyKey: propertyKey.toString(),
            parameters: minimum,
            fn: (minimum, schema, propertyKey) => {
                const schemaProperties = schema.properties[propertyKey];
                if (typeof schemaProperties === "boolean")
                    return;
                schemaProperties.type === 'array'
                    ? (schemaProperties.items = { minimum: minimum, ...schemaProperties.items })
                    : (schemaProperties.minimum = minimum);
                return schema;
            },
            schemaDecorator: enum_1.SchemaDecorators.Minimum,
        });
    };
}
exports.Minimum = Minimum;
