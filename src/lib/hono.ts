import { AppType } from "@/app/api/[[...route]]/route";
import { hc } from "hono/client";
import { config } from "dotenv";

const client = hc<AppType>("https://pf-marathon-16.vercel.app/");

export const api = client.api;
