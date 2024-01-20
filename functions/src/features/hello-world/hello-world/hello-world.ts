// reference: https://firebase.google.com/docs/functions/http-events?gen=2nd

import {onRequest} from "firebase-functions/v2/https";

import express = require("express");
const app = express();

app.post("/", (req, res) => {
  handleCors(req, res);

  res.send({data: "Hello World"});
});

const handleCors = (req: express.Request, res: express.Response) => {
  const allowedOrigins = ["https://account.topoint.org", "https://experiences.topoint.org", "https://checkout.topoint.org"];
  const origin = req.get("origin") ?? "";

  if (allowedOrigins.includes(origin)) {
    res.set("Access-Control-Allow-Origin", origin);
  }

  if (process.env.FUNCTIONS_EMULATOR) {
    res.set("Access-Control-Allow-Origin", "*");
  }
};

export const helloWorld = onRequest(app);
