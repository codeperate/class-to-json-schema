import { set } from '@codeperate/utils';
import { JSONSchema7TypeName } from 'json-schema';
import { JSONSchema } from './class/index.js';
import { JsonSchemaOption } from './get-schema.js';
import { DecoratedContent, DecoratedMap } from './type/decorated-map.js';

import { MetaType } from './type/meta-type.js';
import { changeSchema } from './utils/change-schema.js';

export interface ConvertersArgs<T = any> {
    schema: JSONSchema;
    decoratorMap: DecoratedMap;
    decoratoredContent?: DecoratedContent<T>;
    propertyKey?: string;
    reflectedMetaType: MetaType;
    option: Partial<JsonSchemaOption>;
}

export function defaultMetaConverter({ schema, reflectedMetaType, propertyKey, option, decoratorMap }: ConvertersArgs) {
    if (!propertyKey) return;
    schema.type = 'object';
    if (!schema?.properties?.[propertyKey]) set(schema, `properties.${propertyKey}`, {});
    if (!schema.required) schema.required = [];
    if (!schema.required.includes(propertyKey)) schema.required.push(propertyKey);
    changeSchema(
        schema,
        (s) => {
            if (!reflectedMetaType || Array === reflectedMetaType) return;

            if (![Date, Number, String, Function, Boolean, Object].some((c) => c === reflectedMetaType)) {
                Object.keys(s).forEach((key) => delete s[key]);
                s.$ref = `${option.schemaRefPath!}${reflectedMetaType.name}`;
            } else {
                const typeName = (reflectedMetaType.name.charAt(0).toLowerCase() + reflectedMetaType.name.slice(1)) as JSONSchema7TypeName;
                s.type = typeName;
            }
            if (reflectedMetaType === Date) s.type = 'string';
        },
        option,
        propertyKey,
    );
}
