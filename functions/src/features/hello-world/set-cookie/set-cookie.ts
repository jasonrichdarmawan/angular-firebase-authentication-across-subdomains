/* eslint-disable max-len */
import {onRequest} from "firebase-functions/v2/https";

/**
 * @bug if we send the request from an angular application, the browser will not store the cookie.
 * if we send the request directly to the cloud function url, the browser will store the cookie.
 */
export const setCookie = onRequest((req, res) => {
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
