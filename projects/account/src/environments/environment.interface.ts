import { InjectionToken } from "@angular/core";
import { FirebaseOptions } from "firebase/app";

export const ENVIRONMENT = new InjectionToken<string>("ENVIRONMENT");

export interface Environment {
    production: boolean;
    firebase: FirebaseOptions;
}