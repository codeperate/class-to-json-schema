import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function MaxProperties(maxProperties: number) {
    return function (target, propertyKey) {
        decoratorMapper(
            {target,
            propertyKey,
            parameters: maxProperties,
            fn: (maxProperties, schema,propertyKey) => {
                let schemaProperties = schema.properties[propertyKey];
                if(typeof schemaProperties==="boolean") return;
                schemaProperties.maxProperties = maxProperties;
                return schema;
            },
            schemaDecorator: SchemaDecorators.MaxProperties,}
        );


    }
};
