import { SchemaDecorators } from '../enum';
import { changeSchema } from '../utils/change-schema';
import { decoratorMapper } from '../utils/decorator.utils';
import { classTransformer } from '../utils/transformer.utils';

export function Optional(type?: Function): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            schemaDecorator: SchemaDecorators.Optional,
            fn: (arg, schema, propertyKey, jsonSchemaOptions) => {
                changeSchema(
                    schema,
                    (s) => {
                        if (s.required) s.required.splice(s.required.indexOf(propertyKey, 0), 1);
                    },
                    propertyKey,
                );
                if (type) {
                    const ref = classTransformer({ type: type(), schemaRefPath: jsonSchemaOptions.schemaRefPath });
                    schema.properties[propertyKey] = ref;
                }
            },
        });
    };
}
