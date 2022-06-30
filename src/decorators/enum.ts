import { JSONSchema7Type } from 'json-schema';
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function Enum(...enumValues: (JSONSchema7Type | any)[] ): PropertyDecorator {
    return function(target,propertyKey){
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: enumValues,
            fn: (enumValues, schema,propertyKey) => {
                let schemaProperties = schema.properties[propertyKey] ;

                if(typeof schemaProperties==="boolean") return;
                schemaProperties.enum = enumValues;
                return schema;
            },
            schemaDecorator: SchemaDecorators.AnyOf,
        });
    }
}
