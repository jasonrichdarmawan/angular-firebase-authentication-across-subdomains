// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from "./environment.interface";

export const environment: Environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCT8OTxHqqKBKxNdMWodiscgnH59gFR9V0",
    authDomain: "topoint-org.firebaseapp.com",
    projectId: "topoint-org",
    storageBucket: "topoint-org.appspot.com",
    messagingSenderId: "1055366435833",
    appId: "1:1055366435833:web:04aeeec7bfc132d5ec2328",
    measurementId: "G-8GDGJX470Z",
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
