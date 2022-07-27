import { SchemaDecorators } from '../enum/decorator';
import { SchemaDecoratorFactory } from '../schema-decorator';
import { SpecTypes } from '../type/spec-type';
import { changeSchema } from '../utils/change-schema';

export function Nullable(): PropertyDecorator {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.Nullable,
        args: null,
        action: (args) => {
            if (args.option.specTypes === SpecTypes.OPENAPI) {
                changeSchema(
                    args.schema,
                    (s) => {
                        s['nullable'] = true;
                    },
                    args.propertyKey,
                );
            } else if (args.option.specTypes === SpecTypes.JSON) {
                changeSchema(
                    args.schema,
                    (s) => {
                        if (!Array.isArray(s.type)) s.type = [s.type];
                        s.type.push('null');
                    },
                    args.propertyKey,
                );
            }
        },
    });
}
