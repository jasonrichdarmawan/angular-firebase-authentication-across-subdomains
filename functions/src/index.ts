import {setGlobalOptions} from "firebase-functions/v2/options";

setGlobalOptions({region: "asia-east1"});

export {helloWorld} from "./features/hello-world/hello-world/hello-world";
// eslint-disable-next-line max-len
export {experiencesUniversal} from "./features/experiences/universal/experiences-universal";
