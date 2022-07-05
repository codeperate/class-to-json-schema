"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinProperties = void 0;
const enum_1 = require("../enum");
const change_schema_1 = require("../utils/change-schema");
const decorator_utils_1 = require("../utils/decorator.utils");
function MinProperties(minProperties) {
    return function (target, propertyKey) {
        (0, decorator_utils_1.decoratorMapper)({
            target,
            propertyKey: propertyKey.toString(),
            parameters: minProperties,
            fn: (minProperties, schema, propertyKey) => {
                (0, change_schema_1.changeSchema)(schema, (s) => { s.minProperties = minProperties; }, propertyKey);
            },
            schemaDecorator: enum_1.SchemaDecorators.MinProperties,
        });
    };
}
exports.MinProperties = MinProperties;
