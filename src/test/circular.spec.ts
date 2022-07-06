import { Optional, Required } from "../decorators";
import { SpecTypes } from "../type";
import { getJsonSchema } from "../utils";

export class Organization1 {}

export class Organization2 {}

export class Member {

    @Required(()=>Organization1)
    org1:Organization1;

    @Optional(()=>Organization1)
    org2:Organization2;
}


test('Get Organization JSON Schema', () => {
    const schema = getJsonSchema(Member, { specTypes: SpecTypes.OPENAPI });
    console.log(schema.toJSON());
    
})