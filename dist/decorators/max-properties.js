"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxProperties = void 0;
const enum_1 = require("../enum");
const decorator_utils_1 = require("../utils/decorator.utils");
function MaxProperties(maxProperties) {
    return function (target, propertyKey) {
        (0, decorator_utils_1.decoratorMapper)({ target,
            propertyKey,
            parameters: maxProperties,
            fn: (maxProperties, schema, propertyKey) => {
                let schemaProperties = schema.properties[propertyKey];
                if (typeof schemaProperties === "boolean")
                    return;
                schemaProperties.maxProperties = maxProperties;
                return schema;
            },
            schemaDecorator: enum_1.SchemaDecorators.MaxProperties, });
    };
}
exports.MaxProperties = MaxProperties;
;
