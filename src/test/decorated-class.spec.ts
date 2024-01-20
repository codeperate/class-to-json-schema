import test from 'node:test';
import { Description } from '../decorators/description.js';
import { Title } from '../decorators/title.js';
import { getJsonSchema } from '../get-schema.js';
import { SpecTypes } from '../type/spec-type.js';
import assert from 'node:assert';

@Title('title1')
@Description('Description1')
export class Organization {
    @Title('title2')
    @Description('Description2')
    name: string;
}

test('Get Organization JSON Schema', () => {
    const schema = getJsonSchema(Organization, { specTypes: SpecTypes.OPENAPI });
    assert.deepStrictEqual(schema.toJSON(), {
        required: ['name'],
        properties: {
            name: { type: 'string', description: 'Description2', title: 'title2' },
        },
        title: 'title1',
        description: 'Description1',
        type: 'object',
    });
});
