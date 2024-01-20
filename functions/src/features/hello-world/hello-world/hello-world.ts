// reference: https://firebase.google.com/docs/functions/http-events?gen=2nd

import {onRequest} from "firebase-functions/v2/https";
import {Request, Response} from "express";

export const helloWorld = onRequest((req, res) => {
  handleCors(req, res);
  res.send({data: "Hello World"});
});

const handleCors = (req: Request, res: Response) => {
  const allowedOrigins = ["https://account.topoint.org", "https://experiences.topoint.org", "https://checkout.topoint.org"];
  const origin = req.get("origin") ?? "";

  if (allowedOrigins.includes(origin)) {
    res.set("Access-Control-Allow-Origin", origin);
  }

  if (process.env.FUNCTIONS_EMULATOR) {
    res.set("Access-Control-Allow-Origin", "*");
  }
};
