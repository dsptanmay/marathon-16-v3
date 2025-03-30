import { drizzle } from "drizzle-orm/neon-http";
import "dotenv/config";
import { neon, neonConfig } from "@neondatabase/serverless";
import * as schema from "./schema";

import ws from "ws";
neonConfig.webSocketConstructor = ws;

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
