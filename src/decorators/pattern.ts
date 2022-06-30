import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function Pattern(pattern: string | RegExp): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            parameters: pattern,
            propertyKey: propertyKey.toString(),
            schemaDecorator: SchemaDecorators.Pattern,
            fn: (pattern, schema, propertyKey) => {
                const schemaProperties = schema.properties[propertyKey];

                if(typeof schemaProperties==="boolean") return;
                schemaProperties.type === 'array'
                    ? (schemaProperties.items = { pattern: pattern.tostring(), ...(schemaProperties.items as object) })
                    : (schemaProperties.pattern = pattern.toString());
                return schema;
            },
        });
    };
}
