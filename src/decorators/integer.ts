import { SchemaDecorators } from '../enum';
import { changeSchema } from '../utils/change-schema';
import { decoratorMapper } from '../utils/decorator.utils';

export function Integer(): PropertyDecorator {
    return function (target, propertyKey: string) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            fn: (arg, schema,propertyKey) => {
                // const schemaProperties =  schema.properties[propertyKey];

                // if(typeof schemaProperties==="boolean") return;
                // schemaProperties.type === 'array'
                //     ? (schemaProperties.items = { type: 'integer', ...schemaProperties.items as object })
                //     : (schemaProperties.type = 'integer');
                // return schema;
                changeSchema(schema,(s)=>{s.type= 'integer'},propertyKey)
            },
            schemaDecorator: SchemaDecorators.Integer,
        });
    };
}
