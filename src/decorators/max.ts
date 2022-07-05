import { SchemaDecorators } from '../enum';
import { changeSchema } from '../utils/change-schema';
import { decoratorMapper } from '../utils/decorator.utils';

export function Max(maximum: number): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: maximum,
            fn: (maximum, schema,propertyKey) => {
                // let schemaProperties = schema.properties[propertyKey];
                // if(typeof schemaProperties==="boolean") return;
                // propertiesHelper(schemaProperties,{maximum})
                // return schema;
                changeSchema(schema,(s)=>{s.maximum=maximum},propertyKey)
            },
            schemaDecorator: SchemaDecorators.Max,
        });
    };
}
