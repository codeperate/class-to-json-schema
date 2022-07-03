"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Allow = void 0;
const enum_1 = require("../enum");
const decorator_utils_1 = require("../utils/decorator.utils");
function Allow(...values) {
    return function (target, propertyKey) {
        (0, decorator_utils_1.decoratorMapper)({
            target,
            propertyKey: propertyKey.toString(),
            parameters: values,
            fn: (values, schema) => {
                return schema;
            },
            schemaDecorator: enum_1.SchemaDecorators.Allow,
        });
    };
}
exports.Allow = Allow;
