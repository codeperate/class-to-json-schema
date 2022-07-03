"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionOf = void 0;
const decorator_utils_1 = require("../utils/decorator.utils");
function CollectionOf(type) {
    return function (target, propertyKey) {
        (0, decorator_utils_1.decoratorMapper)({
            target,
            parameters: type,
            propertyKey: propertyKey.toString(),
            fn: (type, schema, propertyKey) => {
                let schemaProperties = schema.properties[propertyKey];
                if (typeof schemaProperties === "boolean")
                    return;
                if (schemaProperties.type === 'array') {
                    let t = type.name.toLowerCase();
                    schemaProperties = { type: 'array', items: { type: t, ...schemaProperties.items } };
                }
                return schema;
            },
        });
    };
}
exports.CollectionOf = CollectionOf;
