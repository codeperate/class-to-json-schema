import { defaultMetaConverter } from '../default-meta-converter';
import { SchemaDecorators } from '../enum/decorator';

import { SchemaDecoratorFactory } from '../schema-decorator';
import { MetaType } from '../type/meta-type';
import { changeSchema } from '../utils/change-schema';

export function CollectionOf(type: () => MetaType): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.CollectionOf,
        args: type,
        action: (args) => {
            changeSchema(
                args.schema,
                (s) => {
                    s.type = 'array';
                    s.items = {};
                },
                args.propertyKey,
            );
            defaultMetaConverter({ ...args, reflectedMetaType: type() });
        },
    });
}
