import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function Optional(): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            schemaDecorator: SchemaDecorators.Optional,
            fn: (arg, schema, propertyKey) => {
                

                if (schema.required.includes(propertyKey)) {
                    let parameterIndex = schema.required.indexOf(propertyKey, 0);


                    console.log(parameterIndex);
                    console.log(schema.required);
                    console.log(typeof(schema.required));
                    
                    
                    schema.required.slice(parameterIndex, 1);
                    console.log(schema.required);
                }
                return schema;
            },
        });
    };
}
