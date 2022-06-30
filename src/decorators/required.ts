import 'reflect-metadata';
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function Required(): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            schemaDecorator: SchemaDecorators.Required,
            fn: (args, schema,propertyKey) => {
                if(!schema.required.includes(propertyKey))
                    schema.required.push(propertyKey);
                return schema;
            },
        });
    };
}
