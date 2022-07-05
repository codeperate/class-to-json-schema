import { Format, Schema } from '../decorators';
import { SpecTypes } from '../type';
import { getJsonSchema } from '../utils';

@Schema({ title: 'test', description: 'test', required: ['date'] })
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
    expect(schema.toJSON()).toStrictEqual({
        title: 'test',
        description: 'test',
        required: ['date'],
        properties: {
            date: { type: 'string', format: 'date' },
            dateTime: { type: 'string', format: 'date-time' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string', format: 'password' },
        },
    });
});
