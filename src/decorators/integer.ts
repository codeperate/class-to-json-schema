import { JSONSchema7Definition } from "json-schema";
import { SchemaDecorators } from "../enum";
import { decoratorMapper } from "../utils/decorator.utils";

export function Integer(): PropertyDecorator {
    return function (target, propertyKey) {
        decoratorMapper(target, propertyKey, , (schema)=>{schema.type === 'array'? schema.items = { type: 'integer' }:schema.type = 'integer'; return schema}, SchemaDecorators.type)

        const schema = getSchema(target, propertyKey);
        schema.type === 'array'? schema.items = { type: 'integer' }:schema.type = 'integer';
    };
}

