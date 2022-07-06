// import { Collection } from '@mikro-orm/core';
import { JSONSchema } from '../class/json-schema';
import { SchemaDecorators } from '../enum/decorator';
import { Class } from '../type/class';
import { DecoratedMap } from '../type/decorated-map';
import { SpecTypes } from '../type/spec-type';
import { setSchemaByDecoratedMap } from './decorated-map.utils';
import { getAllParentClassName } from './get-all-parent-class';
import { defaultStorage } from './schema-storage';

export function getSchemaMetaType(target: new (...args: any) => any, propertyKey?: string): Function {
    return Reflect.getMetadata('design:type', new (target as any)(), propertyKey) as Function;
}

export interface ConvertersOptions<T = any> {
    target: object;
    meta: any;
    schema: JSONSchema;
    arguments: T;
    defaultConverter: Function;
}
export interface defaultConverterArgs {
    schema: JSONSchema;
    metaType?: Function;
    propertyKey?: string;
    jsonSchemaOptions: Partial<JsonSchemaOptions>;
}

export interface JsonSchemaOptions {
    specTypes: SpecTypes;
    schemaRefPath: string;
    additionalConverters: {
        [schemaDecorator in SchemaDecorators]?: (convertersOptions: Partial<ConvertersOptions>) => JSONSchema;
    };
    defaultMetaConverter?: (args: defaultConverterArgs) => void;
}

export function getJsonSchema<T extends Class<any>>(entity: T, jsonSchemaOptions: Partial<JsonSchemaOptions>) {
    let schema: JSONSchema<InstanceType<T>> = new JSONSchema();
    if (!jsonSchemaOptions.schemaRefPath)
        jsonSchemaOptions.schemaRefPath = jsonSchemaOptions.specTypes === SpecTypes.OPENAPI || jsonSchemaOptions.specTypes === SpecTypes.SWAGGER ? '#/components/schemas/' : '#/definitions/';
    
    for (const className of getAllParentClassName(entity).reverse()) {
        let decoratedMap: DecoratedMap = defaultStorage.getPropertyInfo(className);
        let classDecoratedMap: DecoratedMap = defaultStorage.getClassInfo(className);
        if (decoratedMap) setSchemaByDecoratedMap(entity, schema, decoratedMap, jsonSchemaOptions);
        if (classDecoratedMap) setSchemaByDecoratedMap(entity, schema, classDecoratedMap, jsonSchemaOptions);
    }
    return schema;
}
