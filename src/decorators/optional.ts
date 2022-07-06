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
                changeSchema(
                    schema,
                    (s) => {
                        if (s.required) s.required.splice(s.required.indexOf(propertyKey, 0), 1);
                    },
                    propertyKey,
                );
            },
        });
    };
}
