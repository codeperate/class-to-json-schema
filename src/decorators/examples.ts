export function Examples(examples: OpenSpecHash<OpenSpecRef>) {
    
}


export interface OpenSpecRef {
    $ref: string;
}

export declare type OpenSpecHash<T> = Record<string, T>;
