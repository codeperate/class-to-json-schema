"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Required = void 0;
require("reflect-metadata");
const enum_1 = require("../enum");
const decorator_utils_1 = require("../utils/decorator.utils");
function Required() {
    return function (target, propertyKey) {
        (0, decorator_utils_1.decoratorMapper)({
            target,
            propertyKey: propertyKey.toString(),
            schemaDecorator: enum_1.SchemaDecorators.Required,
            fn: (args, schema, propertyKey) => {
                if (!schema.required.includes(propertyKey))
                    schema.required.push(propertyKey);
                return schema;
            },
        });
    };
}
exports.Required = Required;
