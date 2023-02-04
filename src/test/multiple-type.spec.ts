import { CollectionOf } from '../decorators/collection-of';
import { Nested } from '../decorators/nested';
import { Nullable } from '../decorators/nullable';
import { Pattern } from '../decorators/pattern';
import { Required } from '../decorators/required';
import { getJsonSchema } from '../get-schema';
import { SpecTypes } from '../type/spec-type';

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
    expect(schema.toJSON()).toStrictEqual({
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
