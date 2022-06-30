import { Required } from '../../decorators';
import { OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

export abstract class BaseEntity {
    [OptionalProps]?: 'createdAt' | 'updatedAt';

    @PrimaryKey()
    @Required()
    id: string = v4();

    @Property()
    @Required()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    @Required()
    updatedAt: Date = new Date();
}
