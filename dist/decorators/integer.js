"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Integer = void 0;
const enum_1 = require("../enum");
const change_schema_1 = require("../utils/change-schema");
const decorator_utils_1 = require("../utils/decorator.utils");
function Integer() {
    return function (target, propertyKey) {
        (0, decorator_utils_1.decoratorMapper)({
            target,
            propertyKey: propertyKey.toString(),
            fn: (arg, schema, propertyKey) => {
                // const schemaProperties =  schema.properties[propertyKey];
                // if(typeof schemaProperties==="boolean") return;
                // schemaProperties.type === 'array'
                //     ? (schemaProperties.items = { type: 'integer', ...schemaProperties.items as object })
                //     : (schemaProperties.type = 'integer');
                // return schema;
                (0, change_schema_1.changeSchema)(schema, (s) => { s.type = 'integer'; }, propertyKey);
            },
            schemaDecorator: enum_1.SchemaDecorators.Integer,
        });
    };
}
exports.Integer = Integer;
