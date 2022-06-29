import { JSONSchema } from "../class";
import { SchemaDecorators } from "../enum";

export type DecoratedContent = {
    type: SchemaDecorators; args: any; fn: (arg:any,schema:JSONSchema)=>void 
}
export type DecoratedMap = {
    [key in string]:DecoratedContent[]
}
