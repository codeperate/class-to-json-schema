import { CollectionOf } from '../decorators/collection-of';
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
}
test('Get Organization JSON Schema', () => {
    const schema = getJsonSchema(Organization, {
        specTypes: SpecTypes.OPENAPI,
        additionalConverters: {
            [SchemaDecorators.CollectionOf]: ({ schema, decoratoredContent, propertyKey }) => {
                schema['properties'][propertyKey]['items'] = { type: 'string' };
            },
        },
    });
    console.log(schema);
    expect(schema.toJSON()).toStrictEqual({
        required: ['name', 'namespace', 'members'],
        properties: {
            members: { type: 'array', items: { type: 'string' } },
            name: { type: 'string' },
            namespace: { type: 'string', pattern: '^[a-z0-9]+$' },
        },
        type: 'object',
    });
});
