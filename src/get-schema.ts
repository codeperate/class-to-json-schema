// import { Collection } from '@mikro-orm/core';
import 'reflect-metadata';
import { JSONSchema } from './class/json-schema.js';
import { ConvertersArgs } from './default-meta-converter.js';
import { SchemaDecorators } from './enum/decorator.js';
import { getSchemaStorage, SchemaStorage } from './schema-storage.js';
import { setSchemaByDecoratedMap } from './set-schema-by-decorated-map.js';
import { Class } from './type/class.js';
import { SpecTypes } from './type/spec-type.js';
import { getAllParentClassName } from './utils/get-all-parent-class.js';

export function getSchemaMetaType(target: new (...args: any) => any, propertyKey?: string): Function {
    return Reflect.getMetadata('design:type', new (target as any)(), propertyKey) as Function;
}

export interface JsonSchemaOption {
    specTypes: SpecTypes;
    schemaRefPath: string;
    additionalConverters: {
        [schemaDecorator in SchemaDecorators]?: (convertersOptions: ConvertersArgs) => void;
    };
    storage: SchemaStorage;
    deRef: boolean;
    defaultMetaConverter?: (args: ConvertersArgs) => void;
    beforeConverted: (args: ConvertersArgs) => void;
    afterConverted: (args: ConvertersArgs) => void;
}
const defaultOption: Partial<JsonSchemaOption> = {
    deRef: true,
};
export function getJsonSchema<T extends Class<any>>(entity: T, option: Partial<JsonSchemaOption> = {}) {
    option = Object.assign({}, defaultOption, option);
    let schema: JSONSchema<InstanceType<T>> = new JSONSchema();
    if (!option.schemaRefPath) {
        if ([SpecTypes.OPENAPI, SpecTypes.OPENAPI3_1].some((s) => s == option.specTypes)) option.schemaRefPath = '#/components/schemas/';
        else option.schemaRefPath = '#/definitions/';
    }
    const storage = option['storage'] || getSchemaStorage();
    for (const className of [...getAllParentClassName(entity)].reverse()) {
        const decoratedMap = storage.getDecoratedMap(className);
        if (decoratedMap) setSchemaByDecoratedMap(schema, decoratedMap, option);
    }
    return schema;
}
