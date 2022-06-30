import { Integer } from '../decorators/integer';
import { Min } from '../decorators/min';
import { SpecTypes } from '../types/spec-type';
import { getJsonSchema } from '../utils/get-schema';
import 'reflect-metadata';
import { CollectionOf, Default, Max, MaxLength, Property, Required } from '../decorators';


export class Person2{
    @Property()
    x:number
}


export class Person {

    @Property()
    name: string;

    @Default(10)
    @Integer()
    @Min(0)
    age: number;

    @Integer()
    @Min(0)
    @Max(10)
    weight: number;

    @Property()
    isMale:boolean;

    @MaxLength(10)
    @CollectionOf(Boolean)
    fingers:boolean[]


    // @Min(10)
    // @CollectionOf(Number)
    // ages:Collection

    @Required()
    person2:Person2;

}



const schema = getJsonSchema(Person, {
    specTypes: SpecTypes.OPENAPI,
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

