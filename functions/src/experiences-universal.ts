import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

import {setGlobalOptions} from "firebase-functions/v2/options";

setGlobalOptions({maxInstances: 10, region: "asia-east1"});

export const experiencesUniversal = onRequest((request, response) => {
  logger.info("experiencesUniversal");
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("../dist/experiences/server/main")
    .app()(request, response);
});
