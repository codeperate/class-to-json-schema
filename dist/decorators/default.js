"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const enum_1 = require("../enum");
const decorator_utils_1 = require("../utils/decorator.utils");
function Default(defaultValue) {
    return function (target, propertyKey) {
        (0, decorator_utils_1.decoratorMapper)({
            target,
            parameters: defaultValue,
            propertyKey: propertyKey.toString(),
            fn: (defaultValue, schema, propertyKey) => {
                let schemaProperties = schema.properties[propertyKey];
                if (typeof schemaProperties === 'boolean')
                    return;
                schemaProperties.default = defaultValue;
                return schema;
            },
            schemaDecorator: enum_1.SchemaDecorators.Default,
        });
    };
}
exports.Default = Default;
