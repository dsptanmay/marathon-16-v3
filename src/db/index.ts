import "dotenv/config";
import * as schema from "./schema";

import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import env from "@/lib/env";

const connectionString = env.DATABASE_URL!;

const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema: schema });
