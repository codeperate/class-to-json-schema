import { Required } from "../decorators"
import { SpecTypes } from "../types";
import { getJsonSchema } from "../utils";

export class Member{
  
}
export class Organization{
  @Required()
  member:Member
}
test('Get Organization JSON Schema', () => {
    const schema = getJsonSchema(Organization, { specTypes: SpecTypes.OPENAPI });
    expect(schema.toJSON()).toStrictEqual({
        required: [ 'member' ],
        properties: { member: { '$ref': '#/components/schemas/member' } }
      })
    
})