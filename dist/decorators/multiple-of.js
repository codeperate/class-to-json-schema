"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultipleOf = void 0;
const enum_1 = require("../enum");
const change_schema_1 = require("../utils/change-schema");
const decorator_utils_1 = require("../utils/decorator.utils");
function MultipleOf(multipleOf) {
    return function (target, propertyKey) {
        (0, decorator_utils_1.decoratorMapper)({
            target,
            parameters: multipleOf,
            propertyKey: propertyKey.toString(),
            schemaDecorator: enum_1.SchemaDecorators.MultipleOf,
            fn: (multipleOf, schema, propertyKey) => {
                (0, change_schema_1.changeSchema)(schema, (s) => { s.multipleOf = multipleOf; }, propertyKey);
            },
        });
    };
}
exports.MultipleOf = MultipleOf;
