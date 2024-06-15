import assert from 'node:assert';
import test from 'node:test';
import { CollectionOf } from '../decorators/collection-of.js';
import { Optional } from '../decorators/optional.js';
import { getJsonSchema } from '../get-schema.js';
import { SpecTypes } from '../type/spec-type.js';

export class Member {
    @Optional()
    name!: string;

    @CollectionOf(() => Number)
    @Optional()
    player: number[];
}

test('Set Required', () => {
    let schema = getJsonSchema(Member, { specTypes: SpecTypes.OPENAPI });
    schema = schema.setRequired(['name']);
    assert.deepStrictEqual(schema.toJSON(), {
        required: ['name'],
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
