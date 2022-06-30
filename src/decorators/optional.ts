 import { SchemaDecorators } from "../enum";
import { decoratorMapper } from "../utils/decorator.utils";

export function Optional(): PropertyDecorator | ParameterDecorator {
    return function (target, propertyKey, parameterIndex) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            schemaDecorator: SchemaDecorators.Optional,
            fn: (schema) => {
                if (schema.required.includes(propertyKey.toString()))schema.required.slice(parameterIndex, 0);
                return schema;
            },
        });
    
    }
}
