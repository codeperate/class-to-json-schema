import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
    return {
        verbose: true,
        roots: ['src/test'],
        preset: 'ts-jest',
        globals: {
            'ts-jest': {
                tsConfig: 'tsconfig.test.json',
            },
        },
    };
};
