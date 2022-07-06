import { JSONSchema7Definition } from 'json-schema';
import { SchemaDecorators } from '../enum';
import { changeSchema } from '../utils/change-schema';
import { decoratorMapper } from '../utils/decorator.utils';

export function AllOf(...allOf: JSONSchema7Definition[]) {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey,
            parameters: allOf,
            fn: (allOf, schema, propertyKey) => {
                changeSchema(
                    schema,
                    (s) => {
                        s.allOf = allOf;
                    },
                    propertyKey,
                );
            },
            schemaDecorator: SchemaDecorators.AllOf,
        });
    };
}
