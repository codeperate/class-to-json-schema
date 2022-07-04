import { CollectionOf, Enum, Property, Title } from '../decorators';
import { SpecTypes } from '../types';
import { getJsonSchema } from '../utils';

export enum OrganizationState {
    ON = 'ON',
    OFF = 'OFF',
}

export class Member {
    name!: string;
}
export class Organization {
    @Property(Member)
    member: Member;

    @Title('Members of Organization')
    @CollectionOf(Member)
    @Title('Member')
    members: Member[];

    @Enum(OrganizationState)
    state: OrganizationState;
}
test('Get Organization JSON Schema', () => {
    const schema = getJsonSchema(Organization, { specTypes: SpecTypes.OPENAPI });
    console.log(schema.toJSON());
    
});
