import { Hono } from "hono";
import { handle } from "hono/vercel";
import { countHandler } from "./counts";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route("/counts", countHandler);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
export type AppType = typeof routes;
