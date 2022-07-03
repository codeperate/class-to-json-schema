"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultipleOf = void 0;
const enum_1 = require("../enum");
const decorator_utils_1 = require("../utils/decorator.utils");
function MultipleOf(multipleOf) {
    return function (target, propertyKey) {
        (0, decorator_utils_1.decoratorMapper)({
            target,
            propertyKey: propertyKey.toString(),
            schemaDecorator: enum_1.SchemaDecorators.MultipleOf,
            fn: (multipleOf, schema, propertyKey) => {
                const schemaProperties = schema.properties[propertyKey];
                if (typeof schemaProperties === "boolean")
                    return;
                schemaProperties.type === 'array'
                    ? (schemaProperties.items = { multipleOf: multipleOf, ...schemaProperties.items })
                    : (schemaProperties.multipleOf = multipleOf);
                return schema;
            },
        });
    };
}
exports.MultipleOf = MultipleOf;
