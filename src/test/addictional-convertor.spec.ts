import { Pattern } from '../decorators/pattern';
import { Required } from '../decorators/required';
import { SchemaDecorators } from '../enum/decorator';
import { getJsonSchema } from '../get-schema';
import { SpecTypes } from '../type/spec-type';

export class Member {
    @Required()
    name!: string;
}

export class Organization {
    @Required()
    name!: string;

    @Required()
    @Pattern(/^[a-z0-9]+$/g)
    namespace: string;
}
test('Get Organization JSON Schema', () => {
    const schema = getJsonSchema(Organization, {
        specTypes: SpecTypes.OPENAPI,
        additionalConverters: {
            [SchemaDecorators.Pattern]: ({ schema }) => {
                return schema;
            },
        },
    });

    expect(schema.toJSON()).toStrictEqual({
        required: ['name', 'namespace'],
        properties: {
            name: { type: 'string' },
            namespace: { type: 'string' },
        },
        type: 'object',
    });
});
