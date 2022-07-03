"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinItems = void 0;
const enum_1 = require("../enum");
const decorator_utils_1 = require("../utils/decorator.utils");
function MinItems(minItems) {
    return function (target, propertyKey) {
        (0, decorator_utils_1.decoratorMapper)({
            target,
            propertyKey: propertyKey.toString(),
            parameters: minItems,
            fn: (minItems, schema, propertyKey) => {
                let schemaProperties = schema.properties[propertyKey];
                if (typeof schemaProperties === "boolean")
                    return;
                schemaProperties.minItems = minItems;
                return schema;
            },
            schemaDecorator: enum_1.SchemaDecorators.MinItems,
        });
    };
}
exports.MinItems = MinItems;
