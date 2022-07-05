"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decoratorMapper = void 0;
const get_schema_1 = require("./get-schema");
function decoratorMapper(decoratedMapper) {
    const { propertyKey, schemaDecorator, fn, parameters, target } = decoratedMapper;
    const t = propertyKey ? target.constructor : target;
    let key = propertyKey ? propertyKey : target.name.toLowerCase();
    let decoratedMap = Reflect.getMetadata(propertyKey ? get_schema_1.JSON_SCHEMA_KEY : get_schema_1.JSON_CLASS_KEY, t);
    if (!decoratedMap)
        decoratedMap = {};
    if (!decoratedMap[key])
        decoratedMap[key] = [];
    decoratedMap[key].push({
        type: schemaDecorator,
        args: parameters,
        fn,
    });
    Reflect.defineMetadata(propertyKey ? get_schema_1.JSON_SCHEMA_KEY : get_schema_1.JSON_CLASS_KEY, decoratedMap, t);
    return decoratedMap;
}
exports.decoratorMapper = decoratorMapper;
