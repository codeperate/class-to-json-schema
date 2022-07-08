import { Enum } from '../decorators/enum';
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
}

test('Get Enum JSON Schema', () => {
    const schema = getJsonSchema(Member, { specTypes: SpecTypes.OPENAPI });
    console.log(schema.toJSON());
});
