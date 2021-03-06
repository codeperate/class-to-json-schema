import { CollectionOf } from '../decorators/collection-of';
import { Min } from '../decorators/min';
import { Pattern } from '../decorators/pattern';
import { Required } from '../decorators/required';
import { getJsonSchema } from '../get-schema';
import { SpecTypes } from '../type/spec-type';

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
    expect(schema.toJSON()).toStrictEqual({
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
        type: 'object',
    });
});
