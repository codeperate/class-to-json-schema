import { getSchemaStorage, SchemaStorage } from './schema-storage';
import { DecoratedContent } from './type/decorated-map';

export function SchemaDecoratorFactory<T>(args: DecoratedContent<T>, schemaStorage: SchemaStorage = getSchemaStorage()) {
    return (target, propertyKey?) => {
        schemaStorage.pushDecoratedContent(args, target, propertyKey);
    };
}
