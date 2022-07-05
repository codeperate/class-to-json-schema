"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Partial = void 0;
const enum_1 = require("../enum");
const decorator_utils_1 = require("../utils/decorator.utils");
function Partial() {
    return function (target, propertyKey, parameterIndex) {
        (0, decorator_utils_1.decoratorMapper)({
            target,
            propertyKey: propertyKey.toString(),
            schemaDecorator: enum_1.SchemaDecorators.Partial,
            fn: (arg, schema, propertyKey) => {
                if (schema.required.includes(propertyKey))
                    schema.required.slice(parameterIndex, 0);
                return schema;
            },
        });
    };
}
exports.Partial = Partial;
