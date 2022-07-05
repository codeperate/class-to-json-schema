import { SchemaDecorators } from '../enum';
import { changeSchema } from '../utils/change-schema';
import { decoratorMapper } from '../utils/decorator.utils';


export function MinItems(minItems: number): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: minItems,
            fn: (minItems, schema,propertyKey) => {
                changeSchema(schema,(s)=>{s.minItems=minItems},propertyKey)
            },
            schemaDecorator: SchemaDecorators.MinItems,
        });
    };
}
