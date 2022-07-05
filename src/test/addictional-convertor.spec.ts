import { Pattern, Required } from '../decorators';
import { SchemaDecorators } from '../enum';
import { SpecTypes } from '../type';
import { getJsonSchema } from '../utils';

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
            [SchemaDecorators.Pattern]: ({ schema, defaultConverter }) => {
                defaultConverter();
                return schema;
            },
        },
    });

    expect(schema.toJSON()).toStrictEqual({
        required: ['name', 'namespace'],
        properties: {
            name: { type: 'string' },
            namespace: { type: 'string', pattern: '/^[a-z0-9]+$/g' },
        },
    });
});
