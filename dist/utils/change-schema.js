"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeSchema = void 0;
const narrow_schema_utils_1 = require("./narrow-schema.utils");
function changeSchema(schema, action, propertyKey) {
    let _schema = schema;
    _schema = (0, narrow_schema_utils_1.narrowSchema)(propertyKey ? schema.properties?.[propertyKey] : schema);
    _schema = _schema.type === 'array' ? _schema.items : _schema;
    if (Array.isArray(_schema))
        _schema.map(s => action((0, narrow_schema_utils_1.narrowSchema)(s)));
    else
        action((0, narrow_schema_utils_1.narrowSchema)(_schema));
}
exports.changeSchema = changeSchema;
