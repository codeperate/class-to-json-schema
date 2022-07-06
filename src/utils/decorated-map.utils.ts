import { JSONSchema } from '../class';
import { DecoratedMap } from '../type';
import { getSchemaMetaType, JsonSchemaOptions } from './get-schema';
import { setSchemaByMetaType } from './set-schema';

export function setSchemaByDecoratedMap(entity, schema: JSONSchema, map: DecoratedMap, jsonSchemaOptions: Partial<JsonSchemaOptions>) {
    for (let propertyKey of [...Object.keys(map), ...Object.getOwnPropertySymbols(map)]) {
        //console.log(propertyKey);
        let decorators = map[propertyKey];
        let metaType, _propertyKey;
        if (typeof propertyKey === 'string') {
            _propertyKey = propertyKey;
            metaType = getSchemaMetaType(entity, propertyKey);
            setSchemaByMetaType(schema, metaType, propertyKey, jsonSchemaOptions);
        }
        jsonSchemaOptions?.defaultMetaConverter?.({ schema, metaType, propertyKey: _propertyKey, jsonSchemaOptions });
        for (const decorated of decorators.reverse()) {
            if (jsonSchemaOptions.additionalConverters?.[decorated.type]) {
                jsonSchemaOptions.additionalConverters[decorated.type]({
                    target: entity,
                    schema: schema,
                    meta: map,
                    arguments: decorated.args,
                    defaultConverter: () => decorated.fn(decorated.args, schema, _propertyKey, jsonSchemaOptions),
                });
            } else decorated.fn(decorated.args, schema, _propertyKey, jsonSchemaOptions);
        }
    }
}
