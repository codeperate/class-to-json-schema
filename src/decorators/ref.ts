import { SchemaDecorators } from '../enum/decorator.js';
import { SchemaDecoratorFactory } from '../schema-decorator.js';
import { Class } from '../type/class.js';
import { changeSchema } from '../utils/change-schema.js';

export function Ref(ref: Class | string): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.Ref,
        args: ref,
        action: ({ schema, option, propertyKey }) => {
            changeSchema(
                schema,
                (s) => {
                    for (const key of Object.keys(s)) delete s[key];
                    s.$ref = option.schemaRefPath + (typeof ref === 'string' ? ref : ref.name);
                },
                option,
                propertyKey,
            );
        },
    });
}
