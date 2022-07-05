import { SchemaDecorators } from '../enum';
import { changeSchema } from '../utils/change-schema';
import { decoratorMapper } from '../utils/decorator.utils';

export function Enum(enumValues: any): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: enumValues,
            fn: (enumValues, schema, propertyKey) => {
                changeSchema(schema,(s)=>{s.enum = Object.values(enumValues)},propertyKey)
            },
            schemaDecorator: SchemaDecorators.Enum,
        });
    };
}
