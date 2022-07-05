import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';
import { propertiesHelper } from '../utils/utils';

export function MaxProperties(maxProperties: number) {
    return function (target, propertyKey) {
        decoratorMapper(
            {target,
            propertyKey,
            parameters: maxProperties,
            fn: (maxProperties, schema,propertyKey,isAssignToObj) => {
                let schemaProperties = schema.properties[propertyKey];
                if(typeof schemaProperties==="boolean") return;
                propertiesHelper(schemaProperties,{maxProperties})
                return schema;
            },
            schemaDecorator: SchemaDecorators.MaxProperties,}
        );


    }
};
