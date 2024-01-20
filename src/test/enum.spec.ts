import test from 'node:test';
import { CollectionOf } from '../decorators/collection-of.js';
import { Enum } from '../decorators/enum.js';
import { Nullable } from '../decorators/nullable.js';
import { Ref } from '../decorators/ref.js';
import { getJsonSchema } from '../get-schema.js';
import { getRefStorage } from '../ref-storage.js';
import { SpecTypes } from '../type/spec-type.js';
import assert from 'node:assert';
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
    assert.deepStrictEqual(getRefStorage().get('MemberState'), {
        type: 'string',
        enum: ['ON', 'OFF'],
        nullable: true,
    });
    assert.deepStrictEqual(schema.toJSON(), {
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
