import { AppType } from "@/app/api/[[...route]]/route";
import { hc } from "hono/client";

const client = hc<AppType>(
  process.env.NODE_ENV === "production"
    ? "https://pf-marathon-16.fly.dev"
    : "http://localhost:3000"
);

export const api = client.api;
