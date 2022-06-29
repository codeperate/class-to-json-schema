import { Integer } from '../decorators/integer';
import { Min } from '../decorators/min';
import { Property } from '../decorators/property';
import { SpecTypes } from '../types/spec-type';
import { getJsonSchema } from '../utils/get-schema';
import 'reflect-metadata';

export class Person {
    name: string;

    @Integer()
    @Min(0)
    age: number;

    @Property()
    @Integer()
    @Min(0)
    weight: number;
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
