"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExclusiveMinimum = void 0;
const enum_1 = require("../enum");
const change_schema_1 = require("../utils/change-schema");
const decorator_utils_1 = require("../utils/decorator.utils");
function ExclusiveMinimum(minimum) {
    return function (target, propertyKey) {
        (0, decorator_utils_1.decoratorMapper)({
            target,
            propertyKey: propertyKey.toString(),
            parameters: minimum,
            fn: (minimum, schema, propertyKey) => {
                (0, change_schema_1.changeSchema)(schema, (s) => { s.exclusiveMinimum = minimum; }, propertyKey);
            },
            schemaDecorator: enum_1.SchemaDecorators.ExclusiveMinimum,
        });
    };
}
exports.ExclusiveMinimum = ExclusiveMinimum;
