"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONSchema = void 0;
const json_schema_class_1 = require("./json-schema-class");
class JSONSchema extends json_schema_class_1.JSONSchema7Class {
    constructor(schema) {
        super();
        if (schema)
            Object.assign(this, schema);
    }
    clone() {
        return new JSONSchema(JSON.parse(this.toPlain()));
    }
    toJSON() {
        return Object.getOwnPropertyNames(this).reduce((a, b) => {
            if (this[b])
                a[b] = this[b];
            return a;
        }, {});
    }
    toPlain() {
        return JSON.stringify(this);
    }
    pick(props, removeRequired = true) {
        const schema = this.clone();
        if (!schema.properties)
            return schema;
        let deleted = [];
        for (const key in schema.properties) {
            const condition = Array.isArray(props) ? props.includes(key) : key.match(props);
            if (!condition) {
                delete schema.properties[key];
                deleted.push(key);
                continue;
            }
        }
        if (schema.required && removeRequired)
            schema.required = schema.required.filter((require) => !deleted.includes(require));
        return schema;
    }
    omit(props, removeRequired = true) {
        const schema = this.clone();
        if (!schema.properties)
            return schema;
        let deleted = [];
        for (const key in schema.properties) {
            const condition = Array.isArray(props) ? props.includes(key) : key.match(props);
            if (condition) {
                delete schema.properties[key];
                deleted.push(key);
                continue;
            }
        }
        if (schema.required && removeRequired)
            schema.required = schema.required.filter((require) => !deleted.includes(require));
        return schema;
    }
    noRef(removeRequired = true) {
        const schema = this.clone();
        const keyArr = [];
        if (!schema.properties)
            return schema;
        schema.properties = Object.keys(schema.properties).reduce((reducer, key) => {
            if (JSON.stringify(schema.properties[key]).indexOf('$ref') == -1)
                return { ...reducer, [key]: schema.properties[key] };
            keyArr.push(key);
            return reducer;
        }, {});
        if (schema.required && removeRequired)
            schema.required = schema.required.filter((str) => !keyArr.includes(str));
        return schema;
    }
    set(key, value) {
        const schema = this.clone();
        if (typeof value === 'function')
            schema[key] = value(schema[key]);
        else
            schema[key] = value;
        return schema;
    }
    setProp(key, value) {
        const schema = this.clone();
        if (typeof value === 'function')
            schema.properties[key] = value(schema.properties[key]);
        else
            schema.properties[key] = value;
        return schema;
    }
    props() {
        if (this.properties)
            return Object.keys(this.properties);
        return [];
    }
}
exports.JSONSchema = JSONSchema;
