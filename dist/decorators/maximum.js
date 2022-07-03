"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Maximum = void 0;
const enum_1 = require("../enum");
const decorator_utils_1 = require("../utils/decorator.utils");
function Maximum(maximum) {
    return function (target, propertyKey) {
        (0, decorator_utils_1.decoratorMapper)({
            target,
            propertyKey: propertyKey.toString(),
            parameters: maximum,
            fn: (maximum, schema, propertyKey) => {
                let schemaProperties = schema.properties[propertyKey];
                if (typeof schemaProperties === "boolean")
                    return;
                schemaProperties.type === 'array'
                    ? (schemaProperties.items = { maximum: maximum })
                    : (schemaProperties.maximum = maximum);
                return schema;
            },
            schemaDecorator: enum_1.SchemaDecorators.Maximum,
        });
    };
}
exports.Maximum = Maximum;
