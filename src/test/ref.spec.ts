import { test } from 'node:test';
import { Ref } from '../decorators/ref.js';
import { getJsonSchema } from '../get-schema.js';
import { SpecTypes } from '../type/spec-type.js';
import assert from 'node:assert';

export class BaseEntity {
    @Ref('Name')
    name: string;
}

test('Get Ref JSON Schema', () => {
    const schema = getJsonSchema(BaseEntity, { specTypes: SpecTypes.OPENAPI });
    assert.deepStrictEqual(schema.toJSON(), {
        properties: {
            name: {
                $ref: '#/components/schemas/Name',
            },
        },
        type: 'object',
        required: ['name'],
    });
});
