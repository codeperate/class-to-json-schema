import { CollectionOf, Enum, Title } from '../decorators';
import { SpecTypes } from '../type';
import { getJsonSchema } from '../utils';

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
    @CollectionOf(Member)
    @Title('Member1')
    members: Member[];

    @Enum(OrganizationState)
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
            state: { type: 'string', enum: ['ON', 'OFF'] },
        },
    });
});
