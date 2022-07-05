import { Class, SpecTypes } from '../types';
export interface TransformerType {
    type: typeof Number | typeof String | typeof Boolean | typeof Object | String | Class;
    specType: SpecTypes;
    schemaRefPath: String;
    isArray: boolean;
}
export declare function classTransformer(transformerType: TransformerType): Object;
export declare function objectToSchema(isArray: boolean, isRef: boolean, name: string): {
    type: string;
    items: {
        $ref: string;
    } | {
        type: string;
    };
} | {
    $ref: string;
    type?: undefined;
    items?: undefined;
} | {
    type: string;
    items?: undefined;
};
