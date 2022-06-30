import { JSONSchema7, JSONSchema7Definition } from 'json-schema';
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function Allow(...values: any[]): ParameterDecorator{
    return function (target,propertyKey){
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: values,
            fn: (values, schema) => {
                
                return schema;
            },
            schemaDecorator: SchemaDecorators.Allow,
        });
    }
}
