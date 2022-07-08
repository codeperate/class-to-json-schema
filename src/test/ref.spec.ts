import { Ref } from '../decorators/ref';
import { getJsonSchema } from '../get-schema';
import { SpecTypes } from '../type/spec-type';

export class BaseEntity {
    @Ref('Name')
    name: string;
}

test('Get Ref JSON Schema', () => {
    const schema = getJsonSchema(BaseEntity, { specTypes: SpecTypes.OPENAPI });
    expect(schema.toJSON()).toStrictEqual({
        properties: {
            name: {
                $ref: '#/components/schemas/Name',
            },
        },
        type: 'object',
        required: ['name'],
    });
});
