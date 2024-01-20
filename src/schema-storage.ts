import { Class } from './type/class.js';
import { set } from '@codeperate/utils';
import { CLASS_DECORATEDMAP_KEY, DecoratedContent, DecoratedMap } from './type/decorated-map.js';
export class SchemaStorage {
    storage: {
        [key: string]: DecoratedMap;
    } = {};
    pushDecoratedContent<T>(content: DecoratedContent<T>, target: Class | InstanceType<Class>, propertyKey?: string) {
        const targetClass = typeof target === 'function' ? target : target.constructor;
        let className = targetClass.name;
        let _propertyKey: string | typeof CLASS_DECORATEDMAP_KEY = propertyKey;
        if (!propertyKey) _propertyKey = CLASS_DECORATEDMAP_KEY;
        if (!this.storage?.[className]?.['map']?.[_propertyKey]) set(this.storage, [className, 'map', _propertyKey], []);
        this.storage[className]['map'][_propertyKey].push(content);
        this.storage[className]['class'] = targetClass;
    }
    getDecoratedMap(target: Class | string) {
        const className = typeof target == 'string' ? target : target.name;
        return this.storage[className];
    }
    getDecoratedMaps() {
        return this.storage;
    }
}

export let defaultSchemaStorage = new SchemaStorage();

export function getSchemaStorage() {
    return defaultSchemaStorage;
}
