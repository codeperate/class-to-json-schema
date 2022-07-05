export interface ClassOrAbstractClass<T = any> extends Function {
    prototype: T;
}
export type Class<T = any> = new (...args: any[]) => T;
