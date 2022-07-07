import { CollectionOf } from '../decorators/collection-of';
import { Schema } from '../decorators/schema';
import { Title } from '../decorators/title';
import { getJsonSchema } from '../get-schema';
import { SpecTypes } from '../type/spec-type';

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
    expect(schema.toJSON()).toStrictEqual({
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
