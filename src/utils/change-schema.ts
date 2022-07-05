import { JSONSchema7, JSONSchema7Definition } from 'json-schema';
import { JSONSchema } from '../class';
import { narrowSchema } from './narrow-schema.utils';

export function changeSchema(schema: JSONSchema, action: (schema: JSONSchema7) => void, propertyKey?: string) {
    let _schema: JSONSchema | JSONSchema7 | JSONSchema7Definition | JSONSchema7Definition[] = schema;
    _schema = narrowSchema(propertyKey ? schema.properties?.[propertyKey] : schema);
    _schema = _schema.type === 'array' ? _schema.items : _schema;
    if (Array.isArray(_schema)) _schema.map((s) => action(narrowSchema(s)));
    else action(narrowSchema(_schema));
}
