import { CollectionOf, Pattern, Required } from '../decorators';
import { SpecTypes } from '../types';
import { getJsonSchema } from '../utils';

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

    @CollectionOf(Member)
    members;

    @Required()
    phone!: string;
}

test('Get Organization JSON Schema', () => {
    const schema = getJsonSchema(Organization, { specTypes: SpecTypes.OPENAPI });
    console.log(schema.toJSON());
    expect(schema).toEqual({
        required: ['name', 'namespace', 'slug', 'address', 'members', 'phone'],
        properties: {
            name: { type: 'string' },
            namespace: { type: 'string', pattern: '/^[a-z0-9]+$/g' },
            slug: { type: 'string' },
            address: { type: 'string' },
            members: { type: 'array', items: { '$ref': '#/components/schemas/member' } },
            phone: { type: 'string' },
        },
    });
});
