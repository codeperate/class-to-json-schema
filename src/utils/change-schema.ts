import { JSONSchema7, JSONSchema7Definition } from 'json-schema';
import { JSONSchema } from '../class/index.js';
import { JsonSchemaOption } from '../get-schema.js';
import { getRefStorage } from '../ref-storage.js';
import { narrowSchema } from './narrow-schema.utils.js';
function deRefSchema(schema: JSONSchema7, option: Partial<JsonSchemaOption>) {
    if (schema.$ref && option.deRef) {
        const ref = schema.$ref.split('/')[schema.$ref.split('/').length - 1];
        const refSchema = getRefStorage().get(ref);
        if (refSchema) return refSchema;
    }
    return schema;
}
export function changeSchema(schema: JSONSchema, action: (schema: JSONSchema7) => void, option: Partial<JsonSchemaOption>, propertyKey?: string) {
    let _schema: JSONSchema | JSONSchema7 | JSONSchema7Definition | JSONSchema7Definition[] = schema;
    _schema = narrowSchema(propertyKey ? schema.properties?.[propertyKey] : schema);
    //_schema = _schema.type === 'array' ? _schema.items : _schema;
    if (_schema.type === 'array') _schema = _schema.items;
    else if (Array.isArray(_schema.type) && _schema.type.includes('array')) _schema = _schema.items;
    if (Array.isArray(_schema))
        _schema.map((s) => {
            action(deRefSchema(narrowSchema(s), option));
        });
    else action(deRefSchema(narrowSchema(_schema), option));
}
