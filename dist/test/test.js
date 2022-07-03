"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spec_type_1 = require("../types/spec-type");
const get_schema_1 = require("../utils/get-schema");
// import { MikroORM } from '@mikro-orm/core';
require("reflect-metadata");
const person_entities_1 = require("./entities/person.entities");
async function main() {
    const schema = (0, get_schema_1.getJsonSchema)(person_entities_1.Person, {
        specTypes: spec_type_1.SpecTypes.OPENAPI,
        schemaRefPath: '#/components/schemas/Person',
        // additionalConverters:{
        //     schemaDecorator:(
        //         target,
        //         meta,
        //         defaultConverter,
        //         schema,options
        //     )=>{
        //         //jsonSchema
        //     }
        // }
    });
    console.log(schema.toJSON());
}
main();
