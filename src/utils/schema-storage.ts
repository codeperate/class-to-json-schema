import { get, set } from '@codeperate/utils';
import { DecoratedMap } from '../type';
import { Class } from '../type/class';

class SchemaStorage {
    storage: {
        [key: string]: {
            type: Class;
            classInfo: DecoratedMap;
            propertyInfo: DecoratedMap;
        };
    } = {};

    setPropertyInfo(classObj: new (...args: any) => any, value: DecoratedMap) {
        set(this.storage, `${classObj.name}.propertyInfo`, value);
        set(this.storage, `${classObj.name}.type`, classObj);
    }
    getPropertyInfo(classOrStr: new (...args: any) => any | string) {
        let key = typeof classOrStr === 'string' ? classOrStr : classOrStr.name;
        return get(this.storage, `${key}.propertyInfo`);
    }
    setClassInfo(classObj: new (...args: any) => any, value: DecoratedMap) {
        set(this.storage, `${classObj.name}.classInfo`, value);
        set(this.storage, `${classObj.name}.type`, classObj);
    }
    getClassInfo(classOrStr: new (...args: any) => any | string) {
        let key = typeof classOrStr === 'string' ? classOrStr : classOrStr.name;
        return get(this.storage, `${key}.classInfo`);
    }
    getClass(str: string) {
        return get(this.storage, `${str}.type`);
    }
}

export const defaultStorage = new SchemaStorage();
