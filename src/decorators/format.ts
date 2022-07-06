import { SchemaDecorators } from '../enum/decorator';
import { SchemaDecoratorFactory } from '../schema-decorator';
import { changeSchema } from '../utils/change-schema';

export function Format(format: JsonFormatTypes | string) {
    return SchemaDecoratorFactory({
        decoratorType: SchemaDecorators.Format,
        args: format,
        action: (args) => {
            changeSchema(args.schema, (s) => (s.format = format), args.propertyKey);
        },
    });
}

export enum JsonFormatTypes {
    DATE_TIME = 'date-time',
    DATE = 'date',
    TIME = 'time',
    EMAIL = 'email',
    HOSTNAME = 'hostname',
    IPV4 = 'ipv4',
    IPV6 = 'ipv6',
    URI = 'uri',
    URL = 'url',
    URI_REF = 'uri-reference',
    URI_TEMPLATE = 'uri-template',
    JSON_POINTER = 'json-pointer',
    RELATIVE_JSON_POINTER = 'relative-json-pointer',
    UUID = 'uuid',
    REGEX = 'regex',
}
