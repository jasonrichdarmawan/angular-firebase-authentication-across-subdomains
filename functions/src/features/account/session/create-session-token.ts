/* eslint-disable max-len */
import {onRequest} from "firebase-functions/v2/https";
import {Request, Response} from "express";

import * as admin from "firebase-admin";

// eslint-disable-next-line @typescript-eslint/no-var-requires
import serviceAccountKey from "../../../../serviceAccountKeys.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount),
});

/**
 * @todo CSRF protection
 * @bug Set-Cookie header in the response is ignored by Chrome in localhost.
 */
export const createSessionToken = onRequest(
  async (req: Request, res: Response) => {
    handleCors(req, res);

    const idToken = req.body.data.idToken;

    // Set session expiration to 5 days.
    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    admin.auth().verifyIdToken(idToken).then(function(decodedClaims) {
      // we are enforcing that the user signed in in the last 5 minutes.
      if (new Date().getTime() / 1000 - decodedClaims.auth_time < 5 * 60) {
        return admin.auth().createSessionCookie(idToken, {expiresIn: expiresIn});
      }
      throw new Error("unauthorized request");
    })
      .then(function(sessionCookie) {
        // Note httpOnly cookie will not be accessible from javascript.
        // secure flag should be set to true in production.
        const options = {
          maxAge: expiresIn,
          httpOnly: true,
          secure: process.env.FUNCTIONS_EMULATOR === "true" ? false : true, /* to test in localhost */
        };
        res.cookie("session", sessionCookie, options);
        res.send({data: "success"});
      })
      .catch(function() {
        res.status(401).send({data: "unauthorized"});
      });
  });

// eslint-disable-next-line valid-jsdoc
/**
 * @todo staging and dev environment.
 */
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
