// import { getSchema } from "../utils/get-schema"
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils';

//read class and class entity

export function Title(title: string) {
    return function (target, propertyKey?) {
        decoratorMapper({
            target,
            propertyKey: propertyKey?.toString(),
            parameters: title,
            fn: (title, schema, propertyKey?) => {
                if (!propertyKey) {
                    schema.title = title;
                } else {
                    const schemaProperties = schema.properties[propertyKey];
                    if (typeof schemaProperties === 'boolean') return;
                    if (!schemaProperties) schemaProperties.items = {};
                    schemaProperties.title = title;
                }
                return schema;
            },
            schemaDecorator: SchemaDecorators.Title,
        });

        // } else {
        //     decoratorMapper({
        //         target,
        //         parameters: title,
        //         fn: (title, schema) => {
        //             if (typeof schema === 'boolean') return;
        //             schema.title = title;
        //             return schema;
        //         },
        //         schemaDecorator: SchemaDecorators.Title,
        //     });
    };
}

// export function Title(...args) {

//     switch (args.length){
//         case 2:
//             return titleProperty.apply(this, args);
//         case 1:
//             return titleClass.apply(this, args);
//     }
// }

// export function titleProperty(title: string): PropertyDecorator {
//     return function (target, propertyKey) {
//         decoratorMapper({
//             target,
//             propertyKey: propertyKey.toString(),
//             parameters: title,
//             fn: (title, schema, propertyKey) => {
//                 const schemaProperties = schema.properties[propertyKey];
//                 if (typeof schemaProperties === 'boolean') return;
//                 if (!schemaProperties) schemaProperties.items = {};
//                 schemaProperties.title = title;
//                 return schema;
//             },
//             schemaDecorator: SchemaDecorators.Title,
//         });
//     };
// }

// export function titleClass(title: string): ClassDecorator {
//     return function (target){
//         let schema = getSchema(target);
//         console.log(target);

//         schema.title = title;
//     }
// }
