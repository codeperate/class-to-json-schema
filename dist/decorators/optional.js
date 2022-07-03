"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Optional = void 0;
const enum_1 = require("../enum");
const decorator_utils_1 = require("../utils/decorator.utils");
function Optional() {
    return function (target, propertyKey) {
        (0, decorator_utils_1.decoratorMapper)({
            target,
            propertyKey: propertyKey.toString(),
            schemaDecorator: enum_1.SchemaDecorators.Optional,
            fn: (arg, schema, propertyKey) => {
                if (schema.required.includes(propertyKey)) {
                    let parameterIndex = schema.required.indexOf(propertyKey, 0);
                    schema.required.splice(parameterIndex, 1);
                }
                return schema;
            },
        });
    };
}
exports.Optional = Optional;
