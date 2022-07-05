"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = void 0;
const utils_1 = require("../utils");
function Schema(partialSchema) {
    return function (target) {
        (0, utils_1.decoratorMapper)({
            target,
            parameters: partialSchema,
            fn: (partialSchema, schema) => {
                Object.assign(schema, partialSchema);
            },
        });
    };
}
exports.Schema = Schema;
