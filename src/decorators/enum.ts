import { SchemaDecorators } from '../enum/decorator';
import { getRefStorage } from '../ref-storage';

import { SchemaDecoratorFactory } from '../schema-decorator';
import { changeSchema } from '../utils/change-schema';

export function Enum(enumVal: Record<any, any>, _option: { name: string; ref?: boolean }) {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.Enum,
        args: [enumVal, _option],
        action: ({ schema, propertyKey, option }) => {
            if (_option.ref) getRefStorage().set(_option.name, { type: 'string', enum: Object.values(enumVal) });
            changeSchema(
                schema,
                (s) => {
                    if (_option.ref) {
                        Object.keys(s).forEach((key) => delete s[key]);
                        s.$ref = option.schemaRefPath + _option.name;
                    } else {
                        s.type = 'string';
                        s.enum = Object.values(enumVal);
                    }
                },
                { ...option, deRef: !_option.ref },
                propertyKey,
            );
        },
    });
}
