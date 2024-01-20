import { defaultMetaConverter } from '../default-meta-converter.js';
import { SchemaDecorators } from '../enum/decorator.js';

import { SchemaDecoratorFactory } from '../schema-decorator.js';
import { MetaType } from '../type/meta-type.js';
import { changeSchema } from '../utils/change-schema.js';
import { setType } from '../utils/utils.js';

export function CollectionOf(type: () => MetaType): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.CollectionOf,
        args: type,
        action: (args) => {
            changeSchema(
                args.schema,
                (s) => {
                    setType(s, 'array');
                    s.items = {};
                },
                args.option,
                args.propertyKey,
            );
            defaultMetaConverter({ ...args, reflectedMetaType: type() });
        },
    });
}
