
import { SchemaDecorators } from '../enum';
import { decoratorMapper } from '../utils/decorator.utils';

export function Min(minimum: number): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper({
            target,
            propertyKey: propertyKey.toString(),
            parameters: minimum,
            fn: (minimum, schema) => {
                // schema.properties[propertyKey.toString()] === 'array' ? (schema.items = { minimum: minimum }) : 
                schema.properties[propertyKey.toString()] 
                
                console.log(schema.properties[propertyKey.toString()]);
                
                return schema;
            },
            schemaDecorator: SchemaDecorators.Min,
        });
    };
}
