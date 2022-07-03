"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Property = void 0;
const enum_1 = require("../enum");
const decorator_utils_1 = require("../utils/decorator.utils");
function Property(type) {
    return function (target, propertyKey) {
        (0, decorator_utils_1.decoratorMapper)({
            target,
            parameters: type,
            propertyKey: propertyKey.toString(),
            schemaDecorator: enum_1.SchemaDecorators.Property,
            fn: (type, schema, propertyKey) => {
                if (!schema.properties[propertyKey]['type'] || type) {
                    schema.properties = { ...schema.properties, [propertyKey]: { type: type } };
                }
                return schema;
            },
        });
    };
}
exports.Property = Property;
