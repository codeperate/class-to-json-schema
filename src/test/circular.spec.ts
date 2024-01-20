import { test } from 'node:test';
import { Nested } from '../decorators/nested.js';
import { getJsonSchema } from '../get-schema.js';
import { SpecTypes } from '../type/spec-type.js';

export class Organization1 {}

export class Organization2 {}

export class Member {
    @Nested(() => Organization1)
    org1: Organization1;

    @Nested(() => Organization1)
    org2: Organization2;
}

test('Get Organization JSON Schema', () => {
    const schema = getJsonSchema(Member, { specTypes: SpecTypes.OPENAPI });
    console.log(schema.toJSON());
});
