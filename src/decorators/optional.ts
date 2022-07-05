import { SchemaDecorators } from '../enum';
import { changeSchema } from '../utils/change-schema';
import { decoratorMapper } from '../utils/decorator.utils';

export function Optional(): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            schemaDecorator: SchemaDecorators.Optional,
            fn: (arg, schema, propertyKey) => {
                // if (schema.required.includes(propertyKey)) {
                //     let parameterIndex = schema.required.indexOf(propertyKey, 0);
                //     schema.required.splice(parameterIndex, 1);
                // }
                // return schema;
                changeSchema(schema,(s)=>{s.required.splice(s.required.indexOf(propertyKey, 0), 1)},propertyKey)
            },
        });
    };
}
