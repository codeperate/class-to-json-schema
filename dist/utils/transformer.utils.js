"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectToSchema = exports.classTransformer = void 0;
const types_1 = require("../types");
const utils_1 = require("./utils");
function classTransformer(transformerType) {
    const { type, specType, schemaRefPath, isArray } = transformerType;
    let t = type?.name?.toLowerCase();
    if ((0, utils_1.isClass)(type)) {
        if (schemaRefPath)
            return objectToSchema(isArray, true, `${schemaRefPath}/${t}`);
        if (specType === types_1.SpecTypes.SWAGGER || specType === types_1.SpecTypes.OPENAPI)
            return objectToSchema(isArray, true, `#/components/schemas/${t}`);
        return objectToSchema(isArray, true, `#/definitions/${t}`);
    }
    if (typeof type === 'string')
        return objectToSchema(isArray, false, type);
    return objectToSchema(isArray, false, t);
}
exports.classTransformer = classTransformer;
function objectToSchema(isArray, isRef, name) {
    if (isArray)
        return { type: 'array', items: { ...(isRef ? { $ref: name } : { type: name }) } };
    return { ...(isRef ? { $ref: name } : { type: name }) };
}
exports.objectToSchema = objectToSchema;
