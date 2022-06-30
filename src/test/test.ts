import { SpecTypes } from '../types/spec-type';
import { getJsonSchema } from '../utils/get-schema';
// import { MikroORM } from '@mikro-orm/core';
import 'reflect-metadata';
import { Person } from './entities/person.entities';






async function main(){
    
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
    
}

main()

