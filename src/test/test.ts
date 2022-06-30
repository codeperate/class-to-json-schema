import { Integer } from '../decorators/integer';
import { Min } from '../decorators/min';
import { SpecTypes } from '../types/spec-type';
import { getJsonSchema } from '../utils/get-schema';
import 'reflect-metadata';
import { Default, Nullable, Property } from '../decorators';

export class Person {

    @Property()
    name: string;

    @Default(10)
    @Integer()
    @Min(0)
    age: number;

    @Integer()
    @Min(0)
    weight: number;

    @Property()
    @Nullable(null)
    // @Optional()
    isMale:boolean;

}

export class Person2{
    @Property()
    x:number
}

getJsonSchema(Person, {
    specTypes: SpecTypes.JSON,
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
