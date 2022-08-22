import { JSONSchema7 } from 'json-schema';
import { Class } from './type/class';
export class RefStorage {
    storage: Map<string, JSONSchema7> = new Map();
    set(clsOrStr: string | Class, schema: JSONSchema7) {
        const str = typeof clsOrStr === 'string' ? clsOrStr : clsOrStr.name;
        this.storage.set(str, schema);
    }
    get(clsOrStr: string | Class) {
        const str = typeof clsOrStr === 'string' ? clsOrStr : clsOrStr.name;
        return this.storage.get(str);
    }
}

export let defaultRefStorage = new RefStorage();

export function getRefStorage() {
    return defaultRefStorage;
}
