"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Title = void 0;
// import { getSchema } from "../utils/get-schema"
const enum_1 = require("../enum");
const utils_1 = require("../utils");
const change_schema_1 = require("../utils/change-schema");
//read class and class entity
function Title(title) {
    return function (target, propertyKey) {
        (0, utils_1.decoratorMapper)({
            target,
            propertyKey: propertyKey?.toString(),
            parameters: title,
            fn: (title, schema, propertyKey) => {
                (0, change_schema_1.changeSchema)(schema, (s) => { s.title = title; }, propertyKey);
            },
            schemaDecorator: enum_1.SchemaDecorators.Title,
        });
    };
}
exports.Title = Title;
