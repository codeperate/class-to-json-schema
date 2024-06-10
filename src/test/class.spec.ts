import test from 'node:test';
import { Nested } from '../decorators/nested.js';
import { getJsonSchema } from '../get-schema.js';
import { SpecTypes } from '../type/spec-type.js';
import assert from 'node:assert';
import { Optional } from '../index.js';
export type Rel<T> = T;
export class Member {}
export class Organization {
    @Nested(() => Member)
    @Optional()
    member: Rel<Member>;
}
test('Get Organization JSON Schema', () => {
    const schema = getJsonSchema(Organization, { specTypes: SpecTypes.OPENAPI });
    assert.deepStrictEqual(schema.toJSON(), {
        required: [],
        properties: { member: { $ref: '#/components/schemas/Member' } },
        type: 'object',
    });
});
