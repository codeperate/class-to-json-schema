"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONSchema7Class = void 0;
class JSONSchema7Class {
    $id;
    $ref;
    $schema;
    $comment;
    /**
     * @see https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-00#section-8.2.4
     * @see https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-validation-00#appendix-A
     */
    $defs;
    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.1
     */
    type;
    enum;
    const;
    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.2
     */
    multipleOf;
    maximum;
    exclusiveMaximum;
    minimum;
    exclusiveMinimum;
    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.3
     */
    maxLength;
    minLength;
    pattern;
    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.4
     */
    items;
    additionalItems;
    maxItems;
    minItems;
    uniqueItems;
    contains;
    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.5
     */
    maxProperties;
    minProperties;
    required;
    properties;
    patternProperties;
    additionalProperties;
    dependencies;
    propertyNames;
    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.6
     */
    if;
    then;
    else;
    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.7
     */
    allOf;
    anyOf;
    oneOf;
    not;
    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-7
     */
    format;
    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-8
     */
    contentMediaType;
    contentEncoding;
    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-9
     */
    definitions;
    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-10
     */
    title;
    description;
    default;
    readOnly;
    writeOnly;
    examples;
}
exports.JSONSchema7Class = JSONSchema7Class;
