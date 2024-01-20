import { describe } from 'node:test';
import { CollectionOf } from '../decorators/collection-of.js';
import { Nested } from '../decorators/nested.js';
import { Pattern } from '../decorators/pattern.js';
import { Required } from '../decorators/required.js';
import { SchemaDecorators } from '../enum/decorator.js';
import { getJsonSchema } from '../get-schema.js';
import { SpecTypes } from '../type/spec-type.js';
import assert from 'node:assert';

export class Member {
    @Required()
    name!: string;
}

export class Organization {
    @Required()
    name!: string;

    @Required()
    @Pattern(/^[a-z0-9]+$/g)
    namespace: string;

    @CollectionOf(() => Member)
    members;

    @Nested(() => Member)
    member: Member;
}
describe('Get Organization JSON Schema', () => {
    const schema = getJsonSchema(Organization, {
        specTypes: SpecTypes.OPENAPI,
        additionalConverters: {
            [SchemaDecorators.CollectionOf]: ({ schema, decoratoredContent, propertyKey }) => {
                schema['properties'][propertyKey]['items'] = { type: 'string' };
            },
            [SchemaDecorators.Nested]: ({ schema, decoratoredContent, propertyKey }) => {
                schema['properties'][propertyKey]['additionalProperties'] = false;
            },
        },
    });
    assert.deepStrictEqual(schema.toJSON(), {
        required: ['name', 'namespace', 'members', 'member'],
        properties: {
            members: { type: 'array', items: { type: 'string' } },
            name: { type: 'string' },
            namespace: { type: 'string', pattern: '^[a-z0-9]+$' },
            member: {
                $ref: '#/components/schemas/Member',
                additionalProperties: false,
            },
        },
        type: 'object',
    });
});
