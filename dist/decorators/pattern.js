"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pattern = void 0;
const enum_1 = require("../enum");
const change_schema_1 = require("../utils/change-schema");
const decorator_utils_1 = require("../utils/decorator.utils");
function Pattern(pattern) {
    return function (target, propertyKey) {
        (0, decorator_utils_1.decoratorMapper)({
            target,
            parameters: pattern,
            propertyKey: propertyKey.toString(),
            schemaDecorator: enum_1.SchemaDecorators.Pattern,
            fn: (pattern, schema, propertyKey) => {
                // const schemaProperties = schema.properties[propertyKey];
                // if(typeof schemaProperties==="boolean") return;
                // schemaProperties.type === 'array'
                //     ? (schemaProperties.items = { pattern: pattern.tostring(), ...(schemaProperties.items as object) })
                //     : (schemaProperties.pattern = pattern.toString());
                // return schema;
                (0, change_schema_1.changeSchema)(schema, (s) => { s.pattern = pattern.toString(); }, propertyKey);
            },
        });
    };
}
exports.Pattern = Pattern;
