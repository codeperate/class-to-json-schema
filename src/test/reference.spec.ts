import { CollectionOf } from '../decorators/collection-of';
import { Enum } from '../decorators/enum';
import { Title } from '../decorators/title';
import { getJsonSchema } from '../get-schema';
import { SpecTypes } from '../type/spec-type';

export enum OrganizationState {
    ON = 'ON',
    OFF = 'OFF',
}

export class Member {
    name!: string;
}
export class Organization {
    member: Member;

    @Title('Members of Organization1')
    @CollectionOf(() => Member)
    @Title('Member1')
    members: Member[];

    @Enum(OrganizationState, { name: 'OrganizationState', ref: true })
    state: OrganizationState;
}
test('Get Organization JSON Schema', () => {
    const schema = getJsonSchema(Organization, { specTypes: SpecTypes.OPENAPI });
    //console.log(JSON.stringify(schema.toJSON()))
    expect(schema.toJSON()).toStrictEqual({
        required: ['members', 'state'],
        properties: {
            members: {
                type: 'array',
                items: { $ref: '#/components/schemas/Member', title: 'Member1' },
                title: 'Members of Organization1',
            },
            state: { $ref: '#/components/schemas/OrganizationState' },
        },
        type: 'object',
    });
});
