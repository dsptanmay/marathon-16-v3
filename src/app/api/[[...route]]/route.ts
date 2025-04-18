import { Hono } from "hono";

import pino from "pino";
import pretty from "pino-pretty";
import { pinoLogger as logger } from "hono-pino";

import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import { requestId } from "hono/request-id";

import utilsHandler from "./utils";
import countHandler from "./counts";
import registerHandler from "./register";
import participantsHandler from "./participants";

const app = new Hono({ strict: false })
  .basePath("/api")
  .use(
    cors({
      origin: "*",
    })
  )
  .use(requestId())

  .use(
    logger({
      pino: pino(
        {
          level: process.env.LOG_LEVEL || "debug",
        },
        pretty()
      ),
    })
  );

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/utils", utilsHandler)
  .route("/counts", countHandler)
  .route("/register", registerHandler)
  .route("/participants", participantsHandler);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
export type AppType = typeof routes;
