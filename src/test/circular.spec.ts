import { Optional } from '../decorators/optional';
import { Required } from '../decorators/required';
import { getJsonSchema } from '../get-schema';
import { SpecTypes } from '../type/spec-type';

export class Organization1 {}

export class Organization2 {}

export class Member {
    @Required(() => Organization1)
    org1: Organization1;

    @Optional(() => Organization1)
    org2: Organization2;
}

test('Get Organization JSON Schema', () => {
    const schema = getJsonSchema(Member, { specTypes: SpecTypes.OPENAPI });
    console.log(schema.toJSON());
});
