import { CommonEnvironment } from "./environment.interface";

export const commonEnvironment: CommonEnvironment = {
    production: false,
    projects: {
        account: {
            // port based on angular.json
            baseUrl: "http://localhost:4200"
        },
        experiences: {
            // port based on angular.json
            baseUrl: "http://localhost:4201"
        },
        checkout: {
            // port based on angular.json
            baseUrl: "http://localhost:4202",
        },
    },
    useEmulators: true,
    emulators: {
        functions: {
            port: 5001,
        },
    },
}