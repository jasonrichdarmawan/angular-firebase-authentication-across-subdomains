import { InjectionToken } from "@angular/core";

export const COMMON_ENVIRONMENT_TOKEN = new InjectionToken<CommonEnvironment>('common_environment_token');

export interface CommonEnvironment {
    production: boolean;
    projects: {
        account: Project,
        experiences: Project,
        checkout: Project,
    };
    useEmulators: boolean;
    emulators?: {
        functions: Emulator;
    }
}

export interface Emulator {
    port: number;
}

export interface Project {
    baseUrl: string;
}