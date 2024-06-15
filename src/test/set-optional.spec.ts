import test from 'node:test';
import { CollectionOf } from '../decorators/collection-of.js';
import { Required } from '../decorators/required.js';
import { getJsonSchema } from '../get-schema.js';
import { SpecTypes } from '../type/spec-type.js';
import assert from 'node:assert';

export class Member {
    @Required()
    name!: string;

    @CollectionOf(() => Number)
    @Required()
    player: number[];
}

test('Set Optional', () => {
    let schema = getJsonSchema(Member, { specTypes: SpecTypes.OPENAPI });
    schema = schema.setOptional(['name']);
    assert.deepStrictEqual(schema.toJSON(), {
        required: ['player'],
        properties: {
            name: {
                type: 'string',
            },
            player: {
                type: 'array',
                items: {
                    type: 'number',
                },
            },
        },
        type: 'object',
    });
});
