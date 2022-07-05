import { SchemaDecorators } from '../enum';
import { changeSchema } from '../utils/change-schema';
import { decoratorMapper } from '../utils/decorator.utils';

export function Email(): PropertyDecorator{
    return function(target,propertyKey){
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            fn: (arg, schema,propertyKey) => {
                changeSchema(schema,(s)=>{s.format='email'},propertyKey)
            },
            schemaDecorator: SchemaDecorators.Email,
        });
    }
}
