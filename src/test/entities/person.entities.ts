import { Collection } from '@mikro-orm/core';
import { CollectionOf, Default, Integer, Max, MaxLength, Min, Property, Required } from '../../decorators';
import { BaseEntity } from './base.entities';
import { Person2 } from './person2.entities ';

export class Person extends BaseEntity {
    @Property()
    name: string;

    @Default(10)
    @Integer()
    @Min(0)
    age: number;

    @Integer()
    @Min(0)
    @Max(10)
    weight: number;

    @Property()
    isMale: boolean;

    @MaxLength(10)
    @CollectionOf(Boolean)
    fingers: boolean[];

    @CollectionOf(Person2)
    person2 = new Collection<Person2>(this);
}
