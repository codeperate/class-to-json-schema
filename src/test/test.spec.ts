import test from 'node:test';
import { CollectionOf } from '../decorators/collection-of.js';
import { Min } from '../decorators/min.js';
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
    @Required()
    name!: string;

    @Required()
    @Pattern(/^[a-z0-9]+$/g)
    namespace: string;

    @Required()
    slug!: string;

    @Required()
    address!: string;

    @CollectionOf(() => Member)
    members;

    @Required()
    phone!: string;

    @Min(0)
    staffNo: number;
}

test('Get Organization JSON Schema', () => {
    const schema = getJsonSchema(Organization, { specTypes: SpecTypes.OPENAPI });
    const mutated = schema.set('additionalProperties', false);
    assert.deepStrictEqual(mutated.toJSON(), {
        required: ['name', 'namespace', 'slug', 'address', 'members', 'phone', 'staffNo'],
        properties: {
            name: { type: 'string' },
            namespace: { type: 'string', pattern: '^[a-z0-9]+$' },
            slug: { type: 'string' },
            address: { type: 'string' },
            members: { type: 'array', items: { $ref: '#/components/schemas/Member' } },
            phone: { type: 'string' },
            staffNo: { type: 'number', minimum: 0 },
        },
        additionalProperties: false,
        type: 'object',
    });
});
