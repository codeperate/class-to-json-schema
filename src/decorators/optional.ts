import { defaultMetaConverter } from '../default-meta-converter';
import { SchemaDecorators } from '../enum/decorator';

import { SchemaDecoratorFactory } from '../schema-decorator';
import { MetaType } from '../type/meta-type';
import { changeSchema } from '../utils/change-schema';

export function Optional(type?: () => MetaType): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.Optional,
        args: type,
        action: (args) => {
            changeSchema(
                args.schema,
                () => {
                    if (args.schema.required) args.schema.required = args.schema.required.filter((r) => r === args.propertyKey);
                },
                args.propertyKey,
            );
            defaultMetaConverter({ ...args, reflectedMetaType: type?.() });
        },
    });
}
