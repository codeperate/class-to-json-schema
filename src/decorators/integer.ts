// import { SchemaDecorators } from '../enum/decorator';
import { getSchema } from '../utils/get-schema';

export function Integer(): PropertyDecorator {
    return function (target, propertyKey) {
        const schema = getSchema(target, propertyKey);
        if (schema.type === 'array') schema.items = { type: 'integer' };
        else schema.type = 'integer';
    };
}


// class{
//     @Integer(1)
//     a
// }

// const meta={
//     a:[
//         {decorator:SchemaDecorators.Integer,option:{}}
//     ]
// }