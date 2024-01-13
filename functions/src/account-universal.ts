import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

import {setGlobalOptions} from "firebase-functions/v2/options";

setGlobalOptions({maxInstances: 10, region: "asia-east1"});

export const accountUniversal = onRequest((request, response) => {
  logger.info("accountUniversal");
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("../dist/account/server/main")
    .app()(request, response);
});
