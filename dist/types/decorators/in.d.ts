export declare enum JsonParameterTypes {
    BODY = "body",
    PATH = "path",
    QUERY = "query",
    HEADER = "header",
    COOKIES = "cookie",
    FILES = "files"
}
export declare function In(inType: JsonParameterTypes | string): void;
