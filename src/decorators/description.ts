import { SchemaDecorators } from '../enum';
import { changeSchema } from '../utils/change-schema';
import { decoratorMapper } from '../utils/decorator.utils';

export function Description(description: any) {
    return function (target, propertyKey?) {
        decoratorMapper({
            target,
            propertyKey: propertyKey?.toString(),
            parameters: description,
            fn: (description, schema, propertyKey) => {
                changeSchema(schema,(s)=>{s.description=description},propertyKey)
            },
            schemaDecorator: SchemaDecorators.Description,
        });
    };
}
