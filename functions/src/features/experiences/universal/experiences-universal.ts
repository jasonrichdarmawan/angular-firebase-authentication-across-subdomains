import {onRequest} from "firebase-functions/v2/https";
import {info} from "firebase-functions/logger";

export const experiencesUniversal = onRequest((request, response) => {
  info("experiencesUniversal");
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("../../../../dist/experiences/server/main")
    .app()(request, response);
});
