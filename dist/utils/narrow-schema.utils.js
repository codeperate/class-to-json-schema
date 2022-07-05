"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.narrowSchema = void 0;
function narrowSchema(schema) {
    if (typeof schema === 'object')
        return schema;
    else
        return {};
}
exports.narrowSchema = narrowSchema;
