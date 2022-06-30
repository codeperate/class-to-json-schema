import { JSONSchema7 } from 'json-schema';
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function Min(minimum: number): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: minimum,
            fn: (minimum, schema) => {
                schema.properties[propertyKey.toString()] === 'array'
                    ? ((schema.properties[propertyKey.toString()] as JSONSchema7).items = { minimum: minimum })
                    : ((schema.properties[propertyKey.toString()] as JSONSchema7).minimum = minimum);

                //console.log(schema.properties[propertyKey.toString()]);

                return schema;
            },
            schemaDecorator: SchemaDecorators.Min,
        });
    };
}
