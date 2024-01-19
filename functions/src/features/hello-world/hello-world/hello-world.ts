import {info} from "firebase-functions/logger";
import {onRequest} from "firebase-functions/v2/https";
import {setGlobalOptions} from "firebase-functions/v2/options";

setGlobalOptions({maxInstances: 10, region: "asia-east1"});

export const helloWorld = onRequest((request, response) => {
  info("helloWorld");
  response.send({
    data: "Hello World",
  });
});
