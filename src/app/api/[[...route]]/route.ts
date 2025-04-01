import { Hono } from "hono";
import { pinoLogger as logger } from "hono-pino";
import { requestId } from "hono/request-id";
import pino from "pino";
import pretty from "pino-pretty";
import { handle } from "hono/vercel";
import { countHandler } from "./counts";
import { participantsHandler } from "./participants";

const app = new Hono({ strict: false })
  .basePath("/api")
  .use(requestId())
  .use(
    logger({
      pino: pino(
        {
          level: process.env.LOG_LEVEL || "debug",
        },
        process.env.NODE_ENV === "production" ? undefined : pretty()
      ),
    })
  );

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/counts", countHandler)
  .route("/register", participantsHandler);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
export type AppType = typeof routes;
