import { SchemaDecorators } from '../enum';
import { changeSchema } from '../utils/change-schema';
import { decoratorMapper } from '../utils/decorator.utils';


export function MaxProperties(maxProperties: number) {
    return function (target, propertyKey) {
        decoratorMapper(
            {target,
            propertyKey,
            parameters: maxProperties,
            fn: (maxProperties, schema,propertyKey) => {
                changeSchema(schema,(s)=>{s.maxProperties=maxProperties},propertyKey)
            },
            schemaDecorator: SchemaDecorators.MaxProperties,}
        );


    }
};
