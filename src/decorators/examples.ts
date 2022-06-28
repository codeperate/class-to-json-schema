export function Examples(examples: OpenSpecHash<OpenSpecRef>) {

}

export interface OpenSpecRef {
    $ref: string;
}

export type OpenSpecHash<T> = Record<string, T>;
