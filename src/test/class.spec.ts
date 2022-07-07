import { Nested } from '../decorators/nested';
import { getJsonSchema } from '../get-schema';
import { SpecTypes } from '../type/spec-type';

export class Member {}
export class Organization {
    @Nested(() => Member)
    member: Member;
}
test('Get Organization JSON Schema', () => {
    const schema = getJsonSchema(Organization, { specTypes: SpecTypes.OPENAPI });
    expect(schema.toJSON()).toStrictEqual({
        required: ['member'],
        properties: { member: { $ref: '#/components/schemas/Member' } },
        type: 'object',
    });
});
