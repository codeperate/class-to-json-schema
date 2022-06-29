import { JSONSchema7Definition } from 'json-schema';
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function AllOf(...allOf: JSONSchema7Definition[]) {
    return function (target, propertyKey) {
        decoratorMapper(
            {target,
            propertyKey,
            parameters: allOf,
            fn: (allOf, schema) => {
                schema.allOf = allOf;
                return schema;
            },
            schemaDecorator: SchemaDecorators.AllOf,}
        );
    };
}

// const decoratedMap:DecoratedMap=Reflect.getMetadata(JSON_SCHEMA_KEY,target)
// if(!decoratedMap[propertyKey]) decoratedMap[propertyKey]=[];
// decoratedMap[propertyKey].push({
//     type:SchemaDecorators.AllOf,
//     args:allOf,
//     fn:(args,schema)=>{
//         schema.allOf=args;
//     }
// })
