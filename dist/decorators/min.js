"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Min = void 0;
const enum_1 = require("../enum");
const decorator_utils_1 = require("../utils/decorator.utils");
function Min(minimum) {
    return function (target, propertyKey) {
        (0, decorator_utils_1.decoratorMapper)({
            target,
            propertyKey: propertyKey.toString(),
            parameters: minimum,
            fn: (minimum, schema, propertyKey) => {
                const schemaProperties = schema.properties[propertyKey];
                if (typeof schemaProperties === "boolean")
                    return;
                schema.properties[propertyKey] === 'array'
                    ? (schemaProperties.items = { minimum: minimum, ...schemaProperties.items })
                    : (schemaProperties.minimum = minimum);
                return schema;
            },
            schemaDecorator: enum_1.SchemaDecorators.Min,
        });
    };
}
exports.Min = Min;
