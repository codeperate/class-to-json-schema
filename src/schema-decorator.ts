import { getSchemaStorage, SchemaStorage } from './schema-storage.js';
import { DecoratedContent } from './type/decorated-map.js';

export function SchemaDecoratorFactory<T>(args: DecoratedContent<T>, schemaStorage: SchemaStorage = getSchemaStorage()) {
    return (target, propertyKey?) => {
        schemaStorage.pushDecoratedContent(args, target, propertyKey);
    };
}
