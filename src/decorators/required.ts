import 'reflect-metadata';
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';
import { classTransformer } from '../utils/transformer.utils';

export function Required(type?: Function): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            schemaDecorator: SchemaDecorators.Required,
            fn: (type, schema, propertyKey, jsonSchemaOptions) => {
                if (!schema.required) schema.required = [];
                if (!schema.required.includes(propertyKey)) schema.required.push(propertyKey);
                if (type) {
                    const ref = classTransformer({ type: type(), schemaRefPath: jsonSchemaOptions.schemaRefPath });
                    schema.properties[propertyKey] = ref;
                }
                return schema;
            },
        });
    };
}
