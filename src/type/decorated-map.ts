import { ConvertersArgs } from '../default-meta-converter';
import { SchemaDecorators } from '../enum/decorator';

import { Class } from './class';
export const CLASS_DECORATEDMAP_KEY = Symbol('CLASS_DECORATEDMAP_KEY');
export type DecoratedContent<T = any> = {
    decoratorType: SchemaDecorators;
    args: T;
    action: (args: ConvertersArgs<T>) => void;
};
export type DecoratedMap = {
    class: Class;
    map: {
        [key: string]: DecoratedContent[];
        [CLASS_DECORATEDMAP_KEY]?: DecoratedContent[];
    };
};
