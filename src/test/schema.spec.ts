import test from 'node:test';
import { CollectionOf } from '../decorators/collection-of.js';
import { Schema } from '../decorators/schema.js';
import { Title } from '../decorators/title.js';
import { getJsonSchema } from '../get-schema.js';
import { SpecTypes } from '../type/spec-type.js';
import assert from 'node:assert';

@Title('DefaultMember')
@Schema({ title: 'member' })
export class Member {
    @Schema({ title: 'name' })
    name!: string;

    @Schema({ title: 'OuterName' })
    @CollectionOf(() => Number)
    @Schema({ title: 'InnerName' })
    player: number[];
}

test('Get Member JSON SChema', () => {
    const schema = getJsonSchema(Member, { specTypes: SpecTypes.OPENAPI });
    assert.deepStrictEqual(schema.toJSON(), {
        required: ['name', 'player'],
        properties: {
            name: {
                type: 'string',
                title: 'name',
            },
            player: {
                type: 'array',
                title: 'OuterName',
                items: {
                    type: 'number',
                    title: 'InnerName',
                },
            },
        },
        type: 'object',
        title: 'member',
    });
});
