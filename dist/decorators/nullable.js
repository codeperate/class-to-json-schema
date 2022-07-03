"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nullable = void 0;
const enum_1 = require("../enum");
const decorator_utils_1 = require("../utils/decorator.utils");
function Nullable(type) {
    return function (target, propertyKey) {
        (0, decorator_utils_1.decoratorMapper)({
            target,
            parameters: type,
            propertyKey: propertyKey.toString(),
            schemaDecorator: enum_1.SchemaDecorators.Nullable,
            fn: (type, schema, propertyKey) => {
                let schemaProperties = schema.properties[propertyKey];
                if (typeof schemaProperties === "boolean")
                    return;
                type = !type ? null : type?.name.toLowerCase();
                let _type = schemaProperties.type;
                schemaProperties.type = Array.isArray(_type) ? (_type.includes(type) ? _type : [..._type, type]) : [_type, type];
                return schema;
            },
        });
    };
}
exports.Nullable = Nullable;
