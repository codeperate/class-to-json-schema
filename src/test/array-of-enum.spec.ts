import { CollectionOf } from '../decorators/collection-of';
import { Enum } from '../decorators/enum';
import { Nullable } from '../decorators/nullable';
import { Optional } from '../decorators/optional';
import { getJsonSchema } from '../get-schema';
import { SpecTypes } from '../type/spec-type';

enum PaymentType {
    Cash = 'Cash',
    Credit = 'Credit',
    Debit = 'Debit',
    Cheque = 'Cheque',
    Other = 'Other',
}

export class Organization {
    @Nullable()
    @CollectionOf(() => String)
    @Optional()
    @Enum(PaymentType, { name: 'PaymentType', ref: true })
    paymentType: string[];
}

test('Get Organization JSON Schema', () => {
    const schema = getJsonSchema(Organization, { specTypes: SpecTypes.OPENAPI3_1 });
    expect(schema.toJSON()).toStrictEqual({
        properties: {
            paymentType: { type: ['array', 'null'], items: { $ref: '#/components/schemas/PaymentType' } },
        },

        type: 'object',
        required: [],
    });
});
