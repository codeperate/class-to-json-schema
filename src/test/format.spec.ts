import { Format } from '../decorators';
import { SpecTypes } from '../types';
import { getJsonSchema } from '../utils';

export class Organization {
    @Format('date')
    date!: Date;

    @Format('date-time')
    dateTime!: Date;

    @Format('email')
    email;

    @Format('password')
    password;
}

test('Get Organization JSON Schema', () => {
    const schema = getJsonSchema(Organization, { specTypes: SpecTypes.OPENAPI });
    console.log(schema.toJSON());
});
