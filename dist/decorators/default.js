"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const enum_1 = require("../enum");
const change_schema_1 = require("../utils/change-schema");
const decorator_utils_1 = require("../utils/decorator.utils");
function Default(defaultValue) {
    return function (target, propertyKey) {
        (0, decorator_utils_1.decoratorMapper)({
            target,
            parameters: defaultValue,
            propertyKey: propertyKey.toString(),
            fn: (defaultValue, schema, propertyKey) => {
                (0, change_schema_1.changeSchema)(schema, (s) => { s.default = defaultValue; }, propertyKey);
            },
            schemaDecorator: enum_1.SchemaDecorators.Default,
        });
    };
}
exports.Default = Default;
