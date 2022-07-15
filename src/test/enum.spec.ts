import { CollectionOf } from '../decorators/collection-of';
import { Enum } from '../decorators/enum';
import { Ref } from '../decorators/ref';
import { Schema } from '../decorators/schema';
import { getJsonSchema } from '../get-schema';
import { SpecTypes } from '../type/spec-type';
export enum MemberState {
    ON = 'ON',
    OFF = 'OFF',
}

export class Member {
    @Enum(MemberState)
    @Schema({ $ref: '' })
    state: MemberState;

    @CollectionOf(() => String)
    @Ref('MemberState')
    states: MemberState[];
}

test('Get Enum JSON Schema', () => {
    const schema = getJsonSchema(Member, { specTypes: SpecTypes.OPENAPI });
    console.log(JSON.stringify(schema, null, 2));
});
