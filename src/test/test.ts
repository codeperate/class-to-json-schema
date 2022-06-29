import { Integer } from "../decorators/integer";
import { Min } from "../decorators/min";
import { Property } from "../decorators/property";
import { SpecTypes } from "../types/spec";
import { getJsonSchema } from "../utils/get-schema";
import 'reflect-metadata';

export class Person {
    @Property()
    name:string

    @Integer()
    @Min(0)
    age:number
    
    @Integer()
    @Min(0)
    weight:number
}


const person = new Person()
getJsonSchema(person,{
    specTypes:SpecTypes.JSON,
    schemaRefPath:'#/components/schemas/Person',
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
})

