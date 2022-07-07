import { JSONSchema } from './class';
import { ConvertersArgs, defaultMetaConverter } from './default-meta-converter';
import { JsonSchemaOption } from './get-schema';
import { CLASS_DECORATEDMAP_KEY, DecoratedMap } from './type/decorated-map';

import { MetaType } from './type/meta-type';

export function setSchemaByDecoratedMap(schema: JSONSchema, dMap: DecoratedMap, option: Partial<JsonSchemaOption>) {
    let iterator: (string | typeof CLASS_DECORATEDMAP_KEY)[] = Object.keys(dMap.map);
    if (dMap.map[CLASS_DECORATEDMAP_KEY]) iterator.push(CLASS_DECORATEDMAP_KEY);
    for (let propertyKey of iterator) {
        let decorators = dMap.map[propertyKey];
        const _propertyKey = typeof propertyKey === 'string' ? propertyKey : undefined;
        const reflectedMetaType = Reflect.getMetadata('design:type', dMap.class.prototype, _propertyKey) as MetaType;
        const converterArgs = {
            schema,
            decoratorMap: dMap,
            propertyKey: _propertyKey,
            reflectedMetaType: reflectedMetaType,
            option,
        } as ConvertersArgs;
        const metaConverter = option.defaultMetaConverter || defaultMetaConverter;
        metaConverter(converterArgs);
        option.beforeConverted?.(converterArgs);
        for (const decorator of decorators.reverse()) {
            converterArgs.decoratoredContent = decorator;
            if (option.additionalConverters?.[decorator.decoratorType]) option.additionalConverters[decorator.decoratorType](converterArgs);
            else decorator.action(converterArgs);
        }
        option.afterConverted?.(converterArgs);
    }
}
