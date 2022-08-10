import { SchemaDecorators } from '../enum/decorator';

import { SchemaDecoratorFactory } from '../schema-decorator';
import { getDefaultStorage } from '../schema-storage';
import { changeSchema } from '../utils/change-schema';

export function Enum(enumVal: Record<any, any>, _option: { name: string; ref?: boolean }) {
    getDefaultStorage().pushEnum(_option.name, enumVal);
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.Enum,
        args: [enumVal, _option],
        action: ({ schema, propertyKey, option }) => {
            changeSchema(
                schema,
                (s) => {
                    if (_option.ref) {
                        s.$ref = option.schemaRefPath + _option.name;
                    } else {
                        s.type = 'string';
                        s.enum = Object.values(enumVal);
                    }
                },
                propertyKey,
            );
        },
    });
}
