export declare function Examples(examples: OpenSpecHash<OpenSpecRef>): void;
export interface OpenSpecRef {
    $ref: string;
}
export declare type OpenSpecHash<T> = Record<string, T>;
