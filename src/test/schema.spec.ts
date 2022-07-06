import { CollectionOf, Schema, Title } from "../decorators";
import { SpecTypes } from "../type";
import { getJsonSchema } from "../utils";

@Title("DefaultMember")
@Schema({title:"member"})
export class Member {
    @Schema({title:"name"})
    name!: string;

    @Schema({title:"OuterName"})
    @CollectionOf(Number)
    @Schema({title:"InnerName"})
    player:number[]
}

test('Get Member JSON SChema', () => {
    const schema = getJsonSchema(Member, { specTypes: SpecTypes.OPENAPI });
    console.log(schema.toJSON());
})