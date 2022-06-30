import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function Default(defaultValue: string | number | boolean | {}){
    return function (target,propertyKey){
        decoratorMapper({
            target,
            parameters: defaultValue,
            propertyKey: propertyKey.toString(),
            fn: (defaultValue, schema,propertyKey) => {
                let schemaProperties = schema.properties[propertyKey] ;

                if (typeof schemaProperties === 'boolean') return;
                schemaProperties.default = defaultValue;
                return schema;
            },
            schemaDecorator: SchemaDecorators.Default,
        });
    }
}
