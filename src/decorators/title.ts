// import { SchemaDecorators } from '../enum';
// import { decoratorMapper } from '../utils/decorator.utils';

export function Title(title: string):  ClassDecorator {
    return function (target, propertyKey?) {
        // return decoratorMapper({
        //     target,
        //     parameters: title,
        //     propertyKey: propertyKey.toString(),
        //     schemaDecorator: SchemaDecorators.Title,
        //     fn: (title, schema, propertyKey, jsonSchemaOptions) => {
        //         title
        //         propertyKey
        //         jsonSchemaOptions
        //         return schema;
        //     },
        // });
    };
}
