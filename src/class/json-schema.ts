import { JSONSchema7, JSONSchema7Definition } from 'json-schema';
import { JSONSchema7Class } from './json-schema-class';
type ValueOf<T, K extends keyof T> = T[K];
export class JSONSchema<T extends object = any> extends JSONSchema7Class {
    constructor(schema?: JSONSchema7) {
        super();
        if (schema) Object.assign(this, schema);
        this.clearUndefined();
    }
    clearUndefined() {
        for (const [key, value] of Object.entries(this)) {
            if (value === undefined) delete this[key];
        }
    }
    clone(): JSONSchema<T> {
        return new JSONSchema(JSON.parse(this.toPlain()));
    }
    toJSON(): JSONSchema7 {
        return Object.getOwnPropertyNames(this).reduce((a, b) => {
            if (this[b] != null) a[b] = this[b];
            return a;
        }, {});
    }
    toPlain() {
        return JSON.stringify(this);
    }
    pick(props: (keyof T)[] | RegExp, removeRequired: boolean = true): JSONSchema<T> {
        const schema = this.clone();
        if (!schema.properties) return schema;
        let deleted: string[] = [];
        for (const key in schema.properties) {
            const condition = Array.isArray(props) ? props.includes(key as keyof T) : key.match(props);
            if (!condition) {
                delete schema.properties[key];
                deleted.push(key);
                continue;
            }
        }
        if (schema.required && removeRequired) schema.required = schema.required.filter((require) => !deleted.includes(require));
        return schema;
    }
    omit(props: (keyof T)[] | RegExp, removeRequired: boolean = true): JSONSchema<T> {
        const schema = this.clone();
        if (!schema.properties) return schema;
        let deleted: string[] = [];
        for (const key in schema.properties) {
            const condition = Array.isArray(props) ? props.includes(key as keyof T) : key.match(props);
            if (condition) {
                delete schema.properties[key];
                deleted.push(key);
                continue;
            }
        }
        if (schema.required && removeRequired) schema.required = schema.required.filter((require) => !deleted.includes(require));
        return schema;
    }
    noRef(removeRequired: boolean = true): JSONSchema<T> {
        const schema = this.clone();
        const keyArr: string[] = [];
        if (!schema.properties) return schema;
        schema.properties = Object.keys(schema.properties).reduce((reducer, key) => {
            if (JSON.stringify(schema.properties![key]).indexOf('$ref') == -1) return { ...reducer, [key]: schema.properties![key] };
            keyArr.push(key);
            return reducer;
        }, {} as any);
        if (schema.required && removeRequired) schema.required = schema.required.filter((str) => !keyArr.includes(str));
        return schema;
    }
    set<K extends keyof JSONSchema7>(key: K, value: ValueOf<JSONSchema, K> | ((curVal: ValueOf<JSONSchema, K>) => ValueOf<JSONSchema, K>)): JSONSchema<T> {
        const schema = this.clone();
        if (typeof value === 'function') schema[key] = value(schema[key]);
        else schema[key] = value;
        return schema;
    }
    setProp(key: Extract<keyof T, string>, value: JSONSchema7Definition | ((curVal: JSONSchema7Definition) => JSONSchema7Definition)): JSONSchema<T>;
    setProp(key: string, value: JSONSchema7Definition | ((curVal: JSONSchema7Definition) => JSONSchema7Definition)): JSONSchema<T>;
    setProp(key: string, value: JSONSchema7Definition | ((curVal: JSONSchema7Definition) => JSONSchema7Definition)): JSONSchema<T> {
        const schema = this.clone();
        if (typeof value === 'function') schema.properties![key] = value(schema.properties![key]);
        else schema.properties![key] = value;
        return schema;
    }
    props(): (keyof T)[] {
        if (this.properties) return Object.keys(this.properties) as (keyof T)[];
        return [];
    }
    toArray() {
        return new JSONSchema({ type: 'array', items: this.toJSON() });
    }
}
