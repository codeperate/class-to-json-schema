import { Integer } from "../decorators/integer";
import { Min } from "../decorators/min";
import { Property } from "../decorators/property";
import { getJsonSchema, SpecTypes } from "../utils/get-schema";

export class Person {
    @Property()
    name:string

    @Integer()
    @Min(0)
    age:number
    
    @Integer()
    weight:number
}

console.log(getJsonSchema(Person,SpecTypes.JSON));
