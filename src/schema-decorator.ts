import { defaultStorage, SchemaStorage } from './schema-storage';
import { DecoratedContent } from './type/decorated-map';

export function SchemaDecoratorFactory<T>(args: DecoratedContent<T>, schemaStorage: SchemaStorage = defaultStorage) {
    return (target, propertyKey?) => {
        schemaStorage.pushDecoratedContent(args, target, propertyKey);
    };
}
