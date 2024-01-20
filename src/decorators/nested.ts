import { defaultMetaConverter } from '../default-meta-converter.js';
import { SchemaDecorators } from '../enum/decorator.js';
import { SchemaDecoratorFactory } from '../schema-decorator.js';
import { Class } from '../type/class.js';

export function Nested(type: () => Class): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.Nested,
        args: type,
        action: (args) => {
            defaultMetaConverter({ ...args, reflectedMetaType: type?.() });
        },
    });
}
