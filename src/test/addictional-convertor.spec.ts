import { CollectionOf } from '../decorators/collection-of';
import { Nested } from '../decorators/nested';
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

    @CollectionOf(() => Member)
    members;

    @Nested(() => Member)
    member: Member;
}
test('Get Organization JSON Schema', () => {
    const schema = getJsonSchema(Organization, {
        specTypes: SpecTypes.OPENAPI,
        additionalConverters: {
            [SchemaDecorators.CollectionOf]: ({ schema, decoratoredContent, propertyKey }) => {
                schema['properties'][propertyKey]['items'] = { type: 'string' };
            },
            [SchemaDecorators.Nested]: ({ schema, decoratoredContent, propertyKey }) => {
                schema['properties'][propertyKey]['additionalProperties'] = false;
            },
        },
    });
    expect(schema.toJSON()).toStrictEqual({
        required: ['name', 'namespace', 'members', 'member'],
        properties: {
            members: { type: 'array', items: { type: 'string' } },
            name: { type: 'string' },
            namespace: { type: 'string', pattern: '^[a-z0-9]+$' },
            member: {
                $ref: '#/components/schemas/Member',
                additionalProperties: false,
            },
        },
        type: 'object',
    });
});
