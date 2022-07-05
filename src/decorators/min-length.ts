import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';
import { propertiesHelper } from '../utils/utils';

export function MinLength(minLength: number): PropertyDecorator {
    return function (target, propertyKey){
        decoratorMapper(
            {target,
            propertyKey: propertyKey.toString(),
            parameters: minLength,
            fn: (minLength, schema,propertyKey,isAssignToObj) => {
                let schemaProperties = schema.properties[propertyKey] 
                if(typeof schemaProperties==="boolean") return;
                propertiesHelper(schemaProperties,{minLength})
                return schema;
            },
            schemaDecorator: SchemaDecorators.MinLength,}
        );

    };
}