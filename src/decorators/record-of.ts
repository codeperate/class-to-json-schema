import { getSchema } from "../utils/get-schema";

export function RecordOf(model: any, ...keys: string[]){
    return function (target, propertyKey) {
        let schema = getSchema(target,propertyKey);
        
      };
}
