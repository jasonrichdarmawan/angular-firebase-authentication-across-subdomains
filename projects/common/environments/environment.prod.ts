import { CommonEnvironment } from "./environment.interface";

export const commonEnvironment: CommonEnvironment = {
    production: true,
    projects: {
        account: {
            baseUrl: "https://account.topoint.org",
        },
        experiences: {
            baseUrl: "https://experiences.topoint.org",
        },
        checkout: {
            baseUrl: "https://checkout.topoint.org",
        },
    },
    useEmulators: false,
    functions: {
        createSessionToken: {
            baseUrl: "//createsessiontoken-dgxrx5mnma-de.a.run.app"
        }
    }
}