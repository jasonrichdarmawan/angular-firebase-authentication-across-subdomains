import {info} from "firebase-functions/logger";
import {onRequest} from "firebase-functions/v2/https";

export const helloWorld = onRequest((request, response) => {
  info("helloWorld");
  response.send({
    data: "Hello World",
  });
});
