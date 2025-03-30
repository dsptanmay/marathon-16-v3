// import { drizzle } from "drizzle-orm/neon-http";
// import "dotenv/config";
// import { neon, neonConfig } from "@neondatabase/serverless";

// import ws from "ws";
// neonConfig.webSocketConstructor = ws;

// const sql = neon(process.env.DATABASE_URL!);
// export const db = drizzle(sql, { schema });

import "dotenv/config";
import * as schema from "./schema";

import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const connectionString = process.env.DATABASE_URL!;

const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema: schema });
