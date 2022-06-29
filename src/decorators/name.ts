import { getSchema } from '../utils/get-schema';

export function Name(name: any): ParameterDecorator{
    return function (target, propertyKey){
        let schema = getSchema(target, propertyKey);

    }
}
