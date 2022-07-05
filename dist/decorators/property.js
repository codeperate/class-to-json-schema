"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Property = void 0;
const enum_1 = require("../enum");
const decorator_utils_1 = require("../utils/decorator.utils");
const transformer_utils_1 = require("../utils/transformer.utils");
function Property(type) {
    return function (target, propertyKey) {
        (0, decorator_utils_1.decoratorMapper)({
            target,
            parameters: type,
            propertyKey: propertyKey.toString(),
            schemaDecorator: enum_1.SchemaDecorators.Property,
            fn: (type, schema, propertyKey, jsonSchemaOptions) => {
                let schemaProperties = schema.properties[propertyKey];
                if (typeof schemaProperties === 'boolean')
                    return;
                type = type ? type : schemaProperties.type;
                const items = (0, transformer_utils_1.classTransformer)({ type, specType: jsonSchemaOptions.specTypes, schemaRefPath: jsonSchemaOptions.schemaRefPath, isArray: schemaProperties.type === 'array' });
                schema.properties[propertyKey] = { ...schemaProperties, ...items };
                return schema;
            },
        });
    };
}
exports.Property = Property;
