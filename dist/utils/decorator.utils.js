"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decoratorMapper = void 0;
const get_schema_1 = require("./get-schema");
function decoratorMapper(decoratedMapper) {
    const { propertyKey, schemaDecorator, fn, parameters, target } = decoratedMapper;
    let decoratedMap = Reflect.getMetadata(get_schema_1.JSON_SCHEMA_KEY, target.constructor);
    if (!decoratedMap)
        decoratedMap = {};
    if (!decoratedMap[propertyKey])
        decoratedMap[propertyKey] = [];
    decoratedMap[propertyKey].push({
        type: schemaDecorator,
        args: parameters,
        fn,
    });
    Reflect.defineMetadata(get_schema_1.JSON_SCHEMA_KEY, decoratedMap, target.constructor);
    return decoratedMap;
}
exports.decoratorMapper = decoratorMapper;
