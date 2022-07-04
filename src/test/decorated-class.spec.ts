import { Title,Description } from '../decorators';
import { SpecTypes } from '../types';
import { getJsonSchema } from '../utils';

@Title('title1')
@Description('Description1')
export class Organization {
    
    @Title('title2')
    @Description('Description2')
    name;
}

test('Get Organization JSON Schema', () => {
    const schema = getJsonSchema(Organization, { specTypes: SpecTypes.OPENAPI });
    console.log(schema.toJSON());
});
