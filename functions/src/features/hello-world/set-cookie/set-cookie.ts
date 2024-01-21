/* eslint-disable max-len */
import {onRequest} from "firebase-functions/v2/https";
import {Request, Response} from "express";

/**
 * @bug if we send the request from an angular application, the browser will not store the cookie.
 * if we send the request directly to the cloud function url, the browser will store the cookie.
 */
export const setCookie = onRequest((req, res) => {
  handleCors(req, res);
  const sessionCookie = (Math.random()* 100000000000000000).toString();

  // Set session expiration to 5 days.
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  const options = {
    maxAge: expiresIn,
    httpOnly: true,
    secure: process.env.FUNCTIONS_EMULATOR === "true" ? false : true, /* to test in localhost */
  };
  res.cookie("_rememberme", sessionCookie, options);
  res.send({data: "Set Cookie"});
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

  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "Authorization, Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
    return;
  }
};
