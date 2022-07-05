// import { getSchema } from "../utils/get-schema"
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils';
import { changeSchema } from '../utils/change-schema';
//read class and class entity

export function Title(title: string) {
    return function (target, propertyKey?) {
        decoratorMapper({
            target,
            propertyKey: propertyKey?.toString(),
            parameters: title,
            fn: (title, schema, propertyKey) => {
                changeSchema(schema,(s)=>{s.title=title},propertyKey)
            },
            schemaDecorator: SchemaDecorators.Title,
        });
    };
}
