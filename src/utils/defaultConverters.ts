import { SchemaDecorators } from "../enum";
import { ConvertersOptions } from "./get-schema";

export const defaultConverters={
    [SchemaDecorators.AllOf]:(convertersOptions:ConvertersOptions)=>{
        
    }
}


// class{
//     @Integer(1)
//     a
// }

// const meta={
//     a:[
//         {decorator:SchemaDecorators.Integer,arguments:{}}
//     ]
// }