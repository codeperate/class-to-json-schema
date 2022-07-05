"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllOf = void 0;
const enum_1 = require("../enum");
const change_schema_1 = require("../utils/change-schema");
const decorator_utils_1 = require("../utils/decorator.utils");
function AllOf(...allOf) {
    return function (target, propertyKey) {
        (0, decorator_utils_1.decoratorMapper)({
            target,
            propertyKey,
            parameters: allOf,
            fn: (allOf, schema, propertyKey) => {
                (0, change_schema_1.changeSchema)(schema, (s) => { s.allOf = allOf; }, propertyKey);
            },
            schemaDecorator: enum_1.SchemaDecorators.AllOf,
        });
    };
}
exports.AllOf = AllOf;
// const decoratedMap:DecoratedMap=Reflect.getMetadata(JSON_SCHEMA_KEY,target)
// if(!decoratedMap[propertyKey]) decoratedMap[propertyKey]=[];
// decoratedMap[propertyKey].push({
//     type:SchemaDecorators.AllOf,
//     args:allOf,
//     fn:(args,schema)=>{
//         schema.allOf=args;
//     }
// })
