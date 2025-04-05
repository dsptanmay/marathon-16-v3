import { Hono } from "hono";

import pino from "pino";
import pretty from "pino-pretty";
import { pinoLogger as logger } from "hono-pino";

import { handle } from "hono/vercel";
import { requestId } from "hono/request-id";

import utilsHandler from "./utils";
import { countHandler } from "./counts";
import { participantsHandler } from "./register";

const app = new Hono({ strict: false })
  .basePath("/api")
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
  .route("/register", participantsHandler);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
export type AppType = typeof routes;
