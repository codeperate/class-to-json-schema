import test from 'node:test';
import { Title } from '../decorators/title.js';
import { getJsonSchema } from '../get-schema.js';
import { SpecTypes } from '../type/spec-type.js';
import assert from 'node:assert';

@Title('BaseEntity')
export class BaseEntity {
    @Title('name')
    name: string;
}
export class Organization extends BaseEntity {
    @Title('child')
    child: string;
}
@Title('Organization2')
export class Organization2 extends BaseEntity {
    @Title('child2')
    child2: string;
}
test('Get Organization JSON Schema', () => {
    const schema = getJsonSchema(Organization2, { specTypes: SpecTypes.OPENAPI });
    assert.deepStrictEqual(schema.toJSON(), {
        required: ['name', 'child2'],
        properties: {
            name: { type: 'string', title: 'name' },
            child2: { type: 'string', title: 'child2' },
        },
        title: 'Organization2',
        type: 'object',
    });
});
