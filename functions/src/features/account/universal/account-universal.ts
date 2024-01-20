import {onRequest} from "firebase-functions/v2/https";
import {info} from "firebase-functions/logger";

export const accountUniversal = onRequest((request, response) => {
  info("accountUniversal");

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("../../../../dist/account/server/main")
    .app()(request, response);
});
