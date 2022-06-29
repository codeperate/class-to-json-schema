import { JSONSchema7, JSONSchema7Definition } from 'json-schema';
import { JSONSchema7Class } from './json-schema-class';
declare type ValueOf<T, K extends keyof T> = T[K];
export declare class JSONSchema<T extends Function = any> extends JSONSchema7Class {
    constructor(schema?: JSONSchema7);
    clone(): JSONSchema<T>;
    toJSON(): JSONSchema7;
    pick(props: (keyof T)[] | RegExp, removeRequired?: boolean): JSONSchema<T>;
    omit(props: (keyof T)[] | RegExp, removeRequired?: boolean): JSONSchema<T>;
    noRef(removeRequired?: boolean): JSONSchema<T>;
    set<K extends keyof JSONSchema7>(key: K, value: ValueOf<JSONSchema, K> | ((curVal: ValueOf<JSONSchema, K>) => ValueOf<JSONSchema, K>)): JSONSchema<T>;
    setProp(key: Extract<keyof T, string>, value: JSONSchema7Definition | ((curVal: JSONSchema7Definition) => JSONSchema7Definition)): JSONSchema<T>;
    setProp(key: string, value: JSONSchema7Definition | ((curVal: JSONSchema7Definition) => JSONSchema7Definition)): JSONSchema<T>;
    props(): (keyof T)[];
    static defaultSchema(target: any, propertyKey: any): void;
}
export {};
