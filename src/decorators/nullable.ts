import { SchemaDecorators } from '../enum/decorator';
import { SchemaDecoratorFactory } from '../schema-decorator';
import { SpecTypes } from '../type/spec-type';
import { changeSchema } from '../utils/change-schema';
import { addType } from '../utils/utils';

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
                    args.option,
                    args.propertyKey,
                );
            } else if ([SpecTypes.JSON, SpecTypes.OPENAPI3_1].some((t) => args.option.specTypes === t)) {
                changeSchema(
                    args.schema,
                    (s) => {
                        addType(s, 'null');
                    },
                    args.option,
                    args.propertyKey,
                );
            }
        },
    });
}
