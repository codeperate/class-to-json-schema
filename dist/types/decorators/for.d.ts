export declare enum SpecTypes {
    JSON = "jsonschema",
    SWAGGER = "swagger2",
    OPENAPI = "openapi3"
}
export declare function For(specType: SpecTypes, schema: any): void;
