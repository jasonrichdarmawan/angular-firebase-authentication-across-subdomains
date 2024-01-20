import {setGlobalOptions} from "firebase-functions/v2/options";

setGlobalOptions({region: "asia-east1"});

export {helloWorld} from "./features/hello-world/hello-world/hello-world";
export {accountUniversal} from "./features/account/universal/account-universal";
export {experiencesUniversal}
  from "./features/experiences/universal/experiences-universal";
export {createSessionToken}
  from "./features/account/session/create-session-token";
