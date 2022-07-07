import { defaultMetaConverter } from '../default-meta-converter';
import { SchemaDecorators } from '../enum/decorator';
import { SchemaDecoratorFactory } from '../schema-decorator';
import { Class } from '../type/class';

export function Nested(type: () => Class): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.Nested,
        args: type,
        action: (args) => {
            defaultMetaConverter({ ...args, reflectedMetaType: type?.() });
        },
    });
}
