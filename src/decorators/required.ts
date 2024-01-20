import { SchemaDecorators } from '../enum/decorator.js';
import { SchemaDecoratorFactory } from '../schema-decorator.js';
import { MetaType } from '../type/meta-type.js';

export function Required(type?: () => MetaType): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.Required,
        args: type,
        action: (args) => {},
    });
}
