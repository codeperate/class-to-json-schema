import { Description, Title } from '../decorators';
import { SpecTypes } from '../types';
import { getJsonSchema } from '../utils';

@Title('title')
@Description('Description')
export class Organization {
    @Title('title')
    @Description('Description')
    name;
}

test('Get Organization JSON Schema', () => {
    const schema = getJsonSchema(Organization, { specTypes: SpecTypes.OPENAPI });
    console.log(schema.toJSON());
});
