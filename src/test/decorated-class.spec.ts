import { Title, Description } from '../decorators';
import { SpecTypes } from '../types';
import { getJsonSchema } from '../utils';

@Title('title1')
@Description('Description1')
export class Organization {
    @Title('title2')
    @Description('Description2')
    name: string;
}

test('Get Organization JSON Schema', () => {
    const schema = getJsonSchema(Organization, { specTypes: SpecTypes.OPENAPI });
    expect(schema.toJSON()).toStrictEqual({
        required: ['name'],
        properties: {
            name: { type: 'string', description: 'Description2', title: 'title2' },
        },
        title: 'title1',
        description: 'Description1',
    });
});
