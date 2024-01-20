import { SchemaDecorators } from '../enum/decorator.js';
import { getRefStorage } from '../ref-storage.js';

import { SchemaDecoratorFactory } from '../schema-decorator.js';
import { changeSchema } from '../utils/change-schema.js';
import { addType } from '../utils/utils.js';

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
                        addType(s, 'string');
                        s.enum = Object.values(enumVal);
                    }
                },
                { ...option, deRef: !_option.ref },
                propertyKey,
            );
        },
    });
}
