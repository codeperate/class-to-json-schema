import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function Email(): PropertyDecorator{
    return function(target,propertyKey){
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            fn: (arg, schema,propertyKey) => {
                let schemaProperties = schema.properties[propertyKey] ;

                if(typeof schemaProperties==="boolean") return;
                schemaProperties.format = 'email';
                return schema;
            },
            schemaDecorator: SchemaDecorators.AnyOf,
        });
    }
}
