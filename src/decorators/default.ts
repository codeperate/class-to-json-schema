import { SchemaDecorators } from '../enum';
import { changeSchema } from '../utils/change-schema';
import { decoratorMapper } from '../utils/decorator.utils';

export function Default(defaultValue: string | number | boolean | {}){
    return function (target,propertyKey){
        decoratorMapper({
            target,
            parameters: defaultValue,
            propertyKey: propertyKey.toString(),
            fn: (defaultValue, schema,propertyKey) => {
                changeSchema(schema,(s)=>{s.default=defaultValue},propertyKey)
            },
            schemaDecorator: SchemaDecorators.Default,
        });
    }
}
