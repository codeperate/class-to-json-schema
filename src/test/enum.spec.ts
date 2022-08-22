import { CollectionOf } from '../decorators/collection-of';
import { Enum } from '../decorators/enum';
import { Nullable } from '../decorators/nullable';
import { Ref } from '../decorators/ref';
import { getJsonSchema } from '../get-schema';
import { getRefStorage } from '../ref-storage';
import { SpecTypes } from '../type/spec-type';
export enum MemberState {
    ON = 'ON',
    OFF = 'OFF',
}

export class Member {
    @Enum(MemberState, { name: 'MemberState', ref: true })
    @Nullable()
    state: MemberState;

    @CollectionOf(() => String)
    @Ref('MemberState')
    states: MemberState[];
}

test('Get Enum JSON Schema', () => {
    const schema = getJsonSchema(Member, { specTypes: SpecTypes.OPENAPI });
    expect(getRefStorage().get('MemberState')).toStrictEqual({
        type: 'string',
        enum: ['ON', 'OFF'],
        nullable: true,
    });
    expect(schema.toJSON()).toStrictEqual({
        type: 'object',
        properties: {
            state: {
                $ref: '#/components/schemas/MemberState',
            },
            states: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/MemberState',
                },
            },
        },
        required: ['state', 'states'],
    });
});
