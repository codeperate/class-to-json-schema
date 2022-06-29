import { JSONSchema7Definition } from "json-schema";
import { JSONSchema } from "../class";
import { Schema } from "../decorators";
import { SchemaDecorators } from "../enum";
import { ConvertersOptions } from "./get-schema";
export type DefaultConverterOption<T=any>=Omit<ConvertersOptions<T>,"defaultConverter">
export const defaultConverters={
    [SchemaDecorators.AllOf]:(convertersOptions:DefaultConverterOption<JSONSchema7Definition[]>)=>{

        convertersOptions.schema.allOf = convertersOptions.arguments;
    }
    [SchemaDecorators.Allow]:(convertersOptions:DefaultConverterOption<>)
    
} as {[key in SchemaDecorators]:(c:DefaultConverterOption)=>JSONSchema}

// class{
//     @Integer(1)
//     a
// }

// const meta={
//     a:[
//         {decorator:SchemaDecorators.Integer,option:{}}
//     ]
// }