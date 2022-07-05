"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enum = void 0;
const enum_1 = require("../enum");
const change_schema_1 = require("../utils/change-schema");
const decorator_utils_1 = require("../utils/decorator.utils");
function Enum(enumValues) {
    return function (target, propertyKey) {
        (0, decorator_utils_1.decoratorMapper)({
            target,
            propertyKey: propertyKey.toString(),
            parameters: enumValues,
            fn: (enumValues, schema, propertyKey) => {
                (0, change_schema_1.changeSchema)(schema, (s) => { s.enum = Object.values(enumValues); }, propertyKey);
            },
            schemaDecorator: enum_1.SchemaDecorators.Enum,
        });
    };
}
exports.Enum = Enum;
