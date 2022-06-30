import { JSONSchema7TypeName } from 'json-schema';
import { decoratorMapper } from '../utils/decorator.utils';

export function CollectionOf(type: any): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            parameters: type,
            propertyKey: propertyKey.toString(),
            fn: (type, schema, propertyKey) => {
                let schemaProperties = schema.properties[propertyKey];

                if(typeof schemaProperties==="boolean") return;
                if (schemaProperties.type === 'array') {
                    let t = (type as Function).name.toLowerCase() as JSONSchema7TypeName;
                    schemaProperties = { type: 'array', items: {type: t,...schemaProperties.items as object} };
                }
                return schema;
            },
        });
    };
}
