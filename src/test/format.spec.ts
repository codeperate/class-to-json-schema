import { Format } from '../decorators/format';
import { Optional } from '../decorators/optional';
import { getJsonSchema } from '../get-schema';
import { SpecTypes } from '../type/spec-type';

//@Schema({ title: 'test', description: 'test', required: ['date'] })
export class Organization {
    @Format('date')
    date!: Date;

    @Format('date-time')
    dateTime!: Date;

    @Format('email')
    @Optional()
    email: string;

    @Format('password')
    password: string;
}

test('Get Organization JSON Schema', () => {
    const schema = getJsonSchema(Organization, { specTypes: SpecTypes.OPENAPI });
    expect(schema.toJSON()).toStrictEqual({
        required: ['date', 'dateTime', 'password'],
        type: 'object',
        properties: {
            date: { type: 'string', format: 'date' },
            dateTime: { type: 'string', format: 'date-time' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string', format: 'password' },
        },
    });
});
