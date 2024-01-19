import {info} from "firebase-functions/logger";
import {onRequest, Request} from "firebase-functions/v2/https";
import {Response} from "express";

export const helloWorld = onRequest((request, response) => {
  info("helloWorld");

  handleCors(request, response);

  response.send({
    data: "Hello World",
  });
});

const handleCors = (request: Request, response: Response) => {
  const allowedOrigins = ["https://account.topoint.org", "https://experiences.topoint.org", "https://checkout.topoitn.org"];
  const origin = request.get("origin") ?? "";

  if (allowedOrigins.includes(origin)) {
    response.set("Access-Control-Allow-Origin", origin);
  }

  if (request.method === "OPTIONS") {
    // Send response to OPTIONS requests
    response.set("Access-Control-Allow-Methods", "GET");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    response.set("Access-Control-Max-Age", "3600");
    response.status(204).send("");
  }
};
