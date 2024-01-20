import test from 'node:test';
import { CollectionOf } from '../decorators/collection-of.js';
import { Nested } from '../decorators/nested.js';
import { Nullable } from '../decorators/nullable.js';
import { Pattern } from '../decorators/pattern.js';
import { Required } from '../decorators/required.js';
import { getJsonSchema } from '../get-schema.js';
import { SpecTypes } from '../type/spec-type.js';
import assert from 'node:assert';

export class Member {
    @Required()
    name!: string;
}

export class Organization {
    @Nullable()
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
test('Get Organization JSON Schema', () => {
    const schema = getJsonSchema(Organization, {
        specTypes: SpecTypes.OPENAPI3_1,
    });
    assert.deepStrictEqual(schema.toJSON(), {
        required: ['name', 'namespace', 'members', 'member'],
        properties: {
            members: { type: 'array', items: { $ref: '#/components/schemas/Member' } },
            name: { type: ['string', 'null'] },
            namespace: { type: 'string', pattern: '^[a-z0-9]+$' },
            member: {
                $ref: '#/components/schemas/Member',
            },
        },
        type: 'object',
    });
});
