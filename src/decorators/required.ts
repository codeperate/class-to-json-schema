import { SchemaDecorators } from '../enum/decorator';
import { SchemaDecoratorFactory } from '../schema-decorator';
import { MetaType } from '../type/meta-type';

export function Required(type?: () => MetaType): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.Required,
        args: type,
        action: (args) => {},
    });
}
