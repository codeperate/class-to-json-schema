"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const enum_1 = require("../enum");
const decorator_utils_1 = require("../utils/decorator.utils");
function Email() {
    return function (target, propertyKey) {
        (0, decorator_utils_1.decoratorMapper)({
            target,
            propertyKey: propertyKey.toString(),
            fn: (arg, schema, propertyKey) => {
                let schemaProperties = schema.properties[propertyKey];
                if (typeof schemaProperties === "boolean")
                    return;
                schemaProperties.format = 'email';
                return schema;
            },
            schemaDecorator: enum_1.SchemaDecorators.AnyOf,
        });
    };
}
exports.Email = Email;
