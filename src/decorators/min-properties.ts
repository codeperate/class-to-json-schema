import { SchemaDecorators } from '../enum';
import { changeSchema } from '../utils/change-schema';
import { decoratorMapper } from '../utils/decorator.utils';


export function MinProperties(minProperties: number): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: minProperties,
            fn: (minProperties, schema, propertyKey) => {
                changeSchema(schema,(s)=>{s.minProperties=minProperties},propertyKey)
            },
            schemaDecorator: SchemaDecorators.MinProperties,
        });

       
    };
}
