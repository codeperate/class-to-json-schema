// import { Collection } from '@mikro-orm/core';
import 'reflect-metadata';
import { JSONSchema } from './class/json-schema';
import { ConvertersArgs } from './default-meta-converter';
import { SchemaDecorators } from './enum/decorator';
import { defaultStorage, SchemaStorage } from './schema-storage';
import { setSchemaByDecoratedMap } from './set-schema-by-decorated-map';
import { Class } from './type/class';
import { SpecTypes } from './type/spec-type';
import { getAllParentClassName } from './utils/get-all-parent-class';

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
    defaultMetaConverter?: (args: ConvertersArgs) => void;
    beforeConverted: (args: ConvertersArgs) => void;
    afterConverted: (args: ConvertersArgs) => void;
}

export function getJsonSchema<T extends Class<any>>(entity: T, option: Partial<JsonSchemaOption> = {}) {
    let schema: JSONSchema<InstanceType<T>> = new JSONSchema();
    if (!option.schemaRefPath) option.schemaRefPath = option.specTypes === SpecTypes.OPENAPI || option.specTypes === SpecTypes.SWAGGER ? '#/components/schemas/' : '#/definitions/';
    const storage = option['storage'] || defaultStorage;
    for (const className of [...getAllParentClassName(entity)].reverse()) {
        const decoratedMap = storage.getDecoratedMap(className);
        if (decoratedMap) setSchemaByDecoratedMap(schema, decoratedMap, option);
    }
    return schema;
}
