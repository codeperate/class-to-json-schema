import test from 'node:test';
import { CollectionOf } from '../decorators/collection-of.js';
import { Enum } from '../decorators/enum.js';
import { Nullable } from '../decorators/nullable.js';
import { Optional } from '../decorators/optional.js';
import { getJsonSchema } from '../get-schema.js';
import { SpecTypes } from '../type/spec-type.js';
import assert from 'node:assert';

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
    assert.deepStrictEqual(schema.toJSON(), {
        properties: {
            paymentType: { type: ['array', 'null'], items: { $ref: '#/components/schemas/PaymentType' } },
        },

        type: 'object',
        required: [],
    });
});
